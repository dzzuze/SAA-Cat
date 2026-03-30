import Button from "../../../components/ui/Button";
import type { TopicItem, TopicLevel } from "../data/mainPageData";
import { Link } from "react-router-dom";

interface TopicCardProps {
  topic: TopicItem;
  image: string;
}

const levelClasses: Record<TopicLevel, string> = {
  Beginner:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  Intermediate:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  Advanced:
    "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
};

export default function TopicCard({ topic, image }: TopicCardProps) {
  return (
    <article className="cursor-pointer overflow-hidden rounded-3xl border border-border-soft bg-surface shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="aspect-[8/9] w-full overflow-hidden bg-surface-muted">
        <img
          src={image}
          alt={topic.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold text-text-primary">{topic.title}</h3>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${levelClasses[topic.level]}`}
          >
            {topic.level}
          </span>
        </div>

        <p className="mt-4 text-sm leading-6 text-text-muted">
          {topic.description}
        </p>

        <div className="mt-6">
          <Link to={`/learn/${topic.id}`} className="block">
            <Button variant="secondary" className="w-full">
              Practice
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}