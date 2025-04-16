"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const offerings = [
  {
    id: "innovation-audit",
    title: "Innovation Audit",
    type: "Advisory Only",
    tagline: "Free/Pro Bono",
    description: "A 60-minute virtual consultation to identify high-impact automation opportunities.",
    features: [
      "60-minute virtual consultation analyzing your business operations",
      "Identification of 2-3 high-impact automation opportunities",
      "Assessment of current innovation capabilities and gaps",
      "Brief recommendations document highlighting next steps",
      "No implementation included - purely diagnostic and advisory",
    ],
    color: "#6366F1",
  },
  {
    id: "process-optimization",
    title: "Process Optimization Blueprint",
    type: "Advisory Only",
    tagline: "",
    description: "Comprehensive analysis of your core business processes with detailed improvement plans.",
    features: [
      "Comprehensive analysis of your core business processes",
      "Documentation of inefficiency points and automation opportunities",
      "ROI calculations for each recommended improvement",
      "Detailed blueprint with step-by-step optimization plan",
      "Vendor recommendations (but no implementation management)",
    ],
    color: "#10B981",
  },
  {
    id: "ai-implementation",
    title: "AI Implementation Roadmap",
    type: "Hybrid",
    tagline: "Strategy + Implementation Management",
    description: "Strategic selection and implementation oversight of AI tools tailored to your needs.",
    features: [
      "Strategic selection of optimal AI tools for your specific needs",
      "Vendor evaluation and selection (3-5 potential partners)",
      "Project scoping and requirements documentation",
      "Implementation timeline and budget planning",
      "Oversight of technical partners during execution (but no direct coding)",
    ],
    color: "#3B82F6",
  },
  {
    id: "product-innovation",
    title: "Product Innovation Accelerator",
    type: "Hybrid",
    tagline: "Strategy + Implementation Management",
    description: "End-to-end support for bringing new product concepts to market.",
    features: [
      "Product concept refinement and market fit validation",
      "Creation of detailed product requirements document",
      "Technical specification and architecture planning",
      "Developer hiring/selection and project management",
      "Launch strategy planning and execution oversight",
    ],
    color: "#8B5CF6",
  },
  {
    id: "fractional-director",
    title: "Fractional Innovation Director",
    type: "Comprehensive",
    tagline: "Strategy + Implementation Management",
    description: "Ongoing innovation leadership and project management for continuous improvement.",
    features: [
      "Monthly innovation strategy sessions and priority setting",
      "Ongoing process automation project management",
      "Product development initiative oversight",
      "Vendor and technical partner management",
      "Regular reporting on innovation KPIs and ROI tracking",
    ],
    color: "#EC4899",
  },
]

export default function ProductOfferings() {
  const [activeOffering, setActiveOffering] = useState(offerings[0].id)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Advisory Only":
        return "bg-blue-100 text-blue-800"
      case "Hybrid":
        return "bg-purple-100 text-purple-800"
      case "Comprehensive":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
      },
    },
  }

  const featureVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    }),
  }

  return (
    <section id="services" className="py-20 md:py-32 bg-white text-black overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 50, damping: 20 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Innovation Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our productized services offer clear pathways to innovation, with transparent advisory and implementation
            options tailored to your needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-16">
          <div className="md:col-span-1">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-4 sticky top-24"
            >
              {offerings.map((offering, index) => (
                <motion.div
                  key={offering.id}
                  variants={itemVariants}
                  whileHover={{
                    x: 5,
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                  }}
                  className={`cursor-pointer p-4 rounded-lg transition-all ${
                    activeOffering === offering.id
                      ? "bg-gray-100 border-l-4 shadow-sm"
                      : "hover:bg-gray-50 border-l-4 border-transparent"
                  }`}
                  style={{
                    borderLeftColor: activeOffering === offering.id ? offering.color : "transparent",
                  }}
                  onClick={() => setActiveOffering(offering.id)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">{offering.title}</h3>
                    {activeOffering === offering.id && (
                      <motion.div
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <ArrowRight className="h-4 w-4 text-gray-900" />
                      </motion.div>
                    )}
                  </div>
                  <div className="mt-2">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${getTypeColor(offering.type)}`}>
                      {offering.type}
                    </span>
                    {offering.tagline && <span className="text-sm ml-2 text-gray-500">{offering.tagline}</span>}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="md:col-span-2">
            <AnimatePresence mode="wait">
              {offerings.map(
                (offering) =>
                  activeOffering === offering.id && (
                    <motion.div
                      key={offering.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    >
                      <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
                        <motion.div
                          className="w-16 h-1 mb-6 rounded"
                          style={{ backgroundColor: offering.color }}
                          initial={{ width: 0 }}
                          animate={{ width: "4rem" }}
                          transition={{ duration: 0.5 }}
                        ></motion.div>
                        <motion.h3
                          className="text-2xl md:text-3xl font-bold mb-4 text-gray-900"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1, duration: 0.5 }}
                        >
                          {offering.title}
                        </motion.h3>
                        <motion.p
                          className="text-lg text-gray-700 mb-8"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                        >
                          {offering.description}
                        </motion.p>

                        <motion.h4
                          className="text-lg font-semibold mb-4 text-gray-900"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                        >
                          What's included:
                        </motion.h4>
                        <ul className="space-y-3 mb-8">
                          {offering.features.map((feature, index) => (
                            <motion.li
                              key={index}
                              className="flex items-start"
                              custom={index}
                              variants={featureVariants}
                              initial="hidden"
                              animate="visible"
                            >
                              <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{feature}</span>
                            </motion.li>
                          ))}
                        </ul>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6, duration: 0.5 }}
                        >
                          <Link
                            href="/contact"
                            className="inline-block bg-black text-white py-3 px-8 rounded-full font-medium hover:bg-black/80 transition-colors"
                          >
                            <motion.span
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                              className="inline-block"
                            >
                              Inquire about this service
                            </motion.span>
                          </Link>
                        </motion.div>
                      </div>
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
