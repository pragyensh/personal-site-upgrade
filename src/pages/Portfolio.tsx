
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Navigation from "../components/Navigation"
import HeroSection from "../components/HeroSection"
import AboutSection from "../components/AboutSection"
import ExperienceSection from "../components/ExperienceSection"
import ProjectsSection from "../components/ProjectsSection"
import ServicesSection from "../components/ServicesSection"
import ContactSection from "../components/ContactSection"
import Footer from "../components/Footer"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [typingText, setTypingText] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  const words = ["Developer", "Artist", "Speaker", "Educator", "Yoga Enthusiast"]

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

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 overflow-x-hidden">
      <Navigation
        activeSection={activeSection}
        isMenuOpen={isMenuOpen}
        isScrolled={isScrolled}
        setIsMenuOpen={setIsMenuOpen}
        scrollToSection={scrollToSection}
      />

      <HeroSection
        typingText={typingText}
        scrollToSection={scrollToSection}
      />

      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <ServicesSection />
      <ContactSection />

      <Footer
        showBackToTop={showBackToTop}
        scrollToTop={scrollToTop}
      />
    </div>
  )
}
