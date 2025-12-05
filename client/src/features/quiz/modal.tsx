import { useState, useCallback } from "react";
import { X, ClipboardList } from "lucide-react";
import { QuizCard, QuizProgress, QuizResultView, QuizResult, AnswerHistory } from "./index";
import { QUIZ_QUESTIONS } from "./data/question";

interface TestGafamModalProps {
  onClose: () => void;
}

export function TestGafamModal({ onClose }: TestGafamModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gafamScore, setGafamScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [history, setHistory] = useState<AnswerHistory[]>([]);

  const handleAnswer = useCallback(
    (isYes: boolean) => {
      // "Oui" = réponse GAFAM (dépendant), "Non" = réponse libre
      if (isYes) {
        setGafamScore((s) => s + 1);
      }

      // Add to history
      setHistory((prev) => [
        ...prev,
        {
          question: QUIZ_QUESTIONS[currentIndex].question,
          wasYes: isYes,
          advice: QUIZ_QUESTIONS[currentIndex].advice,
        },
      ]);

      // Next question or finish
      if (currentIndex < QUIZ_QUESTIONS.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else {
        setIsFinished(true);
      }
    },
    [currentIndex]
  );

  const getResult = (): QuizResult => {
    const total = QUIZ_QUESTIONS.length;
    const independencePercent = Math.round(((total - gafamScore) / total) * 100);

    // Collect advice for questions where user answered "yes" (GAFAM choice)
    const improvements = history
      .filter((h) => h.wasYes)
      .map((h) => h.advice);

    if (independencePercent >= 70) {
      return {
        score: gafamScore,
        total,
        level: "free",
        title: "Résistant numérique 🛡️",
        message:
          "Vous avez une bonne maîtrise de votre environnement numérique. Quelques ajustements peuvent encore renforcer votre indépendance.",
        improvements,
      };
    }
    if (independencePercent >= 40) {
      return {
        score: gafamScore,
        total,
        level: "moderate",
        title: "Dépendance modérée",
        message:
          "Vous êtes conscient des enjeux mais plusieurs services GAFAM font encore partie de votre quotidien. Des alternatives existent.",
        improvements,
      };
    }
    return {
      score: gafamScore,
      total,
      level: "dependent",
      title: "Forte dépendance",
      message:
        "Les GAFAM occupent une place importante dans votre vie numérique. C'est le moment d'explorer des alternatives libres.",
      improvements,
    };
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setGafamScore(0);
    setIsFinished(false);
    setHistory([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
          <h2 className="flex items-center gap-2 text-sm font-medium text-slate-200">
            <ClipboardList size={16} className="text-slate-400" />
            Test d'indépendance numérique
          </h2>
          <button
            onClick={onClose}
            className="rounded p-1 text-slate-500 transition-colors hover:bg-slate-800 hover:text-slate-300"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[75vh] overflow-y-auto">
          {!isFinished ? (
            <div className="p-4">
              <QuizProgress current={currentIndex} total={QUIZ_QUESTIONS.length} />
              <QuizCard
                key={currentIndex}
                question={QUIZ_QUESTIONS[currentIndex]}
                onAnswer={handleAnswer}
              />
            </div>
          ) : (
            <QuizResultView
              result={getResult()}
              onRestart={handleRestart}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}
