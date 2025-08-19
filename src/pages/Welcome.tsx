import { Button } from "@/components/ui/button";
import { Gift, Sparkles } from "lucide-react";

interface WelcomeProps {
  onStart: () => void;
}

export const Welcome = ({ onStart }: WelcomeProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-background via-background to-muted/30">
      <div className="text-center max-w-md space-y-8">
        {/* Main Icon */}
        <div className="relative">
          <div className="w-24 h-24 mx-auto mb-6 animate-bounce-gentle">
            <img
              src={import.meta.env.BASE_URL + "avatar.png"}
              alt="Pixel Art Avatar"
              className="w-full h-full object-contain pixelated"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
          <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-highlight animate-pulse" />
        </div>

        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-primary font-fredoka">
            Benvuta in
          </h1>
          <div className="text-5xl font-bold bg-gradient-to-r from-secondary via-accent to-highlight bg-clip-text text-transparent font-fredoka">
            HobbyQuest
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-lg text-muted-foreground leading-relaxed">
          La tua avventura di compleanno sta per iniziare... 🎉
        </p>

        {/* Start Button */}
        <Button
          onClick={onStart}
          variant="quest"
          size="lg"
          className="w-full max-w-xs font-semibold"
        >
          Inizia la missione
          <Sparkles className="ml-2 w-5 h-5" />
        </Button>

        {/* Decorative elements */}
        <div className="flex justify-center space-x-4 mt-8 opacity-60">
          <div className="w-3 h-3 bg-secondary rounded-full animate-pulse" />
          <div
            className="w-3 h-3 bg-accent rounded-full animate-pulse"
            style={{ animationDelay: "0.5s" }}
          />
          <div
            className="w-3 h-3 bg-highlight rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>
      </div>
    </div>
  );
};
