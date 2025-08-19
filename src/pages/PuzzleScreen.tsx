import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProgressBar } from "@/components/ProgressBar";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Eye, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PuzzleScreenProps {
  hobby: string;
  onBack: () => void;
  onComplete: () => void;
  currentProgress: number;
}

// Database hobby → indizio, password, istruzioni (adattato dal tuo puzzle.js)
const hobbyData: Record<
  string,
  { hint: string; pass: string; where: string; emoji: string }
> = {
  earrings: {
    hint: "Guarda te stessa, non fermarti al riflesso. Oltre lo sguardo troverai il nesso.",
    pass: "SPECCHIO!",
    where: "LVL UP ⬆ : Sigillo della Fioritura Eterna 🌺",
    emoji: "�✨🔮",
  },
  painting: {
    hint: "Dove il calore prepara ogni pasto, sotto il fuoco il segreto è nascosto.",
    pass: "FORNO!",
    where: "LVL UP ⬆ : Grimorio dell'alchimista 🧙‍♂️",
    emoji: "🎨🖌️🌈", 
  },
  sewing: {
    hint: "Tra petali e polvere, un segno si cela, cerca lì sotto: la caccia rivela.",
    pass: "VASO!",
    where: "LVL UP ⬆ : Ago delle Metamorfosi 🦋",
    emoji: "🪡🧵✂️",
  },
  puzzles: {
    hint: "Tra scorte e vapore un enigma si pone, cerca il tassello: lì si compone.",
    pass: "BAGNO!",
    where: "LVL UP ⬆ : Frammento dell’Armonia Perduta 🌌",
    emoji: "🧩🔍🤔",
  },
  pottery: {
    hint: "Là dove l'amore si fa fodero per spada, troverai l'indizio che il cammino dirada.",
    pass: "PESCE!",
    where: "LVL UP ⬆ : Mani del forgiatore 🛡️",
    emoji: "🏺👐�",
  },
};

export const PuzzleScreen = ({
  hobby,
  onBack,
  onComplete,
  currentProgress,
}: PuzzleScreenProps) => {
  const [password, setPassword] = useState("");
  const [showGift, setShowGift] = useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const { toast } = useToast();

  const puzzleData = hobbyData[hobby];

  const handlePasswordSubmit = () => {
    const trimmedPassword = password.trim().toUpperCase();

    if (trimmedPassword === puzzleData.pass) {
      setIsPasswordCorrect(true);
      setShowGift(true);
      toast({
        title: "🎉 Password corretta!",
        description: "Hai sbloccato il tuo regalo!",
      });
    } else {
      toast({
        title: "❌ Password sbagliata",
        description: "Riprova! Controlla bene il post-it.",
        variant: "destructive",
      });
      // Reset password on wrong attempt
      setPassword("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && password.trim() && !isPasswordCorrect) {
      handlePasswordSubmit();
    }
  };

  const handleClaimReward = () => {
    onComplete();
  };

  if (!puzzleData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="p-8 text-center">
          <p className="text-destructive">Hobby non trovato!</p>
          <Button onClick={onBack} className="mt-4">
            Torna Indietro
          </Button>
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
          <div className="text-6xl space-x-2">{puzzleData.emoji}</div>

          {/* Mission Title */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary font-fredoka flex items-center justify-center gap-2">
              <Eye className="w-6 h-6" />
              La tua missione
            </h2>
            <p className="text-lg text-foreground leading-relaxed bg-muted p-4 rounded-xl">
              {puzzleData.hint}
            </p>
          </div>

          {/* Password Section */}
          {!showGift ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">
                Inserisci la password del post-it
              </h3>
              <p className="text-sm text-muted-foreground">
                Cerca il post-it nascosto e inserisci la password per sbloccare
                il regalo! 🔍
              </p>
              <div className="space-y-3">
                <Input
                  type="text"
                  placeholder="Inserisci la password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value.toUpperCase())}
                  onKeyPress={handleKeyPress}
                  className="text-center text-lg font-semibold tracking-wider"
                  autoComplete="off"
                  disabled={isPasswordCorrect}
                  maxLength={20}
                />
                <Button
                  onClick={handlePasswordSubmit}
                  variant="quest"
                  size="lg"
                  className="w-full"
                  disabled={isPasswordCorrect || !password.trim()}
                >
                  Conferma
                </Button>
              </div>
            </div>
          ) : (
            /* Gift Reveal Section */
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-primary flex items-center justify-center gap-2">
                  <Gift className="w-8 h-8" />
                  🗡️ Potere sbloccato!
                </h3>
                <div className="bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 p-6 rounded-xl">
                  <p className="text-lg font-medium text-foreground">
                    {puzzleData.where}
                  </p>
                </div>
              </div>

              <Button
                onClick={handleClaimReward}
                variant="quest"
                size="lg"
                className="w-full"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Ho trovato il tesoro.
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
