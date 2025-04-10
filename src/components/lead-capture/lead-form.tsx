"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

type LeadFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function LeadForm({ isOpen, onClose }: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessType: "",
    feedback: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Here you would typically send the data to your API or backend
    // For the demo, we'll just simulate a successful submission after a delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Save to localStorage to remember this user has submitted their info
      localStorage.setItem("lead_submitted", "true");
      localStorage.setItem("lead_data", JSON.stringify(formData));

      // Reset form after submission
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          businessType: "",
          feedback: "",
        });
      }, 3000);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Stay Connected</DialogTitle>
          <DialogDescription>
            Thanks for using Business Advisor AI! Share your contact details to receive personalized business insights and follow-up advice.
          </DialogDescription>
        </DialogHeader>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Your Name</label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Jane Smith"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email Address</label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="businessType" className="text-sm font-medium">Type of Business</label>
              <Input
                id="businessType"
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                placeholder="Retail, Service, Tech, etc."
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="feedback" className="text-sm font-medium">How can we improve our AI advice?</label>
              <Textarea
                id="feedback"
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                placeholder="Your feedback helps us enhance our service..."
                rows={3}
              />
            </div>

            <DialogFooter className="pt-4">
              <Button
                variant="outline"
                onClick={onClose}
                type="button"
                disabled={isSubmitting}
              >
                Not Now
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3 className="text-lg font-medium">Thank You!</h3>
            <p className="text-muted-foreground">
              We've received your information and will be in touch soon with personalized business insights.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
