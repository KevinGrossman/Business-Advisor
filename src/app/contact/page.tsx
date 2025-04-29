"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Moon, Sun, Globe, GitBranch } from "lucide-react";

export default function ContactPage() {
  const [darkMode, setDarkMode] = useState(false);

  // Handle dark mode toggle
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-all duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow">
        <div className="container flex h-16 items-center justify-between">
          {/* Left section: Logo + Contact/About */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
                <Globe className="text-primary" />
                    <Link 
                    href="/" 
                    className="text-lg font-semibold px-3 py-2 rounded-md hover:bg-muted transition-colors">
                        Business Advisor AI
                    </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4 text-sm font-medium">
                <Link
                  href="/contact"
                  className="px-3 py-2 rounded-md hover:bg-muted transition-colors"
                >
                  Contact Us
                </Link>
                <Link
                  href="/about"
                  className="px-3 py-2 rounded-md hover:bg-muted transition-colors"
                >
                  About Us
                </Link>
              </div>
            </div>
          </div>

          {/* Right section: Dark mode toggle + GitHub */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" asChild>
              <Link
                href="https://github.com/Rauoof814/Business-Advisor.git"
                target="_blank"
              >
                <GitBranch className="mr-2 h-4 w-4" />
                GitHub
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container max-w-3xl py-12 space-y-10">
        <section>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Contact Us</h1>
          <p className="text-muted-foreground">
            We are here to help! Fill out the form below or reach out directly
            to the Green River College Small Business Center for personalized assistance.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Get In Touch</h2>

          {/* Contact Form */}
          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-muted-foreground"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your full name"
                className="mt-1 p-2 w-full rounded-md border border-muted focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-muted-foreground"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your email address"
                className="mt-1 p-2 w-full rounded-md border border-muted focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-muted-foreground"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Your message"
                className="mt-1 p-2 w-full rounded-md border border-muted focus:ring-primary focus:border-primary"
                required
              ></textarea>
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="mt-2">
                Send Message
              </Button>
            </div>
          </form>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-1">Reach Out Directly</h2>
          <p className="text-muted-foreground">
            If you prefer, you can also reach out to the Green River College
            Small Business Center for more in-depth assistance:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-1">
            <li>Phone: (123) 456-7890</li>
            <li>Email: support@greenriver.edu</li>
            <li>Address: 123 Main St, Auburn, WA 98092</li>
          </ul>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        Built with 💙 to help small business owners make better decisions.
      </footer>
    </div>
  );
}
