import { HobbyIcon } from "@/components/HobbyIcon";
import { ProgressBar } from "@/components/ProgressBar";

interface HobbySelectProps {
  onHobbySelect: (hobby: string) => void;
  completedHobbies: string[];
  currentProgress: number;
}

const hobbies = [
  { id: "earrings", icon: "💎", label: "", color: "coral" as const },
  { id: "painting", icon: "🎨", label: "", color: "turquoise" as const },
  { id: "sewing", icon: "🪡", label: "", color: "lime" as const },
  { id: "puzzles", icon: "🧩", label: "", color: "purple" as const },
  { id: "pottery", icon: "🏺", label: "", color: "green" as const },
];

export const HobbySelect = ({
  onHobbySelect,
  completedHobbies,
  currentProgress,
}: HobbySelectProps) => {
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
        <div className="grid grid-cols-2 gap-6 justify-items-center">
          {hobbies.map((hobby, index) => {
            const isCompleted = completedHobbies.includes(hobby.id);
            const isDisabled = isCompleted;
            const isLastOddItem =
              index === hobbies.length - 1 && hobbies.length % 2 !== 0;

            return (
              <div key={hobby.id} className={isLastOddItem ? "col-span-2" : ""}>
                <HobbyIcon
                  icon={hobby.icon}
                  label={hobby.label}
                  color={hobby.color}
                  onClick={() => !isDisabled && onHobbySelect(hobby.id)}
                  disabled={isDisabled}
                  className={`relative ${
                    isCompleted ? "ring-4 ring-quest-progress" : ""
                  }`}
                />
              </div>
            );
          })}
        </div>

        {currentProgress === 5 && (
          <div className="text-center mt-12">
            <div className="bg-card p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-bold text-primary mb-2 font-fredoka">
                All Hobbies Unlocked! 🎉
              </h2>
              <p className="text-muted-foreground">
                Time for your final quiz...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
