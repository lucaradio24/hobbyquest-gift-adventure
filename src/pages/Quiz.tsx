import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ProgressBar";

interface QuizProps {
  onComplete: () => void;
}

const questions = [
  {
    question: "What's the most important ingredient in any hobby?",
    options: ["Expensive equipment", "Having fun", "Being perfect", "Lots of time"],
    correct: 1
  },
  {
    question: "When learning something new, what should you expect?",
    options: ["Immediate mastery", "Some mistakes along the way", "It should be easy", "Quick results"],
    correct: 1
  },
  {
    question: "The best way to improve at a hobby is to:",
    options: ["Practice regularly", "Watch others do it", "Buy better tools", "Wait for inspiration"],
    correct: 0
  }
];

export const Quiz = ({ onComplete }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      onComplete();
    }
  };

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
            Final Quiz! 🧠
          </h1>
          <p className="text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        <Card className="p-8 space-y-6">
          <h2 className="text-xl font-medium text-center leading-relaxed">
            {questions[currentQuestion].question}
          </h2>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                variant={selectedAnswer === index ? "quest" : "outline"}
                className="w-full text-left justify-start h-auto p-4"
              >
                <span className="mr-3 font-bold">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </Button>
            ))}
          </div>

          <Button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            variant="secondary"
            size="lg"
            className="w-full mt-6"
          >
            {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
          </Button>
        </Card>
      </div>
    </div>
  );
};