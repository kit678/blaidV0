"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

const clients = [
  { name: "Client 1", logo: "/placeholder.svg?height=100&width=200" },
  { name: "Client 2", logo: "/placeholder.svg?height=100&width=200" },
  { name: "Client 3", logo: "/placeholder.svg?height=100&width=200" },
  { name: "Client 4", logo: "/placeholder.svg?height=100&width=200" },
  { name: "Client 5", logo: "/placeholder.svg?height=100&width=200" },
  { name: "Client 6", logo: "/placeholder.svg?height=100&width=200" },
  { name: "Client 7", logo: "/placeholder.svg?height=100&width=200" },
  { name: "Client 8", logo: "/placeholder.svg?height=100&width=200" },
]

export default function ClientsSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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

  return (
    <section ref={sectionRef} className="py-20 bg-white text-black overflow-hidden">
      <div className="container mx-auto px-4 md:px-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="text-2xl md:text-3xl font-bold mb-16 text-center"
        >
          Trusted by innovative organizations
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16"
        >
          {clients.map((client, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.1, grayscale: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
            >
              <Image
                src={client.logo || "/placeholder.svg"}
                alt={client.name}
                width={160}
                height={80}
                className="h-12 md:h-16 w-auto object-contain"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
