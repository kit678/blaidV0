"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Twitter, Linkedin, Instagram, ArrowUp } from "lucide-react"
import { useState, useEffect } from "react"

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const linkVariants = {
    hover: {
      x: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  }

  const socialVariants = {
    hover: {
      scale: 1.2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  }

  return (
    <footer className="bg-black text-white pt-16 pb-8 relative">
      <div className="container mx-auto px-4 md:px-16">
        <div className="flex flex-col md:flex-row justify-between mb-16">
          <div className="flex flex-col mb-8 md:mb-0">
            <Link href="/" className="inline-block mb-2">
              <motion.span
                className="font-bold text-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                BLAIDE
              </motion.span>
            </Link>
            <motion.a
              href="mailto:info@blaide.com"
              className="text-white/80 hover:text-white transition-colors"
              whileHover={{ x: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              info@blaide.com
            </motion.a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <motion.div variants={linkVariants} whileHover="hover">
                    <Link href="/about" className="text-white/60 hover:text-white transition-colors">
                      About
                    </Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div variants={linkVariants} whileHover="hover">
                    <Link href="/work" className="text-white/60 hover:text-white transition-colors">
                      Work
                    </Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div variants={linkVariants} whileHover="hover">
                    <Link href="/blog" className="text-white/60 hover:text-white transition-colors">
                      Blog
                    </Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div variants={linkVariants} whileHover="hover">
                    <Link href="/careers" className="text-white/60 hover:text-white transition-colors">
                      Careers
                    </Link>
                  </motion.div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <motion.div variants={linkVariants} whileHover="hover">
                    <Link href="/privacy" className="text-white/60 hover:text-white transition-colors">
                      Privacy Policy
                    </Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div variants={linkVariants} whileHover="hover">
                    <Link href="/terms" className="text-white/60 hover:text-white transition-colors">
                      Terms of Service
                    </Link>
                  </motion.div>
                </li>
                <li>
                  <motion.div variants={linkVariants} whileHover="hover">
                    <Link href="/cookies" className="text-white/60 hover:text-white transition-colors">
                      Cookie Policy
                    </Link>
                  </motion.div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <motion.a
                  href="https://twitter.com/blaide"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                  variants={socialVariants}
                  whileHover="hover"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </motion.a>
                <motion.a
                  href="https://linkedin.com/company/blaide"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                  variants={socialVariants}
                  whileHover="hover"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </motion.a>
                <motion.a
                  href="https://instagram.com/blaide"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                  variants={socialVariants}
                  whileHover="hover"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Blaide Innovation Labs. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <motion.div variants={linkVariants} whileHover="hover">
              <Link href="/privacy" className="text-white/60 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
            </motion.div>
            <motion.div variants={linkVariants} whileHover="hover">
              <Link href="/terms" className="text-white/60 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
            </motion.div>
            <motion.div variants={linkVariants} whileHover="hover">
              <Link href="/cookies" className="text-white/60 hover:text-white transition-colors text-sm">
                Cookie Policy
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={handleScrollToTop}
          className="fixed bottom-8 right-8 bg-white text-black p-3 rounded-full shadow-lg z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </footer>
  )
}
