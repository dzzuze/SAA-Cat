import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Topic } from "../types/topic";
import getTopicById from "../lib/firebase/getTopicById";
import MarkdownRenderer from "../components/ui/MarkdownRenderer";

export default function TopicPage() {
  const { id } = useParams();

  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchTopic = async () => {
      try {
        const data = await getTopicById(id);
        if (!data) {
          setError("Topic not found");
        } else {
          setTopic(data);
        }
      } catch (e) {
        setError("Failed to load topic" + e);
      } finally {
        setLoading(false);
      }
    };

    fetchTopic();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-red-500">
        {error}
      </div>
    );
  }

  if (!topic) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <br />
      <br />
      <br />
      {topic.imageUrl && (
        <img
          src={topic.imageUrl}
          alt={topic.title}
          className="w-full h-64 object-cover rounded-2xl mb-6"
        />
      )}

      <h1 className="text-3xl font-bold mb-4">{topic.title}</h1>

      <p className="text-sm text-gray-500 mb-6">
        Difficulty: {topic.difficulty}
      </p>

      <MarkdownRenderer content={topic.content} />
    </div>
  );
}
