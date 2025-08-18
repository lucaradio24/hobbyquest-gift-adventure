import { HobbyIcon } from "@/components/HobbyIcon";
import { ProgressBar } from "@/components/ProgressBar";

interface HobbySelectProps {
  onHobbySelect: (hobby: string) => void;
  completedHobbies: string[];
  currentProgress: number;
}

const hobbies = [
  { id: "earrings", icon: "💎", label: "Jewelry Making", color: "coral" as const },
  { id: "painting", icon: "🎨", label: "Painting", color: "turquoise" as const },
  { id: "sewing", icon: "🪡", label: "Sewing", color: "lime" as const },
  { id: "puzzles", icon: "🧩", label: "Puzzles", color: "purple" as const },
  { id: "pottery", icon: "🏺", label: "Pottery", color: "green" as const },
];

export const HobbySelect = ({ onHobbySelect, completedHobbies, currentProgress }: HobbySelectProps) => {
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
            Choose Your Next Hobby
          </h1>
          <p className="text-muted-foreground text-lg">
            Each hobby holds a special puzzle waiting to be solved! ✨
          </p>
        </div>

        {/* Hobby Grid - 4 on top, 1 centered below */}
        <div className="space-y-6">
          {/* First row - 4 hobbies */}
          <div className="grid grid-cols-2 gap-4">
            {hobbies.slice(0, 4).map((hobby) => {
              const isCompleted = completedHobbies.includes(hobby.id);
              const isDisabled = isCompleted;
              
              return (
                <HobbyIcon
                  key={hobby.id}
                  icon={hobby.icon}
                  label={hobby.label}
                  color={hobby.color}
                  onClick={() => !isDisabled && onHobbySelect(hobby.id)}
                  disabled={isDisabled}
                  className={`relative ${isCompleted ? 'animate-pixel-glow' : ''}`}
                />
              );
            })}
          </div>
          
          {/* Second row - 1 hobby centered */}
          <div className="flex justify-center">
            {hobbies.slice(4).map((hobby) => {
              const isCompleted = completedHobbies.includes(hobby.id);
              const isDisabled = isCompleted;
              
              return (
                <HobbyIcon
                  key={hobby.id}
                  icon={hobby.icon}
                  label={hobby.label}
                  color={hobby.color}
                  onClick={() => !isDisabled && onHobbySelect(hobby.id)}
                  disabled={isDisabled}
                  className={`relative ${isCompleted ? 'animate-pixel-glow' : ''} w-32`}
                />
              );
            })}
          </div>
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