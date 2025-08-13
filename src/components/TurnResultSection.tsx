import { TurnResultProps, GuessState } from "@/utils/types";

export default function TurnResultSection({
  response,
  handleNextPrompt,
  guessState,
}: TurnResultProps) {
  // Visual Indicator for guess correctness, this is a placeholder for a more advanced scoring system
  const borderColorMap = {
    [GuessState.Pending]: "border-black",
    [GuessState.Correct]: "border-emerald-500",
    [GuessState.Incorrect]: "border-red-500",
  };

  return (
    <>
      <div className={`border-2 px-60 py-10 rounded-2xl mt-10 ${borderColorMap[guessState]}`}>
        {response}
      </div>
      <button
        onClick={handleNextPrompt}
        className="bg-blue-400 text-white px-10 py-3 rounded-xl text-2xl shadow-lg hover:cursor-pointer transition hover:scale-110"
      >
        Next Prompt
      </button>
    </>
  );
}
