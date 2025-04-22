"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from 'next/navigation'

const mainNavLinks = [
  { href: "/#services", label: "Services" },
  { href: "/work", label: "Work" },
]

const researchNavLinks = [
  { href: "/research#focus", label: "Focus" },
  { href: "/research#abstracts", label: "Abstracts" },
]

const mainLogoSrc = "/logos/logov7.svg"
const researchLogoSrc = "/logos/logov8Research.svg"

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const isResearchPage = pathname === '/view-research' || pathname.startsWith('/research/')

  const logoSrc = isResearchPage ? researchLogoSrc : mainLogoSrc
  const currentNavLinks = isResearchPage ? researchNavLinks : mainNavLinks

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      if (pathname === '/') {
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
        if (isMenuOpen) {
          setIsMenuOpen(false)
        }
      }
    } else {
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
        <Link href={isResearchPage ? "/research" : "/"} className="flex items-center gap-2 text-white">
          <Image
            src={logoSrc}
            alt={isResearchPage ? "Blaide Research Logo" : "Blaide Logo"}
            width={isResearchPage ? 150 : 100}
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
            href="/contact"
            className="text-white/80 hover:text-white transition-colors"
            onClick={(e) => handleAnchorClick(e, "/contact")}
          >
            Contact
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
              <Link
                href={isResearchPage ? "/research#contact" : "/contact"}
                className="mt-4 bg-white text-black py-3 px-6 rounded-full text-center font-medium text-lg"
                onClick={(e) => handleAnchorClick(e, isResearchPage ? "/research#contact" : "/contact")}
              >
                {isResearchPage ? "Contact Research" : "Contact Us"}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
