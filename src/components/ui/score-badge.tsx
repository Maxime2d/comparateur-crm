import { cn, getScoreBgColor } from "@/lib/utils";

interface ScoreBadgeProps {
  score: number;
  className?: string;
}

export function ScoreBadge({ score, className }: ScoreBadgeProps) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-sm font-bold", getScoreBgColor(score), className)}>
      {score.toFixed(1)}/10
    </span>
  );
}
