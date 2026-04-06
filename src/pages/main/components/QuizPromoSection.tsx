import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getQuizById } from "../../../lib/firebase/quizzes";
import type { Quiz } from "../../../types/quiz";
import CatsIcon from "../../../assets/books-cat.svg?react";
import CatsLine from "../../../assets/curious-kittens.svg?react";
import StrechingCat from "../../../assets/streching-cat.svg?react";

export default function QuizPromoSection() {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadQuiz() {
      try {
        const data = await getQuizById("javascript-basics-quiz");
        setQuiz(data);
      } catch (error) {
        console.error("Failed to load promo quiz:", error);
      } finally {
        setIsLoading(false);
      }
    }

    void loadQuiz();
  }, []);

  if (isLoading) {
    return (
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[2rem] border border-slate-200 bg-white px-6 py-10 shadow-xl dark:border-white/10 dark:bg-neutral-900 md:px-10 md:py-14">
            <p className="text-slate-600 dark:text-gray-300">Loading quiz...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!quiz) {
    return null;
  }

  return (
    <section className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white px-6 py-10 shadow-xl transition-colors dark:border-white/10 dark:bg-neutral-900 md:px-10 md:py-14">
          <div className="absolute top-2 left-2 text-5xl md:text-7xl dark:opacity-70">
            <CatsIcon className="h-32 w-32" />
          </div>
          <div className="absolute top-6 right-6 text-4xl opacity-20 md:text-6xl dark:opacity-50">
            🐾
          </div>
          <div className="absolute right-10 bottom-4 text-5xl opacity-20 md:text-7xl dark:opacity-30">
            🐾
          </div>

          <div className="relative z-10 grid items-center gap-10 md:grid-cols-2">
            <div>
              <span className="inline-flex rounded-full border border-yellow-300 bg-yellow-100 px-4 py-1 text-sm font-semibold text-main-dark dark:border-yellow-400/30 dark:bg-yellow-400/10 dark:text-main-yellow">
                Quiz time
              </span>

              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-main-dark dark:text-white md:text-5xl">
                Check your knowledge
              </h2>

              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-gray-300 md:text-lg">
                {quiz.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to={`/quiz/${quiz.id}`}
                  className="inline-flex items-center justify-center rounded-2xl bg-main-yellow px-6 py-3 text-base font-bold text-main-dark transition hover:scale-[1.02] hover:opacity-95"
                >
                  Start quiz
                </Link>

                <Link
                  to={`/learn/core-javascript`}
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-slate-100 px-6 py-3 text-base font-semibold text-main-dark transition hover:bg-slate-200 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                >
                  Read topic first
                </Link>
              </div>
              <CatsLine className="absolute bottom-0 -left-[30%] w-full h-20 md:h-32 lg:h-40 dark:opacity-60 pointer-events-none" />
            </div>
            <div className="relative">
              <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5 shadow-sm transition-colors dark:border-white/10 dark:bg-white/5 dark:backdrop-blur-sm">
                <div className="rounded-[1.5rem] bg-white p-6 transition-colors dark:bg-neutral-950/70">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-500 dark:text-gray-400">
                      SAA-CAT Challenge
                    </span>
                    <span className="text-2xl">
                      <StrechingCat className="h-32 w-32" />
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl font-bold text-main-dark dark:text-white">
                    {quiz.title}
                  </h3>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/5">
                      <span className="text-slate-600 dark:text-gray-300">
                        Questions
                      </span>
                      <span className="font-bold text-main-yellow">
                        {quiz.questionsCount}
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/5">
                      <span className="text-slate-600 dark:text-gray-300">
                        Level
                      </span>
                      <span className="font-bold text-main-dark dark:text-white">
                        Beginner
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/5">
                      <span className="text-slate-600 dark:text-gray-300">
                        Pass score
                      </span>
                      <span className="font-bold text-main-dark dark:text-white">
                        {quiz.passingScore} / {quiz.questionsCount}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-yellow-300 bg-yellow-100 p-4 text-sm text-main-dark dark:border-yellow-400/30 dark:bg-yellow-400/10 dark:text-yellow-100">
                    A curious cat always checks if the knowledge is really
                    learned.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
