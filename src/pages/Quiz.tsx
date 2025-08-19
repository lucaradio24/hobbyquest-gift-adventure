import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ProgressBar";
import { Crown, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuizProps {
  onComplete: () => void;
}

// Database domande del quiz (adattato dal tuo quiz.html)
const questions = [
  {
    question: "Qual è il colore preferito di Giorgia?",
    options: ["Verde", "Blu", "Rosso"],
    correct: "B", // Blu
    correctIndex: 1,
  },
  {
    question: "Quale hobby preferisce Giorgia quando vuole rilassarsi?",
    options: ["Ascoltare musica", "Dipingere", "Fare puzzle"],
    correct: "A", // Ascoltare musica
    correctIndex: 0,
  },
  {
    question:
      "Qual è il momento preferito di Giorgia per dedicarsi ai suoi hobby?",
    options: ["Mattina presto", "Pomeriggio", "Sera tardi"],
    correct: "C", // Sera tardi
    correctIndex: 2,
  },
];

export const Quiz = ({ onComplete }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const { toast } = useToast();

  // Gestione animazione shake per risposta sbagliata
  useEffect(() => {
    if (wrongAnswer) {
      const timer = setTimeout(() => setWrongAnswer(false), 500);
      return () => clearTimeout(timer);
    }
  }, [wrongAnswer]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnimating) return;

    const isCorrect = answerIndex === questions[currentQuestion].correctIndex;

    if (isCorrect) {
      // Risposta corretta
      toast({
        title: "✅ Corretto!",
        description: "Ottima risposta!",
      });

      setIsAnimating(true);

      if (currentQuestion < questions.length - 1) {
        // Prossima domanda
        setTimeout(() => {
          setCurrentQuestion(currentQuestion + 1);
          setIsAnimating(false);
        }, 600);
      } else {
        // Quiz completato
        setTimeout(() => {
          setShowResult(true);
          setIsAnimating(false);
        }, 600);
      }
    } else {
      // Risposta sbagliata
      const encouragements = [
        "❌ Non proprio, riprova! Pensa ai suoi gusti...",
        "❌ Non è quella giusta! Rifletti ancora un po'...",
        "❌ Quasi! Conosci meglio i suoi gusti di così...",
      ];

      toast({
        title: "Riprova!",
        description:
          encouragements[Math.floor(Math.random() * encouragements.length)],
        variant: "destructive",
      });
      setWrongAnswer(true);
    }
  };

  const handleFinalComplete = () => {
    onComplete();
  };

  if (showResult) {
    return (
      <div className="min-h-screen p-6">
        {/* Progress Bar */}
        <div className="fixed top-6 left-6 right-6 z-10">
          <ProgressBar current={5} total={5} />
        </div>

        {/* Result Content */}
        <div className="pt-24 max-w-2xl mx-auto">
          <Card className="p-8 text-center space-y-8 shadow-xl animate-slide-in-quiz">
            <div className="space-y-4">
              <Crown className="w-16 h-16 mx-auto text-yellow-500" />
              <h1 className="text-3xl font-bold text-primary font-fredoka">
                🎉 Fantastico!
              </h1>
              <p className="text-xl text-muted-foreground">
                ✅ Ottimo! Hai sbloccato la lettera finale.
              </p>
            </div>

            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 p-6 rounded-xl">
              <p className="text-lg font-medium text-foreground">
                Hai dimostrato di conoscere davvero bene i tuoi gusti! 🌟
              </p>
            </div>

            <Button
              onClick={handleFinalComplete}
              variant="quest"
              size="lg"
              className="w-full"
            >
              <Crown className="w-5 h-5 mr-2" />
              Apri la lettera finale 👑
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      {/* Progress Bar */}
      <div className="fixed top-6 left-6 right-6 z-10">
        <ProgressBar current={5} total={5} />
      </div>

      {/* Main Content */}
      <div className="pt-24 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-4 font-fredoka">
            🧠 Quiz Finale
          </h1>
          <p className="text-muted-foreground text-lg">
            Rispondi correttamente per sbloccare la domanda successiva!
          </p>
          <p className="text-sm text-muted-foreground mt-2 flex items-center justify-center gap-2">
            Domanda {currentQuestion + 1} di {questions.length}
            <div className="flex gap-1 ml-2">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index < currentQuestion
                      ? "bg-quest-progress"
                      : index === currentQuestion
                      ? "bg-primary"
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </p>
        </div>

        <Card
          className={`p-8 space-y-6 shadow-xl transition-all duration-500 ${
            wrongAnswer ? "animate-shake animate-pulse-error" : ""
          } ${
            isAnimating ? "animate-slide-out-quiz" : "animate-slide-in-quiz"
          }`}
        >
          <h2 className="text-xl font-medium text-center leading-relaxed">
            {questions[currentQuestion].question}
          </h2>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                variant="outline"
                className="w-full text-left justify-start h-auto p-4 hover:scale-[1.02] transition-transform"
              >
                <span className="mr-3 font-bold text-primary">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
