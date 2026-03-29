import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

import { useAuth } from "../auth/useAuth";
import getTopicById from "../lib/firebase/getTopicById";
import getLessonsByTopicId from "../lib/firebase/getLessonsByTopicId";
import { db } from "../lib/firebase/firebase";

import type { Topic } from "../types/topic";
import type { Lesson } from "../types/lesson";

export default function LessonsPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const { user } = useAuth();

  const [topic, setTopic] = useState<Topic | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [completed, setCompleted] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!topicId) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        setNotFound(false);

        const [topicData, lessonsData] = await Promise.all([
          getTopicById(topicId),
          getLessonsByTopicId(topicId),
        ]);

        if (!topicData) {
          setNotFound(true);
          return;
        }

        setTopic(topicData);
        setLessons(lessonsData);

        if (user?.uid) {
          const userRef = doc(db, "users", user.uid);
          const userSnapshot = await getDoc(userRef);

          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            const completedLessons = Array.isArray(userData.completed)
              ? userData.completed
              : [];

            setCompleted(completedLessons);
          } else {
            setCompleted([]);
          }
        } else {
          setCompleted([]);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load lessons.");
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [topicId, user?.uid]);

  const completionSet = useMemo(() => new Set(completed), [completed]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <p className="text-sm text-slate-500">Loading lessons...</p>
      </div>
    );
  }

  if (notFound || !topicId) {
    return <Navigate to="/404" replace />;
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  if (!topic) {
    return <Navigate to="/404" replace />;
  }

  const isLessonCompleted = (lesson: Lesson) => {
    const byId = `${topicId}:${lesson.id}`;
    const legacyByTitle = `${topicId}:${lesson.title}`;

    return completionSet.has(byId) || completionSet.has(legacyByTitle);
  };

  const isLessonUnlocked = (lesson: Lesson, index: number) => {
    if (index === 0) return true;
    if (isLessonCompleted(lesson)) return true;

    const previousLesson = lessons[index - 1];
    if (!previousLesson) return false;

    return isLessonCompleted(previousLesson);
  };

  return (
    <section className="flex-1 mt-8 px-4 py-10 md:py-14">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/"
          className="mb-6 inline-block text-sm font-medium text-emerald-600 transition hover:text-emerald-700"
        >
          ← Back
        </Link>

        <header className="mb-10">
          <h1 className="mb-3 text-4xl font-bold text-slate-900">
            {topic.title}
          </h1>
          <p className="text-sm font-medium text-slate-500">
            Difficulty: {topic.difficulty}
          </p>
        </header>

        {lessons.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600 shadow-sm">
            No lessons yet.
          </div>
        ) : (
          <div className="space-y-4">
            {lessons.map((lesson, index) => {
              const unlocked = isLessonUnlocked(lesson, index);
              const completedLesson = isLessonCompleted(lesson);

              if (!unlocked) {
                return (
                  <div
                    key={lesson.id}
                    className="cursor-not-allowed rounded-2xl border border-slate-200 bg-slate-100 p-5 opacity-60"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="mb-1 text-sm text-slate-500">
                          Lesson {index + 1}
                        </p>

                        <h2 className="text-xl font-semibold text-slate-700">
                          {lesson.title}
                        </h2>
                      </div>

                      <span className="text-sm font-medium text-slate-500">
                        Locked
                      </span>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={lesson.id}
                  to={`/learn/${topicId}/lessons/${lesson.id}`}
                  className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="mb-1 text-sm text-slate-500">
                        Lesson {index + 1}
                      </p>

                      <h2 className="text-xl font-semibold text-slate-900">
                        {lesson.title}
                      </h2>
                    </div>

                    <span className="text-sm font-medium text-emerald-600">
                      {completedLesson ? "Completed" : "Open →"}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
