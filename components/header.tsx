"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
// import { usePathname } from 'next/navigation' // No longer needed for variant logic

// Define props including the new variant
interface HeaderProps {
  variant: 'main' | 'research';
}

const mainNavLinks = [
  { href: "/#services", label: "Services" },
  { href: "/products", label: "Products" },
]

const researchNavLinks = [
  { href: "#focus", label: "Focus" }, // Changed to relative hash links within research page
  { href: "#abstracts", label: "Abstracts" }, // Changed to relative hash links
]

const mainLogoSrc = "/logos/logov7.svg"
const researchLogoSrc = "/logos/logov8Research.svg"

export default function Header({ variant }: HeaderProps) { // Accept variant prop
  // const pathname = usePathname() // Remove pathname usage
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Determine content based on the passed variant prop
  const isResearchPage = variant === 'research';

  const logoSrc = isResearchPage ? researchLogoSrc : mainLogoSrc
  const currentNavLinks = isResearchPage ? researchNavLinks : mainNavLinks
  const logoHref = isResearchPage ? "/" : "/"; // Both link to root of their respective domains
  const contactHref = isResearchPage ? "#contact" : "/contact"; // Hash link for research, path for main
  const contactLabel = isResearchPage ? "Contact Research" : "Contact Us";
  const logoAlt = isResearchPage ? "Blaide Research Logo" : "Blaide Logo"
  const logoWidth = isResearchPage ? 150 : 100

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Check if it's a hash link *within the current page*
    if (href.startsWith("#")) {
      e.preventDefault()
      const targetId = href.substring(1); // Remove the #
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" })
      }
      if (isMenuOpen) {
        setIsMenuOpen(false)
      }
    } 
    // Check if it's a root hash link for the main page
    else if (href.startsWith("/#") && variant === 'main') {
        e.preventDefault()
        const targetId = href.replace("/#", "")
        if (!targetId) {
          window.scrollTo({ top: 0, behavior: "smooth" })
        } else {
          const targetElement = document.getElementById(targetId)
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" })
          }
        }
        if (isMenuOpen) {
          setIsMenuOpen(false)
        }
    } else {
      // Handle regular navigation or navigation from main page root hashes
      if (isMenuOpen) {
        setIsMenuOpen(false)
      }
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 px-4 md:px-16 py-6 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-md py-4" : "bg-transparent py-8"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href={logoHref} className="flex items-center gap-2 text-white">
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={logoWidth}
            height={32}
            className="filter invert"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {currentNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/80 hover:text-white transition-colors"
              onClick={(e) => handleAnchorClick(e, link.href)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={contactHref}
            className="text-white/80 hover:text-white transition-colors"
            onClick={(e) => handleAnchorClick(e, contactHref)}
          >
            {contactLabel}
          </Link>
        </nav>

        <Button variant="outline" size="icon" className="md:hidden text-white border-white/50 hover:bg-white/10 hover:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-md md:hidden overflow-hidden"
          >
            <nav className="flex flex-col gap-2 p-6">
              {currentNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/80 hover:text-white transition-colors py-3 text-lg"
                  onClick={(e) => handleAnchorClick(e, link.href)}
                >
                  {link.label}
                </Link>
              ))}
              <Button 
                asChild 
                variant="primary-pill" 
                size="pill" 
                className="mt-4 text-center text-lg"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleAnchorClick(e as any, contactHref)}
              >
                <Link href={contactHref}>{contactLabel}</Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
