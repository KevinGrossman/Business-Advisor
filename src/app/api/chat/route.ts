

import { NextResponse } from "next/server";

export const runtime = "edge";

const SUPPORTED_MODELS = {
  // Flash Models
  "gemini-1.5-flash": {
    name: "Gemini 1.5 Flash",
    capabilities: ["text", "image-analysis"],
    endpoint: "generateContent",
    version: "v1beta"
  },
  "gemini-2.0-flash": {
    name: "Gemini 2.0 Flash",
    capabilities: ["text", "image-analysis", "video-analysis"],
    endpoint: "generateContent",
    version: "v1beta"
  },
  // Pro Models
  "gemini-1.5-flash-latest": {
    name: "Gemini 1.5 Pro",
    capabilities: ["text", "image-analysis", "audio-analysis"],
    endpoint: "generateContent",
    version: "v1beta"
  },
  "gemini-2.5-pro-preview-05-06": {
    name: "Gemini 2.5 Pro",
    capabilities: ["text", "image-generation", "video-analysis"],
    endpoint: "generateContent",
    version: "v1beta"
  },
  // Vision Models
  "gemini-pro-vision": {
    name: "Gemini Pro Vision",
    capabilities: ["text", "image-analysis", "image-generation"],
    endpoint: "generateContent",
    version: "v1beta"
  },
  // Image Generation Models
  "imagen-3.0-generate-002": {
    name: "Imagen 3.0",
    capabilities: ["image-generation"],
    endpoint: "generateImage",
    version: "v1beta"
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

    // Handle image generation models
    if (modelInfo.endpoint === "generateImage") {
      const prompt = userMessage || "Generate a professional business image";
      let requestBody: any = {
        prompt: {
          text: prompt
        }
      };

      if (file) {
        const buffer = await file.arrayBuffer();
        requestBody.prompt.image = {
          bytesBase64Encoded: Buffer.from(buffer).toString('base64')
        };
      }

      response = await fetch(
        `https://generativelanguage.googleapis.com/${modelInfo.version}/models/${model}:${modelInfo.endpoint}?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody)
        }
      );
    }
    // Handle text/image analysis models
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

      if (file) {
        const mimeType = file.type;
        const buffer = await file.arrayBuffer();
        const base64Data = Buffer.from(buffer).toString('base64');

        // Different models handle files differently
        if (modelInfo.capabilities.includes("image-analysis")) {
          payload.contents[0].parts.push({
            inlineData: {
              mimeType,
              data: base64Data
            }
          });
        } else if (modelInfo.capabilities.includes("image-generation")) {
          payload.contents[0].parts.push({
            text: "Here is the attached image for reference:",
            image: {
              bytesBase64Encoded: base64Data
            }
          });
        }
      }

      response = await fetch(
        `https://generativelanguage.googleapis.com/${modelInfo.version}/models/${model}:${modelInfo.endpoint}?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );
    }

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error Details:", {
        status: response.status,
        statusText: response.statusText,
        model,
        error: errorData.error
      });

      throw new Error(errorData.error?.message || "API request failed");
    }

    const data = await response.json();

    // Handle different response formats
    if (modelInfo.endpoint === "generateImage") {
      const imageData = data.image?.bytesBase64Encoded || data[0]?.bytesBase64Encoded;
      if (!imageData) {
        throw new Error("No image data received from the API");
      }

      return NextResponse.json({
        messages: [{
          role: "assistant",
          content: "Here's the generated image:",
          image: imageData,
          mimeType: "image/png"
        }]
      });
    } else {
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text ||
        data.text ||
        "I couldn't generate a response. Please try again.";

      return NextResponse.json({
        messages: [{
          role: "assistant",
          content: responseText
        }]
      });
    }
  } catch (err: any) {
    console.error("API Route Error:", err);
    return NextResponse.json(
      {
        error: "Failed to process your request",
        details: err.message,
        solution: "Please try a different model or input format"
      },
      { status: 500 }
    );
  }
}