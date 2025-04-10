import { NextResponse } from "next/server";

export const runtime = "nodejs"; // Required for server-side fetch in Next.js

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body?.messages) {
      console.error("Missing `messages` in request body:", body);
      return NextResponse.json(
        { error: "`messages` field is required in the request body" },
        { status: 400 }
      );
    }

    const userMessage = body.messages[body.messages.length - 1]?.content;

    if (!userMessage) {
      return NextResponse.json(
        { error: "No user input provided." },
        { status: 400 }
      );
    }

    // 🧠 System prompt – business advisor context
    const systemMessage = `
You are a helpful AI Business Advisor specifically designed to assist small business owners.

Your expertise covers:
1. Problem identification - help owners identify and articulate business challenges
2. Solution alternatives - provide multiple viable options based on best practices
3. Evaluation frameworks - help assess options using relevant criteria
4. Implementation guidance - practical steps to execute chosen solutions
5. Follow-up planning - create action schedules and notifications to help the owner stay on track

Your goal is to empower small business owners with professional-quality advice that is tailored to their specific situation.
`;

    const ollamaUrl = "http://127.0.0.1:11434/api/generate";

    const response = await fetch(ollamaUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gemma:2b", // 🔄 Change if you want to use another model

        // model: "gemma:2b-q4_K_M",

        prompt: `${systemMessage}\nUser: ${userMessage}\nAI:`,
        stream: false,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Ollama API error: ${error}`);
    }

    const data = await response.json();

    return NextResponse.json({
      messages: [
        {
          role: "assistant",
          content: data.response || "No content returned from model.",
        },
      ],
    });

  } catch (err: any) {
    console.error("❌ Error in chat API route:", err);
    return NextResponse.json(
      {
        error: "Failed to get response from AI",
        details: err.message || "Unknown error occurred",
        solution: "Ensure Ollama is running on port 11434 and your model is available.",
      },
      { status: 500 }
    );
  }
}
