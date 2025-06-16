"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Moon, Sun, Globe } from "lucide-react";

export default function AboutPage() {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle the dark mode manually
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    // Add or remove the "dark" class on the root element
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container max-w-3xl py-12 space-y-10">
        <section>
          <h1 className="text-4xl font-bold tracking-tight mb-2">About Us</h1>
          <p className="text-muted-foreground">
            Business Advisor AI is an intelligent assistant designed to help entrepreneurs
            and small business owners make better decisions — quickly and confidently.
          </p>
        </section>
  
        <section>
          <h2 className="text-2xl font-semibold mb-1">Built for Green River College</h2>
          <p className="text-muted-foreground">
            This tool was developed in partnership with the 
            <strong> Green River College Small Business Center</strong> to support local entrepreneurs
            with accessible, expert-informed guidance 24/7.
          </p>
        </section>
  
        <section>
          <h2 className="text-2xl font-semibold mb-1">What It Does</h2>
          <ul className="list-disc pl-6 text-muted-foreground space-y-1">
            <li>Analyzes your business challenges in real time</li>
            <li>Offers tailored strategies and solutions</li>
            <li>Provides decision frameworks and actionable steps</li>
            <li>Simplifies complex business concepts</li>
          </ul>
        </section>
  
        <section>
          <h2 className="text-2xl font-semibold mb-1">How It Works</h2>
          <p className="text-muted-foreground">
            Just ask a business question — like “How do I find new customers?” or
            “What should I include in a business plan?” — and our AI will provide a short,
            focused response backed by proven strategies.
          </p>
        </section>
  
        <section>
          <h2 className="text-2xl font-semibold mb-1">Need Help?</h2>
          <p className="text-muted-foreground my-5">
            This assistant is a starting point. For deeper support, reach out to the 
            Green River College Small Business Center directly for 1-on-1 advising.
          </p>
          <Link
                href="/contact"
                className="px-3 py-2 rounded-md bg-blue-700 hover:bg-blue-900 transition-colors text-white"
            >
                Contact Us
            </Link>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        Built with 💙 to help small business owners make better decisions.
      </footer>
    </div>
  );
}
