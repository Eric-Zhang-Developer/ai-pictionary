"use client";
import Sketchpad from "@/components/Sketchpad";
import TurnResultSection from "@/components/TurnResultSection";
import { GuessState, SketchpadRef, TurnCycleState, GameState } from "@/utils/types";
import { useEffect, useState, useRef } from "react";
import { getRandomPrompt } from "@/utils/get-random-prompt";
import Lobby from "@/components/Lobby";

export default function Home() {
  const [response, setResponse] = useState<string>("");
  const [guessState, setGuessState] = useState<GuessState>(GuessState.Pending);
  const [gameState, setGameState] = useState<GameState>(GameState.Lobby);
  const [turnCycleState, setTurnCycleState] = useState<TurnCycleState>(TurnCycleState.Drawing);
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
    setTurnCycleState(TurnCycleState.Drawing);
    setResponse("");
    if (sketchpadRef.current) {
      sketchpadRef.current.clearCanvas();
    }
  };

  const turnCycleMap = {
    [TurnCycleState.Drawing]: <div></div>,
    [TurnCycleState.ShowingResult]: (
      <TurnResultSection
        response={response}
        guessState={guessState}
        handleNextPrompt={handleNextPrompt}
      ></TurnResultSection>
    ),
    [TurnCycleState.Loading]: <div>Loading...</div>,
    [TurnCycleState.Error]: <div>Error</div>,
  };

  const gameStateMap = {
    [GameState.Lobby]: <Lobby setGameState={setGameState}></Lobby>,
    // TODO: Refactor Core Game into its own Component
    [GameState.Game]: (
      <div className="flex items-center justify-center flex-col gap-4 container mx-auto">
        <h2 className="text-3xl">Draw a {currentDrawingPrompt}</h2>
        <Sketchpad
          ref={sketchpadRef}
          setResponse={setResponse}
          setGuessState={setGuessState}
          setTurnCycleState={setTurnCycleState}
          currentDrawingPrompt={currentDrawingPrompt}
        ></Sketchpad>

        {/* Results Section  */}
        {/* TODO: Qol improvement would be auto scrolling to the results section */}
        {turnCycleMap[turnCycleState]}
      </div>
    ),
    [GameState.Results]: <div></div>,
  };

  return gameStateMap[gameState];
}
