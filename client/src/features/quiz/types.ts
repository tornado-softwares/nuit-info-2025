export interface QuizQuestion {
  id: number;
  question: string;
  advice: string;
}

export interface AnswerHistory {
  question: string;
  wasYes: boolean;
  advice: string;
}

export interface QuizResult {
  score: number;
  total: number;
  level: "free" | "moderate" | "dependent";
  title: string;
  message: string;
  improvements: string[];
}
