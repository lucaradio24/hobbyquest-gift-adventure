import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ProgressBar";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle } from "lucide-react";

interface PuzzleScreenProps {
  hobby: string;
  onBack: () => void;
  onComplete: () => void;
  currentProgress: number;
}

const puzzles: Record<string, { emoji: string; riddle: string; answer: string; hint: string }> = {
  earrings: {
    emoji: "💎✨🔮",
    riddle: "I sparkle and shine, worn close to your ear. What am I that makes beauty appear?",
    answer: "earrings",
    hint: "Look for something that dangles and shines! 💫"
  },
  painting: {
    emoji: "🎨🖌️🌈",
    riddle: "With colors I dance, on canvas I play. What am I that brightens your day?",
    answer: "brush",
    hint: "Check near your art supplies! 🎨"
  },
  sewing: {
    emoji: "🪡🧵✂️",
    riddle: "Through fabric I glide, with thread as my guide. What am I that helps clothes coincide?",
    answer: "needle",
    hint: "Look in your sewing kit! ✂️"
  },
  puzzles: {
    emoji: "🧩🔍🤔",
    riddle: "Piece by piece, I come together. What am I that tests your mental weather?",
    answer: "puzzle",
    hint: "Check your game collection! 🎯"
  },
  pottery: {
    emoji: "🏺👐🌊",
    riddle: "From earth I'm born, by hands I'm shaped. What am I that can't be escaped?",
    answer: "clay",
    hint: "Look for something moldable and earthy! 🌿"
  }
};

export const PuzzleScreen = ({ hobby, onBack, onComplete, currentProgress }: PuzzleScreenProps) => {
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

  return (
    <div className="min-h-screen p-6">
      {/* Progress Bar */}
      <div className="fixed top-6 left-6 right-6 z-10">
        <ProgressBar current={currentProgress} total={5} />
      </div>

      {/* Back Button */}
      <Button
        onClick={onBack}
        variant="ghost"
        size="sm"
        className="fixed top-20 left-6 z-10"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      {/* Main Content */}
      <div className="pt-32 max-w-lg mx-auto">
        <Card className="p-8 text-center space-y-8 shadow-xl">
          {/* Emoji Display */}
          <div className="text-6xl space-x-2">
            {puzzle.emoji}
          </div>

          {/* Riddle */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-primary font-fredoka">
              Solve the Riddle
            </h2>
            <p className="text-lg text-foreground leading-relaxed">
              {puzzle.riddle}
            </p>
          </div>

          {/* Hint */}
          <div className="bg-muted p-4 rounded-xl">
            <p className="text-sm text-muted-foreground font-medium">
              💡 {puzzle.hint}
            </p>
          </div>

          {/* Action */}
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Found your gift? Time to claim your reward!
            </p>
            <Button 
              onClick={onComplete}
              variant="quest"
              size="lg"
              className="w-full"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Claim Reward
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};