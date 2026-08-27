import { ExternalLink, Github, Layers, Code, Play } from "lucide-react";
import { motion } from "motion/react";
import { portfolioData, Project } from "../data/portfolioData";

export default function Projects() {
  const { projects } = portfolioData;

  // Custom theme mappings for projects to make them distinct
  const projectGradients = [
    "from-cyber-cyan to-cyber-purple",
    "from-cyber-purple to-cyber-pink",
    "from-cyber-cyan to-cyber-lime",
  ];

  const projectShadows = [
    "hover:shadow-neon-cyan hover:border-cyber-cyan/50",
    "hover:shadow-neon-purple hover:border-cyber-purple/50",
    "hover:shadow-neon-lime hover:border-cyber-lime/50",
  ];

  const projectAccents = [
    "text-cyber-cyan",
    "text-cyber-purple",
    "text-cyber-lime",
  ];

  return (
    <section
      id="projects"
      className="py-20 md:py-28 relative overflow-hidden bg-cyber-bg-primary"
    >
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      <div className="absolute top-[40%] right-[-10%] w-[350px] h-[350px] rounded-full bg-cyber-cyan/10 blur-[130px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[20%] left-[-10%] w-[300px] h-[300px] rounded-full bg-cyber-purple/10 blur-[120px] pointer-events-none animate-pulse-slow" style={{ animationDelay: "1.5s" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        
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
              04 // Showcase
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white"
          >
            Featured{" "}
            <span className="bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-lime bg-clip-text text-transparent text-neon-cyan">
              Engineering Projects
            </span>
          </motion.h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-lime mx-auto mt-4 rounded-full shadow-[0_0_8px_rgba(0,245,255,0.8)]" />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {projects.map((project, index) => {
            const gradient = projectGradients[index % projectGradients.length];
            const hoverShadow = projectShadows[index % projectShadows.length];
            const accentText = projectAccents[index % projectAccents.length];

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-white/5 border border-white/10 rounded-3xl flex flex-col justify-between overflow-hidden group transition-all duration-300 ${hoverShadow} shadow-lg`}
              >
                {/* Visual Header / Tech Accent Bar */}
                <div className={`h-2 bg-gradient-to-r ${gradient} w-full`} />

                {/* Card Content */}
                <div className="p-6 sm:p-8 flex-grow text-left flex flex-col justify-between">
                  <div>
                    {/* Folder/Card Icon & Title */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="p-2.5 rounded-2xl bg-white/[0.03] border border-white/10 text-text-secondary group-hover:text-white transition-colors duration-200">
                        <Layers className={`w-5 h-5 ${accentText}`} />
                      </div>
                      
                      {/* Interactive mock numbers */}
                      <span className="font-mono text-xs text-text-secondary/60">
                        PROJECT // 0{index + 1}
                      </span>
                    </div>

                    <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white mb-3 group-hover:text-cyber-cyan transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-text-secondary text-sm leading-relaxed mb-6 font-sans">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack pill tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] sm:text-xs text-white/90 bg-white/[0.04] border border-white/10 px-2.5 py-1.5 rounded-xl"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Footer */}
                {/* <div className="px-6 py-4 border-t border-white/10 bg-cyber-bg-secondary/40 flex items-center justify-between">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="flex items-center gap-2 text-xs font-mono font-medium text-text-secondary hover:text-white transition-colors duration-200"
                  >
                    <Github className="w-4 h-4" />
                    Source Code
                  </a>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyber-cyan hover:text-neon-cyan transition-colors duration-200"
                  >
                    Live Demo
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div> */}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
