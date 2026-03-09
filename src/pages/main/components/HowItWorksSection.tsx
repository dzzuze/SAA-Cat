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
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {howItWorksData.title}
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
            {howItWorksData.description}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {howItWorksData.items.map((item) => {
            const Icon = iconsById[item.id];

            return (
              <article
                key={item.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50">
                  <Icon
                    className="h-36 w-36 text-slate-900"
                    aria-hidden="true"
                    focusable="false"
                  />
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
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
