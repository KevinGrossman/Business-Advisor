"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Moon, Sun, Globe, GitBranch } from "lucide-react";
import Chat from "@/components/chat-ui/chat";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
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
      <main className="flex-1 container py-6">
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
                <li className="bg-muted p-3 rounded-md">
                  “How can I improve customer retention for my small retail store?”
                </li>
                <li className="bg-muted p-3 rounded-md">
                  “What's the best approach to pricing my new service?”
                </li>
                <li className="bg-muted p-3 rounded-md">
                  “I need help with my marketing strategy for a limited budget.”
                </li>
                <li className="bg-muted p-3 rounded-md">
                  “How should I evaluate different suppliers for my restaurant?”
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Features</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Problem Identification
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Strategic Solutions
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Evaluation Frameworks
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Implementation Guidance
                </li>
              </ul>
            </div>
          </aside>

          {/* Chatbot */}
          <div className="md:col-span-2 border-l md:pl-6 h-[calc(100vh-150px)]">
            <Chat />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        Built with 💙 to help small business owners make better decisions.
      </footer>
    </div>
  );
}

