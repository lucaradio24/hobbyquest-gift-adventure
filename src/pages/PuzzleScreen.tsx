import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProgressBar } from "@/components/ProgressBar";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Lock } from "lucide-react";

interface PuzzleScreenProps {
  hobby: string;
  onBack: () => void;
  onComplete: () => void;
  currentProgress: number;
}

const puzzles: Record<string, { emoji: string; riddle: string; answer: string; hint: string; hideout: string }> = {
  earrings: {
    emoji: "💎✨🔮",
    riddle: "I sparkle and shine, worn close to your ear. What am I that makes beauty appear?",
    answer: "orecchini",
    hint: "Look for something that dangles and shines! 💫",
    hideout: "Guarda nel cassetto della tua scrivania! 🗂️"
  },
  painting: {
    emoji: "🎨🖌️🌈",
    riddle: "With colors I dance, on canvas I play. What am I that brightens your day?",
    answer: "pennello",
    hint: "Check near your art supplies! 🎨",
    hideout: "Cerca vicino ai tuoi colori e pennelli! 🎨"
  },
  sewing: {
    emoji: "🪡🧵✂️",
    riddle: "Through fabric I glide, with thread as my guide. What am I that helps clothes coincide?",
    answer: "ago",
    hint: "Look in your sewing kit! ✂️",
    hideout: "Nel tuo kit da cucito, dove riponi i fili! 🧵"
  },
  puzzles: {
    emoji: "🧩🔍🤔",
    riddle: "Piece by piece, I come together. What am I that tests your mental weather?",
    answer: "puzzle",
    hint: "Check your game collection! 🎯",
    hideout: "Tra i tuoi giochi da tavolo! 🎲"
  },
  pottery: {
    emoji: "🏺👐🌊",
    riddle: "From earth I'm born, by hands I'm shaped. What am I that can't be escaped?",
    answer: "argilla",
    hint: "Look for something moldable and earthy! 🌿",
    hideout: "Vicino alle tue cose per la ceramica! 🏺"
  }
};

export const PuzzleScreen = ({ hobby, onBack, onComplete, currentProgress }: PuzzleScreenProps) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHideout, setShowHideout] = useState(false);
  const [error, setError] = useState("");
  
  const puzzle = puzzles[hobby];

  if (!puzzle) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="p-8 text-center">
          <p className="text-destructive">Puzzle not found!</p>
          <Button onClick={onBack} className="mt-4">Go Back</Button>
        </Card>
      </div>
    );
  }

  const handleSubmit = () => {
    if (userAnswer.toLowerCase().trim() === puzzle.answer.toLowerCase()) {
      setIsCorrect(true);
      setShowHideout(true);
      setError("");
    } else {
      setError("Password sbagliata! Riprova...");
      setUserAnswer("");
    }
  };

  const handleComplete = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen p-4 sm:p-6">
      {/* Progress Bar */}
      <div className="fixed top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 z-10">
        <ProgressBar current={currentProgress} total={5} />
      </div>

      {/* Back Button */}
      <Button
        onClick={onBack}
        variant="ghost"
        size="sm"
        className="fixed top-16 sm:top-20 left-4 sm:left-6 z-10"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      {/* Main Content */}
      <div className="pt-28 sm:pt-32 max-w-lg mx-auto px-4">
        <Card className="p-6 sm:p-8 text-center space-y-6 sm:space-y-8 shadow-xl">
          {/* Emoji Display */}
          <div className="text-5xl sm:text-6xl space-x-2">
            {puzzle.emoji}
          </div>

          {/* Riddle */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-primary font-fredoka">
              Solve the Riddle
            </h2>
            <p className="text-base sm:text-lg text-foreground leading-relaxed px-2">
              {puzzle.riddle}
            </p>
          </div>

          {/* Hint */}
          <div className="bg-muted p-3 sm:p-4 rounded-xl">
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">
              💡 {puzzle.hint}
            </p>
          </div>

          {/* Password Input */}
          {!showHideout && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  <Lock className="w-4 h-4 inline mr-2" />
                  Inserisci la password:
                </label>
                <Input
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder="La tua risposta..."
                  className="text-center text-lg font-bold retro-button"
                />
                {error && (
                  <p className="text-destructive text-sm text-center">{error}</p>
                )}
              </div>
              <Button 
                onClick={handleSubmit}
                variant="secondary"
                size="lg"
                className="w-full retro-button"
                disabled={!userAnswer.trim()}
              >
                <Lock className="w-5 h-5 mr-2" />
                Verifica Password
              </Button>
            </div>
          )}

          {/* Hideout Reveal */}
          {showHideout && (
            <div className="space-y-6">
              <div className="bg-quest-progress text-primary-foreground p-6 rounded-xl animate-pixel-glow">
                <h3 className="text-lg font-bold mb-2">🎉 Password Corretta!</h3>
                <p className="text-base">
                  {puzzle.hideout}
                </p>
              </div>
              <Button 
                onClick={handleComplete}
                variant="quest"
                size="lg"
                className="w-full retro-button"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Continua l'Avventura
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};