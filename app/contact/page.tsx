"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckIcon, ArrowRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { addContactMessage } from "@/lib/firebase"

interface FormData {
  services: string[];
  timeline: string;
  budget: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

export default function ContactPage() {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    services: [],
    timeline: "",
    budget: "",
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => {
      if (prev.services.includes(service)) {
        return {
          ...prev,
          services: prev.services.filter((s) => s !== service),
        }
      } else {
        return {
          ...prev,
          services: [...prev.services, service],
        }
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setIsSubmitting(true)
      
      // Send data to API endpoint
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to send message')
      }
      
      // Show success state
      setIsSubmitted(true)
      
    } catch (error) {
      console.error('Error submitting form:', error)
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const services = [
    "Innovation Strategy",
    "Digital Transformation",
    "Design Thinking",
    "Future Foresight",
    "Implement an Idea",
    "All of the above",
  ]

  const timelines = ["1-60 days", "60-180 days", "180-365 days", "+ 365 days"]

  const budgets = ["$5,000 - $15,000", "$15,000 - $30,000", "$30,000 - $50,000", "+ $50,000"]

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white text-black">
      <div className="container max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Connect with us</h1>
          <p className="text-lg text-black/70">Regarding an upcoming project or transformation need</p>
        </motion.div>

        {!isSubmitted ? (
          <div className="bg-white rounded-xl p-6 md:p-10 shadow-lg">
            <div className="flex mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= i ? "bg-black text-white" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step > i ? <CheckIcon className="h-4 w-4" /> : i}
                  </div>
                  {i < 4 && <div className={`h-1 w-16 ${step > i ? "bg-black" : "bg-gray-200"}`}></div>}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h2 className="text-2xl font-bold mb-6">What kind of project can we assist you with?</h2>
                  <p className="text-black/70 mb-8">Choose as many as you like</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {services.map((service) => (
                      <div
                        key={service}
                        className={`border p-4 rounded-lg cursor-pointer transition-colors ${
                          formData.services.includes(service)
                            ? "border-black bg-black/5"
                            : "border-gray-200 hover:border-black/50"
                        }`}
                        onClick={() => handleServiceToggle(service)}
                      >
                        <div className="flex items-center justify-between">
                          <span>{service}</span>
                          {formData.services.includes(service) && <CheckIcon className="h-5 w-5" />}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={formData.services.length === 0}
                      className="bg-black text-white hover:bg-black/80"
                    >
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h2 className="text-2xl font-bold mb-6">Please provide information on the timeline</h2>

                  <RadioGroup
                    value={formData.timeline}
                    onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                    className="space-y-4 mb-8"
                  >
                    {timelines.map((timeline) => (
                      <div key={timeline} className="flex items-center space-x-2">
                        <RadioGroupItem value={timeline} id={timeline} />
                        <Label htmlFor={timeline}>{timeline}</Label>
                      </div>
                    ))}
                  </RadioGroup>

                  <div className="flex justify-between">
                    <Button type="button" onClick={() => setStep(1)} variant="outline">
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setStep(3)}
                      disabled={!formData.timeline}
                      className="bg-black text-white hover:bg-black/80"
                    >
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h2 className="text-2xl font-bold mb-6">Do you have a budget range in mind?</h2>

                  <RadioGroup
                    value={formData.budget}
                    onValueChange={(value) => setFormData({ ...formData, budget: value })}
                    className="space-y-4 mb-8"
                  >
                    {budgets.map((budget) => (
                      <div key={budget} className="flex items-center space-x-2">
                        <RadioGroupItem value={budget} id={budget} />
                        <Label htmlFor={budget}>{budget}</Label>
                      </div>
                    ))}
                  </RadioGroup>

                  <div className="flex justify-between">
                    <Button type="button" onClick={() => setStep(2)} variant="outline">
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setStep(4)}
                      disabled={!formData.budget}
                      className="bg-black text-white hover:bg-black/80"
                    >
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h2 className="text-2xl font-bold mb-6">How can we contact you?</h2>

                  <div className="space-y-4 mb-8">
                    <div>
                      <Label htmlFor="name">Full name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Optional"
                      />
                    </div>

                    <div>
                      <Label htmlFor="company">Company name</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Optional"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Anything else you'd like us to know</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                        placeholder="Optional"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" onClick={() => setStep(3)} variant="outline">
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="bg-black text-white hover:bg-black/80"
                      disabled={!formData.name || !formData.email || isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                  </div>
                </motion.div>
              )}
            </form>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-10 shadow-lg text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckIcon className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Thank you for your submission!</h2>
            <p className="text-black/70 mb-8">
              Your request has been received successfully, and our team will review it shortly. We will be in touch with
              you soon to discuss further steps.
            </p>
            <Button
              onClick={() => {
                setIsSubmitted(false)
                setStep(1)
                setFormData({
                  services: [],
                  timeline: "",
                  budget: "",
                  name: "",
                  email: "",
                  phone: "",
                  company: "",
                  message: "",
                })
              }}
              variant="outline"
            >
              Submit another request
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
