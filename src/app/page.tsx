"use client"
import Sketchpad from "@/components/Sketchpad";
import { GuessState } from "@/utils/types";
import { useState } from "react";

export default function Home() {
  const [response, setResponse] = useState<string>("");
  const [guessState, setGuessState] = useState<GuessState>(GuessState.Pending)
  // the image url processing happens entirely in Sketchpad. For now it is discarded after being given to the API. For future reference could save it. 
  return (
    <div className="flex items-center justify-center flex-col gap-4 container mx-auto">
      <h1 className="text-4xl">AI Pictionary</h1>
      <h2 className="text-3xl">Draw a Cat</h2>
      <Sketchpad setResponse={setResponse}></Sketchpad>
      <div className="border-2 px-120 py-20 rounded-2xl mt-10">{response}</div>
    </div>
  );
}
 