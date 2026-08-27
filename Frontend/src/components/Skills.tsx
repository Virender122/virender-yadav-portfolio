import { motion } from "motion/react";
import { Cpu, Server, Database, Cloud, Star } from "lucide-react";
import { ReactNode } from "react";
import { portfolioData, Skill } from "../data/portfolioData";

export default function Skills() {
  const { skills } = portfolioData;

  // Group skills by category
  const categories: { [key: string]: Skill[] } = {
    Frontend: skills.filter((s) => s.category === "Frontend"),
    Backend: skills.filter((s) => s.category === "Backend"),
    Database: skills.filter((s) => s.category === "Database"),
    "Cloud & Tools": skills.filter((s) => s.category === "Cloud & Tools"),
  };

  // Assign distinct theme styling for each category
  const categoryMeta: {
    [key: string]: {
      label: string;
      color: string;
      glow: string;
      icon: ReactNode;
      borderClass: string;
    };
  } = {
    Frontend: {
      label: "Client Layer",
      color: "text-cyber-cyan",
      glow: "hover:shadow-neon-cyan hover:border-cyber-cyan/80",
      borderClass: "border-cyber-cyan/15",
      icon: <Cpu className="w-5 h-5 text-cyber-cyan" />,
    },
    Backend: {
      label: "Logic Layer",
      color: "text-cyber-purple",
      glow: "hover:shadow-neon-purple hover:border-cyber-purple/80",
      borderClass: "border-cyber-purple/15",
      icon: <Server className="w-5 h-5 text-cyber-purple" />,
    },
    Database: {
      label: "Storage Layer",
      color: "text-cyber-lime",
      glow: "hover:shadow-neon-lime hover:border-cyber-lime/80",
      borderClass: "border-cyber-lime/15",
      icon: <Database className="w-5 h-5 text-cyber-lime" />,
    },
    "Cloud & Tools": {
      label: "Deployment & Collab",
      color: "text-cyber-pink",
      glow: "hover:shadow-[0_0_15px_rgba(255,0,127,0.3)] hover:border-cyber-pink/80",
      borderClass: "border-cyber-pink/15",
      icon: <Cloud className="w-5 h-5 text-cyber-pink" />,
    },
  };

  // Helper function to render technology-specific colored inline SVGs for accuracy and clean branding
  const renderSkillIcon = (iconName: string, category: string) => {
    switch (iconName) {
      case "react":
        return (
          <svg className="w-4 h-4 text-cyber-cyan animate-spin-slow" viewBox="0 0 100 100" fill="currentColor">
            <ellipse cx="50" cy="50" rx="10" ry="24" transform="rotate(30, 50, 50)" fill="none" stroke="currentColor" strokeWidth="6" />
            <ellipse cx="50" cy="50" rx="10" ry="24" transform="rotate(90, 50, 50)" fill="none" stroke="currentColor" strokeWidth="6" />
            <ellipse cx="50" cy="50" rx="10" ry="24" transform="rotate(150, 50, 50)" fill="none" stroke="currentColor" strokeWidth="6" />
            <circle cx="50" cy="50" r="6" fill="currentColor" />
          </svg>
        );
      case "nextjs":
        return (
          <svg className="w-4 h-4 text-white" viewBox="0 0 256 256" fill="currentColor">
            <path d="M128 0a128 128 0 10128 128A128 128 0 00128 0zm51 184l-49-65v65h-16V92h14l46 62V92h15v92z" />
          </svg>
        );
      case "typescript":
        return (
          <span className="w-4 h-4 text-[10px] font-black bg-blue-500 text-white rounded px-0.5 flex items-center justify-center font-mono">
            TS
          </span>
        );
      case "javascript":
        return (
          <span className="w-4 h-4 text-[10px] font-black bg-yellow-400 text-black rounded px-0.5 flex items-center justify-center font-mono">
            JS
          </span>
        );
      case "nodejs":
        return (
          <svg className="w-4 h-4 text-emerald-500" viewBox="0 0 256 256" fill="currentColor">
            <path d="M128 14l99 57v114l-99 57-99-57V71zm0 21l-81 47v94l81 47 81-47v-94z" />
          </svg>
        );
      case "mongodb":
        return (
          <svg className="w-4 h-4 text-green-500" viewBox="0 0 256 256" fill="currentColor">
            <path d="M128 12c-4 0-14 30-14 62s5 70 14 114c9-44 14-82 14-114s-10-62-14-62zm0 188c-10 0-25-15-25-45 0-38 25-55 25-55s25 17 25 55c0 30-15 45-25 45z" />
          </svg>
        );
      case "mysql":
        return (
          <svg className="w-4 h-4 text-sky-500" viewBox="0 0 256 256" fill="currentColor">
            <path d="M128 20c-54 0-98 16-98 36s44 36 98 36 98-16 98-36-44-36-98-36zm0 112c-54 0-98-16-98-36v36c0 20 44 36 98 36s98-16 98-36v-36c0 20-44 36-98 36zm0 48c-54 0-98-16-98-36v36c0 20 44 36 98 36s98-16 98-36v-36c0 20-44 36-98 36z" />
          </svg>
        );
      case "aws":
      case "aws-s3":
        return (
          <svg className="w-4 h-4 text-amber-500" viewBox="0 0 256 256" fill="currentColor">
            <path d="M141 120a160 160 0 00-24-11c-14-5-29-10-29-21 0-11 11-18 24-18s24 9 26 21h17c-2-21-18-36-43-36S68 71 68 90c0 26 21 34 40 40a174 174 0 0127 11c14 6 22 13 22 23 0 13-13 21-28 21s-28-11-30-24H82c2 23 20 39 47 39s45-16 45-37c0-23-17-33-33-38z" />
          </svg>
        );
      default:
        // Render dynamic tiny generic glowing star or bullet
        return <Star className={`w-3.5 h-3.5 ${category === "Frontend" ? "text-cyber-cyan" : category === "Backend" ? "text-cyber-purple" : "text-cyber-lime"}`} />;
    }
  };

  return (
    <section
      id="skills"
      className="py-20 md:py-28 relative overflow-hidden bg-cyber-bg-primary"
    >
      {/* Decorative cyber grid */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      
      {/* Glowing boundary circles */}
      <div className="absolute top-[20%] left-[-10%] w-[320px] h-[320px] rounded-full bg-cyber-cyan/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[320px] h-[320px] rounded-full bg-cyber-purple/10 blur-[130px] pointer-events-none" />

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
              02 // Technical Weaponry
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white"
          >
            My{" "}
            <span className="bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-lime bg-clip-text text-transparent text-neon-cyan">
              Technical Stack & Tools
            </span>
          </motion.h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-lime mx-auto mt-4 rounded-full shadow-[0_0_8px_rgba(0,245,255,0.8)]" />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {Object.keys(categories).map((categoryKey, catIndex) => {
            const meta = categoryMeta[categoryKey];
            const list = categories[categoryKey];

            return (
              <motion.div
                key={categoryKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: catIndex * 0.1 }}
                className={`bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 transition-all duration-300 ${meta.glow} group flex flex-col justify-between shadow-xl`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-2xl bg-white/[0.03] group-hover:bg-white/[0.08] transition-colors duration-300">
                        {meta.icon}
                      </div>
                      <div className="text-left">
                        <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                          {categoryKey}
                        </h3>
                        <span className="font-mono text-[10px] text-text-secondary/70 uppercase tracking-widest">
                          {meta.label}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-text-secondary">
                      {list.length} Items
                    </span>
                  </div>

                  {/* Skill badges container */}
                  <div className="flex flex-wrap gap-2.5">
                    {list.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-cyber-bg-primary/50 border border-white/10 hover:border-white/30 text-white cursor-default transition-all duration-200 shadow-sm"
                      >
                        <div className="flex items-center justify-center">
                          {renderSkillIcon(skill.icon, skill.category)}
                        </div>
                        <span className="font-mono text-xs sm:text-sm tracking-wide font-medium">
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
