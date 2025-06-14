
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, Code, Mic, GraduationCap, Palette, Star, ClapperboardIcon as ChalkboardTeacher } from "lucide-react";

const ExperienceSection: React.FC = () => {
  const experiences = [
    {
      date: "2025 - Present",
      title: "Student Ambassador @ Unstop",
      description: "Representing the platform at my university, promoting competitions and opportunities to fellow students while building a strong tech community.",
      icon: Users,
    },
    {
      date: "2024 - Present",
      title: "DineWise Project Lead & Founder",
      description: "Developed and leading a smart mess management system for college campuses to reduce food waste and optimize meal planning.",
      icon: Award,
    },
    {
      date: "2024 - Present",
      title: "R&D Team Member @ Fusion Tech Club",
      description: "Working as a research and development team member with fellow students, contributing to innovative tech solutions and club initiatives.",
      icon: Code,
    },
    {
      date: "2024 - Present",
      title: "Event Host & Public Speaker",
      description: "Hosting major college events like Codathon and Robothon, speaking at college functions, and organizing IEEE conferences with 200+ attendees.",
      icon: Mic,
    },
    {
      date: "2024",
      title: "Intern @ Udayan Care NGO",
      description: "Contributed to educational initiatives focusing on underprivileged girls' education and empowerment programs.",
      icon: GraduationCap,
    },
    {
      date: "2023 - 2024",
      title: "Art & Crafts Volunteer",
      description: "Participated in student-organized events creating meaningful art and craft projects for children in the community.",
      icon: Palette,
    },
    {
      date: "2023",
      title: "Mr. Fresher 2023 @ AUGN",
      description: "Won the prestigious Mr. Fresher title after participating in multiple competitions including Codathon, Ideathon, Debate, and Yoga.",
      icon: Star,
    },
    {
      date: "2020 - 2023",
      title: "Private Tutor (250+ students)",
      description: "Taught Science and English to school students during my 12th grade years with proven track record of improved academic performance.",
      icon: ChalkboardTeacher,
    },
  ];

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          My Journey
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </h2>

        <div className="max-w-7xl mx-auto relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-cyan-400 hidden md:block"></div>

          {experiences.map((item, index) => (
            <div
              key={index}
              className={`relative flex items-start mb-16 animate-on-scroll ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/10">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-cyan-400 mt-1">
                        <item.icon size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="text-cyan-400 font-semibold mb-2">{item.date}</div>
                        <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                        <p className="text-gray-300 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Special image for the Private Tutor card (index 7) */}
              {index === 7 && (
                <div className="hidden md:block w-full md:w-5/12 pr-0">
                  <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/10 -ml-10 mr-24">
                    <img
                      src="/lovable-uploads/3b282720-ad93-4104-b303-fdf2ec44accb.png"
                      alt="Teaching and Education"
                      className="w-full h-full object-cover"
                      style={{ height: "200px" }}
                    />
                  </div>
                </div>
              )}

              <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-400 rounded-full border-4 border-slate-900 z-10"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
