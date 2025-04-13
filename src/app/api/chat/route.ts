
import { NextResponse } from "next/server";

export const runtime = "edge";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `You are a concise business advisor. Provide short, actionable answers (2-3 sentences max). Use bullet points when helpful.`;

export async function POST(req: Request) {
  try {
    const startTime = Date.now();

    const body = await req.json();
    const userMessage = body.messages[body.messages.length - 1]?.content;

    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Client-Location": "US"
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: SYSTEM_PROMPT },
            { text: `Question: ${userMessage}\nAnswer:` }
          ]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
          responseMimeType: "text/plain"
        }
      }),
    });

    console.log(`API latency: ${Date.now() - startTime}ms`);

    const data = await response.json();
    return NextResponse.json({
      messages: [{
        role: "assistant",
        content: data.candidates?.[0]?.content?.parts?.[0]?.text || ""
      }],
    });

  } catch (err) {
    return NextResponse.json(
      { error: "Please try again" },
      { status: 500 }
    );
  }
}