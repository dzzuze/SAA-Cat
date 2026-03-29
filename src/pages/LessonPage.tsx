import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import MarkdownRenderer from "../components/ui/MarkdownRenderer";
import getLessonById from "../lib/firebase/getLessonById";
import markLessonCompleted from "../lib/firebase/markLessonCompleted";
import type { Lesson } from "../types/lesson";
import { useAuth } from "../auth/useAuth";

export default function LessonPage() {
  const { topicId, lessonId } = useParams<{
    topicId: string;
    lessonId: string;
  }>();

  const { user } = useAuth();

  const [lesson, setLesson] = useState<Lesson | null>(null);
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

        const lessonData = await getLessonById(topicId, lessonId);

        if (!lessonData) {
          setNotFound(true);
          return;
        }

        setLesson(lessonData);
      } catch (err) {
        console.error(err);
        setError("Failed to load lesson.");
      } finally {
        setLoading(false);
      }
    };

    void fetchLesson();
  }, [topicId, lessonId]);

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
      <div className="flex min-h-[60vh] items-center justify-center">
        Loading lesson...
      </div>
    );
  }

  if (notFound) {
    return <Navigate to="/404" replace />;
  }

  if (error && !lesson) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!lesson || !topicId) {
    return <Navigate to="/404" replace />;
  }

  return (
    <section className="px-4 py-10 md:py-14">
      <div className="mx-auto max-w-3xl">
        <Link
          to={`/topics/${topicId}`}
          className="mb-6 inline-block text-sm font-medium text-emerald-600 hover:text-emerald-700"
        >
          ← Back to lessons
        </Link>

        <h1 className="mb-8 text-4xl font-bold text-slate-900">
          {lesson.title}
        </h1>

        <article className="rounded-3xl bg-white p-6 shadow-sm">
          <MarkdownRenderer content={lesson.content} />
        </article>

        <div className="mt-8 flex flex-col gap-4">
          <button
            type="button"
            onClick={handleComplete}
            disabled={isCompleting || isCompleted}
            className="rounded-2xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isCompleted
              ? "Completed"
              : isCompleting
                ? "Saving..."
                : "Complete lesson"}
          </button>

          {error ? <p className="text-sm text-red-500">{error}</p> : null}
        </div>
      </div>
    </section>
  );
}