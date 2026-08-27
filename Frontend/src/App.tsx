import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  // Smooth scroll helper matching header offsets
  const scrollToSection = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      const headerOffset = 5; // height of navbar
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
    }
  };

  // Scroll spy to highlight current section in navigation bar
  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = ["home", "about", "skills", "experience", "projects", "education", "contact"];
      const scrollPosition = window.scrollY + 120; // safe spy offset

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  return (
    <div className="relative min-h-screen bg-cyber-bg-primary text-white selection:bg-cyber-cyan/30 selection:text-white">
      {/* Absolute Decorative Grid Background behind the whole viewport */}
      <div className="fixed inset-0 cyber-grid opacity-[0.08] pointer-events-none z-0" />

      {/* Primary Fixed Navigation header */}
      <Navbar activeSection={activeSection} onNavClick={scrollToSection} />

      {/* Scrolling Portfolio Body sections */}
      <main className="relative z-10 w-full overflow-hidden">
        <Hero onNavClick={scrollToSection} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Achievements />
        <Contact />
        <Chatbot />
      </main>

      {/* Global signature footer footer */}
      <Footer onNavClick={scrollToSection} />
    </div>
  );
}
