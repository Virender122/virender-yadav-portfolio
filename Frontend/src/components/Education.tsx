import { BookOpen, Calendar, MapPin, Award, GraduationCap } from "lucide-react";
import { motion } from "motion/react";
import { portfolioData } from "../data/portfolioData";

export default function Education() {
  const { education } = portfolioData;

  return (
    <section
      id="education"
      className="py-20 md:py-28 relative overflow-hidden bg-cyber-bg-secondary"
    >
      {/* Decorative cyber grid background */}
      <div className="absolute inset-0 cyber-grid-purple opacity-20 pointer-events-none" />

      {/* Radial blur ambient lights */}
      <div className="absolute top-[30%] right-[-10%] w-[320px] h-[320px] rounded-full bg-cyber-purple/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[280px] h-[280px] rounded-full bg-cyber-cyan/10 blur-[110px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full bg-cyber-purple/10 border border-cyber-purple/30 mb-3"
          >
            <span className="font-mono text-xs text-cyber-purple tracking-widest font-semibold uppercase">
              05 // Academic Foundations
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white"
          >
            Education &{" "}
            <span className="bg-gradient-to-r from-cyber-cyan to-cyber-purple bg-clip-text text-transparent text-neon-cyan">
              Qualifications
            </span>
          </motion.h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-purple mx-auto mt-4 rounded-full shadow-[0_0_8px_rgba(0,245,255,0.8)]" />
        </div>

        {/* Education Card Grid */}
        <div className="flex flex-col gap-6 items-center">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-3xl relative"
            >
              {/* Card glowing borders */}
              <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-cyber-cyan/30 to-cyber-purple/30 opacity-60 pointer-events-none" />

              <div className="relative bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-tr from-cyber-cyan/10 to-cyber-purple/10 rounded-full blur-2xl pointer-events-none" />

                {/* Left vertical timeline/accent bar */}
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-cyber-cyan to-cyber-purple" />

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
                  {/* Left Column: Title, College, Location */}
                  <div className="text-left space-y-4">
                    <div className="p-3 bg-cyber-cyan/10 rounded-2xl w-fit flex items-center justify-center border border-cyber-cyan/20">
                      <GraduationCap className="w-7 h-7 text-cyber-cyan" />
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-wide">
                        {edu.degree}
                      </h3>
                      <p className="font-display font-bold text-base text-text-secondary/90">
                        {edu.college}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3.5 text-xs text-text-secondary font-mono pt-1">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10">
                        <MapPin className="w-3.5 h-3.5 text-cyber-purple" />
                        {edu.location}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10">
                        <Calendar className="w-3.5 h-3.5 text-cyber-lime" />
                        {edu.duration}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Performance Badge */}
                  <div className="shrink-0 flex md:flex-col items-center justify-between md:justify-center p-4 sm:p-5 rounded-3xl bg-cyber-bg-primary/60 border border-white/10 md:w-44 text-left md:text-center gap-4">
                    <div className="p-2.5 rounded-xl bg-cyber-lime/10 border border-cyber-lime/20 flex items-center justify-center">
                      <Award className="w-6 h-6 text-cyber-lime shadow-sm" />
                    </div>
                    <div>
                      <div className="font-display font-black text-2xl sm:text-3xl text-cyber-lime tracking-tight text-neon-lime">
                        {edu.score}
                      </div>
                      <div className="font-mono text-[10px] text-text-secondary uppercase tracking-widest mt-0.5">
                        Academic Score
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
