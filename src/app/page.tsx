"use client";
import Sketchpad from "@/components/Sketchpad";
import { GuessState, SketchpadRef } from "@/utils/types";
import { useEffect, useState, useRef } from "react";
import { getRandomPrompt } from "@/utils/get-random-prompt";

export default function Home() {
  const [response, setResponse] = useState<string>("");
  const [guessState, setGuessState] = useState<GuessState>(GuessState.Pending);
  const [currentDrawingPrompt, setCurrentDrawingPrompt] = useState<string>("");
  const sketchpadRef = useRef<SketchpadRef>(null);
  // the image url processing happens entirely in Sketchpad. For now it is discarded after being given to the API. For future reference could save it.

  // Gets random prompt on page load
  useEffect(() => {
    setCurrentDrawingPrompt(getRandomPrompt());
  }, []);

  const handleNextPrompt = () => {
    setCurrentDrawingPrompt(getRandomPrompt());
    setGuessState(GuessState.Pending);
    setResponse("");
    if (sketchpadRef.current) {
      sketchpadRef.current.clearCanvas();
    }
  };

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
      <Sketchpad
        ref={sketchpadRef}
        setResponse={setResponse}
        setGuessState={setGuessState}
        currentDrawingPrompt={currentDrawingPrompt}
      ></Sketchpad>
      <div className={`border-2 px-120 py-20 rounded-2xl mt-10 ${borderColorMap[guessState]}`}>
        {response}
      </div>
      <button
        onClick={handleNextPrompt}
        className="bg-blue-400 text-white px-10 py-3 rounded-xl text-2xl shadow-lg hover:cursor-pointer transition hover:scale-110"
      >
        Next Prompt
      </button>
    </div>
  );
}
