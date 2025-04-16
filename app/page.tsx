import Hero from "@/components/hero"
import Services from "@/components/services"
import ProductOfferings from "@/components/product-offerings"
import FeaturedWork from "@/components/featured-work"
import AboutSection from "@/components/about-section"
import Industries from "@/components/industries"
import ContactCTA from "@/components/contact-cta"
import ClientsSection from "@/components/clients-section"

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <ProductOfferings />
      <FeaturedWork />
      <AboutSection />
      <Industries />
      <ClientsSection />
      <ContactCTA />
    </>
  )
}
