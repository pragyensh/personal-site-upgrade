import React, { useRef, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, Linkedin, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";

const ContactSection: React.FC = () => {
  const [formStatus, setFormStatus] = useState({ message: "", isSuccess: false, isVisible: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contactFormRef = useRef<HTMLFormElement>(null);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contactFormRef.current) return;

    setIsSubmitting(true);
    setFormStatus({ message: "", isSuccess: false, isVisible: false });

    try {
      const formData = new FormData(contactFormRef.current);
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const subject = formData.get("subject") as string;
      const message = formData.get("message") as string;

      // Validation (kept your existing checks)
      if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
        throw new Error("Please fill in all required fields.");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Please enter a valid email address.");
      }

      // FormSubmit will handle the actual email sending
      // We'll show success immediately since FormSubmit handles the backend
      setFormStatus({
        message: "🎉 Thank you! Your message has been sent successfully.",
        isSuccess: true,
        isVisible: true,
      });

      contactFormRef.current.reset();
      
      setTimeout(() => {
        setFormStatus((prev) => ({ ...prev, isVisible: false }));
      }, 10000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong. Please try again.";
      setFormStatus({
        message: errorMessage,
        isSuccess: false,
        isVisible: true,
      });
      setTimeout(() => {
        setFormStatus((prev) => ({ ...prev, isVisible: false }));
      }, 8000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-800/50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Get In Touch
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Let's Build Something Meaningful Together</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Feel free to reach out for collaborations or just to say hello!
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  title: "Email",
                  value: "princepragyensh@gmail.com",
                  href: "mailto:princepragyensh@gmail.com",
                },
                { icon: Phone, title: "Phone", value: "+91 XXXXX XXXXX", href: "tel:+91XXXXXXXXXX" },
                {
                  icon: Linkedin,
                  title: "LinkedIn",
                  value: "linkedin.com/in/pragyensh",
                  href: "https://linkedin.com/in/pragyensh",
                },
              ].map((contact, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cyan-400/20 rounded-full flex items-center justify-center">
                    <contact.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{contact.title}</h4>
                    <a href={contact.href} className="text-gray-300 hover:text-cyan-400 transition-colors">
                      {contact.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-8">
              <form 
                ref={contactFormRef} 
                action="https://formsubmit.co/princepragyensh@gmail.com" 
                method="POST"
                onSubmit={handleContactSubmit}
                className="space-y-6"
              >
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="basic" />
                <input type="hidden" name="_next" value="https://yourportfolio.com/thank-you" />

                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-all duration-300 peer pt-6"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="name"
                    className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                  >
                    Your Name *
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-all duration-300 peer pt-6"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="email"
                    className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                  >
                    Your Email *
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-all duration-300 peer pt-6"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="subject"
                    className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                  >
                    Subject *
                  </label>
                </div>

                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-4 py-3 text-white focus:border-cyan-400 focus:outline-none transition-all duration-300 min-h-[120px] peer pt-6"
                    placeholder=" "
                    required
                  ></textarea>
                  <label
                    htmlFor="message"
                    className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                  >
                    Your Message *
                  </label>
                </div>

                <button
                  type="submit"
                  className={`w-full bg-cyan-400 hover:bg-cyan-500 text-slate-900 font-semibold py-3 px-6 rounded-md transition-all duration-300 flex items-center justify-center ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:scale-105"
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>

                {formStatus.isVisible && (
                  <div
                    className={`mt-4 p-4 rounded-md text-center transition-all duration-300 flex items-center justify-center gap-3 ${
                      formStatus.isSuccess 
                        ? "bg-emerald-400/20 text-emerald-400 border border-emerald-400/30" 
                        : "bg-red-400/20 text-red-400 border border-red-400/30"
                    }`}
                  >
                    {formStatus.isSuccess ? (
                      <CheckCircle size={20} className="flex-shrink-0" />
                    ) : (
                      <AlertCircle size={20} className="flex-shrink-0" />
                    )}
                    <span className="text-sm leading-relaxed">{formStatus.message}</span>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
