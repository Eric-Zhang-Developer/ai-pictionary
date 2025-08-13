import { GameState, LobbyProps } from "@/utils/types";

export default function Lobby({ setGameState }: LobbyProps) {
  const handleClick = () => {
    setGameState(GameState.Game);
  };

  return (
    <>
      <h1 className="text-4xl">AI Pictionary</h1>
      <button onClick={handleClick}>Start Game!</button>
    </>
  );
}
