
"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Code,
  Palette,
  Mic,
  GraduationCap,
  Users,
  Award,
  ExternalLink,
  Mail,
  Phone,
  Linkedin,
  Github,
  ChevronDown,
  Star,
  MapPin,
  Menu,
  X,
  ArrowUp,
  Send,
  Megaphone,
  ClapperboardIcon as ChalkboardTeacher,
  Loader2,
  Hand,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [typingText, setTypingText] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [formStatus, setFormStatus] = useState({ message: "", isSuccess: false, isVisible: false })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFanned, setIsFanned] = useState(false)

  const words = ["Developer", "Artist", "Speaker", "Educator", "Yoga Enthusiast"]
  const nameRef = useRef<HTMLDivElement>(null)
  const contactFormRef = useRef<HTMLFormElement>(null)

  // Typing animation effect
  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const currentWord = words[wordIndex]

        if (!isDeleting && charIndex < currentWord.length) {
          setTypingText(currentWord.substring(0, charIndex + 1))
          setCharIndex(charIndex + 1)
        } else if (isDeleting && charIndex > 0) {
          setTypingText(currentWord.substring(0, charIndex - 1))
          setCharIndex(charIndex - 1)
        } else {
          setIsDeleting(!isDeleting)
          if (!isDeleting) {
            setWordIndex((wordIndex + 1) % words.length)
          }
        }
      },
      isDeleting ? 50 : 100,
    )

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, wordIndex, words])

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 50)
      setShowBackToTop(scrollY > 300)

      // Update active section
      const sections = ["home", "about", "experience", "projects", "services", "contact"]
      const scrollPosition = scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }

      // Animate elements on scroll
      const animateElements = document.querySelectorAll(".animate-on-scroll")
      animateElements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top
        const screenPosition = window.innerHeight / 1.2

        if (elementPosition < screenPosition) {
          element.classList.add("animate-visible")
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Enhanced name animation interactions
  useEffect(() => {
    const nameContainer = nameRef.current
    if (!nameContainer) return

    const parts = nameContainer.querySelectorAll(".name-part")
    parts.forEach((part: Element) => {
      const element = part as HTMLElement
      element.style.transform = "translate3d(0,0,0)"
    })

    const handleClick = () => {
      parts.forEach((part: Element) => {
        const element = part as HTMLElement
        element.style.animation = "none"
        void element.offsetWidth

        if (element.classList.contains("pragyensh")) {
          element.style.animation = "quickFloatPart 1.8s cubic-bezier(0.2, 0.8, 0.4, 1) forwards"
        } else if (element.classList.contains("pritiman")) {
          element.style.animation = "quickFloatPart 1.8s cubic-bezier(0.2, 0.8, 0.4, 1) 0.15s forwards"
        } else if (element.classList.contains("panda")) {
          element.style.animation = "quickFloatPart 1.8s cubic-bezier(0.2, 0.8, 0.4, 1) 0.3s forwards"
        }
      })
    }

    nameContainer.addEventListener("click", handleClick)

    return () => {
      nameContainer.removeEventListener("click", handleClick)
    }
  }, [])

  // Handle contact form submission
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!contactFormRef.current) return

    setIsSubmitting(true)
    setFormStatus({ message: "", isSuccess: false, isVisible: false })

    try {
      const formData = new FormData(contactFormRef.current)
      const name = formData.get("name") as string
      const email = formData.get("email") as string
      const subject = formData.get("subject") as string
      const message = formData.get("message") as string

      // Enhanced validation
      if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
        throw new Error("Please fill in all required fields.")
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        throw new Error("Please enter a valid email address.")
      }

      // Simulate API call with proper delay
      await new Promise(resolve => setTimeout(resolve, 2500))

      // Log form data for debugging
      console.log("Contact form submission:", {
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
        timestamp: new Date().toISOString()
      })

      setFormStatus({
        message: "🎉 Thank you! Your message has been received successfully. I'll get back to you within 24-48 hours!",
        isSuccess: true,
        isVisible: true,
      })

      contactFormRef.current.reset()
      
      // Hide success message after 10 seconds
      setTimeout(() => {
        setFormStatus((prev) => ({ ...prev, isVisible: false }))
      }, 10000)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong. Please try again."
      console.error("Form submission error:", error)
      
      setFormStatus({
        message: errorMessage.includes("fill in all") || errorMessage.includes("valid email") 
          ? errorMessage 
          : "Something went wrong. Please try again or contact me directly at princepragyensh@gmail.com",
        isSuccess: false,
        isVisible: true,
      })

      // Hide error message after 8 seconds
      setTimeout(() => {
        setFormStatus((prev) => ({ ...prev, isVisible: false }))
      }, 8000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleCardDeckClick = () => {
    setIsFanned(!isFanned)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 overflow-x-hidden">
      {/* Navigation */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-slate-900/90 backdrop-blur-md py-4 shadow-lg" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#home" className="text-2xl font-bold text-white">
            Pragyensh<span className="text-cyan-400">.</span>
          </a>

          <nav className={`hidden md:flex space-x-8`}>
            {["Home", "About", "Experience", "Projects", "Services", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`relative font-medium transition-colors duration-300 hover:text-cyan-400 ${
                  activeSection === item.toLowerCase() ? "text-cyan-400" : "text-gray-300"
                }`}
              >
                {item}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${
                    activeSection === item.toLowerCase() ? "w-full" : "w-0"
                  }`}
                ></span>
              </button>
            ))}
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-cyan-400 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-slate-800/95 backdrop-blur-md transition-all duration-300 ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <nav className="flex flex-col items-center py-8 space-y-4">
            {["Home", "About", "Experience", "Projects", "Services", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-gray-300 hover:text-cyan-400 transition-colors font-medium"
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
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
            <div className="relative w-80 h-96">
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

      {/* About Section */}
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

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            My Journey
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mt-4 rounded-full"></div>
          </h2>

          <div className="max-w-7xl mx-auto relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-cyan-400 hidden md:block"></div>

            {[
              {
                date: "2025 - Present",
                title: "Student Ambassador @ Unstop",
                description:
                  "Representing the platform at my university, promoting competitions and opportunities to fellow students while building a strong tech community.",
                icon: Users,
              },
              {
                date: "2024 - Present",
                title: "DineWise Project Lead & Founder",
                description:
                  "Developed and leading a smart mess management system for college campuses to reduce food waste and optimize meal planning.",
                icon: Award,
              },
              {
                date: "2024 - Present",
                title: "R&D Team Member @ Fusion Tech Club",
                description:
                  "Working as a research and development team member with fellow students, contributing to innovative tech solutions and club initiatives.",
                icon: Code,
              },
              {
                date: "2024 - Present",
                title: "Event Host & Public Speaker",
                description:
                  "Hosting major college events like Codathon and Robothon, speaking at college functions, and organizing IEEE conferences with 200+ attendees.",
                icon: Mic,
              },
              {
                date: "2024",
                title: "Intern @ Udayan Care NGO",
                description:
                  "Contributed to educational initiatives focusing on underprivileged girls' education and empowerment programs.",
                icon: GraduationCap,
              },
              {
                date: "2023 - 2024",
                title: "Art & Crafts Volunteer",
                description:
                  "Participated in student-organized events creating meaningful art and craft projects for children in the community.",
                icon: Palette,
              },
              {
                date: "2023",
                title: "Mr. Fresher 2023 @ AUGN",
                description:
                  "Won the prestigious Mr. Fresher title after participating in multiple competitions including Codathon, Ideathon, Debate, and Yoga.",
                icon: Star,
              },
              {
                date: "2020 - 2023",
                title: "Private Tutor (250+ students)",
                description:
                  "Taught Science and English to school students during my 12th grade years with proven track record of improved academic performance.",
                icon: ChalkboardTeacher,
              },
            ].map((item, index) => (
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
                  <div className="hidden md:block w-full md:w-5/12 md:pr-12">
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/10">
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

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            My Projects
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mt-4 rounded-full"></div>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "DineWise Campus Hub",
                description:
                  "Smart mess management system for college campuses to reduce food waste and optimize meal planning.",
                tags: ["Web App", "AI Integration"],
                image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
              },
              {
                title: "Rentastic",
                description:
                  "Hyperlocal rental service app connecting people who need items with those who have them to rent.",
                tags: ["Mobile App", "Flutter"],
                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
              },
              {
                title: "Personal Portfolio",
                description: "A responsive portfolio website showcasing my skills, projects and experience.",
                tags: ["HTML/CSS", "JavaScript"],
                image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
              },
            ].map((project, index) => (
              <Card
                key={index}
                className="bg-slate-800/50 border-slate-700 overflow-hidden group hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/10 animate-on-scroll"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} className="bg-cyan-400/20 text-cyan-400 hover:bg-cyan-400/30">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Button size="sm" className="bg-cyan-400 hover:bg-cyan-500 text-slate-900">
                      <ExternalLink size={16} className="mr-2" />
                      Live Demo
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900"
                    >
                      <Github size={16} className="mr-2" />
                      Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            My Services
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mt-4 rounded-full"></div>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Code,
                title: "Website/App Development",
                description:
                  "Custom digital solutions tailored to your needs, built with modern technologies and best practices.",
              },
              {
                icon: Palette,
                title: "Self-Portrait Commissions",
                description:
                  "Hand-drawn personalized portraits that capture personality and emotion in unique artistic style.",
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
            ].map((service, index) => (
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

      {/* Contact Section */}
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
                <form ref={contactFormRef} onSubmit={handleContactSubmit} className="space-y-6">
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

      {/* Footer */}
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
    </div>
  )
}
