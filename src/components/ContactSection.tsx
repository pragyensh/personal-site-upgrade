import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, Linkedin, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";

const ContactSection = () => {
  const [formStatus, setFormStatus] = useState({ message: "", isSuccess: false, isVisible: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setFormStatus({ message: "", isSuccess: false, isVisible: false });

    try {
      const formData = new FormData(e.target);
      
      // Validation
      const name = formData.get("name")?.toString().trim();
      const email = formData.get("email")?.toString().trim();
      const subject = formData.get("subject")?.toString().trim();
      const message = formData.get("message")?.toString().trim();

      if (!name || !email || !subject || !message) {
        throw new Error("Please fill in all required fields.");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Please enter a valid email address.");
      }

      // Submit to FormSubmit
      const response = await fetch('https://formsubmit.co/princepragyensh@gmail.com', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        setFormStatus({
          message: "🎉 Thank you! Your message has been sent successfully. I'll get back to you soon!",
          isSuccess: true,
          isVisible: true,
        });
        e.target.reset();
      } else {
        throw new Error('Failed to send message');
      }

      setTimeout(() => {
        setFormStatus((prev) => ({ ...prev, isVisible: false }));
      }, 10000);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong";
      setFormStatus({
        message: errorMessage.includes("fill in all") || errorMessage.includes("valid email") 
          ? errorMessage 
          : "Failed to send message. Please email me directly at princepragyensh@gmail.com",
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
          {/* Left Side - Contact Information */}
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
                { 
                  icon: Phone, 
                  title: "Phone", 
                  value: "+91 XXXXX XXXXX", 
                  href: "tel:+91XXXXXXXXXX" 
                },
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
                    <a 
                      href={contact.href} 
                      className="text-gray-300 hover:text-cyan-400 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {contact.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-8">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                {/* Hidden FormSubmit fields */}
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="basic" />
                <input type="hidden" name="_subject" value="New message from pragyensh.online" />
                
                {/* Name Field */}
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

                {/* Email Field */}
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

                {/* Subject Field */}
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

                {/* Message Field */}
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

                {/* Submit Button */}
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

                {/* Status Message */}
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
