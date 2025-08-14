"use client";
import Sketchpad from "@/components/Sketchpad";
import TurnResultSection from "@/components/TurnResultSection";
import { GuessState, SketchpadRef, TurnCycleState, GameState } from "@/utils/types";
import { useEffect, useState, useRef } from "react";
import { getRandomPrompt } from "@/utils/get-random-prompt";
import Lobby from "@/components/Lobby";
import GameResults from "@/components/GameResults";

export default function Home() {
  const [response, setResponse] = useState<string>("");
  const [guessState, setGuessState] = useState<GuessState>(GuessState.Pending);
  const [gameState, setGameState] = useState<GameState>(GameState.Lobby);
  const [turnCycleState, setTurnCycleState] = useState<TurnCycleState>(TurnCycleState.Drawing);
  const [currentDrawingPrompt, setCurrentDrawingPrompt] = useState<string>("");
  const sketchpadRef = useRef<SketchpadRef>(null);
  const [roundNumber, setRoundNumber] = useState(1);
  const [correctGuesses, setCorrectGuesses] = useState(0);

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

    // Round Check
    const nextRound = roundNumber + 1;
    setRoundNumber(nextRound);
    if (nextRound > 5) {
      console.log("end Game!!");
      setGameState(GameState.Results);
    }
  };

  const turnCycleMap = {
    [TurnCycleState.Drawing]: <div></div>,
    [TurnCycleState.ShowingResult]: (
      <TurnResultSection
        response={response}
        guessState={guessState}
        handleNextPrompt={handleNextPrompt}
        setGameState={setGameState}
        roundNumber={roundNumber}
        setRoundNumber={setRoundNumber}
      ></TurnResultSection>
    ),
    [TurnCycleState.Loading]: <div>Loading...</div>,
    [TurnCycleState.Error]: <div>Error</div>,
  };

  const gameStateMap = {
    [GameState.Lobby]: <Lobby setGameState={setGameState}></Lobby>,
    // TODO: Refactor Core Game into its own Component
    [GameState.Game]: (
      <div className="flex items-center justify-center flex-col gap-4 container mx-auto py-10">
        <h1 className="text-5xl">Draw a {currentDrawingPrompt}</h1>
        <Sketchpad
          ref={sketchpadRef}
          setResponse={setResponse}
          setGuessState={setGuessState}
          setTurnCycleState={setTurnCycleState}
          currentDrawingPrompt={currentDrawingPrompt}
          setCorrectGuesses={setCorrectGuesses}
          correctGuesses={correctGuesses}
        ></Sketchpad>

        {/* Results Section  */}
        {/* TODO: Qol improvement would be auto scrolling to the results section */}
        {turnCycleMap[turnCycleState]}
      </div>
    ),
    [GameState.Results]: (
      <GameResults
        setGameState={setGameState}
        setRoundNumber={setRoundNumber}
        correctGuesses={correctGuesses}
      ></GameResults>
    ),
  };

  return gameStateMap[gameState];
}
