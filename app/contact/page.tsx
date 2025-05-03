"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from 'next/navigation'
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
  timeline: string;
  budget: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  intent: string | null;
  product: string | null;
  service: string | null;
}

export default function ContactPage() {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const router = useRouter()

  const initialIntent = searchParams.get('intent') || 'general'
  const initialProduct = searchParams.get('product')
  const initialService = searchParams.get('service')

  const getInitialStep = () => {
    if (initialIntent === 'demo') {
      return 3; // Skip directly to contact details for demo requests
    } else if (initialIntent === 'service_inquiry') {
      return 1; // Start with timeline for service inquiries
    } else {
        return 0; // Start with the new "How can we help?" step for general
    }
  }

  const [step, setStep] = useState(getInitialStep())
  const [formData, setFormData] = useState<FormData>({
    timeline: "",
    budget: "",
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    intent: initialIntent,
    product: initialProduct,
    service: initialService,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setIsSubmitting(true)
      
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

  const timelines = ["1-60 days", "60-180 days", "180-365 days", "+ 365 days", "Not Sure"]
  const budgets = ["$5,000 - $15,000", "$15,000 - $30,000", "$30,000 - $50,000", "+ $50,000", "Not Sure"]

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
            {/* Conditionally render the step indicator */} 
            {initialIntent !== 'demo' && (
            <div className="flex mb-8">
              {[1, 2, 3, 4].map((displayStep, index) => {
                 // Determine total steps based on intent
                   // For demo, totalSteps was 1, now this section is skipped entirely.
                   // For service_inquiry, totalSteps = 3
                   // For general, totalSteps = 4
                   const totalSteps = initialIntent === 'service_inquiry' ? 3 : 4; 
                   // Adjust display step condition based on remaining intents
                   if (initialIntent === 'service_inquiry' && displayStep > totalSteps) return null; 
                   if (initialIntent === 'general' && displayStep > totalSteps) return null; 
 
                 // Map display steps to actual internal step state values
                 let actualStep = 0;
                   if (initialIntent === 'service_inquiry') {
                   actualStep = index + 1; // Service inquiry: 1=Timeline, 2=Budget, 3=Contact
                   } else { // Must be 'general' if not 'demo' or 'service_inquiry'
                   actualStep = index; // General inquiry: 0=Help, 1=Timeline, 2=Budget, 3=Contact
                 }

                const isActive = step >= actualStep;
                const isCompleted = step > actualStep;

                return (
                  <div key={displayStep} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? "bg-black text-white" : "bg-gray-200 text-gray-500"}`}
                    >
                      {isCompleted ? <CheckIcon className="h-4 w-4" /> : displayStep}
                    </div>
                    {displayStep < totalSteps && (
                      <div className={`h-1 w-16 ${isActive ? "bg-black" : "bg-gray-200"}`}></div>
                    )}
                  </div>
                )
              })}
            </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* STEP 0: How can we help? (General Inquiry Only) */}
              {step === 0 && formData.intent === 'general' && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                   <h2 className="text-2xl font-bold mb-6">How can we help you today?</h2>
                   <p className="text-black/70 mb-8">Please describe your question or project idea.</p>
                   <div>
                       <Label htmlFor="message-step0">Your Message</Label>
                       <Textarea
                         id="message-step0"
                         value={formData.message}
                         onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                         rows={5}
                         required // Make message required at this step
                         className="rounded-lg bg-white text-black focus-visible:ring-0 focus-visible:ring-offset-0"
                       />
                    </div>
                    <div className="flex justify-end mt-8">
                       <Button
                         type="button"
                         onClick={() => setStep(1)} // Go to Timeline
                         disabled={!formData.message} // Disable if message is empty
                         variant="dark-pill"
                         size="pill"
                       >
                         Next <ArrowRight className="ml-2 h-4 w-4" />
                       </Button>
                    </div>
                 </motion.div>
              )}

              {/* STEP 1: Timeline (was Step 2) - General & Service Inquiry */}
              {step === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h2 className="text-2xl font-bold mb-6">
                    {formData.intent === 'service_inquiry' 
                      ? `Timeline for ${formData.service?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Service Inquiry'}` 
                      : "Please provide information on a timeline"}
                  </h2>
                  <RadioGroup
                    value={formData.timeline}
                    onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                    className="space-y-4 mb-8"
                  >
                    {timelines.map((timeline) => (
                      <div key={timeline} className="flex items-center space-x-3">
                        <RadioGroupItem value={timeline} id={timeline} className="border-gray-400 text-black" />
                        <Label htmlFor={timeline} className="text-black/90">{timeline}</Label>
                      </div>
                    ))}
                  </RadioGroup>

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={() => setStep(2)}
                      variant="dark-pill"
                      size="pill"
                    >
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h2 className="text-2xl font-bold mb-6">
                    {formData.intent === 'service_inquiry' 
                      ? `Budget for ${formData.service?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Service Inquiry'}` 
                      : "Do you have a budget range in mind?"}
                  </h2>

                  <RadioGroup
                    value={formData.budget}
                    onValueChange={(value) => setFormData({ ...formData, budget: value })}
                    className="space-y-4 mb-8"
                  >
                    {budgets.map((budget) => (
                      <div key={budget} className="flex items-center space-x-3">
                        <RadioGroupItem value={budget} id={budget} className="border-gray-400 text-black" />
                        <Label htmlFor={budget} className="text-black/90">{budget}</Label>
                      </div>
                    ))}
                  </RadioGroup>

                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      onClick={() => setStep(1)}
                      variant="outline"
                      size="pill"
                      className="border-gray-400 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setStep(3)}
                      variant="dark-pill"
                      size="pill"
                    >
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h2 className="text-2xl font-bold mb-6">
                    {formData.intent === 'demo' 
                      ? `Schedule Demo for ${formData.product?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Product'}`
                      : "How can we contact you?"}
                  </h2>

                  <div className="space-y-4 mb-8">
                    <div>
                      <Label htmlFor="name">Full name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="rounded-lg bg-white text-black border border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500"
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
                        className="rounded-lg bg-white text-black border border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500"
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
                        className="rounded-lg bg-white text-black border border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="company">Company name</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Optional"
                        className="rounded-lg bg-white text-black border border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500"
                      />
                    </div>

                    {formData.intent === 'demo' && (
                       <div>
                        <Label htmlFor="message">Specific areas of interest for the demo? (Optional)</Label>
                         <Textarea
                           id="message"
                           value={formData.message}
                           onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                           rows={4}
                           placeholder="e.g., Feature X, Integration Y, Specific Use Case Z"
                           className="rounded-lg bg-white text-black border border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500"
                         />
                       </div>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      onClick={() => setStep(formData.intent === 'general' ? 2 : (formData.intent === 'service_inquiry' ? 2 : 1))}
                      size="pill"
                      className="bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="dark-pill"
                      size="pill"
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
              {formData.intent === 'demo' 
                ? `Your request for a demo of ${formData.product?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'the product'} has been received. We'll be in touch shortly to schedule a time.`
                : formData.intent === 'service_inquiry'
                ? `Your inquiry about ${formData.service?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'our service'} has been received successfully. Our team will review it and be in touch soon.`
                : "Your request has been received successfully, and our team will review it shortly. We will be in touch with you soon to discuss further steps."}
            </p>
            <Button
              onClick={() => {
                setIsSubmitted(false)
                setStep(0) // Reset to the first step (Help step)
                setFormData({
                  timeline: "",
                  budget: "",
                  name: "",
                  email: "",
                  phone: "",
                  company: "",
                  message: "",
                  intent: 'general',
                  product: null,
                  service: null,
                })
                router.push('/contact')
              }}
              variant="outline"
              size="pill"
              className="force-rounded-lg"
            >
              Submit another request
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
