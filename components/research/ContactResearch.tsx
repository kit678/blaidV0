'use client';

import React, { useState } from 'react';
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
import { Calendar, Building, Mail, Phone, BookUser, MessageSquare, Users, ArrowRight, CheckIcon } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Props for the ContactResearch component.
 */
interface ContactResearchProps {}

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    data.contactType = contactType; // Add contact type to data

    try {
      await handleFormSubmit(data);
      setSubmissionStatus('success');
      (event.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmissionStatus('error');
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
            </div>
          )}
          
          {submissionStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl">
              There was an error submitting your form. Please try again or contact us directly at research@blaide.com.
            </div>
          )}

          {submissionStatus !== 'success' && (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Common Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</Label>
                  <Input id="name" name="name" type="text" required placeholder="Your Name" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</Label>
                  <Input id="email" name="email" type="email" required placeholder="your.email@example.com" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                  />
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
                          <Input id="phone" name="phone" type="tel" placeholder="+1 555-123-4567" 
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                          />
                      </div>
                  </div>
                  <div>
                    <Label htmlFor="investorInquiry" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Inquiry Type</Label>
                    <Select name="investorInquiry" required>
                      <SelectTrigger id="investorInquiry" 
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
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
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                    />
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
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 resize-y"
                />
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