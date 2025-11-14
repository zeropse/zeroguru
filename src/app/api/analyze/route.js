import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  const { code, language } = await request.json();

  if (!code) {
    return Response.json({ error: "Code is required" }, { status: 400 });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    const prompt = `
Analyze the following ${language} code and provide:
1. A plain English explanation of what the code does.
2. A step-by-step breakdown of the execution flow.
3. A JSON object with the following structure:
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

Code:
${code}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return Response.json(
        { error: "Failed to parse response" },
        { status: 500 }
      );
    }

    const data = JSON.parse(jsonMatch[0]);

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Analysis failed" }, { status: 500 });
  }
}
