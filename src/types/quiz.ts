export type Quiz = {
  id: string;
  topicId: string;
  title: string;
  description: string;
  order: number;
  questionsCount: number;
  timeLimit: number | null;
  passingScore: number;
  isPublished: boolean;
  slug: string;
  version: number;
};

export type QuizQuestion = {
  id: string;
  quizId: string;
  order: number;
  type: "single-choice";
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  isPublished: boolean;
};