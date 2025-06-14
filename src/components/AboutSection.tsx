
import React, { useState } from 'react';
import { GraduationCap, Phone, Mail, MapPin, Hand } from "lucide-react";

const AboutSection: React.FC = () => {
  const [isFanned, setIsFanned] = useState(false);

  const handleCardDeckClick = () => {
    setIsFanned(!isFanned);
  };

  return (
    <section id="about" className="py-20 bg-slate-800/50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          About Me
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative animate-on-scroll">
            <div className="card-deck-container relative w-80 h-96 mx-auto cursor-pointer" style={{ perspective: "1000px" }}>
              {/* Click Hint */}
              <div className="click-hint absolute -top-8 left-1/2 transform -translate-x-1/2 text-cyan-400 text-sm font-medium opacity-80 animate-pulse pointer-events-none flex items-center gap-2">
                <Hand size={16} />
                {isFanned ? "Click to stack" : "Click to fan out"}
              </div>

              {/* Card Deck */}
              <div
                className={`card-deck relative w-full h-full transition-all duration-800 ${isFanned ? 'fanned' : ''}`}
                onClick={handleCardDeckClick}
                style={{ transformStyle: "preserve-3d" }}
              >
                {[
                  { src: "/lovable-uploads/e520c246-bc60-4e75-b5ad-34fffb5a33e7.png", alt: "Campus Life", title: "Web Development", desc: "Full-stack development with modern frameworks" },
                  { src: "/lovable-uploads/76822490-3e3e-46ef-9aae-d4d761886f89.png", alt: "Public Speaking", title: "Public Speaking", desc: "Keynote speaker at tech conferences" },
                  { src: "/lovable-uploads/2943a550-176d-46c3-84cd-4d06d8e012b6.png", alt: "Artistic Work", title: "Art & Design", desc: "Traditional and digital artwork" },
                  { src: "/lovable-uploads/31929818-d46d-4ca6-bd71-329542b1c94b.png", alt: "Yoga Performance", title: "Yoga", desc: "State-level medalist" },
                  { src: "/lovable-uploads/2498cefd-9439-4653-9af4-4cc284fecf0a.png", alt: "Adventure Spirit", title: "Extracurriculars", desc: "Various sports and activities" }
                ].map((card, index) => (
                  <div
                    key={index}
                    className={`card-item absolute w-full h-full rounded-2xl overflow-hidden shadow-2xl will-change-transform`}
                    style={{
                      transform: isFanned
                        ? index === 0 ? 'translateY(-160px) rotateZ(-12deg)'
                          : index === 1 ? 'translateY(-80px) rotateZ(-6deg)'
                          : index === 2 ? 'translateY(0) rotateZ(6deg)'
                          : index === 3 ? 'translateY(80px) rotateZ(12deg)'
                          : 'translateY(160px) rotateZ(18deg)'
                        : `translateY(${index * 8}px) rotateZ(${index % 2 === 0 ? -3 + index : 1 + index}deg)`,
                      zIndex: isFanned ? index + 1 : 5 - index,
                      transition: `all 0.8s cubic-bezier(0.5, 1.5, 0.5, 1) ${isFanned ? index * 1.2 : (4 - index) * 0.3}s`,
                      transformOrigin: 'bottom center'
                    }}
                  >
                    <img
                      src={card.src}
                      alt={card.alt}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="card-content absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-4 transform translate-y-full transition-transform duration-400 hover:translate-y-0">
                      <h3 className="text-white font-semibold mb-2">{card.title}</h3>
                      <p className="text-gray-300 text-sm">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6 animate-on-scroll">
            <h3 className="text-2xl font-semibold text-white">Developer, Artist, Speaker & Educator</h3>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Hi, I'm Pragyensh Pritiman Panda — a creator, developer, speaker, and educator with a passion for
                building things that make a difference.
              </p>
              <p>
                Currently pursuing my B.Tech in Computer Science at Amity University, Greater Noida, I thrive at the
                intersection of technology, creativity, and human connection. Whether I'm leading innovation at my
                college's tech community Fusion Tech, crafting intuitive web and app solutions, or painting life onto
                a blank canvas, my mission remains the same — to leave every space better than I found it.
              </p>
              <p>
                Beyond the screen, I've mentored over 250 students in Science and English, won national-level art
                awards, clinched state medals in yoga and athletics, and proudly held the title of Mr. AUGN and Head
                Boy at my previous institution. From hosting IEEE conferences to spearheading live projects like
                DineWise and Rentastic, I bring energy, empathy, and excellence into every role I take on.
              </p>
              <p>This portfolio is a window into the many hats I wear — and I'm just getting started.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                { icon: GraduationCap, text: "B.Tech CSE, Amity University" },
                { icon: Phone, text: "+91 XXXXX XXXXX" },
                { icon: Mail, text: "princepragyensh@gmail.com" },
                { icon: MapPin, text: "Greater Noida, India" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-300">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
