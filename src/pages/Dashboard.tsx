import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getTopics } from "../lib/firebase/getTopics";
import type { Topic } from "../types/topic";

type DifficultyFilter = "all" | "beginner" | "intermediate" | "advanced";

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const difficultyFromUrl = searchParams.get(
    "difficulty",
  ) as DifficultyFilter | null;
  const [activeFilter, setActiveFilter] = useState<DifficultyFilter>(
    difficultyFromUrl || "all",
  );

  useEffect(() => {
    const urlFilter = searchParams.get("difficulty") as DifficultyFilter | null;
    if (urlFilter) {
      setActiveFilter(urlFilter);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const data = await getTopics();
        setTopics(data);
      } catch (e) {
        setError("Failed to load topics: " + e);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  const handleFilterChange = (filter: DifficultyFilter) => {
    setActiveFilter(filter);
    if (filter === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ difficulty: filter });
    }
  };

  const filteredTopics = topics.filter((topic) => {
    if (activeFilter === "all") return true;
    return topic.difficulty === activeFilter;
  });

  const filters: { label: string; value: DifficultyFilter }[] = [
    { label: "All", value: "all" },
    { label: "Beginner", value: "beginner" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Advanced", value: "advanced" },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500">
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

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <br />
      <br />
      <br />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => handleFilterChange(filter.value)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                activeFilter === filter.value
                  ? "bg-yellow-300 text-black"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {filteredTopics.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No topics found for this difficulty level.</p>
          <button
            onClick={() => handleFilterChange("all")}
            className="mt-4 text-yellow-600 hover:text-yellow-700 font-semibold"
          >
            View all topics →
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredTopics.map((topic) => (
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

              <span
                className={`px-2 py-1 text-xs rounded-full font-semibold ${
                  topic.difficulty === "beginner"
                    ? "bg-green-100 text-green-700"
                    : topic.difficulty === "intermediate"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                }`}
              >
                {topic.difficulty}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
