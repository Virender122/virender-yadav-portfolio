import { Trophy, Award, Sparkles, BookOpen } from "lucide-react";
import { motion } from "motion/react";
import { portfolioData } from "../data/portfolioData";

export default function Achievements() {
  const { achievements } = portfolioData;

  const icons = [
    <BookOpen className="w-6 h-6 text-cyber-cyan" />,
    <Trophy className="w-6 h-6 text-cyber-purple" />,
  ];

  const borderStyles = [
    "border-cyber-cyan/20 hover:border-cyber-cyan/80 hover:shadow-neon-cyan",
    "border-cyber-purple/20 hover:border-cyber-purple/80 hover:shadow-neon-purple",
  ];

  return (
    <section
      id="achievements"
      className="py-20 md:py-28 relative overflow-hidden bg-cyber-bg-primary"
    >
      {/* Background cyber grid decorative layer */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      {/* Glow Orbs */}
      <div className="absolute top-[20%] left-[-10%] w-[280px] h-[280px] rounded-full bg-cyber-cyan/10 blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[320px] h-[320px] rounded-full bg-cyber-purple/10 blur-[130px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 mb-3"
          >
            <span className="font-mono text-xs text-cyber-cyan tracking-widest font-semibold uppercase">
              06 // Honors & Accomplishments
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white"
          >
            Milestone{" "}
            <span className="bg-gradient-to-r from-cyber-cyan to-cyber-purple bg-clip-text text-transparent text-neon-cyan">
              Achievements
            </span>
          </motion.h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-purple mx-auto mt-4 rounded-full shadow-[0_0_8px_rgba(0,245,255,0.8)]" />
        </div>

        {/* Achievements layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -6 }}
              className={`bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 text-left transition-all duration-300 flex items-start gap-5 cursor-default ${borderStyles[index % borderStyles.length]} group shadow-lg`}
            >
              {/* Icon Container with glowing effects */}
              <div className="shrink-0 p-4 rounded-2xl bg-white/[0.03] group-hover:bg-white/[0.08] transition-colors duration-300 border border-white/10 flex items-center justify-center">
                {icons[index % icons.length]}
              </div>

              {/* Achievement Text */}
              <div className="space-y-2">
                <h3 className="font-display font-extrabold text-lg sm:text-xl text-white tracking-wide flex items-center gap-2">
                  {achievement.title}
                  <Sparkles className="w-4 h-4 text-cyber-lime opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed font-sans">
                  {achievement.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
