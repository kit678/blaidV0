"use client"

import { useRef } from "react"
import { useInView, type UseInViewOptions } from "framer-motion"

/**
 * Hook for creating scroll-triggered animations
 * @param threshold Amount of element that needs to be visible to trigger animation (0-1)
 * @param options Additional configuration options
 * @returns Object containing ref and isInView state
 */
export function useScrollAnimation(
  threshold = 0.2,
  options: Partial<UseInViewOptions> = {
    once: false,  // Changed from true to false to allow repeated animations
    margin: "0px 0px -10% 0px", // Adds a margin to trigger animations earlier
  }
) {
  const ref = useRef(null)
  
  // Configure the useInView hook with our enhanced options
  const isInView = useInView(ref, { 
    amount: threshold,
    ...options,
  })

  return { ref, isInView }
}
