
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface HeroSectionProps {
  typingText: string;
  scrollToSection: (sectionId: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ typingText, scrollToSection }) => {
  const nameRef = useRef<HTMLDivElement>(null);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-slate-900 to-cyan-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(192,36,177,0.15)_0%,rgba(18,18,18,1)_70%)]"></div>

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center z-10 relative">
        {/* Left Content */}
        <div className="space-y-6 relative">
          <h3 className="text-xl font-medium text-gray-300 animate-fade-in">Hi, I'm</h3>

          {/* Name Container */}
          <div
            ref={nameRef}
            className="quick-name-container relative h-40 md:h-48 overflow-visible cursor-pointer"
            style={{ perspective: "1000px" }}
          >
            <div className="name-part pragyensh font-black text-4xl md:text-5xl lg:text-6xl leading-none mb-2 text-white">
              Pragyensh
            </div>
            <div className="name-part pritiman font-black text-3xl md:text-4xl lg:text-5xl leading-none mb-2 text-white">
              Pritiman
            </div>
            <div className="name-part panda font-black text-3xl md:text-4xl lg:text-5xl leading-none text-white">
              Panda
            </div>
          </div>

          <h3 className="text-2xl font-semibold animate-fade-in relative z-20">
            And I'm a <span className="text-cyan-400 font-bold">{typingText}</span>
            <span className="animate-pulse">|</span>
          </h3>
          <p className="text-lg text-gray-300 leading-relaxed animate-fade-in relative z-20">
            Creating impact through code, creativity, and connection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in relative z-20">
            <Button
              onClick={() => scrollToSection("projects")}
              className="bg-cyan-400 hover:bg-cyan-500 text-slate-900 font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/25"
            >
              Explore My Work
            </Button>
            <Button
              onClick={() => scrollToSection("contact")}
              variant="outline"
              className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
            >
              Hire Me
            </Button>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative flex justify-center">
          <div className="relative w-80 h-96" style={{ marginLeft: '-2.5cm', marginRight: '6cm' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl blur-xl opacity-30"></div>
            <img
              src="/lovable-uploads/904a4e3a-3724-4efc-a50d-1ccad06a4bd8.png"
              alt="Pragyensh Pritiman Panda"
              className="relative z-10 w-full h-full object-cover rounded-2xl shadow-2xl animate-fade-in"
            />
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-cyan-400 transition-colors animate-bounce"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};

export default HeroSection;
