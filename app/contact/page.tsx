"use client"

import type React from "react"
import { cn } from "@/lib/utils"

import { useState, useRef, useEffect } from "react"
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckIcon, ArrowRight, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { z } from "zod"

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
  website_url?: string; // Honeypot field
  cf_turnstile_response?: string; // Captcha token
}

// Zod schema for validation
const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long").regex(/^[a-zA-Z\s\-\.\']+$/, "Name contains invalid characters"), // Simple regex for name
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(), // Phone is technically optional based on existing code placeholders ("Optional"), but user asked for "number" validation.
  company: z.string().optional(),
  message: z.string().optional(),
})

export default function ContactPage() {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const router = useRouter()
  const turnstileRef = useRef<TurnstileInstance>(null)

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
    website_url: "",
  })
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Clear specific error when user types
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateCurrentStep = () => {
    const newErrors: Record<string, string> = {}
    let isValid = true

    if (step === 3) { // Contact Details Step
      const result = contactSchema.safeParse({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        message: formData.message
      })

      if (!result.success) {
        result.error.issues.forEach(issue => {
          newErrors[issue.path[0] as string] = issue.message
        })
        isValid = false
      }

      // Custom check for suspicious single-word long names if not caught by regex
      if (formData.name && formData.name.length > 20 && !formData.name.includes(" ")) {
        newErrors.name = "Please enter your full name (First and Last)";
        isValid = false;
      }

      // Phone validation (if provided)
      // react-phone-number-input usually ensures valid format, but we can check existence if required.
      // Based on USER request: "instead of numbers... I put letters" -> PhoneInput handles this by masking.
      // We assume phone is optional based on placeholder, but if entered, it should be valid?
      // The library 'isValidPhoneNumber' could be used, but for now we trust the input's masking.
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateCurrentStep()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form.",
        variant: "destructive",
      })
      return
    }

    if (!captchaToken) {
      toast({
        title: "Verification Required",
        description: "Please complete the security check.",
        variant: "destructive",
      })
      return;
    }

    try {
      setIsSubmitting(true)

      const payload = { ...formData, cf_turnstile_response: captchaToken }

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to send message')
      }

      setIsSubmitted(true)

    } catch (error: any) {
      console.error('Error submitting form:', error)
      toast({
        title: "Error",
        description: error.message || "There was a problem sending your message. Please try again.",
        variant: "destructive",
      })
      // Reset captcha on failure
      turnstileRef.current?.reset()
      setCaptchaToken(null)
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
                  const totalSteps = initialIntent === 'service_inquiry' ? 3 : 4;
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
              {/* HONEYPOT FIELD (Hidden) */}
              <input
                type="text"
                name="website_url"
                value={formData.website_url}
                onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

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
                      onChange={(e) => handleInputChange('message', e.target.value)}
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

              {/* STEP 1: Timeline */}
              {step === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h2 className="text-2xl font-bold mb-6">
                    {formData.intent === 'service_inquiry'
                      ? `Timeline for ${formData.service?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Service Inquiry'}`
                      : "Please provide information on a timeline"}
                  </h2>
                  <RadioGroup
                    value={formData.timeline}
                    onValueChange={(value) => handleInputChange('timeline', value)}
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

              {/* STEP 2: Budget */}
              {step === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h2 className="text-2xl font-bold mb-6">
                    {formData.intent === 'service_inquiry'
                      ? `Budget for ${formData.service?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Service Inquiry'}`
                      : "Do you have a budget range in mind?"}
                  </h2>

                  <RadioGroup
                    value={formData.budget}
                    onValueChange={(value) => handleInputChange('budget', value)}
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

              {/* STEP 3: Contact Details */}
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
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`rounded-lg bg-white text-black border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500`}
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1 flex items-center"><AlertCircle className="w-3 h-3 mr-1" />{errors.name}</p>}
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`rounded-lg bg-white text-black border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500`}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1 flex items-center"><AlertCircle className="w-3 h-3 mr-1" />{errors.email}</p>}
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone number</Label>
                      <PhoneInput
                        defaultCountry="US"
                        placeholder="Optional"
                        value={formData.phone}
                        onChange={(value) => handleInputChange('phone', value || '')}
                        className={cn("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", {
                          "border-red-500": errors.phone
                        })}
                        // We need to style the input inside PhoneInput to match ours
                        numberInputProps={{
                          className: "flex h-10 w-full rounded-md border-0 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
                        }}
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1 flex items-center"><AlertCircle className="w-3 h-3 mr-1" />{errors.phone}</p>}
                      <style jsx global>{`
                        .PhoneInput {
                          display: flex;
                          align-items: center;
                          border-radius: 0.5rem;
                          border: 1px solid #e5e7eb;
                          padding-left: 12px;
                          background-color: white !important; 
                        }
                        .dark .PhoneInput {
                           background-color: #1f2937 !important; /* gray-800 */
                           border-color: #374151; /* gray-700 */
                           color: white;
                        }
                        .PhoneInputInput {
                          border: none;
                          outline: none;
                          background: transparent;
                          height: 100%;
                          box-shadow: none !important;
                        }
                        .PhoneInputCountryIcon {
                          width: 24px;
                          height: 18px;
                        }
                        .PhoneInputCountrySelectArrow {
                           opacity: 0.5;
                        }
                      `}</style>
                    </div>

                    <div>
                      <Label htmlFor="company">Company name</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
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
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          rows={4}
                          placeholder="e.g., Feature X, Integration Y, Specific Use Case Z"
                          className="rounded-lg bg-white text-black border border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500"
                        />
                      </div>
                    )}

                    {/* Turnstile Widget */}
                    <div className="flex justify-center mb-6 min-h-[65px]">
                      {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? (
                        <Turnstile
                          ref={turnstileRef}
                          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                          onSuccess={(token) => {
                            console.log("Turnstile success:", token);
                            setCaptchaToken(token);
                          }}
                          onError={() => {
                            console.error("Turnstile error");
                            toast({
                              title: "Security Check Failed",
                              description: "Please refresh the page and try again.",
                              variant: "destructive",
                            });
                          }}
                          options={{
                            theme: 'light',
                          }}
                        />
                      ) : (
                        <p className="text-red-500 text-sm">Error: Turnstile Site Key is missing.</p>
                      )}
                    </div>

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
                      disabled={isSubmitting}
                      className="bg-black text-white hover:bg-gray-800 rounded-full px-8 py-6 text-lg w-full sm:w-auto transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="mr-2"
                          >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="60 100" />
                            </svg>
                          </motion.div>
                          Sending...
                        </>
                      ) : (
                        <>
                          Submit
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
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
                  website_url: "", // Reset honeypot
                })
                setCaptchaToken(null)
                if (turnstileRef.current) turnstileRef.current.reset()
                router.push('/contact')
              }}
              variant="dark-pill"
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
