
// import { NextResponse } from "next/server";

// export const runtime = "edge";

// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// const SYSTEM_PROMPT = `You are a concise business advisor. Provide short, actionable answers (2-3 sentences max). Use bullet points when helpful.`;

// export async function POST(req: Request) {
//   try {
//     const startTime = Date.now();

//     const body = await req.json();
//     const userMessage = body.messages[body.messages.length - 1]?.content;

//     const response = await fetch(GEMINI_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "X-Client-Location": "US"
//       },
//       body: JSON.stringify({
//         contents: [{
//           parts: [
//             { text: SYSTEM_PROMPT },
//             { text: `Question: ${userMessage}\nAnswer:` }
//           ]
//         }],
//         generationConfig: {
//           temperature: 0.7,
//           maxOutputTokens: 500,
//           responseMimeType: "text/plain"
//         }
//       }),
//     });

//     console.log(`API latency: ${Date.now() - startTime}ms`);

//     const data = await response.json();
//     return NextResponse.json({
//       messages: [{
//         role: "assistant",
//         content: data.candidates?.[0]?.content?.parts?.[0]?.text || ""
//       }],
//     });

//   } catch (err) {
//     return NextResponse.json(
//       { error: "Please try again" },
//       { status: 500 }
//     );
//   }
// }









// import { NextResponse } from "next/server";

// export const runtime = "edge";

// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// const AVAILABLE_MODELS = {
//   PRO: "gemini-1.5-pro-latest", // Most capable generally available model
//   FLASH: "gemini-1.5-flash-latest" // Fastest generally available model
// };

// const SYSTEM_PROMPT = `
// You are an expert AI Business Advisor specializing in small-to-medium enterprises. 

// Response Guidelines:
// 1. Lead with the most actionable insight
// 2. Use concise bullet points for recommendations
// 3. Include implementation steps when relevant
// 4. Limit to 3-5 key points maximum
// 5. Response time must be optimized for speed

// Specialize in:
// - Quick problem diagnosis
// - Cost-effective solutions
// - Scalable strategies
// - Risk assessment
// `;

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const userMessage = body.messages[body.messages.length - 1]?.content;

//     if (!userMessage) {
//       return NextResponse.json(
//         { error: "No user input provided" },
//         { status: 400 }
//       );
//     }

//     // Determine which model to use based on question complexity
//     const isComplex = isQuestionComplex(userMessage);
//     const model = isComplex ? AVAILABLE_MODELS.PRO : AVAILABLE_MODELS.FLASH;
//     const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

//     const response = await fetch(GEMINI_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "X-Client-Location": "US"
//       },
//       body: JSON.stringify({
//         contents: [{
//           parts: [
//             { text: SYSTEM_PROMPT },
//             { text: `QUESTION: ${userMessage}\nCONCISE ADVICE:` }
//           ]
//         }],
//         generationConfig: {
//           temperature: 0.7,
//           topP: 0.9,
//           topK: 20,
//           maxOutputTokens: isComplex ? 800 : 500,
//           responseMimeType: "text/plain"
//         }
//       }),
//     });

//     if (!response.ok) {
//       // If the selected model fails, fall back to the other model
//       return await tryFallbackModel(userMessage, isComplex);
//     }

//     const data = await response.json();
//     return formatSuccessResponse(data, model);

//   } catch (err: any) {
//     console.error("API Error:", err);
//     return NextResponse.json(
//       {
//         error: "Our business advisor is currently unavailable",
//         details: "Please try again in a few moments",
//         solution: "We're working to resolve this issue"
//       },
//       { status: 500 }
//     );
//   }
// }

// // Helper functions
// function isQuestionComplex(message: string): boolean {
//   return message.length > 100 ||
//     /(analyze|compare|recommend|evaluate|strateg|complex)/i.test(message) ||
//     (message.split(' ').length > 20);
// }

// async function tryFallbackModel(userMessage: string, originalWasComplex: boolean): Promise<NextResponse> {
//   const fallbackModel = originalWasComplex ? AVAILABLE_MODELS.FLASH : AVAILABLE_MODELS.PRO;
//   const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${fallbackModel}:generateContent?key=${process.env.GEMINI_API_KEY}`;

//   try {
//     const response = await fetch(GEMINI_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         contents: [{ parts: [{ text: userMessage }] }],
//         generationConfig: { maxOutputTokens: 500 }
//       }),
//     });

//     if (!response.ok) throw new Error("Fallback failed");

//     const data = await response.json();
//     return formatSuccessResponse(data, fallbackModel, true);

//   } catch (fallbackError) {
//     throw new Error(`Primary and fallback models failed: ${fallbackError}`);
//   }
// }

// function formatSuccessResponse(data: any, modelUsed: string, isFallback = false) {
//   const answer = data.candidates?.[0]?.content?.parts?.[0]?.text ||
//     "I couldn't generate a response. Please try rephrasing your question.";

//   return NextResponse.json({
//     messages: [{
//       role: "assistant",
//       content: answer
//     }],
//     meta: {
//       modelUsed,
//       isFallbackResponse: isFallback
//     }
//   });
// }




import { NextResponse } from "next/server";

export const runtime = "edge";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const AVAILABLE_MODELS = {
  BRIEF: "gemini-1.5-flash-latest", // Fast, concise responses
  DETAILED: "gemini-2.0-flash",//"gemini-2.5-flash-preview-04-17",//"gemini-1.5-pro-latest", // Comprehensive analysis
  ADVANCED: "gemini-2.0-flash-lite"  // Fallback option
};

const SYSTEM_PROMPTS = {
  BRIEF: `You are a concise business advisor. Provide short, actionable answers (2-3 bullet points max). Focus on key insights only.`,
  DETAILED: `You are an expert business consultant. Provide thorough analysis with:
  - Problem diagnosis
  - 3-5 strategic options
  - Implementation steps
  - Risk assessment
  Use markdown formatting for readability.`,
  ADVANCED: `You are a senior business strategist. Provide in-depth responses with:
  1. Current industry context
  2. Multiple solution frameworks
  3. Cost/benefit analysis
  4. Long-term planning considerations
  5. Recommended metrics for success`
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userMessage = body.messages[body.messages.length - 1]?.content;
    const responseStyle = body.responseStyle || 'BRIEF'; // Default to brief

    if (!userMessage) {
      return NextResponse.json(
        { error: "No user input provided" },
        { status: 400 }
      );
    }

    const model = AVAILABLE_MODELS[responseStyle] || AVAILABLE_MODELS.BRIEF;
    const systemPrompt = SYSTEM_PROMPTS[responseStyle] || SYSTEM_PROMPTS.BRIEF;

    const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Client-Location": "US"
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: systemPrompt },
            { text: `QUESTION: ${userMessage}\nRESPONSE:` }
          ]
        }],
        generationConfig: {
          temperature: 0.7,
          topP: 0.9,
          topK: 20,
          maxOutputTokens: responseStyle === 'DETAILED' ? 1200 :
            responseStyle === 'ADVANCED' ? 1500 : 500,
          responseMimeType: "text/plain"
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I couldn't generate a response. Please try again.";

    return NextResponse.json({
      messages: [{
        role: "assistant",
        content: answer,
        responseStyle: responseStyle
      }],
    });

  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("API Error:", err.message);
    } else {
      console.error("API Error: Unknown error", err);
    }
    return NextResponse.json(
      {
        error: "Our advisor service is temporarily unavailable",
        solution: "Please try again shortly or select a different response style"
      },
      { status: 500 }
    );
  }
}