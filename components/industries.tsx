"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const industries = [
  {
    id: "01",
    title: "Technology",
    slug: "technology",
    active: true,
  },
  {
    id: "02",
    title: "Healthcare",
    slug: "healthcare",
    active: true,
  },
  {
    id: "03",
    title: "Financial Services",
    slug: "financial-services",
    active: true,
  },
  {
    id: "04",
    title: "Manufacturing",
    slug: "manufacturing",
    active: true,
  },
  {
    id: "05",
    title: "Retail & Consumer",
    slug: "retail-consumer",
    active: true,
  },
  {
    id: "06",
    title: "Energy & Sustainability",
    slug: "energy-sustainability",
    active: true,
  },
  {
    id: "07",
    title: "Education",
    slug: "education",
    active: false,
  },
  {
    id: "08",
    title: "Public Sector",
    slug: "public-sector",
    active: false,
  },
]

export default function Industries() {
  const [hoveredIndustry, setHoveredIndustry] = useState<string | null>(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
      },
    },
  }

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-16">
        <div className="grid md:grid-cols-2 gap-16 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <h3 className="text-sm uppercase mb-2 flex items-center">
                <motion.span
                  className="w-1 h-1 bg-white rounded-full mr-2"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                ></motion.span>
                Industries
              </h3>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Co-creating a better future</h2>
              <p className="text-white/80 text-lg max-w-md">
                We partner with organizations across industries to create innovative solutions that drive growth and
                positive impact.
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-0"
        >
          {industries.map((industry) => (
            <motion.div key={industry.id} variants={itemVariants}>
              <Link
                href={`/industries/${industry.slug}`}
                className={`block py-8 border-t border-white/20 group ${!industry.active ? "opacity-50 pointer-events-none" : ""}`}
                onMouseEnter={() => setHoveredIndustry(industry.id)}
                onMouseLeave={() => setHoveredIndustry(null)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-4">
                    <motion.span
                      className="text-sm text-white/60"
                      animate={hoveredIndustry === industry.id ? { x: -5 } : { x: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {industry.id}
                    </motion.span>
                    <motion.span
                      className="text-2xl font-light"
                      animate={hoveredIndustry === industry.id ? { x: 5 } : { x: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {industry.title}
                    </motion.span>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: hoveredIndustry === industry.id ? 1 : 0,
                      x: hoveredIndustry === industry.id ? 0 : -10,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <ArrowRight className="h-6 w-6" />
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
