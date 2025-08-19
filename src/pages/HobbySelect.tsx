import { useState, useEffect } from "react";
import { HobbyIcon } from "@/components/HobbyIcon";
import { ProgressBar } from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Crown, Sparkles, Trophy, Star } from "lucide-react";

interface HobbySelectProps {
  onHobbySelect: (hobby: string) => void;
  completedHobbies: string[];
  currentProgress: number;
  onStartQuiz?: () => void;
}

const hobbies = [
  {
    id: "earrings",
    icon: "💎",
    label: "Jewelry Making",
    color: "coral" as const,
  },
  {
    id: "painting",
    icon: "🎨",
    label: "Painting",
    color: "turquoise" as const,
  },
  { id: "sewing", icon: "🪡", label: "Sewing", color: "lime" as const },
  { id: "puzzles", icon: "🧩", label: "Puzzles", color: "purple" as const },
  { id: "pottery", icon: "🏺", label: "Pottery", color: "green" as const },
];

export const HobbySelect = ({
  onHobbySelect,
  completedHobbies,
  currentProgress,
  onStartQuiz,
}: HobbySelectProps) => {
  const [showBossModal, setShowBossModal] = useState(false);

  // Apri la modale automaticamente quando tutti gli hobby sono completati
  useEffect(() => {
    if (currentProgress === 5 && !showBossModal) {
      setTimeout(() => setShowBossModal(true), 800); // Piccolo delay per l'effetto
    }
  }, [currentProgress, showBossModal]);

  const handleStartQuiz = () => {
    setShowBossModal(false);
    if (onStartQuiz) {
      onStartQuiz();
    }
  };

  return (
    <div className="min-h-screen p-6 pb-20">
      {/* Progress Bar */}
      <div className="fixed top-6 left-6 right-6 z-10">
        <ProgressBar current={currentProgress} total={5} />
      </div>

      {/* Main Content */}
      <div className="pt-24 max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-primary mb-4 font-fredoka">
            Scegli il tuo prossimo hobby...
          </h1>
          <p className="text-muted-foreground text-lg">
            e guadagnati il tesoro! ✨
          </p>
        </div>

        {/* Hobby Grid */}
        <div className="grid grid-cols-2 gap-6">
          {hobbies.map((hobby, index) => {
            const isCompleted = completedHobbies.includes(hobby.id);
            const isDisabled = isCompleted;
            const isLastOddItem =
              index === hobbies.length - 1 && hobbies.length % 2 === 1;

            return (
              <HobbyIcon
                key={hobby.id}
                icon={hobby.icon}
                label={hobby.label}
                color={hobby.color}
                onClick={() => !isDisabled && onHobbySelect(hobby.id)}
                disabled={isDisabled}
                showLabel={false}
                className={`relative ${
                  isCompleted ? "ring-4 ring-quest-progress" : ""
                } ${isLastOddItem ? "col-span-2 mx-auto" : ""}`}
              />
            );
          })}
        </div>

        {currentProgress === 5 && (
          <div className="text-center mt-12">
            <div className="bg-card p-6 rounded-2xl shadow-lg border-2 border-quest-progress">
              <h2 className="text-xl font-bold text-primary mb-2 font-fredoka">
                🎉 Tutti gli hobby sbloccati!
              </h2>
              <p className="text-muted-foreground">
                Preparati per la sfida finale...
              </p>
            </div>
          </div>
        )}

        {/* Boss Challenge Modal */}
        <Dialog open={showBossModal} onOpenChange={setShowBossModal}>
          <DialogContent className="max-w-md mx-auto">
            <DialogHeader>
              <DialogTitle className="text-center space-y-4">
                <div className="flex justify-center space-x-2 mb-4">
                  <Trophy className="w-10 h-10 text-yellow-600 animate-bounce" />
                  <Crown
                    className="w-10 h-10 text-yellow-500 animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <Sparkles
                    className="w-10 h-10 text-orange-500 animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
                <h2 className="text-2xl font-bold text-primary font-fredoka">
                  🎉 Incredibile!
                </h2>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Celebration Message */}
              <div className="text-center space-y-3">
                <p className="text-lg text-foreground font-medium">
                  Hai sbloccato tutti gli hobby! ✨
                </p>

                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 p-4 rounded-xl">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Ma ora è il momento di testare davvero le tue abilità...
                  </p>
                </div>
              </div>

              {/* Progress Indicators */}
              <div className="flex justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>

              {/* Boss Challenge Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleStartQuiz}
                  variant="quest"
                  size="lg"
                  className="w-full transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <Crown className="w-5 h-5 mr-2" />
                  Brava Joja! Sconfiggi il Boss finale! 👑
                </Button>

                <Button
                  onClick={() => setShowBossModal(false)}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  Non posso, sono brutta e scarsa
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
