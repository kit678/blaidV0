'use client';

import React, { useState, useRef } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar, Building, Mail, Phone, BookUser, MessageSquare, Users, ArrowRight, CheckIcon, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { z } from "zod";

/**
 * Props for the ContactResearch component.
 */
interface ContactResearchProps { }

// Form submission logic
async function handleFormSubmit(formData: any): Promise<void> {
  console.log("Submitting Form Data:", formData);
  const response = await fetch('/api/research-contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || errorData.message || 'Failed to submit form');
  }

  const responseData = await response.json();
  console.log("Form submitted successfully:", responseData);
}

// Zod schema for validation
const researchContactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long").regex(/^[a-zA-Z\s\-\.\']+$/, "Name contains invalid characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  institution: z.string().optional(),
  researchArea: z.string().optional(),
  message: z.string().min(1, "Message is required"),
})

/**
 * Contact section component for the Research subdomain.
 * Includes segmentation for Investor/Academic and conditional forms.
 * @param props - The props for the component.
 * @returns The rendered contact section.
 */
export const ContactResearch: React.FC<ContactResearchProps> = (props) => {
  const [contactType, setContactType] = useState<'investor' | 'academic'>('investor');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'success' | 'error' | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | undefined>();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const turnstileRef = useRef<TurnstileInstance>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrors({}); // Clear previous errors
    const formData = new FormData(event.currentTarget);
    const data: any = Object.fromEntries(formData.entries());

    // Manually add controlled components
    data.contactType = contactType;
    data.cf_turnstile_response = captchaToken;
    data.phone = phone; // Override phone from FormData (which might be empty or raw) with the controlled PhoneInput value

    // 1. Validation Logic
    let isValid = true;
    const newErrors: Record<string, string> = {};

    // Run Zod validation
    const result = researchContactSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach(issue => {
        newErrors[issue.path[0] as string] = issue.message;
      });
      isValid = false;
    }

    // Specific custom checks (mirroring backend logic for consistency)
    if (data.name && data.name.length > 20 && !data.name.includes(" ")) {
      newErrors.name = "Please enter your full name (First and Last)";
      isValid = false;
    }

    // Additional required field checks depending on type
    if (contactType === 'academic' && !data.institution) {
      newErrors.institution = "Institution is required";
      isValid = false;
    }

    // Determine if inquiry selects are selected
    if (contactType === 'investor' && !data.investorInquiry) {
      // Selects might not throw validation error if empty string, but let's check
      // Radix UI Select usually handles 'required' generally, but if not we can check here.
    }

    if (!isValid) {
      setErrors(newErrors);
      // Determine where the first error is to potentially scroll or alert? 
      // For now, inline messages are enough.
      return;
    }

    if (!captchaToken) {
      alert("Please complete the verification check."); // Or use a toast/inline error
      return;
    }

    setIsSubmitting(true);
    setSubmissionStatus(null);

    try {
      await handleFormSubmit(data);
      setSubmissionStatus('success');
      (event.target as HTMLFormElement).reset();
      setPhone(undefined); // Reset phone state
      setCaptchaToken(null);
      turnstileRef.current?.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmissionStatus('error');
      // Reset captcha on failure
      setCaptchaToken(null);
      turnstileRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-24 w-full bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Contact Blaide Research
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            For inquiries about our research, collaborations, or investment opportunities
          </p>
        </motion.div>

        {/* Form Area */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
          {/* Segmentation Section */}
          <div className="mb-10">
            <div className="flex justify-center items-center gap-4 bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <button
                onClick={() => setContactType('investor')}
                type="button"
                className={cn(
                  "flex-1 py-3 px-4 rounded-lg text-center transition-all font-medium",
                  contactType === 'investor'
                    ? "bg-black text-white"
                    : "bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                )}
              >
                I am an Investor
              </button>
              <button
                onClick={() => setContactType('academic')}
                type="button"
                className={cn(
                  "flex-1 py-3 px-4 rounded-lg text-center transition-all font-medium",
                  contactType === 'academic'
                    ? "bg-black text-white"
                    : "bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                )}
              >
                I am an Academic
              </button>
            </div>
          </div>

          {submissionStatus === 'success' && (
            <div className="mb-6 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 rounded-xl flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-800/30 rounded-full flex items-center justify-center mb-4">
                <CheckIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
              <p>Your message has been submitted successfully. We'll be in touch with you shortly.</p>
              <Button
                onClick={() => setSubmissionStatus(null)}
                className="mt-4"
                variant="outline"
              >
                Send Another Message
              </Button>
            </div>
          )}

          {submissionStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl">
              There was an error submitting your form. Please try again or contact us directly at research@blaide.com.
            </div>
          )}

          {submissionStatus !== 'success' && (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* HONEYPOT FIELD (Hidden) */}
              <input
                type="text"
                name="website_url"
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Common Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</Label>
                  <Input id="name" name="name" type="text" required placeholder="Your Name"
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-800",
                      errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-700"
                    )}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1 flex items-center"><AlertCircle className="w-3 h-3 mr-1" />{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</Label>
                  <Input id="email" name="email" type="email" required placeholder="your.email@example.com"
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-800",
                      errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-700"
                    )}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1 flex items-center"><AlertCircle className="w-3 h-3 mr-1" />{errors.email}</p>}
                </div>
              </div>

              {/* Investor Specific Fields */}
              {contactType === 'investor' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="company" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Company</Label>
                      <Input id="company" name="company" type="text" placeholder="Your Company Name"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Phone (Optional)</Label>
                      <PhoneInput
                        value={phone}
                        onChange={setPhone}
                        defaultCountry="US"
                        placeholder="Optional"
                        className={cn("flex h-[50px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", {
                          "border-red-500": errors.phone
                        })}
                        numberInputProps={{
                          className: "flex h-full w-full rounded-md border-0 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
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
                  </div>
                  <div>
                    <Label htmlFor="investorInquiry" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Inquiry Type</Label>
                    <Select name="investorInquiry" required>
                      <SelectTrigger id="investorInquiry"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 h-auto">
                        <SelectValue placeholder="Select reason for contact..." />
                      </SelectTrigger>
                      <SelectContent
                        className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg z-50"
                      >
                        <SelectItem value="schedule_demo" className="py-2">Schedule a Demonstration</SelectItem>
                        <SelectItem value="data_access" className="py-2">Data Access Inquiry</SelectItem>
                        <SelectItem value="investment_ops" className="py-2">Investment Opportunities</SelectItem>
                        <SelectItem value="general" className="py-2">General Question</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {/* Academic Specific Fields */}
              {contactType === 'academic' && (
                <>
                  <div>
                    <Label htmlFor="institution" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Institution / University</Label>
                    <Input id="institution" name="institution" type="text" required placeholder="Name of your Institution"
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-800",
                        errors.institution ? "border-red-500" : "border-gray-300 dark:border-gray-700"
                      )}
                    />
                    {errors.institution && <p className="text-red-500 text-sm mt-1 flex items-center"><AlertCircle className="w-3 h-3 mr-1" />{errors.institution}</p>}
                  </div>
                  <div>
                    <Label htmlFor="researchArea" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Area of Research (Optional)</Label>
                    <Input id="researchArea" name="researchArea" type="text" placeholder="e.g., Quantitative Finance, Econophysics"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                    />
                  </div>
                  <div>
                    <Label htmlFor="academicInquiry" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Inquiry Type</Label>
                    <Select name="academicInquiry" required>
                      <SelectTrigger id="academicInquiry"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 h-auto">
                        <SelectValue placeholder="Select reason for contact..." />
                      </SelectTrigger>
                      <SelectContent
                        className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg z-50"
                      >
                        <SelectItem value="collaboration" className="py-2">Collaboration Inquiry</SelectItem>
                        <SelectItem value="whitepaper" className="py-2">Whitepaper Questions</SelectItem>
                        <SelectItem value="methodology" className="py-2">Methodology Inquiry</SelectItem>
                        <SelectItem value="data_request" className="py-2">Data Request</SelectItem>
                        <SelectItem value="general" className="py-2">General Question</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {/* Common Message Field */}
              <div>
                <Label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Your detailed message..."
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-800 resize-y",
                    errors.message ? "border-red-500" : "border-gray-300 dark:border-gray-700"
                  )}
                />
                {errors.message && <p className="text-red-500 text-sm mt-1 flex items-center"><AlertCircle className="w-3 h-3 mr-1" />{errors.message}</p>}
              </div>

              {/* Turnstile Widget */}
              <div className="flex justify-center min-h-[65px]">
                {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? (
                  <Turnstile
                    ref={turnstileRef}
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                    onSuccess={setCaptchaToken}
                    options={{
                      theme: 'light',
                    }}
                  />
                ) : (
                  <p className="text-red-500 text-sm">Error: Turnstile Site Key is missing.</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-3 px-8 rounded-full bg-black text-white hover:bg-black/80 dark:hover:bg-black/70 transition-colors font-medium w-full sm:w-auto"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
