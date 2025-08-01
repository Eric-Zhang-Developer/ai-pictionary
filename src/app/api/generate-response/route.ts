import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(request: Request) {
  try {
    console.log("Running function");
    const body = await request.json();
    const image = body.image;

    const contents = [
      {inlineData: {
        mimeType: "image/png",
        data: image}
      },
      {text: "Guess this image"},
    ]
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents 
    })
    console.log("sucess?")

    console.log(response.text);
    // Return only text for now all the metadata I don't want to expose to client side
    return NextResponse.json({ response: response.text});
  } catch (error) {
    
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
