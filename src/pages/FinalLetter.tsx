import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Sparkles, Home } from "lucide-react";

export const FinalLetter = () => {
  const [displayText, setDisplayText] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Testo della lettera (adattato dal tuo letter.html)
  const letterText = `✨ Complimenti per aver completato la tua HobbyQuest adventure! 🎉



Hai detto che volevi imparare un nuovo hobby. Mi hai detto di sceglierne uno tra quelli che potevano piacerti.
Io te li ho portati tutti! 
Ora non ti resta che provarli e scegliere qual è il tuo preferito. 



E comunque non vorrei non parlare del fatto che sì, hai fatto 30 anni adesso.
Quasi stava passando in sordina.
Però comunque il fatto che hai 30 anni non significa necessariamente che ora sei una vecchia di merda, che la vita farà sempre più schifo e che il tempo della giovinezza è definitivamente finito.
Ora sei praticamente uguale a quella bambina che ho incontrato in prima media alla Gobetti (che mammamia quanto mi piaceva e aaaa e quanto mi piace pure mò marò giorgia sei bellissima aiuto guardati cioè guardati un attimo sì adesso maronna santa ma quanto fai paura vabbè che culo averti incontrata buon compleanno) però sei più alta, più intelligente, più bella, più triste ogni tanto ma anche più matura.
Cioè sei perfettamente capace di andare avanti con le tue forze in questa vita, sai fare un sacco di cose, sei un'ottima persona.




Comunque volevo dire che nonostante ora siamo grandi e adulti, la vita continua ad essere bella. 
È un po' come in un videogioco. Ora che sei al lvl 30 hai sbloccato nuovi poteri, 
nuove debolezze, nuove consapevolezze, ma la cosa più incredibile è che ora hai 
sbloccato anche nuovi mondi.

E se facciamo che la tua vita è un gioco in co-op, 
io spero proprio di essere il tuo giocatore 2 in tutte le nuove mappe che sbloccherai. 

Ti voglio proprio bene, 
dagli 11 ai 30 anni 
(per ora, poi aumentano spero) 

───────────────────────
        Auguri!
───────────────────────

   Il Boss
      (Luca) 👑✨`;

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
