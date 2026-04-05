import { Link } from "react-router-dom";
import type { Quiz } from "../../types/quiz";

type Props = {
  quizzes: Quiz[];
};

export default function QuizSection({ quizzes }: Props) {
  if (!quizzes.length) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-main-dark dark:text-white">
        Quiz
      </h2>

      <div className="mt-6 space-y-4">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="rounded-2xl border border-gray-200 p-5 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold dark:text-white">
              {quiz.title}
            </h3>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {quiz.description}
            </p>

            <p className="mt-2 text-sm">
              {quiz.questionsCount} questions
            </p>

            <Link
              to={`/quiz/${quiz.id}`}
              className="mt-4 inline-block rounded-xl bg-main-yellow px-4 py-2 font-semibold text-main-dark"
            >
              Start quiz
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}