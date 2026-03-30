import ChooseTopicIcon from "../../../assets/choose-topic-cat.svg?react";
import SolveTasksIcon from "../../../assets/solve-tasks.svg?react";
import TrackProgressIcon from "../../../assets/track-progress-cat.svg?react";
import { howItWorksData } from "../data/mainPageData";

const iconsById = {
  "choose-topic": ChooseTopicIcon,
  "solve-tasks": SolveTasksIcon,
  "track-progress": TrackProgressIcon,
} as const;

export default function HowItWorksSection() {
  return (
    <section className="bg-app py-16 sm:py-20 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
            {howItWorksData.title}
          </h2>

          <p className="mt-4 text-sm leading-6 text-text-muted sm:text-base">
            {howItWorksData.description}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {howItWorksData.items.map((item) => {
            const Icon = iconsById[item.id];

            return (
              <article
                key={item.id}
                className="rounded-3xl border border-border-soft bg-surface p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-muted">
                  <Icon
                    className="h-20 w-20 text-text-primary"
                    aria-hidden="true"
                    focusable="false"
                  />
                </div>

                <h3 className="text-lg font-bold text-text-primary">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-text-muted">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
