export interface SketchpadProps {
  setResponse: (response: string) => void;
}

export enum GuessState {
  Pending = "PENDING",
  Correct = "CORRECT",
  Incorrect = "INCORRECT"
}