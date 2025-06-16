"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Globe, Moon, Sun, Sparkles } from "lucide-react";
import ChatInterface from "@/components/chat-ui/chat";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sync dark mode with document class
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(prev => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          {/* Left: Logo & Nav */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Sparkles className="text-primary h-5 w-5" />
              <Link href="/" className="text-lg font-semibold hover:bg-muted/50 px-2 py-1 rounded transition-colors">
                Business Advisor AI
              </Link>
            </div>
            <nav className="hidden sm:flex items-center gap-4 text-sm font-medium">
              <Link href="/contact" className="hover:bg-muted/50 px-2 py-1 rounded transition-colors">
                Contact Us
              </Link>
              <Link href="/about" className="hover:bg-muted/50 px-2 py-1 rounded transition-colors">
                About Us
              </Link>
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden p-2 rounded hover:bg-muted/50"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Right: Theme Toggle & GitHub */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-2 rounded hover:bg-muted/50 transition-colors"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden bg-background border-t">
            <div className="container mx-auto px-4 py-2 flex flex-col gap-2">
              <Link
                href="/contact"
                className="px-3 py-2 rounded hover:bg-muted/50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
              <Link
                href="/about"
                className="px-3 py-2 rounded hover:bg-muted/50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <div className="flex items-center justify-between px-3 py-2">
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2"
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Get Started</h2>
              <p className="text-muted-foreground">
                Ask your business question to get personalized advice and solutions.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Example Questions</h3>
              <ul className="space-y-2 text-sm">
                {[
                  "How can I improve customer retention for my small retail store?",
                  "What's the best approach to pricing my new service?",
                  "I need help with my marketing strategy for a limited budget.",
                  "How should I evaluate different suppliers for my restaurant?"
                ].map((question, index) => (
                  <li
                    key={index}
                    className="bg-muted p-3 rounded-md hover:bg-muted/80 transition-colors cursor-pointer"
                    onClick={() => {
                      // This would be handled in your Chat component
                      console.log("Question clicked:", question);
                    }}
                  >
                    {question}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Features</h3>
              <ul className="space-y-2 text-sm">
                {[
                  "Problem Identification",
                  "Strategic Solutions",
                  "Evaluation Frameworks",
                  "Implementation Guidance"
                ].map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 hover:bg-muted/50 p-2 rounded transition-colors"
                  >
                    <Globe className="h-5 w-5 text-primary" /> {feature}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Chat Area */}
          <section className="md:col-span-2 flex flex-col border-l md:pl-6 h-[calc(100vh-150px)]">
            <ChatInterface />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-4">
          Built with 💙 to help small business owners make better decisions.
        </div>
      </footer>
    </div>
  );
}