import { useState } from "react";
import axios from "axios";
const Chatbot = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "Hi! 👋 I'm Virender's portfolio assistant. Ask me anything about his skills, projects or experience."
        }
    ]);
    const [answer, setAnswer] = useState("");


    const [loading, setLoading] = useState(false);

   const handleSend = async (e) => {
    e.preventDefault();

    if (!message.trim() || loading) return;

    const userMessage = message;

    // Add user message + pending bot message
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
            "http://localhost:4000/api/chat",
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

        // Get streaming reader
        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        let botAnswer = "";

        // Remove loading dots as soon as first response arrives
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

        // Final message
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

        console.log("AI response:", botAnswer);

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
    return (
        <>
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    aria-label="Open chatbot"
                    className=" fixed  bottom-5 right-5 sm:bottom-6 sm:right-6 w-16 h-16 rounded-full flex items-center justify-center text-white cursor-pointer bg-gradient-to-br from-cyan-400 via-blue-600 to-violet-700 shadow-[0_0_25px_rgba(79,70,229,0.55)] hover:scale-110 hover:shadow-[0_0_40px_rgba(139,92,246,0.7)] active:scale-95 transition-all duration-300 z-[9999] ">
                    {/* ================= BOT ICON ================= */}
                    <div className="relative w-9 h-9 flex items-center justify-center">
                        {/* Antenna */}
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-2 bg-white rounded-full">

                            <div className=" w-1 h-2 bg-white rounded-full" />

                            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-300 rounded-full shadow-[0_0_8px_rgba(103,232,249,0.9)]" />
                        </div>
                        {/* Robot Head */}

                        <div className="relative w-8 h-7 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/30">


                            {/* Left ear */}

                            <div className="absolute -left-1.5 w-1.5 h-3 bg-cyan-200 rounded-full" />
                            {/* Right ear */}
                            <div className="absolute -right-1.5 w-1.5 h-3 bg-cyan-200 rounded-full" />
                            {/* Eyes */}

                            <div className="flex gap-2">
                                <span className="w-1.5 h-2 bg-blue-600 rounded-full shadow-[0_0_5px_rgba(37,99,235,0.8)]" />
                                <span className="w-1.5 h-2 bg-blue-600 rounded-full shadow-[0_0_5px_rgba(37,99,235,0.8)]" />


                            </div>


                            {/* Smile */}

                            <div className="
                            absolute
                            bottom-1
                            w-3
                            h-1
                            border-b-2
                            border-blue-500
                            rounded-full
                        " />

                        </div>


                        {/* Small Body */}

                        <div className="
                        absolute
                        -bottom-1
                        w-5
                        h-2
                        bg-white/90
                        rounded-t-lg
                    " />

                    </div>


                    {/* ================= ONLINE DOT ================= */}

                    <span className="
                    absolute
                    top-0
                    right-0

                    w-4
                    h-4

                    bg-emerald-400

                    rounded-full

                    border-2
                    border-white

                    shadow-[0_0_10px_rgba(52,211,153,0.9)]

                    animate-pulse
                " />

                </button>
            )}
            {/* =====================================================
            CHAT WINDOW
            Only show when chat is OPEN
        ====================================================== */}

            {open && (
                <div className="fixed z-[9998] inset-3 h-[520px] top-26 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[420px] sm:h-[520px]
                    lg:w-[450px] lg:h-[560px] bg-white rounded-3xl border border-slate-200  shadow-[0_25px_80px_rgba(15,23,42,0.25)]
                    overflow-hidden flex flex-col animate-[chatOpen_0.25s_ease-out]">
                    {/* =================================================
                    HEADER
                ================================================== */}
                    <div className="relative px-5 py-4 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 text-white overflow-hidden flex-shrink-0">

                        {/* Glow */}

                        <div className="absolute -top-16 -right-16 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl" />

                        <div className="absolute -bottom-20 -left-10 w-36 h-36 bg-violet-500/20 rounded-full blur-3xl" />


                        {/* Header content */}

                        <div className="relative flex items-center justify-between">

                            <div className="flex items-center gap-3">

                                {/* BOT ICON */}

                                <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/30">

                                    {/* Antenna */}

                                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-2 bg-white rounded-full" />

                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-300 rounded-full shadow-[0_0_8px_rgba(103,232,249,1)]" />


                                    {/* Face */}

                                    <div className="relative w-8 h-7 bg-white rounded-xl flex items-center justify-center">

                                        {/* Eyes */}

                                        <div className="flex gap-2">

                                            <span className="w-1.5 h-2 bg-blue-600 rounded-full" />

                                            <span className="w-1.5 h-2 bg-blue-600 rounded-full" />

                                        </div>


                                        {/* Smile */}

                                        <div className="absolute bottom-1 w-3 h-1 border-b-2 border-blue-500 rounded-full" />

                                    </div>

                                </div>


                                {/* TITLE */}

                                <div>

                                    <div className="flex items-center gap-2">

                                        <h2 className="font-bold text-[15px]">
                                            Portfolio AI
                                        </h2>

                                        <span className="px-2 py-0.5 text-[9px] font-semibold rounded-full bg-white/10 border border-white/10 text-blue-200">
                                            AI
                                        </span>

                                    </div>


                                    {/* Online */}

                                    <div className="flex items-center gap-2 mt-1">

                                        <span className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.9)]" />

                                        <p className="text-xs text-slate-300">
                                            Online · Ready to help
                                        </p>

                                    </div>

                                </div>

                            </div>


                            {/* CLOSE */}

                            <button
                                onClick={() => setOpen(false)}
                                aria-label="Close chatbot"
                                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition cursor-pointer"
                            >
                                ✕
                            </button>

                        </div>

                    </div>

                    {/* =================================================
                    MESSAGE AREA
                ================================================== */}
                    <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-5 bg-gradient-to-b from-slate-50 via-white to-blue-50/30 min-h-0">

                        {/* ================= WELCOME ================= */}

                        {messages.length === 1 && (
                            <div className="mb-5">

                                <div className="flex justify-start">
                                    <div className="max-w-[88%] bg-white border border-slate-200 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
                                        <p className="text-sm text-slate-700 leading-relaxed">
                                            Hi! 👋 I'm Virender's portfolio assistant. I can tell you about his projects, skills, experience and technologies.
                                        </p>
                                    </div>
                                </div>

                                {/* Suggested questions */}

                                <div className="mt-4">

                                    <p className="text-[10px] font-bold tracking-wider text-slate-400 mb-2">
                                        TRY ASKING
                                    </p>

                                    <div className="flex flex-wrap gap-2">

                                        {[
                                            "🚀 Projects",
                                            "💻 Skills",
                                            "🤖 AI Projects",
                                            "⚛️ React",
                                        ].map((item) => (
                                            <button
                                                key={item}
                                                type="button"
                                                onClick={() => {
                                                    const cleanMessage = item
                                                        .replace("🚀 ", "")
                                                        .replace("💻 ", "")
                                                        .replace("🤖 ", "")
                                                        .replace("⚛️ ", "");

                                                    setMessage(cleanMessage);
                                                }}
                                                className="px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-xl transition cursor-pointer"
                                            >
                                                {item}
                                            </button>
                                        ))}

                                    </div>

                                </div>

                            </div>
                        )}

                        {/* ================= MESSAGES ================= */}

                        <div className="space-y-4">

                            {messages.map((item, index) => {

                                // Don't render welcome message again
                                if (index === 0) return null;

                                const isUser = item.sender === "user";

                                return (
                                    <div
                                        key={index}
                                        className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                                    >

                                        {/* Bot Avatar */}

                                        {!isUser && (
                                            <div className="flex-shrink-0 w-7 h-7 mr-2 mt-1 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-xs text-white shadow-sm">
                                                ✦
                                            </div>
                                        )}

                                        {/* Message Bubble */}

                                     <div
    className={`max-w-[78%] px-4 py-3 text-sm leading-relaxed ${
        isUser
            ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl rounded-br-md shadow-md"
            : "bg-white text-slate-700 border border-slate-200 rounded-2xl rounded-bl-md shadow-sm"
    }`}
>
    {item.pending ? (
        <div className="flex items-center gap-1.5 px-1 py-1">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce shadow-[0_0_8px_rgba(59,130,246,0.9)]"></span>

            <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:150ms] shadow-[0_0_8px_rgba(59,130,246,0.9)]"></span>

            <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:300ms] shadow-[0_0_8px_rgba(59,130,246,0.9)]"></span>
        </div>
    ) : (
        item.text
    )}
</div>

                                    </div>
                                );

                            })}

                        </div>

                    </div>
                    {/* =================================================
                    INPUT AREA
                ================================================== */}
                    <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex-shrink-0">

                        <form
                            onSubmit={handleSend}
                            className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100 transition"
                        >

                            {/* Input */}

                            <input
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Ask me anything..."
                                className="flex-1 min-w-0 bg-transparent px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 outline-none"
                            />


                            {/* Send */}

                            <button
                                type="submit"
                                disabled={!message.trim()}
                                aria-label="Send message"
                                className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed transition cursor-pointer"
                            >
                                ➤
                            </button>

                        </form>


                        {/* Footer */}

                        <p className="text-[10px] text-center text-slate-400 mt-2">
                            AI can make mistakes · Ask about Virender
                        </p>

                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;