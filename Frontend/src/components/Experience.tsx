import { Calendar, MapPin, Briefcase, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { portfolioData } from "../data/portfolioData";

export default function Experience() {
  const { experience } = portfolioData;

  return (
    <section
      id="experience"
      className="py-20 md:py-28 relative overflow-hidden bg-cyber-bg-secondary"
    >
      {/* Background Decorative grids */}
      <div className="absolute inset-0 cyber-grid-purple opacity-20 pointer-events-none" />

      {/* Glow Orbs */}
      <div className="absolute top-[30%] left-[-10%] w-[350px] h-[350px] rounded-full bg-cyber-purple/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[300px] h-[300px] rounded-full bg-cyber-cyan/10 blur-[120px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        
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
              03 // History of Impact
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white"
          >
            Professional{" "}
            <span className="bg-gradient-to-r from-cyber-cyan to-cyber-purple bg-clip-text text-transparent text-neon-cyan">
              Experience
            </span>
          </motion.h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-purple mx-auto mt-4 rounded-full shadow-[0_0_8px_rgba(0,245,255,0.8)]" />
        </div>

        {/* Vertical Timeline container */}
        <div className="relative border-l-2 border-dashed border-white/10 md:border-l-0 md:flex md:flex-col md:items-center pl-6 md:pl-0 space-y-12 md:space-y-16">
          
          {/* Central Line for desktop layout only */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyber-cyan via-cyber-purple to-cyber-pink shadow-[0_0_8px_rgba(0,245,255,0.4)] transform -translate-x-1/2 pointer-events-none" />

          {experience.map((exp, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                className="relative w-full md:flex md:justify-between md:items-center"
              >
                {/* Timeline node marker */}
                {/* Mobile version position */}
                <div className="absolute -left-[33px] md:left-1/2 top-1.5 md:top-1/2 w-4 h-4 md:w-6 md:h-6 rounded-full bg-cyber-bg-primary border-2 border-cyber-cyan shadow-neon-cyan transform md:-translate-x-1/2 md:-translate-y-1/2 z-20 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyber-cyan animate-pulse" />
                </div>

                {/* Left block: spacer on desktop if card is on the right, or content card itself */}
                <div className={`w-full md:w-[45%] text-left ${isEven ? "md:order-1" : "md:order-2 md:text-right"}`}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 hover:border-cyber-cyan/50 hover:shadow-neon-cyan transition-all duration-300 relative group`}
                  >
                    {/* Glowing highlight ribbon */}
                    <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-cyber-cyan to-cyber-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-3xl" />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                      <div className="text-left">
                        <h3 className="font-display font-extrabold text-xl text-white tracking-wide">
                          {exp.role}
                        </h3>
                        <p className="font-display font-semibold text-sm text-cyber-cyan tracking-wider flex items-center gap-1.5 mt-0.5">
                          <Briefcase className="w-3.5 h-3.5 text-cyber-cyan" />
                          {exp.company}
                        </p>
                      </div>
                      
                      <div className="flex flex-col sm:items-end text-left sm:text-right font-mono text-xs text-text-secondary gap-1">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/5">
                          <Calendar className="w-3 h-3 text-cyber-purple" />
                          {exp.duration}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/5 w-fit">
                          <MapPin className="w-3 h-3 text-cyber-lime" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-2.5 text-text-secondary text-sm leading-relaxed text-left font-sans">
                      {exp.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <ChevronRight className="w-4 h-4 text-cyber-cyan shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                {/* Desktop Spacer block on the other side */}
                <div className={`hidden md:block w-[45%] ${isEven ? "md:order-2" : "md:order-1"}`} />

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
