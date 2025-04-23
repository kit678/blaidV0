"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import Image from "next/image"

const industries = [
  { id: "01", title: "Technology", slug: "technology" },
  { id: "02", title: "Healthcare", slug: "healthcare" },
  { id: "03", title: "Financial Services", slug: "financial-services" },
  { id: "04", title: "Manufacturing", slug: "manufacturing" },
  { id: "05", title: "Retail & Consumer", slug: "retail-consumer" },
  { id: "06", title: "Energy & Sustainability", slug: "energy-sustainability" },
  { id: "07", title: "Education", slug: "education" },
  { id: "08", title: "Public Sector", slug: "public-sector" },
]

// Updated data structure with actual image paths
const industryApplications: { [key: string]: { title: string; image?: string }[] } = {
  "01": [ // Technology
    { title: "AI Code Generation & Review", image: "/industries/Neon Code on Circuit Backdrop.webp" },
    { title: "Automated Software Testing", image: "/industries/Abstract Digital Architecture in Purple Light.webp" },
    { title: "Synthetic Data Generation", image: "/industries/Converging Data Streams and Core.webp" },
    { title: "Intelligent UX Prototyping", image: "/industries/Neon Purple Wireframe Interface Design.webp" },
  ],
  "02": [ // Healthcare
    { title: "Drug Discovery Acceleration", image: "/industries/Molecular Connections in Purple Light.webp" },
    { title: "Personalized Patient Plans", image: "/industries/Progress Tracker with Glowing Accents.webp" },
    { title: "Medical Image Diagnostics Aid", image: "/industries/Brain Scan with Purple Lesion.webp" },
    { title: "Automated Clinical Notes", image: "/industries/Waveform to Data Transformation.webp" },
  ],
  "03": [ // Financial Services
    { title: "Algorithmic Trading Insights", image: "/industries/Upward Momentum_ Financial Chart Analysis.webp" },
    { title: "Fraud Detection Patterns", image: "/industries/Network of Glowing Connections.webp" },
    { title: "Personalized Financial Advice", image: "/industries/Financial Growth Dashboard in Purple Glow.webp" },
    { title: "Automated Risk Assessment", image: "/industries/Purple Highlight on Grayscale Grid.webp" },
  ],
  "04": [ // Manufacturing
    { title: "Predictive Maintenance", image: "/industries/Glowing Gear in Dark Framework.webp" },
    { title: "Supply Chain Optimization", image: "/industries/Neon Supply Route Network.webp" }
  ],
  "05": [ // Retail & Consumer
    { title: "Personalized Marketing", image: "/industries/Network of Connections and Glowing Links.webp" },
    { title: "Dynamic Pricing Models", image: "/industries/Fluctuating Data with Glowing Highlights.webp" }
  ],
  "06": [ // Energy & Sustainability
    { title: "Energy Grid Optimization", image: "/industries/Electric Grid with Glowing Purple Line.webp" },
    { title: "Materials Discovery", image: "/industries/Glowing Lattice on Dark Background.webp" }
  ],
  "07": [ // Education
    { title: "Adaptive Learning Platforms", image: "/industries/Branching Pathway with Glowing Purple Route.webp" },
    { title: "Automated Grading", image: "/industries/Geometric Document with Purple Highlights.webp" }
  ],
  "08": [ // Public Sector
    { title: "Policy Simulation", image: "/industries/Abstract Network of Purple Waves.webp" },
    { title: "Resource Allocation AI", image: "/industries/Glowing Map of Resources and Paths.webp" }
  ],
}

export default function Industries() {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
  }

  const accordionVariants = {
    hidden: { opacity: 0, height: 0, marginTop: 0, marginBottom: 0 },
    visible: { 
      opacity: 1, 
      height: "auto", 
      marginTop: "1rem",
      marginBottom: "1rem",
      transition: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }
    },
  }

  const handleToggle = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id)
  }

  return (
    <section
      id="industries"
      ref={sectionRef}
      className="py-20 md:py-32 bg-black text-white overflow-hidden"
    >
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
                Generative AI Applications by Industry
              </h3>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Explore the Possibilities</h2>
              <p className="text-white/80 text-lg max-w-md">
                Discover how Blaide leverages transformative AI to create value across diverse sectors. Click an industry to see examples.
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="border-t border-white/20"
        >
          {industries.map((industry) => {
            const isOpen = activeAccordion === industry.id
            const applications = industryApplications[industry.id] || []

            return (
              <motion.div key={industry.id} variants={itemVariants} className="border-b border-white/20">
                <button
                  className="w-full py-6 md:py-8 text-left group flex items-center justify-between cursor-pointer"
                  onClick={() => handleToggle(industry.id)}
                >
                  <div className="flex items-baseline gap-4">
                    {/* <span className="text-sm text-white/60 w-6 text-center">
                      {industry.id}
                    </span> */}
                    <span className="text-xl md:text-2xl font-light group-hover:text-white transition-colors duration-200">
                      {industry.title}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-white/60 group-hover:text-white transition-colors duration-200"
                  >
                    <ChevronDown className="h-6 w-6" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      variants={accordionVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pt-2 pl-[calc(1.5rem+1.5rem)] pr-4 overflow-x-auto flex space-x-4 lg:space-x-6 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
                        {applications.length > 0 ? (
                          applications.map((app, index) => (
                            <div 
                              key={index} 
                              className="relative flex-shrink-0 w-56 sm:w-64 aspect-[4/3] group/card shadow-md transition-transform duration-300 ease-in-out group-hover/card:scale-105" 
                              style={{ borderRadius: '0.5rem', overflow: 'hidden' }} 
                            >
                              {app.image && (
                                <Image
                                  src={app.image}
                                  alt={`${app.title} background`}
                                  fill
                                  className="object-cover transition-all duration-300 ease-in-out filter brightness-75 group-hover/card:brightness-100"
                                  sizes="(max-width: 640px) 224px, 256px"
                                  placeholder="blur"
                                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkrAkAAKcArepgAlAAAAAASUVORK5CYII="
                                />
                              )}
                              <div className="absolute inset-0 flex items-center justify-center p-4 bg-black/40 transition-colors duration-300 group-hover/card:bg-black/20">
                                <h4 className="text-white font-semibold text-base leading-tight text-center">
                                  {app.title}
                                </h4>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-white/60 italic py-4">Application examples coming soon.</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
