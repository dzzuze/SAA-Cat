import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getQuizById,
  getQuizQuestions,
} from "../lib/firebase/quizzes";
import type { Quiz, QuizQuestion } from "../types/quiz";

export default function QuizPage(): React.JSX.Element {
  const { quizId } = useParams();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    async function loadQuizData() {
      if (!quizId) {
        setErrorMessage("Quiz id is missing.");
        setIsLoading(false);
        return;
      }

      try {
        const [quizData, questionsData] = await Promise.all([
          getQuizById(quizId),
          getQuizQuestions(quizId),
        ]);

        setQuiz(quizData);
        setQuestions(questionsData);
      } catch (error) {
        console.error("Failed to load quiz:", error);
        setErrorMessage("Failed to load quiz.");
      } finally {
        setIsLoading(false);
      }
    }

    loadQuizData();
  }, [quizId]);

  const currentQuestion = questions[currentQuestionIndex];

  const score = useMemo(() => {
    return questions.reduce((total, question, index) => {
      if (answers[index] === question.correctAnswer) {
        return total + 1;
      }

      return total;
    }, 0);
  }, [answers, questions]);

  function handleSelectAnswer(option: string) {
    setSelectedAnswer(option);
  }

  function handleNextQuestion() {
    if (!selectedAnswer) {
      return;
    }

    const updatedAnswers = {
      ...answers,
      [currentQuestionIndex]: selectedAnswer,
    };

    setAnswers(updatedAnswers);

    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    if (isLastQuestion) {
      setIsFinished(true);
      return;
    }

    const nextIndex = currentQuestionIndex + 1;

    setCurrentQuestionIndex(nextIndex);
    setSelectedAnswer(updatedAnswers[nextIndex] ?? null);
  }

  function handleRestartQuiz() {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers({});
    setIsFinished(false);
  }

  if (isLoading) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-base">Loading quiz...</p>
      </section>
    );
  }

  if (errorMessage || !quiz || questions.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-base text-red-500">
          {errorMessage || "Quiz not found."}
        </p>
      </section>
    );
  }

  if (isFinished) {
    const passed = score >= quiz.passingScore;

    return (
      <section className="flex-1 mx-auto max-w-3xl px-4 py-10">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-neutral-900">
          <h1 className="text-3xl font-bold text-main-dark dark:text-white">
            {quiz.title}
          </h1>

          <p className="mt-4 text-lg text-gray-700 dark:text-gray-200">
            Your result: {score} / {questions.length}
          </p>

          <p className="mt-2 text-sm font-medium">
            {passed ? "Passed" : "Not passed yet"}
          </p>

          <div className="mt-8 space-y-4">
            {questions.map((question, index) => {
              const userAnswer = answers[index];
              const isCorrect = userAnswer === question.correctAnswer;

              return (
                <article
                  key={question.id}
                  className="rounded-2xl border border-gray-200 p-4 dark:border-gray-700"
                >
                  <h2 className="font-semibold text-main-dark dark:text-white">
                    {index + 1}. {question.question}
                  </h2>

                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                    Your answer: {userAnswer ?? "No answer"}
                  </p>

                  <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                    Correct answer: {question.correctAnswer}
                  </p>

                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {question.explanation}
                  </p>

                  <p className="mt-2 text-sm font-semibold">
                    {isCorrect ? "Correct" : "Wrong"}
                  </p>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleRestartQuiz}
            className="mt-8 rounded-2xl bg-main-yellow px-5 py-3 font-semibold text-main-dark transition hover:opacity-90"
          >
            Restart quiz
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="flex-1 mx-auto max-w-3xl px-4 py-10">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-neutral-900">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>

        <h1 className="mt-2 text-3xl font-bold text-main-dark dark:text-white">
          {quiz.title}
        </h1>

        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {quiz.description}
        </p>

        <h2 className="mt-8 text-xl font-semibold text-main-dark dark:text-white">
          {currentQuestion.question}
        </h2>

        <div className="mt-6 space-y-3">
          {currentQuestion.options.map((option) => {
            const isActive = selectedAnswer === option;

            return (
              <button
                key={option}
                type="button"
                onClick={() => handleSelectAnswer(option)}
                className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                  isActive
                    ? "border-yellow-400 bg-yellow-50 dark:bg-yellow-400/10"
                    : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-neutral-900"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleNextQuestion}
          disabled={!selectedAnswer}
          className="mt-8 rounded-2xl bg-main-yellow px-5 py-3 font-semibold text-main-dark transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {currentQuestionIndex === questions.length - 1
            ? "Finish quiz"
            : "Next question"}
        </button>
      </div>
    </section>
  );
}