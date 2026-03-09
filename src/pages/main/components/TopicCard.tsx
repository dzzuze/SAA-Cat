import Button from "../../../components/ui/Button";
import type { TopicItem, TopicLevel } from "../data/mainPageData";

interface TopicCardProps {
  topic: TopicItem;
  image: string;
}

const levelClasses: Record<TopicLevel, string> = {
  Beginner: "bg-emerald-100 text-emerald-700",
  Intermediate: "bg-amber-100 text-amber-700",
  Advanced: "bg-rose-100 text-rose-700",
};

export default function TopicCard({ topic, image }: TopicCardProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-transform duration-200 hover:-translate-y-1">
      <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100">
        <img
          src={image}
          alt={topic.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold text-slate-900">{topic.title}</h3>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${levelClasses[topic.level]}`}
          >
            {topic.level}
          </span>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-600">
          {topic.description}
        </p>

        <div className="mt-6">
          <Button variant="secondary" className="w-full">
            Practice
          </Button>
        </div>
      </div>
    </article>
  );
}