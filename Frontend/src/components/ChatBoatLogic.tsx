import { useRef, useState } from "react";

declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

export const useChatbot = () => {
    const [isListening, setIsListening] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "Hi! 👋 I'm Virender's portfolio assistant. Ask me anything about his skills, projects or experience."
        }
    ]);
    const [loading, setLoading] = useState(false);
    const [answer, setAnswer] = useState("");

    const recognitionRef = useRef<any>(null);
    const finalTranscriptRef = useRef("");
    const silenceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);

    // 🔊 Speak AI answer
    // const speakTextUser = (text: string) => {
    //     if (!text.trim()) return;

    //     window.speechSynthesis.cancel();

    //     const utterance = new SpeechSynthesisUtterance(text);

    //     utterance.lang = "en-IN";
    //     utterance.rate = 1;
    //     utterance.pitch = 1;
    //     utterance.volume = 1;

    //     window.speechSynthesis.speak(utterance);
    // };
    const speakTextUser = (text: string, index: number) => {
    if (!text.trim()) return;

    // If this answer is already speaking → stop it
    if (speakingIndex === index) {
        window.speechSynthesis.cancel();
        setSpeakingIndex(null);
        return;
    }

    // Stop any other speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "en-IN";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
        setSpeakingIndex(index);
    };

    utterance.onend = () => {
        setSpeakingIndex(null);
    };

    utterance.onerror = () => {
        setSpeakingIndex(null);
    };

    window.speechSynthesis.speak(utterance);
};

    // Send message to AI
    const handleSend = async (
        e?: { preventDefault: () => void },
        voiceMessage?: string
    ) => {
        e?.preventDefault();

        const userMessage = voiceMessage ?? message;

        if (!userMessage.trim() || loading) return;

        setMessages((prev) => [
            ...prev,
            {
                sender: "user",
                text: userMessage
            },
            {
                sender: "bot",
                text: "",
                pending: true
            }
        ]);

        setMessage("");
        setLoading(true);

        try {
            const res = await fetch(
                "https://virender-yadav-portfolio-2.onrender.com/api/chat",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        message: userMessage
                    })
                }
            );

            if (!res.ok) {
                throw new Error("API request failed");
            }

            const reader = res.body!.getReader();
            const decoder = new TextDecoder();

            let botAnswer = "";
            let firstChunk = true;

            while (true) {
                const { value, done } = await reader.read();

                if (done) break;

                const chunk = decoder.decode(value, {
                    stream: true
                });

                botAnswer += chunk;

                setMessages((prev) => {
                    const updatedMessages = [...prev];

                    updatedMessages[updatedMessages.length - 1] = {
                        sender: "bot",
                        text: botAnswer,
                        pending: firstChunk && !botAnswer
                    };

                    return updatedMessages;
                });

                firstChunk = false;
            }

            setMessages((prev) => {
                const updatedMessages = [...prev];

                updatedMessages[updatedMessages.length - 1] = {
                    sender: "bot",
                    text: botAnswer,
                    pending: false
                };

                return updatedMessages;
            });

            setAnswer(botAnswer);

        } catch (err) {
            console.log(err, "api call error");

            setMessages((prev) => {
                const updatedMessages = [...prev];

                updatedMessages[updatedMessages.length - 1] = {
                    sender: "bot",
                    text: "Sorry, something went wrong. Please try again.",
                    pending: false
                };

                return updatedMessages;
            });

        } finally {
            setLoading(false);
        }
    };

    // 🎤 Voice typing
    const startListening = () => {
        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Speech recognition is not supported in this browser.");
            return;
        }

        if (isListening && recognitionRef.current) {
            recognitionRef.current.stop();
            return;
        }

        const recognition = new SpeechRecognition();

        recognition.lang = "en-IN";
        recognition.continuous = true;
        recognition.interimResults = true;

        recognitionRef.current = recognition;

        finalTranscriptRef.current = "";

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event: any) => {
            let interimTranscript = "";

            for (
                let i = event.resultIndex;
                i < event.results.length;
                i++
            ) {
                const text = event.results[i][0].transcript;

                if (event.results[i].isFinal) {
                    finalTranscriptRef.current += text + " ";
                } else {
                    interimTranscript += text;
                }
            }

            const fullTranscript =
                finalTranscriptRef.current + interimTranscript;

            if (!fullTranscript.trim()) return;

            setMessage(fullTranscript.trim());

            // Reset silence timer
            if (silenceTimer.current) {
                clearTimeout(silenceTimer.current);
            }

            silenceTimer.current = setTimeout(() => {
                const finalMessage =
                    finalTranscriptRef.current.trim();

                if (!finalMessage) return;

                recognition.stop();

                handleSend(undefined, finalMessage);

                finalTranscriptRef.current = "";

            }, 3000);
        };

        recognition.onerror = (event: any) => {
            console.error("Speech error:", event.error);

            setIsListening(false);

            if (silenceTimer.current) {
                clearTimeout(silenceTimer.current);
            }
        };

        recognition.onend = () => {
            setIsListening(false);
            recognitionRef.current = null;
        };

        recognition.start();
    };

    return {
        message,
        setMessage,
        messages,
        setMessages,
        loading,
        answer,
        isListening,
        handleSend,
        startListening,
        speakTextUser,
        speakingIndex,

    };
};