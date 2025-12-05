interface QuizProgressProps {
  current: number;
  total: number;
}

export function QuizProgress({ current, total }: QuizProgressProps) {
  const percentage = ((current) / total) * 100;

  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between text-sm text-slate-400">
        <span>{current + 1} sur {total}</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-700">
        <div
          className="h-full bg-slate-400 transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
