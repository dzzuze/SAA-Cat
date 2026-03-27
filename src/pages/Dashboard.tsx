import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../lib/firebase/getTopics";
import type { Topic } from "../types/topic";

export default function Dashboard() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const data = await getTopics();
        setTopics(data);
      } catch (e) {
        setError("Failed to load topics" + e);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-1 justify-center items-center h-[60vh]">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
          <span className="text-gray-500 font-medium">Loading...</span>
        </div>
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

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <br />
      <br />
      <br />
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="flex flex-col gap-4">
        {topics.map((topic) => (
          <Link
            key={topic.id}
            to={`/topics/${topic.id}`}
            className="block p-4 rounded-2xl border border-gray-200 hover:shadow-md hover:border-gray-300 transition"
          >
            {topic.imageUrl && (
              <img
                src={topic.imageUrl}
                alt={topic.title}
                className="w-full h-40 object-cover rounded-xl mb-3"
              />
            )}

            <h3 className="text-lg font-semibold mb-1">{topic.title}</h3>

            <p className="text-sm text-gray-500">
              Difficulty: {topic.difficulty}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
