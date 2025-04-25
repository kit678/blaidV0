"use client"

import React from "react"
import { usePathname } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"

interface LayoutClientWrapperProps {
  children: React.ReactNode;
  initialVariant: 'main' | 'research'; // Add initialVariant prop
  // researchHostname: string; // No longer needed
}

const LOCAL_RESEARCH_PATH = '/view-research';

export default function LayoutClientWrapper({ children, initialVariant }: LayoutClientWrapperProps) { // Accept initialVariant
  const pathname = usePathname();

  // Determine final variant
  let finalVariant = initialVariant; // Start with the server-determined variant
  if (initialVariant === 'main' && pathname?.startsWith(LOCAL_RESEARCH_PATH)) {
    // If server said 'main', check if we are on the local research path
    finalVariant = 'research';
  }

  // Remove the previous client-only logic
  // const isResearchPath = pathname?.startsWith(LOCAL_RESEARCH_PATH);
  // const variant = isResearchPath ? 'research' : 'main';

  // --- DEBUG LOG --- 
  // console.log("[Client Wrapper Debug] Path:", pathname, "| Initial Variant:", initialVariant, "| Final Variant:", finalVariant);
  // -----------------

  return (
    <>
      {/* @ts-ignore TODO: Add variant prop to Header component */}
      <Header variant={finalVariant} /> {/* Use finalVariant */}
      <main className="min-h-screen">{children}</main>
      {/* @ts-ignore TODO: Add variant prop to Footer component */}
      <Footer variant={finalVariant} /> {/* Use finalVariant */}
    </>
  );
} 