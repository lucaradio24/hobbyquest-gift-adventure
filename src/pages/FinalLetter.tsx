import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Sparkles, Home } from "lucide-react";

export const FinalLetter = () => {
  const [displayText, setDisplayText] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Testo della lettera (adattato dal tuo letter.html)
  const letterText = `Cara Giorgia,

Complimenti per aver completato la tua HobbyQuest adventure! 🎉

Hai scoperto che il mondo è pieno di hobby meravigliosi che aspettano solo di essere esplorati. Che si tratti di creare gioielli splendidi, dipingere capolavori colorati, cucire pezzi unici, risolvere puzzle stimolanti, o plasmare l'argilla in opere d'arte - ogni hobby è una porta verso nuove esperienze e gioia.

Ricorda, la parte migliore di qualsiasi hobby non è essere perfetti, ma divertirsi mentre si impara e si crea. Ogni esperto è stato una volta un principiante, e ogni capolavoro è iniziato con una singola pennellata, un punto, o un tocco delicato.

La tua curiosità e voglia di provare cose nuove è ciò che ti rende davvero speciale. Continua ad esplorare, continua a creare, e soprattutto, continua a divertirti!

Buon Compleanno! Che quest'anno sia pieno di creatività, scoperte, e tanti momenti gioiosi.

Con affetto e tantissimi auguri,

Il Boss 👑✨`;

  // Effetto typewriter (ispirato al tuo letter.js)
  useEffect(() => {
    const startDelay = 1000; // Attesa iniziale di 1 secondo
    const typeSpeed = 12; // Velocità di typing (millisecondi per carattere)

    const startTyping = () => {
      setIsTyping(true);
      let i = 0;

      const typeWriter = () => {
        if (i < letterText.length) {
          const nextChar = letterText.charAt(i);
          setDisplayText((prev) => prev + nextChar);
          i++;

          // Velocità variabile: più lenta per punteggiatura
          const delay = [".", "!", "?", ",", ":"].includes(nextChar)
            ? typeSpeed * 8
            : nextChar === "\n"
            ? typeSpeed * 4
            : typeSpeed;

          setTimeout(typeWriter, delay);
        } else {
          setIsTyping(false);
          // Mostra il bottone dopo 1 secondo dalla fine del typing
          setTimeout(() => {
            setShowButton(true);
          }, 1000);
        }
      };

      typeWriter();
    };

    const timer = setTimeout(startTyping, startDelay);
    return () => clearTimeout(timer);
  }, []);

  const handleRestartJourney = () => {
    // Ricarica la pagina per ricominciare l'avventura
    window.location.reload();
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-background via-muted/20 to-highlight/10">
      <div className="max-w-3xl mx-auto pt-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-primary font-fredoka mb-4">
            👑 Boss Level: La Lettera
          </h1>
          <div className="flex justify-center space-x-2">
            <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
            <Sparkles
              className="w-6 h-6 text-orange-500 animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
            <Sparkles
              className="w-6 h-6 text-yellow-600 animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </div>
        </div>

        {/* Letter Card */}
        <Card className="p-8 shadow-2xl bg-card/95 backdrop-blur-sm">
          <div className="relative">
            {/* Typewriter Text */}
            <div className="relative">
              <div
                className="text-foreground leading-relaxed whitespace-pre-line font-medium tracking-wide"
                style={{
                  fontSize: "1.1rem",
                  lineHeight: "1.8",
                  fontFamily: "Georgia, serif",
                }}
              >
                {displayText}
                {isTyping && (
                  <span
                    className="inline-block w-0.5 h-6 bg-primary ml-1 animate-pulse"
                    style={{
                      animation: "blink 1s infinite",
                      verticalAlign: "text-bottom",
                    }}
                  />
                )}
              </div>
            </div>

            {/* Loading indicator when not started */}
            {!displayText && (
              <div className="text-center py-12">
                <div className="animate-pulse">
                  <div className="h-4 bg-muted rounded w-3/4 mx-auto mb-4"></div>
                  <div className="h-4 bg-muted rounded w-1/2 mx-auto mb-4"></div>
                  <div className="h-4 bg-muted rounded w-2/3 mx-auto"></div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Action Button */}
        <div className="text-center mt-8">
          {showButton && (
            <Button
              onClick={handleRestartJourney}
              variant="quest"
              size="lg"
              className={`transition-all duration-500 ${
                showButton
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <Home className="w-5 h-5 mr-2" />
              Fine missione 🎉
            </Button>
          )}
        </div>

        {/* Decorative elements */}
        <div className="flex justify-center space-x-6 mt-12">
          <div className="w-4 h-4 bg-yellow-400 rounded-full animate-bounce-gentle" />
          <div
            className="w-4 h-4 bg-orange-400 rounded-full animate-bounce-gentle"
            style={{ animationDelay: "0.2s" }}
          />
          <div
            className="w-4 h-4 bg-yellow-500 rounded-full animate-bounce-gentle"
            style={{ animationDelay: "0.4s" }}
          />
        </div>
      </div>
    </div>
  );
};
