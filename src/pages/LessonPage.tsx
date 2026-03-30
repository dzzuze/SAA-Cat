import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

import MarkdownRenderer from "../components/ui/MarkdownRenderer";
import { useAuth } from "../auth/useAuth";
import getLessonById from "../lib/firebase/getLessonById";
import getLessonsByTopicId from "../lib/firebase/getLessonsByTopicId";
import markLessonCompleted from "../lib/firebase/markLessonCompleted";
import { db } from "../lib/firebase/firebase";

import type { Lesson } from "../types/lesson";

export default function LessonPage() {
  const { topicId, lessonId } = useParams<{
    topicId: string;
    lessonId: string;
  }>();

  const { user } = useAuth();

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!topicId || !lessonId) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    const fetchLesson = async () => {
      try {
        setLoading(true);
        setError(null);

        const [lessonData, lessonsData] = await Promise.all([
          getLessonById(topicId, lessonId),
          getLessonsByTopicId(topicId),
        ]);

        if (!lessonData) {
          setNotFound(true);
          return;
        }

        setLesson(lessonData);
        setLessons(lessonsData);

        if (user?.uid) {
          const userRef = doc(db, "users", user.uid);
          const userSnapshot = await getDoc(userRef);

          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            const completed = Array.isArray(userData.completed)
              ? userData.completed
              : [];

            const lessonKeyById = `${topicId}:${lessonId}`;
            const lessonKeyByTitle = `${topicId}:${lessonData.title}`;

            const alreadyCompleted =
              completed.includes(lessonKeyById) ||
              completed.includes(lessonKeyByTitle);

            setIsCompleted(alreadyCompleted);
          } else {
            setIsCompleted(false);
          }
        } else {
          setIsCompleted(false);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load lesson.");
      } finally {
        setLoading(false);
      }
    };

    void fetchLesson();
  }, [topicId, lessonId, user?.uid]);

  const handleComplete = async () => {
    if (!user?.uid || !topicId || !lessonId) {
      return;
    }

    try {
      setIsCompleting(true);

      const lessonKey = `${topicId}:${lessonId}`;
      await markLessonCompleted(user.uid, lessonKey);

      setIsCompleted(true);
    } catch (err) {
      console.error(err);
      setError("Failed to save completion.");
    } finally {
      setIsCompleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-app text-text-primary transition-colors duration-300">
        <p className="text-text-muted">Loading lesson...</p>
      </div>
    );
  }

  if (notFound) {
    return <Navigate to="/404" replace />;
  }

  if (error && !lesson) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-app text-red-500 transition-colors duration-300">
        {error}
      </div>
    );
  }

  if (!lesson || !topicId) {
    return <Navigate to="/404" replace />;
  }

  const currentIndex = lessons.findIndex((item) => item.id === lesson.id);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  return (
    <section className="mt-8 bg-app px-4 py-10 text-text-primary transition-colors duration-300 md:py-14">
      <div className="mx-auto max-w-3xl">
        <Link
          to={`/learn/${topicId}`}
          className="mb-6 inline-block text-sm font-medium text-main-yellow transition-opacity hover:opacity-80"
        >
          ← Back to lessons
        </Link>

        <h1 className="mb-8 text-4xl font-bold text-text-primary">
          {lesson.title}
        </h1>

        <article className="rounded-3xl border border-border-soft bg-surface p-6 shadow-sm sm:p-8">
          <MarkdownRenderer content={lesson.content} />
        </article>

        <div className="mt-8 flex flex-col gap-4">
          <button
            type="button"
            onClick={handleComplete}
            disabled={isCompleting || isCompleted}
            className="rounded-2xl bg-main-yellow px-6 py-3 font-semibold text-main-dark transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isCompleted
              ? "Completed"
              : isCompleting
                ? "Saving..."
                : "Complete lesson"}
          </button>

          <div className="flex justify-between gap-4">
            {prevLesson ? (
              <Link
                to={`/learn/${topicId}/lessons/${prevLesson.id}`}
                className="rounded-2xl border border-border-soft bg-surface px-6 py-3 font-semibold text-text-primary transition hover:bg-surface-muted"
              >
                ← Back
              </Link>
            ) : (
              <Link
                to={`/learn/${topicId}`}
                className="rounded-2xl border border-border-soft bg-surface px-6 py-3 font-semibold text-text-primary transition hover:bg-surface-muted"
              >
                ← Back
              </Link>
            )}

            {nextLesson ? (
              <Link
                to={`/learn/${topicId}/lessons/${nextLesson.id}`}
                onClick={(e) => {
                  if (!isCompleted) e.preventDefault();
                }}
                className={`rounded-2xl px-6 py-3 font-semibold transition ${
                  isCompleted
                    ? "bg-main-yellow text-main-dark hover:opacity-90"
                    : "cursor-not-allowed bg-surface-muted text-text-muted"
                }`}
              >
                Go on →
              </Link>
            ) : (
              <Link
                to={`/learn/${topicId}`}
                onClick={(e) => {
                  if (!isCompleted) e.preventDefault();
                }}
                className={`rounded-2xl px-6 py-3 font-semibold transition ${
                  isCompleted
                    ? "bg-main-yellow text-main-dark hover:opacity-90"
                    : "cursor-not-allowed bg-surface-muted text-text-muted"
                }`}
              >
                Go on →
              </Link>
            )}
          </div>

          {error ? <p className="text-sm text-red-500">{error}</p> : null}
        </div>
      </div>
    </section>
  );
}