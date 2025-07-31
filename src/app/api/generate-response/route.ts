import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const textPrompt = body.textPrompt;

    const ai = new GoogleGenAI({});
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: textPrompt
    })


    return NextResponse.json({ response: response.text });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
