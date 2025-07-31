import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const textPrompt = body.textPrompt;


    return NextResponse.json({ guess: textPrompt });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
