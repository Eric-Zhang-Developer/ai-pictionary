"use client";
import Sketchpad from "@/components/Sketchpad";
import { GuessState } from "@/utils/types";
import { useEffect, useState } from "react";
import { DRAWING_PROMPTS } from "@/utils/drawing-prompts";

export default function Home() {
  const [response, setResponse] = useState<string>("");
  const [guessState, setGuessState] = useState<GuessState>(GuessState.Pending);
  const [currentDrawingPrompt, seCurrentDrawingPrompt] = useState<string>("");
  // the image url processing happens entirely in Sketchpad. For now it is discarded after being given to the API. For future reference could save it.

  // Currently DRAWING_PROMPTS is a 100 item static list of prompts 
  // A future feature could be selecting from prompt categories as well as difficulties. 
  // Example a easy geography / map / culture question is draw the USA, a hard one would be draw Brunei 
  useEffect(() => {
    const randomPrompt = DRAWING_PROMPTS[Math.floor(Math.random() * DRAWING_PROMPTS.length)];
    seCurrentDrawingPrompt(randomPrompt);
  }, [])

  
  // Visual Indicator for guess correctness, this is a placeholder for a more advanced scoring system
  const borderColorMap = {
    [GuessState.Pending]: "border-black",
    [GuessState.Correct]: "border-emerald-500",
    [GuessState.Incorrect]: "border-red-500",
  };

  return (
    <div className="flex items-center justify-center flex-col gap-4 container mx-auto">
      <h1 className="text-4xl">AI Pictionary</h1>
      <h2 className="text-3xl">Draw a {currentDrawingPrompt}</h2>
      <Sketchpad setResponse={setResponse} setGuessState={setGuessState}></Sketchpad>
      <div className={`border-2 px-120 py-20 rounded-2xl mt-10 ${borderColorMap[guessState]}`}>
        {response}
      </div>
    </div>
  );
}
