export interface SketchpadProps {
  setResponse: (response: string) => void;
  setGuessState: (guess: GuessState) => void;
  currentDrawingPrompt: string;
}

export interface SketchpadRef {
  clearCanvas: () => void;
}

export enum GuessState {
  Pending = "PENDING",
  Correct = "CORRECT",
  Incorrect = "INCORRECT",
}
