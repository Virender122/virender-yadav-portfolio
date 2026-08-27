import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, Phone, MapPin, Terminal, Cpu, ArrowDown } from "lucide-react";
import { motion } from "motion/react";
import { portfolioData } from "../data/portfolioData";

interface HeroProps {
  onNavClick: (section: string) => void;
}

export default function Hero({ onNavClick }: HeroProps) {
  const { name, role, email, phone, location, linkedIn, gitHub } = portfolioData;

  const snakesAndLadders: Record<number, number> = {
    3: 15,
    6: 14,
    11: 22,
    17: 7,
    19: 9,
    24: 12,
  };

  const [playerPosition, setPlayerPosition] = useState(1);
  const [cpuPosition, setCpuPosition] = useState(1);
  const [diceValue, setDiceValue] = useState(1);
  const [turn, setTurn] = useState<"player" | "cpu">("player");
  const [gameMessage, setGameMessage] = useState("Roll to start your climb!");
  const [isRolling, setIsRolling] = useState(false);
  const [playerMoves, setPlayerMoves] = useState(0);
  const [cpuMoves, setCpuMoves] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const resetGame = () => {
    setPlayerPosition(1);
    setCpuPosition(1);
    setDiceValue(1);
    setTurn("player");
    setGameMessage("Roll to start your climb!");
    setIsRolling(false);
    setPlayerMoves(0);
    setCpuMoves(0);
    setWinner(null);
    setShowCelebration(false);
  };

  const getDestination = (position: number) => {
    const target = snakesAndLadders[position] ?? position;
    return { destination: target, isSnake: target < position, isLadder: target > position };
  };

  const rollDice = () => Math.floor(Math.random() * 6) + 1;

  const movePlayer = (currentPosition: number, roll: number) => {
    const tentative = currentPosition + roll;
    if (tentative > 25) {
      return { nextPosition: currentPosition, event: "needsExact", label: `Need exact roll to reach 25.` };
    }
    const { destination, isSnake, isLadder } = getDestination(tentative);
    if (isLadder) {
      return { nextPosition: destination, event: "ladder", label: `Climbed a ladder to ${destination}!` };
    }
    if (isSnake) {
      return { nextPosition: destination, event: "snake", label: `Slid down a snake to ${destination}!` };
    }
    return { nextPosition: destination, event: "move", label: `Moved to ${destination}.` };
  };

  const renderDicePips = (value: number) => {
    const layout: Record<number, number[]> = {
      1: [5],
      2: [1, 9],
      3: [1, 5, 9],
      4: [1, 3, 7, 9],
      5: [1, 3, 5, 7, 9],
      6: [1, 3, 4, 6, 7, 9],
    };
    const positions = layout[value];
    return positions.map((idx) => (
      <span key={idx} className={`dice-pip dice-pip-${idx}`} />
    ));
  };

  const resolveTurn = (actor: "player" | "cpu") => {
    const roll = rollDice();
    const currentPosition = actor === "player" ? playerPosition : cpuPosition;
    const result = movePlayer(currentPosition, roll);
    setDiceValue(roll);
    setGameMessage(
      actor === "player"
        ? `You rolled ${roll}. ${result.label}`
        : `CPU rolled ${roll}. ${result.label}`
    );

    if (actor === "player") {
      setPlayerPosition(result.nextPosition);
      setPlayerMoves((count) => count + 1);
    } else {
      setCpuPosition(result.nextPosition);
      setCpuMoves((count) => count + 1);
    }

    if (result.nextPosition === 25) {
      setWinner(actor === "player" ? name : "Computer");
      setTurn("player");
      setIsRolling(false);
      if (actor === "player") {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 5000);
      }
      return;
    }

    setTurn(actor === "player" ? "cpu" : "player");
    setIsRolling(false);
  };

  const handleDiceRoll = () => {
    if (winner || isRolling || turn !== "player") return;
    setIsRolling(true);
    const rollDelay = window.setTimeout(() => {
      resolveTurn("player");
      window.clearTimeout(rollDelay);
    }, 300);
  };

  useEffect(() => {
    if (turn === "cpu" && !winner) {
      const timer = window.setTimeout(() => {
        setIsRolling(true);
        resolveTurn("cpu");
      }, 1200);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [turn, winner]);

  return (
    <section
      id="home"
      className="relative min-h-screen pt-20 flex items-center justify-center overflow-hidden bg-cyber-bg-primary"
    >
      {/* Absolute Decorative Glows and Cyber Grids */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-bg-primary/50 to-cyber-bg-primary pointer-events-none" />

      {/* Blur Orbs for background depth */}
      <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-cyber-cyan/15 blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-cyber-purple/10 blur-[130px] pointer-events-none animate-pulse-slow" style={{ animationDelay: "2s" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          {/* LEFT PANEL: Game Controls & Score */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3 grid grid-cols-2 gap-4 lg:grid-cols-1"
          >
            {/* Dice */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-5 relative overflow-hidden backdrop-blur-md shadow-2xl">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
              <div className="relative z-10 text-center">
                <p className="text-[10px] uppercase tracking-[0.35em] text-text-secondary/70">Dice Roll</p>
                <div className="mt-4 relative flex h-[90px] w-[90px] items-center justify-center rounded-[24px] bg-gradient-to-br from-cyber-cyan/20 via-white/10 to-cyber-purple/10 shadow-[0_20px_60px_rgba(0,245,255,0.18)] mx-auto">
                  <div className="dice-3d">
                    <div className="dice-face dice-front">
                      <div className="dice-value">{diceValue}</div>
                      {renderDicePips(diceValue)}
                    </div>
                    <div className="dice-face dice-right" />
                    <div className="dice-face dice-top" />
                  </div>
                </div>
                <p className="mt-4 text-center text-2xl font-bold text-white">{diceValue}</p>
              </div>
            </div>

            {/* Positions */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-5 relative overflow-hidden backdrop-blur-md shadow-2xl">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
              <div className="relative z-10 space-y-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-text-secondary">Your Position</p>
                  <p className="mt-2 text-3xl font-semibold text-white">{playerPosition}</p>
                  <p className="text-xs text-white/70">Moves: {playerMoves}</p>
                </div>
                <div className="border-t border-white/10 pt-3">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-text-secondary">CPU Position</p>
                  <p className="mt-2 text-3xl font-semibold text-white">{cpuPosition}</p>
                  <p className="text-xs text-white/70">Moves: {cpuMoves}</p>
                </div>
              </div>
            </div>
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Turn Status */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-4 relative overflow-hidden backdrop-blur-md shadow-2xl">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
              <div className="relative z-10">
                <p className="text-[10px] uppercase tracking-[0.35em] text-text-secondary">Current Turn</p>
                <div className="mt-3">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                      winner
                        ? "bg-red-500/20 border border-red-500/50 text-red-300"
                        : turn === "player"
                        ? "bg-cyber-cyan/10 border border-cyber-cyan/50 text-cyber-cyan shadow-neon-cyan"
                        : "bg-cyber-purple/10 border border-cyber-purple/50 text-cyber-purple shadow-neon-purple"
                    }`}
                  >
                    {winner ? "Game Over" : turn === "player" ? "Your Move" : "CPU Move"}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            {winner ? (
              <button
                onClick={resetGame}
                className="w-full px-6 py-3 rounded-2xl bg-gradient-to-r from-cyber-lime to-cyber-cyan text-black font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                Play Again
              </button>
            ) : (
              <button
                onClick={handleDiceRoll}
                disabled={turn !== "player" || isRolling}
                className="w-full px-6 py-3 rounded-2xl bg-gradient-to-r from-cyber-cyan to-cyber-purple text-white font-semibold shadow-neon-cyan transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {turn === "player" ? (isRolling ? "Rolling…" : "Roll Dice") : "Wait for CPU"}
              </button>
            )}
          </div>
          </motion.div>

          {/* CENTER PANEL: Game Board */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-md flex flex-col justify-between shadow-2xl group hover:border-cyber-purple/30 transition-all duration-300"
          >
            {/* Celebration Overlay */}
            {showCelebration && (
              <div className="absolute inset-0 z-50 pointer-events-none">
                <div className="celebration-container">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div key={i} className="celebration-item">🎉</div>
                  ))}
                </div>
              </div>
            )}

            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-cyber-purple/10 blur-[80px] pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-text-secondary/70">Snake & Ladder Arena</p>
                  <h3 className="mt-2 text-lg sm:text-xl font-display font-semibold text-white">Live match</h3>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-cyber-cyan/10 px-3 py-2 text-xs font-semibold text-cyber-cyan">
                  {winner ? "🏆" : "⚡"}
                </span>
              </div>

              <div className="board-viewport mx-auto w-full rounded-[36px] p-4 bg-[#070717]/80 border border-white/10 shadow-[0_35px_90px_rgba(0,0,0,0.35)]">
                <div className="board-card relative overflow-hidden rounded-[32px] border border-white/10 shadow-[0_28px_60px_rgba(0,0,0,0.35)] bg-[#02050e]">
                  <div className="board-surface absolute inset-0" />

                  <div className="absolute inset-0">
                    <div className="board-overlay-ladder" />
                    <div className="board-overlay-snake" />
                    <div className="board-overlay-snake board-overlay-snake--small" />
                  </div>

                  <div className="relative z-10 board-grid grid grid-cols-5 gap-2 p-4 h-[360px]">
                    {Array.from({ length: 25 }, (_, index) => {
                      const number = 25 - index;
                      const destination = snakesAndLadders[number] ?? number;
                      const isLadder = destination > number;
                      const isSnake = destination < number;
                      const isPlayerHere = playerPosition === number;
                      const isCpuHere = cpuPosition === number;
                      const isWinCell = number === 25;
                      return (
                        <div
                          key={number}
                          className={`board-cell group ${isLadder ? "board-cell--ladder" : ""} ${isSnake ? "board-cell--snake" : ""} ${isWinCell ? "board-cell--win" : ""}`}
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/50">{number}</span>
                            {isWinCell && <span className="text-lg animate-bounce">🎉</span>}
                            {isLadder && <span className="text-[10px] text-cyber-cyan uppercase tracking-[0.2em]">L↑</span>}
                            {isSnake && <span className="text-[10px] text-cyber-purple uppercase tracking-[0.2em]">S↓</span>}
                          </div>
                          <div className="flex flex-wrap gap-1 justify-center items-center h-full">
                            {isPlayerHere && (
                              <span className="inline-flex items-center justify-center rounded-full bg-cyber-cyan/95 px-2 py-1 text-[10px] font-semibold text-black shadow-[0_0_10px_rgba(0,245,255,0.4)]">
                                YOU
                              </span>
                            )}
                            {isCpuHere && (
                              <span className="inline-flex items-center justify-center rounded-full bg-cyber-purple/95 px-2 py-1 text-[10px] font-semibold text-black shadow-[0_0_10px_rgba(157,78,221,0.4)]">
                                CPU
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-[#090f21]/90 px-4 py-3 text-sm text-text-secondary border border-white/5">
                <span className="text-white font-medium">{winner ? `🎉 ${winner} won the match!` : gameMessage}</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT PANEL: Profile */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-3 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-md flex flex-col justify-between shadow-2xl group hover:border-cyber-cyan/30 transition-all duration-300"
          >
            {/* Grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-cyber-cyan/10 blur-[80px] pointer-events-none" />

            <div className="relative z-10 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-cyan/5 border border-cyber-cyan/20 w-fit">
                <Cpu className="w-4 h-4 text-cyber-cyan animate-spin-slow" />
                <span className="font-mono text-[9px] sm:text-xs text-cyber-cyan tracking-wider font-semibold uppercase">
                  Full-time Roles
                </span>
              </div>

              <div className="space-y-2">
                <h1 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-white leading-tight">
                  Hi, I'm{" "}
                  <span className="bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink bg-clip-text text-transparent text-neon-cyan">
                    {name}
                  </span>
                </h1>

                <h2 className="font-display font-semibold text-sm sm:text-base text-text-secondary tracking-wide">
                  {role}
                </h2>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
                  Building scalable web apps with React, Node.js, MongoDB & AWS.
                </p>
              </div>

              {/* Quick Contact Info */}
              <div className="space-y-2 text-xs text-text-secondary font-mono border-t border-white/5 pt-3">
                <div className="flex items-center gap-2">
                  <Mail className="w-3 h-3 text-cyber-cyan flex-shrink-0" />
                  <a href={`mailto:${email}`} className="hover:text-white transition-colors truncate">
                    {email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3 text-cyber-purple flex-shrink-0" />
                  <a href={`tel:${phone}`} className="hover:text-white transition-colors">
                    +91 {phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-cyber-lime flex-shrink-0" />
                  <span className="text-xs">{location}</span>
                </div>
              </div>
            </div>

            {/* CTA & Social Actions */}
            <div className="relative z-10 flex flex-col gap-2 pt-4 border-t border-white/5 mt-4">
              <button
                onClick={() => onNavClick("projects")}
                className="w-full px-4 py-2.5 bg-gradient-to-r from-cyber-cyan to-cyber-purple text-white font-display font-bold text-sm rounded-xl shadow-neon-cyan hover:shadow-neon-purple cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                View Projects
              </button>

              <button
                onClick={() => onNavClick("contact")}
                className="w-full px-4 py-2.5 bg-transparent border border-white/10 hover:border-cyber-cyan/50 text-white text-sm font-display font-semibold rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/5"
              >
                Contact Me
              </button>

              {/* Socials */}
              <div className="flex items-center gap-2 justify-center">
                <a
                  href={linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-lg bg-cyber-bg-secondary border border-white/5 hover:border-cyber-cyan/60 text-text-secondary hover:text-cyber-cyan transition-all duration-300 shadow-sm"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={gitHub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-lg bg-cyber-bg-secondary border border-white/5 hover:border-cyber-purple/60 text-text-secondary hover:text-cyber-purple transition-all duration-300 shadow-sm"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll down indicator */}
        <div className="w-full flex justify-center mt-16 md:mt-24">
          <button
            onClick={() => onNavClick("about")}
            className="flex flex-col items-center gap-2 cursor-pointer text-text-secondary hover:text-cyber-cyan transition-colors duration-300"
          >
            <span className="font-mono text-xs tracking-widest uppercase">Scroll Explore</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ArrowDown className="w-4 h-4 text-cyber-cyan" />
            </motion.div>
          </button>
        </div>
      </div>
    </section>
  );
}
