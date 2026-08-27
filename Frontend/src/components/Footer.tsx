import { ArrowUp, Terminal, Shield, Code2 } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

interface FooterProps {
  onNavClick: (section: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  const { name, role } = portfolioData;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-cyber-bg-primary border-t border-white/5 py-10 overflow-hidden">
      {/* Subtle bottom grid overlay */}
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand identity signature */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyber-bg-secondary border border-cyber-cyan/30 text-cyber-cyan shadow-sm">
            <Code2 className="w-4 h-4" />
          </div>
          <div className="text-left">
            <span className="font-display font-black text-sm tracking-widest text-white uppercase">
              {name}
            </span>
            <span className="block font-mono text-[9px] text-text-secondary/70">
              {role}
            </span>
          </div>
        </div>

        {/* Dynamic legal & technical indices */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs text-text-secondary/60 font-mono">
          <span>&copy; {currentYear} // ALL RIGHTS RESERVED</span>
          <span className="hidden sm:inline text-white/15">•</span>
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-cyber-purple" />
            SECURED TRANSIT
          </span>
          <span className="hidden sm:inline text-white/15">•</span>
          <span className="flex items-center gap-1">
            HOSTED VIA <span className="text-cyber-cyan">AWS EC2</span>
          </span>
        </div>

        {/* Action: Scroll back to top */}
        <button
          onClick={() => onNavClick("home")}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/[0.02] hover:bg-cyber-cyan/10 border border-white/5 hover:border-cyber-cyan/30 text-text-secondary hover:text-cyber-cyan transition-all duration-300 group cursor-pointer text-xs font-mono"
        >
          <span>BACK TO ROOT</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform duration-300" />
        </button>

      </div>
    </footer>
  );
}
