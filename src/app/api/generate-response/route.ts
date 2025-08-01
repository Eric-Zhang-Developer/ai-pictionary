import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// To-do write unit tests for this function
export async function POST(request: Request) {
  try {
    // To-do: Although its probably a little overkill. Zod runtime validation here would be excellent
    const body = await request.json();
    const image = body.image;

    // To-do: For future reference for changeable prompts also feed a textPrompt. variable to contents
    const contents = [
      {
        inlineData: {
          mimeType: "image/png",
          data: image,
        },
      },
      { text: "Guess this image" },
    ];
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
    });
    // Return only text for now all the metadata I don't want to expose to client side
    return NextResponse.json({ response: response.text });
  } catch (error) {
    // To-do: Maybe more robust error handling? 
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
