
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Code, Palette, Megaphone, ClapperboardIcon as ChalkboardTeacher } from "lucide-react";

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: Code,
      title: "Website/App Development",
      description: "Custom digital solutions tailored to your needs, built with modern technologies and best practices.",
    },
    {
      icon: Palette,
      title: "Self-Portrait Commissions",
      description: "Hand-drawn personalized portraits that capture personality and emotion in unique artistic style.",
    },
    {
      icon: Megaphone,
      title: "Influencer Collaborations",
      description: "Brand promotions and partnerships leveraging my audience and public speaking platforms.",
    },
    {
      icon: ChalkboardTeacher,
      title: "Online Tutoring",
      description: "Personalized Science and English lessons for school students with proven results.",
    },
  ];

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          My Services
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-slate-800/50 border-slate-700 p-6 text-center group hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/10 animate-on-scroll"
            >
              <CardContent className="p-0">
                <div className="text-cyan-400 mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  <service.icon size={48} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{service.title}</h3>
                <p className="text-gray-300 leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
