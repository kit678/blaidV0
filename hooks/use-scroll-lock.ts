"use client"

import { useEffect } from "react"

export function useScrollLock(lock: boolean) {
  useEffect(() => {
    if (!lock) return

    // Save the current body style
    const originalStyle = window.getComputedStyle(document.body).overflow

    // Prevent scrolling
    document.body.style.overflow = "hidden"

    // Restore scrolling when component unmounts or lock changes
    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [lock])
}
