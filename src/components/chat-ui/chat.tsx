

"use client";

import { useEffect, useRef, useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { LeadForm } from "@/components/lead-capture/lead-form";
import { RefreshCw, Send, Upload, Image as ImgIcon, FileText, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  image?: string;
  mimeType?: string;
  timestamp?: Date;
}

const AVAILABLE_MODELS = [
  {
    name: "1.5 Flash",
    value: "gemini-1.5-flash",
    description: "Fast text & image analysis",
    icon: <Sparkles className="h-4 w-4 text-yellow-500" />,
    capabilities: ["text", "image-analysis"]
  },
  {
    name: "2.0 Flash",
    value: "gemini-2.0-flash",
    description: "Next-gen speed & video",
    icon: <Sparkles className="h-4 w-4 text-blue-500" />,
    capabilities: ["text", "image-analysis", "video-analysis"]
  },
  {
    name: "1.5 Pro",
    value: "gemini-1.5-flash-latest",
    description: "Advanced reasoning",
    icon: <Sparkles className="h-4 w-4 text-purple-500" />,
    capabilities: ["text", "image-analysis", "audio-analysis"]
  },
  {
    name: "2.5 Pro",
    value: "gemini-2.5-pro-preview-05-06",
    description: "Multimodal & image gen",
    icon: <Sparkles className="h-4 w-4 text-green-500" />,
    capabilities: ["text", "image-generation", "video-analysis"]
  }
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ message: string, retry?: () => void } | null>(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  // Toolbar state
  const [model, setModel] = useState("gemini-1.5-flash");
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const selectedModel = AVAILABLE_MODELS.find(m => m.value === model) || AVAILABLE_MODELS[0];

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const selectedFile = e.target.files[0];
    const validTypes = ["image/png", "image/jpeg", "image/webp", "application/pdf"];

    if (!validTypes.includes(selectedFile.type)) {
      setError({
        message: "Unsupported file type. Please upload an image or PDF.",
        retry: undefined
      });
      return;
    }

    setFile(selectedFile);
  };

  const clearFile = () => {
    setFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString().split(',')[1] || '');
    reader.onerror = error => reject(error);
  });

  const sendMessage = async () => {
    if (!input.trim() && !file) return;

    const userMsg: Message = {
      role: "user",
      content: input || (file ? "Analyze this document" : ""),
      timestamp: new Date(),
    };

    try {
      // Handle file if present
      if (file) {
        const base64File = await toBase64(file);
        if (file.type.startsWith("image/")) {
          userMsg.image = base64File;
          userMsg.mimeType = file.type;
        }
      }

      setMessages(m => [...m, userMsg]);
      setInput("");
      setLoading(true);
      setError(null);

      const form = new FormData();
      form.append("model", model);
      form.append("messages", JSON.stringify([...messages, userMsg]));
      if (file) form.append("file", file);

      const res = await fetch("/api/chat", {
        method: "POST",
        body: form
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || errorData.message || "Request failed");
      }

      const data = await res.json();
      setMessages(m => [...m, ...data.messages]);
    } catch (err: unknown) {
      const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";

    setError({
      message: errorMessage,
      retry: sendMessage,
    });
    } finally {
      setLoading(false);
      clearFile();
    }
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-background rounded-lg overflow-hidden border">
      {/* Toolbar */}
      <div className="flex items-center px-4 py-2 bg-muted/50 border-b gap-2">
      <Select>
        <SelectTrigger className="w-100 relative flex items-center justify-between">
          <SelectValue placeholder="Select a model" />
          <span className="dropdown-arrow"></span>
        </SelectTrigger>
        <SelectContent>
          {AVAILABLE_MODELS.map((model) => (
            <SelectItem key={model.value} value={model.value}>
              <div className="flex flex-col">
                <span className="flex items-center">
                  {model.icon} <span className="ml-2">{model.name}</span>
                </span>
                <span className="text-sm text-muted-foreground">{model.description}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => fileRef.current?.click()}
          disabled={loading}
        >
          <Upload className="h-4 w-4 mr-2" />
          {file ? (
            <span className="truncate max-w-[100px]">{file.name}</span>
          ) : "Attach"}
        </Button>
        <input
          type="file"
          ref={fileRef}
          onChange={handleFile}
          className="hidden"
          accept="image/*,.pdf"
        />

        {selectedModel.capabilities.some(cap => cap.includes("image")) && (
          <div className="ml-auto flex items-center text-xs text-muted-foreground">
            <ImgIcon className="h-4 w-4 mr-1" />
            <span>
              {selectedModel.capabilities.includes("image-generation")
                ? "Supports generation"
                : "Supports analysis"}
            </span>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "flex gap-3 items-start",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {msg.role === "assistant" && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/bot-avatar.png" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}

              <div
                className={cn(
                  "max-w-[80%] px-4 py-3 rounded-lg",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {msg.image && (
                  <div className="mb-2">
                    <img
                      src={`data:${msg.mimeType};base64,${msg.image}`}
                      alt="Content"
                      className="max-w-full max-h-64 rounded"
                    />
                  </div>
                )}
                <ReactMarkdown>{msg.content}</ReactMarkdown>
                <div className="text-xs mt-1 opacity-70">
                  {msg.timestamp?.toLocaleTimeString()}
                </div>
              </div>

              {msg.role === "user" && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/user-avatar.png" />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))
        )}

        {loading && (
          <div className="flex gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[180px]" />
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 text-destructive">
            <div className="flex flex-col items-center text-center">
              <p>{error.message}</p>
              {error.retry && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={error.retry}
                  className="mt-2"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              )}
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>

      <Separator />

      {/* Input */}
      <div className="p-3 bg-background">
        <div className="flex gap-2">
          <Input
            placeholder="Ask a business question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            disabled={loading}
          />
          <Button
            onClick={sendMessage}
            disabled={loading || (!input.trim() && !file)}
          >
            {loading ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <LeadForm isOpen={showLeadForm} onClose={() => setShowLeadForm(false)} />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
      <Sparkles className="h-8 w-8 mb-2" />
      <p>Start a conversation with your business advisor</p>
    </div>
  );
}