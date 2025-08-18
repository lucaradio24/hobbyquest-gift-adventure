import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Heart, Sparkles } from "lucide-react";

export const FinalLetter = () => {
  const [showLetter, setShowLetter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowLetter(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const letterText = `Dear Birthday Star,

Congratulations on completing your HobbyQuest adventure! 🎉

You've discovered that the world is full of wonderful hobbies waiting to be explored. Whether it's creating beautiful jewelry, painting colorful masterpieces, sewing unique pieces, solving challenging puzzles, or shaping clay into art - each hobby is a doorway to new experiences and joy.

Remember, the best part of any hobby isn't being perfect at it, but having fun while learning and creating. Every expert was once a beginner, and every masterpiece started with a single brushstroke, stitch, or gentle touch.

Your curiosity and willingness to try new things is what makes you truly special. Keep exploring, keep creating, and most importantly, keep having fun!

Happy Birthday! May this year be filled with creativity, discovery, and lots of joyful moments.

With love and excitement for your journey ahead,
Your HobbyQuest Adventure Team ✨`;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-background via-muted/20 to-highlight/10">
      <div className="max-w-2xl mx-auto pt-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Heart className="w-10 h-10 text-secondary-foreground fill-current" />
          </div>
          <h1 className="text-4xl font-bold text-primary font-fredoka mb-4">
            A Special Message
          </h1>
          <div className="flex justify-center space-x-2">
            <Sparkles className="w-6 h-6 text-highlight animate-pulse" />
            <Sparkles className="w-6 h-6 text-accent animate-pulse" style={{ animationDelay: '0.5s' }} />
            <Sparkles className="w-6 h-6 text-secondary animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>

        {/* Letter */}
        <Card className="p-8 shadow-2xl">
          {showLetter ? (
            <div className="space-y-4">
              {letterText.split('\n\n').map((paragraph, index) => (
                <p
                  key={index}
                  className="text-foreground leading-relaxed animate-typewriter"
                  style={{
                    animationDelay: `${index * 0.5}s`,
                    animationFillMode: 'both'
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mx-auto mb-4"></div>
                <div className="h-4 bg-muted rounded w-1/2 mx-auto mb-4"></div>
                <div className="h-4 bg-muted rounded w-2/3 mx-auto"></div>
              </div>
            </div>
          )}
        </Card>

        {/* Decorative elements */}
        <div className="flex justify-center space-x-6 mt-12">
          <div className="w-4 h-4 bg-secondary rounded-full animate-bounce-gentle" />
          <div className="w-4 h-4 bg-accent rounded-full animate-bounce-gentle" style={{ animationDelay: '0.2s' }} />
          <div className="w-4 h-4 bg-highlight rounded-full animate-bounce-gentle" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );
};