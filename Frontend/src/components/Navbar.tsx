import { useState, useEffect } from "react";
import { Menu, X, Terminal, Code, Download } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import resumePDF from "../data/virender-yadav-resume.pdf";

interface NavbarProps {
  activeSection: string;
  onNavClick: (section: string) => void;
}

const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Education", id: "education" },
  { label: "Contact", id: "contact" },
];

export default function Navbar({ activeSection, onNavClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleItemClick = (id: string) => {
    setIsOpen(false);
    onNavClick(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cyber-bg-primary/90 border-b border-cyber-cyan/30 backdrop-blur-md shadow-[0_4px_30px_rgba(0,245,255,0.05)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Brand */}
          <div 
            onClick={() => handleItemClick("home")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-cyber-bg-secondary border border-cyber-cyan/50 shadow-neon-cyan overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyber-cyan/20 to-cyber-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Code className="w-5 h-5 text-cyber-cyan group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="font-display font-bold text-lg sm:text-xl tracking-wider text-white">
              VIRENDER<span className="text-cyber-cyan group-hover:text-cyber-purple transition-colors duration-300">.Y</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`relative px-4 py-2 font-display text-sm tracking-wide font-medium transition-all duration-300 rounded-md cursor-pointer ${
                    isActive
                      ? "text-cyber-cyan text-neon-cyan"
                      : "text-text-secondary hover:text-white"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-cyber-cyan to-cyber-purple shadow-[0_0_8px_rgba(0,245,255,0.8)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Call to Action & Availability Indicator */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-lime opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-lime shadow-[0_0_8px_#39FF14]"></span>
              </span>
              <span className="text-[10px] text-cyber-lime font-mono uppercase tracking-widest">Available for Hire</span>
            </div>

            <a
              href={resumePDF}
              download="Virender-Yadav-Resume.pdf"
              className="relative group px-5 py-2 font-display text-sm font-bold tracking-wide text-white bg-transparent border border-cyber-cyan rounded-lg overflow-hidden cursor-pointer shadow-[0_0_10px_rgba(0,245,255,0.2)] transition-all duration-300 hover:border-cyber-lime hover:shadow-neon-cyan"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyber-cyan to-cyber-lime opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <span className="relative flex items-center gap-1">
                Resume
                <Download className="w-4 h-4 text-cyber-cyan group-hover:translate-y-1 transition-transform duration-300" />
              </span>
            </a>

            <button
              onClick={() => handleItemClick("contact")}
              className="relative group px-5 py-2 font-display text-sm font-bold tracking-wide text-white bg-transparent border border-cyber-purple rounded-lg overflow-hidden cursor-pointer shadow-[0_0_10px_rgba(157,78,221,0.2)] transition-all duration-300 hover:border-cyber-cyan hover:shadow-neon-cyan"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyber-purple to-cyber-cyan opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <span className="relative flex items-center gap-1">
                Hire Me
                <Terminal className="w-4 h-4 text-cyber-cyan group-hover:rotate-12 transition-transform duration-300" />
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-text-secondary hover:text-white focus:outline-none focus:ring-1 focus:ring-cyber-cyan/50 cursor-pointer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-cyber-cyan/20 bg-cyber-bg-primary/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`block w-full text-left px-4 py-3 rounded-lg font-display text-base font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-cyber-cyan/10 text-cyber-cyan border-l-4 border-cyber-cyan pl-3"
                        : "text-text-secondary hover:bg-cyber-bg-secondary hover:text-white pl-4"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <div className="pt-4 px-4 space-y-2">
                <a
                  href={resumePDF}
                  download="Virender-Yadav-Resume.pdf"
                  className="w-full py-3 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyber-cyan to-cyber-lime font-display font-bold text-black text-center cursor-pointer shadow-neon-cyan hover:scale-[1.02] transition-transform duration-200"
                >
                  <Download className="w-5 h-5" />
                  Download Resume
                </a>
                <button
                  onClick={() => handleItemClick("contact")}
                  className="w-full py-3 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyber-purple to-cyber-cyan font-display font-bold text-white text-center cursor-pointer shadow-neon-purple hover:scale-[1.02] transition-transform duration-200"
                >
                  <Terminal className="w-5 h-5" />
                  Hire Me
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
