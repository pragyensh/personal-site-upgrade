
import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

interface FooterProps {
  showBackToTop: boolean;
  scrollToTop: () => void;
}

const Footer: React.FC<FooterProps> = ({ showBackToTop, scrollToTop }) => {
  return (
    <>
      <footer className="py-8 bg-slate-900 border-t border-slate-700">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex space-x-6">
              {[
                { icon: Github, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Mail, href: "mailto:princepragyensh@gmail.com" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:bg-slate-700 transition-all duration-300 hover:scale-110"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
            <p className="text-gray-400 text-center">
              © {new Date().getFullYear()} Pragyensh Pritiman Panda. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-cyan-400 text-slate-900 rounded-full flex items-center justify-center shadow-lg hover:bg-cyan-500 transition-all duration-300 hover:scale-110 z-50"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </>
  );
};

export default Footer;
