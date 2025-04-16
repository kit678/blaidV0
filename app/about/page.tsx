import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-16">
        <div className="max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">About Blaide</h1>
          <p className="text-xl md:text-2xl mb-8">
            We are an innovation consulting firm that helps organizations navigate complexity and drive meaningful
            change.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 mb-24">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg mb-6">
              Founded in 2018, Blaide innovation labs was born from the belief that organizations need a new approach to
              innovation—one that combines strategic thinking, human-centered design, and technological expertise.
            </p>
            <p className="text-lg mb-6">
              Our name, Blaide, represents our approach to cutting through complexity and forging new paths forward. We
              work at the intersection of business strategy, design thinking, and emerging technology to help our
              clients navigate uncertainty and create sustainable growth.
            </p>
            <p className="text-lg">
              Today, we're a team of strategists, designers, technologists, and change agents working with
              forward-thinking organizations across industries.
            </p>
          </div>
          <div className="relative h-[400px] md:h-[500px]">
            <Image
              src="/placeholder.svg?height=500&width=800"
              alt="Blaide team"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        <div className="mb-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Curiosity</h3>
              <p>
                We approach every challenge with an open mind and a desire to understand deeply. We ask questions,
                challenge assumptions, and continuously learn.
              </p>
            </div>
            <div className="p-8 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Courage</h3>
              <p>
                We have the courage to challenge the status quo, to propose bold ideas, and to help our clients navigate
                uncertainty with confidence.
              </p>
            </div>
            <div className="p-8 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Collaboration</h3>
              <p>
                We believe in the power of diverse perspectives. We work closely with our clients and partners to
                co-create solutions that drive meaningful impact.
              </p>
            </div>
            <div className="p-8 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Clarity</h3>
              <p>
                We bring clarity to complex situations. We communicate with transparency and help our clients navigate
                ambiguity with clear direction.
              </p>
            </div>
            <div className="p-8 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Commitment</h3>
              <p>
                We are committed to our clients' success. We take ownership of our work and are dedicated to delivering
                exceptional results.
              </p>
            </div>
            <div className="p-8 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Continuous Improvement</h3>
              <p>
                We believe in getting 1% better every day. We embrace feedback, learn from our experiences, and
                continuously refine our approach.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="text-center">
                <div className="relative h-80 mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={`/placeholder.svg?height=320&width=320&text=Team Member ${i}`}
                    alt={`Team member ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">Team Member {i}</h3>
                <p className="text-gray-600">Position</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to work with us?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Let's collaborate to drive innovation and transformation in your organization.
          </p>
          <Link href="/contact">
            <Button className="bg-black text-white hover:bg-black/80 py-6 px-8 rounded-full text-lg">
              Get in Touch
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
