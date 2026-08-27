import { Calendar, Layers, ShieldCheck, Zap } from "lucide-react";
import { motion } from "motion/react";
import { portfolioData } from "../data/portfolioData";

export default function About() {
  const { summary, highlights } = portfolioData;

  // Icons matching the highlights
  const highlightIcons = [
    <Calendar className="w-6 h-6 text-cyber-cyan" />,
    <Layers className="w-6 h-6 text-cyber-purple" />,
    <ShieldCheck className="w-6 h-6 text-cyber-lime" />,
  ];

  return (
    <section
      id="about"
      className="py-20 md:py-28 relative overflow-hidden bg-cyber-bg-secondary"
    >
      {/* Decorative grids */}
      <div className="absolute inset-0 cyber-grid-purple opacity-20 pointer-events-none" />
      
      {/* Background glow orbs */}
      <div className="absolute top-[40%] right-[-10%] w-[350px] h-[350px] rounded-full bg-cyber-purple/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[300px] h-[300px] rounded-full bg-cyber-cyan/10 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full bg-cyber-purple/10 border border-cyber-purple/30 mb-3"
          >
            <span className="font-mono text-xs text-cyber-purple tracking-widest font-semibold uppercase">
              01 // Profile Summary
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white"
          >
            About{" "}
            <span className="bg-gradient-to-r from-cyber-cyan to-cyber-purple bg-clip-text text-transparent text-neon-cyan">
              My Professional Journey
            </span>
          </motion.h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-purple mx-auto mt-4 rounded-full shadow-[0_0_8px_rgba(0,245,255,0.8)]" />
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Glassmorphism Card with Summary text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex"
          >
            <div className="relative w-full bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl overflow-hidden group flex flex-col justify-between">
              {/* Highlight gradient borders */}
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-cyber-cyan to-cyber-purple" />
              
              <div className="absolute right-0 top-0 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-300 pointer-events-none">
                <Zap className="w-64 h-64 text-cyber-cyan" />
              </div>

              <div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-cyber-cyan rounded-full inline-block" />
                  Who I Am
                </h3>
                
                <p className="text-text-secondary leading-relaxed font-sans text-base sm:text-lg mb-6">
                  {summary}
                </p>
                
                <p className="text-text-secondary leading-relaxed font-sans text-sm sm:text-base">
                  Throughout my 1.7 years as a full stack engineer, my focus has been on designing highly efficient APIs, building pixel-perfect frontends, and launching production-ready systems on reliable platforms. I thrive in collaborative team environments and actively build code that drives client success.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3 Metric Highlight Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4 w-full justify-between">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-3xl bg-white/5 border flex items-center gap-5 cursor-default transition-all duration-300 flex-1 ${
                  index === 0
                    ? "border-cyber-cyan/20 hover:border-cyber-cyan/60 hover:shadow-neon-cyan"
                    : index === 1
                    ? "border-cyber-purple/20 hover:border-cyber-purple/60 hover:shadow-neon-purple"
                    : "border-cyber-lime/20 hover:border-cyber-lime/60 hover:shadow-neon-lime"
                }`}
              >
                <div className={`p-4 rounded-2xl flex items-center justify-center ${
                  index === 0
                    ? "bg-cyber-cyan/10"
                    : index === 1
                    ? "bg-cyber-purple/10"
                    : "bg-cyber-lime/10"
                }`}>
                  {highlightIcons[index]}
                </div>

                <div className="text-left">
                  <div className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                    {highlight.value}
                  </div>
                  <div className="font-mono text-xs sm:text-sm text-text-secondary uppercase tracking-widest mt-1">
                    {highlight.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
