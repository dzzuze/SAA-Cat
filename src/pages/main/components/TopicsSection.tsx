import { topicsSectionData } from "../data/mainPageData";
import { topicsImages } from "../config/topicsImages";
import TopicCard from "./TopicCard";
import { Link } from "react-router-dom";

export default function TopicsSection() {
  return (
    <section className="bg-app py-16 sm:py-20 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
              {topicsSectionData.title}
            </h2>

            <p className="mt-4 text-sm leading-6 text-text-muted sm:text-base">
              {topicsSectionData.description}
            </p>
          </div>

          <Link
            to="/topics"
            className="text-sm font-semibold text-main-yellow transition-colors duration-200 hover:opacity-80"
          >
            {topicsSectionData.actionLabel} →
          </Link>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {topicsSectionData.items.map((topic) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              image={topicsImages[topic.id]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}