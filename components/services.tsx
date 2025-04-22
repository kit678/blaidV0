"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const services = [
  {
    title: "Innovation Strategy",
    description:
      "We develop comprehensive innovation strategies aligned with your business goals and market opportunities.",
  },
  {
    title: "Digital Transformation",
    description:
      "Navigate the digital landscape with our expertise in transforming operations and customer experiences.",
  },
  {
    title: "Design Thinking",
    description:
      "Human-centered approach to problem-solving that integrates user needs, technology, and business requirements.",
  },
  {
    title: "Future Foresight",
    description: "Anticipate trends and prepare for future scenarios with our strategic foresight methodologies.",
  },
]

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const leftX = useTransform(scrollYProgress, [0, 0.5], [-100, 0])
  const rightX = useTransform(scrollYProgress, [0, 0.5], [100, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  const scrollAnimations = services.map(() => useScrollAnimation(0.1))

  return (
    <section
      id="capabilities"
      className="py-16 md:py-32 bg-white text-black overflow-hidden"
    >
      <div ref={containerRef} className="container mx-auto px-4 md:px-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
          <motion.div style={{ opacity }}>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Strategic Innovation</h2>
              <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-md">
                We introduce methodologies, processes, and frameworks to drive innovation initiatives and organizational
                transformation.
              </p>
              <Link
                href="#services"
                className="inline-flex items-center gap-2 text-black border-b-2 border-black pb-1 font-medium hover:gap-3 transition-all group"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                View all services
                <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
              </Link>
            </div>
          </motion.div>

          <motion.div style={{ x: rightX, opacity }}>
            <p className="text-xl md:text-3xl font-light mb-8 md:mb-12 max-w-xl">
              We are an innovation consulting firm that collaborates with organizations to develop strategies,
              capabilities, and cultures that drive sustainable growth.
            </p>
          </motion.div>
        </div>

        <div className="mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const { ref, isInView } = scrollAnimations[index]
            return (
              <motion.div
                key={index}
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 50,
                  damping: 20,
                }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }}
                className="p-6 border border-black/10 rounded-lg transition-all"
              >
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-black/70">{service.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
