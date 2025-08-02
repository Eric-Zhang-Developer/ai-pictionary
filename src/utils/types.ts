export interface SketchpadProps {
  setResponse: (response: string) => void;
  setGuessState: (guess: GuessState) => void;
}

export enum GuessState {
  Pending = "PENDING",
  Correct = "CORRECT",
  Incorrect = "INCORRECT"
}