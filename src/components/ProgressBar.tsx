import { cn } from "@/lib/utils";

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export const ProgressBar = ({ current, total, className }: ProgressBarProps) => {
  const percentage = (current / total) * 100;

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-muted-foreground">
          Progresso della missione
        </span>
        <span className="text-sm font-bold text-primary">
          {current}/{total}
        </span>
      </div>
      <div className="w-full bg-quest-bg rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-quest-progress rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};