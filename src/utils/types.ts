export interface SketchpadProps {
  setResponse: (response: string) => void;
  setGuessState: (guess: GuessState) => void;
  currentDrawingPrompt: string;
  setTurnCycleState: (turnCycle: TurnCycleState) => void;
}

export interface SketchpadRef {
  clearCanvas: () => void;
}

export enum GuessState {
  Pending = "PENDING",
  Correct = "CORRECT",
  Incorrect = "INCORRECT",
}

// idk if it is honestly necessary to have another enum for turn cycle.
// Possible refactor to combine guess state and turn cycle?
export enum TurnCycleState {
  Drawing = "DRAWING",
  Loading = "LOADING",
  ShowingResult = "SHOWINGRESULT",
  Error = "ERROR",
}

export interface TurnResultProps {
  handleNextPrompt: () => void;
  response: string;
  guessState: GuessState;
}
