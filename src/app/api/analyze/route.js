import { RateLimiterMemory } from "rate-limiter-flexible";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const rateLimiter = new RateLimiterMemory({
  keyPrefix: "analyze_api",
  points: 2,
  duration: 1 * 60,
});

export async function POST(request) {
  const ip =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1";

  try {
    await rateLimiter.consume(ip);
  } catch (rejRes) {
    return Response.json(
      { error: "Too many requests, please try again later." },
      { status: 429 }
    );
  }

  try {
    const { code, language } = await request.json();

    if (!code || typeof code !== "string") {
      return Response.json(
        { error: "Valid code string is required" },
        { status: 400 }
      );
    }

    if (!language || typeof language !== "string") {
      return Response.json(
        { error: "Valid language string is required" },
        { status: 400 }
      );
    }

    const prompt = `Analyze the following ${language} code and provide a detailed explanation of what the code does, including its logic, flow, and purpose. Then, break down the execution into step-by-step actions.

Provide a JSON response with the following structure:
{
  "explanation": "A comprehensive explanation of the code's functionality, logic, and purpose",
  "steps": [
    {
      "line": number,
      "description": "Detailed description of what happens at this line",
      "type": "assignment|condition|loop|function_call|return|print|other"
    }
  ]
}

Return ONLY the JSON object, no additional text or markdown.

Code:
${code}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });

    const text = response.text.trim();

    // Attempt to parse the JSON response
    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      // If direct parsing fails, try to extract JSON from the text
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error("Failed to extract JSON from response:", text);
        return Response.json(
          { error: "Failed to parse AI response as JSON" },
          { status: 500 }
        );
      }
      try {
        data = JSON.parse(jsonMatch[0]);
      } catch (secondParseError) {
        console.error("Failed to parse extracted JSON:", jsonMatch[0]);
        return Response.json(
          { error: "Invalid JSON structure in AI response" },
          { status: 500 }
        );
      }
    }

    // Validate the structure of the parsed data
    if (!data.explanation || !Array.isArray(data.steps)) {
      return Response.json(
        { error: "AI response does not match expected structure" },
        { status: 500 }
      );
    }

    return Response.json(data);
  } catch (error) {
    console.error("Analysis failed:", error);
    return Response.json({ error: "Analysis failed" }, { status: 500 });
  }
}
