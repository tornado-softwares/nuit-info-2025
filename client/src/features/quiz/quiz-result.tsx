import { RotateCcw, ArrowRight } from "lucide-react";
import { QuizResult } from "./types";

interface QuizResultProps {
  result: QuizResult;
  onRestart: () => void;
  onClose: () => void;
}

export function QuizResultView({ result, onRestart, onClose }: QuizResultProps) {
  const independenceScore = Math.round(((result.total - result.score) / result.total) * 100);
  
  const getScoreColor = () => {
    if (independenceScore >= 70) return "text-emerald-400";
    if (independenceScore >= 40) return "text-amber-400";
    return "text-red-400";
  };

  const getBarColor = () => {
    if (independenceScore >= 70) return "bg-emerald-500";
    if (independenceScore >= 40) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="flex flex-col gap-5 p-5">
      {/* Score */}
      <div className="text-center">
        <div className="mb-1 text-sm text-slate-400">Votre score d'indépendance</div>
        <div className={`text-5xl font-bold ${getScoreColor()}`}>
          {independenceScore}%
        </div>
        <div className="mt-3 text-lg text-slate-200">{result.title}</div>
        <p className="mt-2 text-sm text-slate-400">{result.message}</p>
      </div>

      {/* Jauge */}
      <div>
        <div className="mb-1.5 flex justify-between text-xs text-slate-500">
          <span>Dépendant</span>
          <span>Libre</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-700">
          <div
            className={`h-full ${getBarColor()} transition-all duration-700 ease-out`}
            style={{ width: `${independenceScore}%` }}
          />
        </div>
      </div>

      {/* Pistes d'amélioration */}
      {result.improvements.length > 0 && (
        <div className="rounded-lg border border-slate-700 bg-slate-800/50">
          <div className="border-b border-slate-700 px-4 py-3">
            <h4 className="text-sm font-medium text-slate-300">
              {result.improvements.length} piste{result.improvements.length > 1 ? "s" : ""} d'amélioration
            </h4>
          </div>
          <div className="max-h-48 overflow-y-auto">
            <ul className="divide-y divide-slate-700/50">
              {result.improvements.map((advice, i) => (
                <li key={i} className="flex items-start gap-3 px-4 py-3">
                  <ArrowRight size={12} className="mt-1 shrink-0 text-slate-500" />
                  <span className="text-sm text-slate-400">{advice}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={onRestart}
          className="flex items-center justify-center gap-2 rounded-lg border border-slate-600 px-4 py-2.5 text-sm text-slate-300 transition-colors hover:bg-slate-700"
        >
          <RotateCcw size={14} />
          Refaire
        </button>
        <button
          onClick={onClose}
          className="flex-1 rounded-lg bg-slate-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-500"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}
