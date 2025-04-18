"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/work", label: "Work" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle smooth scrolling for anchor links
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only handle anchor links on the same page
    if (href.startsWith("/#")) {
      e.preventDefault()
      const targetId = href.replace("/#", "")

      // If it's just the home link (/#), scroll to top
      if (!targetId) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
        return
      }

      // Otherwise scroll to the specific section
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        })
      }

      // Close mobile menu if open
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
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-white">
          <Image
            src="/logov3.svg"
            alt="Blaide Logo"
            width={100}
            height={32}
            className="filter invert"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/80 hover:text-white transition-colors"
              onClick={(e) => handleAnchorClick(e, link.href)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-md p-6 md:hidden"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/80 hover:text-white transition-colors py-2"
                  onClick={(e) => {
                    handleAnchorClick(e, link.href)
                    setIsMenuOpen(false)
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-4 bg-white text-black py-3 px-6 rounded-full text-center font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
