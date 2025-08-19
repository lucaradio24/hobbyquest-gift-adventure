import { useState } from "react";
import { Welcome } from "./Welcome";
import { HobbySelect } from "./HobbySelect";
import { PuzzleScreen } from "./PuzzleScreen";
import { Quiz } from "./Quiz";
import { FinalLetter } from "./FinalLetter";

type GameState =
  | "welcome"
  | "hobby-select"
  | "puzzle"
  | "quiz"
  | "final-letter";

const Index = () => {
  const [gameState, setGameState] = useState<GameState>("welcome");
  const [selectedHobby, setSelectedHobby] = useState<string>("");
  const [completedHobbies, setCompletedHobbies] = useState<string[]>([]);

  const handleStart = () => {
    setGameState("hobby-select");
  };

  const handleHobbySelect = (hobby: string) => {
    setSelectedHobby(hobby);
    setGameState("puzzle");
  };

  const handlePuzzleComplete = () => {
    const newCompleted = [...completedHobbies, selectedHobby];
    setCompletedHobbies(newCompleted);

    // Sempre torna alla selezione hobby, il quiz sarà attivato manualmente
    setGameState("hobby-select");
  };

  const handleStartQuiz = () => {
    setGameState("quiz");
  };

  const handleQuizComplete = () => {
    setGameState("final-letter");
  };

  const handleBackToHobbies = () => {
    setGameState("hobby-select");
  };

  switch (gameState) {
    case "welcome":
      return <Welcome onStart={handleStart} />;

    case "hobby-select":
      return (
        <HobbySelect
          onHobbySelect={handleHobbySelect}
          completedHobbies={completedHobbies}
          currentProgress={completedHobbies.length}
          onStartQuiz={handleStartQuiz}
        />
      );

    case "puzzle":
      return (
        <PuzzleScreen
          hobby={selectedHobby}
          onBack={handleBackToHobbies}
          onComplete={handlePuzzleComplete}
          currentProgress={completedHobbies.length}
        />
      );

    case "quiz":
      return <Quiz onComplete={handleQuizComplete} />;

    case "final-letter":
      return <FinalLetter />;

    default:
      return <Welcome onStart={handleStart} />;
  }
};

export default Index;
