import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request) {
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

    const prompt = `Analyze the following ${language} code and provide a JSON response with the following structure:
{
  "explanation": "string",
  "steps": [
    {
      "line": number,
      "description": "string",
      "type": "assignment|condition|loop|function_call|return|print|other"
    }
  ]
}

Return ONLY the JSON object, no additional text.

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
