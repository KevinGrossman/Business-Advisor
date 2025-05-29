import { NextResponse } from "next/server";

export const runtime = "edge";

const SUPPORTED_MODELS = {
  "gemini-1.5-flash": {
    name: "Gemini 1.5 Flash",
    capabilities: ["text", "image-analysis"],
    endpoint: "generateContent"
  },
  "gemini-2.0-flash": {
    name: "Gemini 2.0 Flash",
    capabilities: ["text", "image-analysis", "video-analysis"],
    endpoint: "generateContent"
  },
  "gemini-1.5-pro": {
    name: "Gemini 1.5 Pro",
    capabilities: ["text", "image-analysis", "audio-analysis"],
    endpoint: "generateContent"
  },
  "gemini-2.5-pro-preview-05-06": {
    name: "Gemini 2.5 Pro",
    capabilities: ["text", "image-generation", "video-analysis"],
    endpoint: "generateContent"
  },
  "gemini-pro-vision": {
    name: "Gemini Pro Vision",
    capabilities: ["text", "image-analysis", "image-generation"],
    endpoint: "generateContent"
  },
  "imagen-3.0-generate-002": {
    name: "Imagen 3.0",
    capabilities: ["image-generation"],
    endpoint: "generateImage"
  }
};

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server configuration error: Missing API key" },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const model = formData.get('model') as string;
    const messages = JSON.parse(formData.get('messages') as string);
    const file = formData.get('file') as File | null;
    const userMessage = messages[messages.length - 1]?.content || "";

    if (!SUPPORTED_MODELS[model]) {
      return NextResponse.json(
        { error: "Invalid model selected" },
        { status: 400 }
      );
    }

    const modelInfo = SUPPORTED_MODELS[model];
    let response;

    // Handle image generation
    if (modelInfo.endpoint === "generateImage") {
      const prompt = userMessage || "Generate a professional business image";
      const buffer = file ? await file.arrayBuffer() : null;

      const requestBody = {
        prompt: {
          text: prompt,
          ...(buffer && {
            image: {
              bytesBase64Encoded: Buffer.from(buffer).toString('base64')
            }
          })
        },
        outputOptions: {
          mimeType: "image/png"
        }
      };

      response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:${modelInfo.endpoint}?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody)
        }
      );
    }
    // Handle text/image analysis
    else {
      const payload: any = {
        contents: [{
          parts: [{ text: userMessage }]
        }],
        systemInstruction: {
          parts: [{
            text: "You are an expert business advisor. Provide detailed, actionable responses."
          }]
        }
      };

      if (file && modelInfo.capabilities.includes("image-analysis")) {
        const mimeType = file.type;
        const buffer = await file.arrayBuffer();
        const base64Data = Buffer.from(buffer).toString('base64');

        payload.contents[0].parts.push({
          inlineData: {
            mimeType,
            data: base64Data
          }
        });
      }

      response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:${modelInfo.endpoint}?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "API request failed");
    }

    const data = await response.json();

    if (modelInfo.endpoint === "generateImage") {
      return NextResponse.json({
        messages: [{
          role: "assistant",
          content: "Here's your generated image:",
          image: data.image?.bytesBase64Encoded || data[0]?.bytesBase64Encoded,
          mimeType: "image/png"
        }]
      });
    } else {
      return NextResponse.json({
        messages: [{
          role: "assistant",
          content: data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "No response generated"
        }]
      });
    }
  } catch (err: any) {
    console.error("Error:", err);
    return NextResponse.json(
      { error: err.message || "Request failed" },
      { status: 500 }
    );
  }
}