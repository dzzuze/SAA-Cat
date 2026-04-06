import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getTopics } from "../lib/firebase/getTopics";
import type { Topic } from "../types/topic";

type DifficultyFilter = "all" | "beginner" | "intermediate" | "advanced";

const filters: { label: string; value: DifficultyFilter }[] = [
  { label: "All", value: "all" },
  { label: "Beginner", value: "beginner" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Advanced", value: "advanced" },
];

function isDifficultyFilter(value: string | null): value is DifficultyFilter {
  return (
    value === "all" ||
    value === "beginner" ||
    value === "intermediate" ||
    value === "advanced"
  );
}

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const difficultyFromUrl = searchParams.get("difficulty");
  const [activeFilter, setActiveFilter] = useState<DifficultyFilter>(
    isDifficultyFilter(difficultyFromUrl) ? difficultyFromUrl : "all",
  );

  useEffect(() => {
    const urlFilter = searchParams.get("difficulty");

    if (isDifficultyFilter(urlFilter)) {
      setActiveFilter(urlFilter);
      return;
    }

    setActiveFilter("all");
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

    void fetchTopics();
  }, []);

  const handleFilterChange = (filter: DifficultyFilter) => {
    setActiveFilter(filter);

    if (filter === "all") {
      setSearchParams({});
      return;
    }

    setSearchParams({ difficulty: filter });
  };

  const filteredTopics = topics.filter((topic) => {
    if (activeFilter === "all") return true;
    return topic.difficulty === activeFilter;
  });

  if (loading) {
    return (
      <div className="flex h-[60vh] flex-1 items-center justify-center bg-app text-text-primary transition-colors duration-300">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-border-soft border-t-main-yellow" />
          <span className="font-medium text-text-muted">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[60vh] items-center justify-center bg-app px-4 text-center text-red-500 transition-colors duration-300">
        {error}
      </div>
    );
  }

  return (
    <div className="mx-auto flex-1 max-w-5xl bg-app px-4 py-24 text-text-primary transition-colors duration-300">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-text-primary">Library</h1>

        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => handleFilterChange(filter.value)}
              className={`cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                activeFilter === filter.value
                  ? "bg-main-yellow text-main-dark"
                  : "bg-surface-muted text-text-muted hover:bg-surface hover:text-text-primary"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {filteredTopics.length === 0 ? (
        <div className="py-12 text-center text-text-muted">
          <p className="text-lg">No topics found for this difficulty level.</p>
          <button
            type="button"
            onClick={() => handleFilterChange("all")}
            className="mt-4 font-semibold text-main-yellow transition-opacity hover:opacity-80"
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
              className="block rounded-2xl border border-border-soft bg-surface p-4 transition-all duration-200 hover:border-main-yellow hover:shadow-md"
            >
              {topic.imageUrl && (
                <img
                  src={topic.imageUrl}
                  alt={topic.title}
                  className="mb-3 h-40 w-full rounded-xl object-cover"
                />
              )}

              <h3 className="mb-1 text-lg font-semibold text-text-primary">
                {topic.title}
              </h3>

              <span
                className={`rounded-full px-2 py-1 text-xs font-semibold ${
                  topic.difficulty === "beginner"
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                    : topic.difficulty === "intermediate"
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                      : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300"
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
