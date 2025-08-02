import { checkGuess } from "../check-guess";
import { describe, it, expect } from "vitest";
describe("Check Guess Function", () => {
  it("should return True when guess has the answer in it", () => {
    const guess = "This is a cat.";
    const answer = "cat";

    const result = checkGuess(guess, answer);

    expect(result).toBe(true);
  });

    it("should return False when guess does not has the answer in it", () => {
    const guess = "This looks like a dog";
    const answer = "cat";

    const result = checkGuess(guess, answer);

    expect(result).toBe(false);
  });
});
