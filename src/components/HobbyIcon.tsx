import { cn } from "@/lib/utils";

interface HobbyIconProps {
  icon: string;
  label: string;
  color: "coral" | "turquoise" | "lime" | "purple" | "green";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  showLabel?: boolean;
}

const colorClasses = {
  coral: "bg-secondary text-secondary-foreground",
  turquoise: "bg-accent text-accent-foreground", 
  lime: "bg-highlight text-highlight-foreground",
  purple: "bg-purple-400 text-white",
  green: "bg-quest-progress text-white"
};

export const HobbyIcon = ({ 
  icon, 
  label, 
  color, 
  onClick, 
  className,
  disabled = false,
  showLabel = true
}: HobbyIconProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "hobby-icon group flex flex-col items-center p-6 rounded-2xl shadow-lg",
        "focus:outline-none focus:ring-4 focus:ring-ring/20",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        colorClasses[color],
        className
      )}
    >
      <div className="text-6xl mb-3 group-hover:animate-bounce-gentle">
        {icon}
      </div>
      {showLabel && (
        <span className="font-medium text-sm text-center">
          {label}
        </span>
      )}
    </button>
  );
};