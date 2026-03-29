import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import MarkdownRenderer from "../components/ui/MarkdownRenderer";
import getTopicById from "../lib/firebase/getTopicById";
import type { Topic } from "../types/topic";

export default function TopicPage() {
  const { id } = useParams<{ id: string }>();

  const [topic, setTopic] = useState<Topic | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      setIsNotFound(true);
      return;
    }

    const fetchTopic = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setIsNotFound(false);

        const data = await getTopicById(id);

        if (!data) {
          setIsNotFound(true);
          setTopic(null);
          return;
        }

        setTopic(data);
      } catch (err) {
        console.error("Failed to load topic:", err);
        setError("Failed to load topic.");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchTopic();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <p className="text-lg text-slate-600">Loading topic...</p>
      </div>
    );
  }

  if (isNotFound) {
    return <Navigate to="/404" replace />;
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  if (!topic) {
    return <Navigate to="/404" replace />;
  }

  return (
    <section className="px-4 py-10 md:py-14">
      <div className="mx-auto max-w-3xl">
        {topic.imageUrl ? (
          <img
            src={topic.imageUrl}
            alt={topic.title}
            className="mb-8 h-64 w-full rounded-3xl object-cover md:h-80"
          />
        ) : null}

        <header className="mb-8">
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-slate-900">
            {topic.title}
          </h1>

          <p className="text-sm font-medium text-slate-500">
            Difficulty: {topic.difficulty}
          </p>
        </header>

        <article className="prose prose-slate max-w-none">
          <MarkdownRenderer content={topic.content} />
        </article>
      </div>
    </section>
  );
}
