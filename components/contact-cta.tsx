"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ContactCTA() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.6 })

  return (
    <section ref={sectionRef} className="py-16 md:py-32 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-16 relative text-center md:text-left">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 50, damping: 20 }}
          className="text-4xl md:text-6xl font-bold mb-8 md:mb-0"
        >
          let's work together
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
          className="md:absolute md:right-16 md:bottom-0 mt-8 md:mt-0"
        >
          <Button asChild variant="primary-pill" size="pill">
            <Link href="/contact">
              <motion.span
                className="inline-block bg-white text-black py-4 px-8 md:py-6 md:px-12 rounded-full text-xl font-medium hover:bg-white/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Contact Us
              </motion.span>
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
