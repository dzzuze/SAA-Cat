export const heroData = {
  badge: "New: Data Structures Module",
  titleStart: "Become confident in",
  titleHighlight: "JavaScript",
  titleEnd: "interviews",
  description:
    "Master coding challenges with a playful yet professional platform designed for developers. From closures to system design, we’ve got you covered.",
  primaryButtonText: "Start Practicing",
  secondaryButtonText: "View Curriculum",
};

export type HowItWorksItemId =
  | "choose-topic"
  | "solve-tasks"
  | "track-progress";

export interface HowItWorksItem {
  id: HowItWorksItemId;
  title: string;
  description: string;
}

interface HowItWorksData {
  title: string;
  description: string;
  items: HowItWorksItem[];
}

export const howItWorksData: HowItWorksData = {
  title: "How it Works",
  description: "A structured path to technical excellence.",
  items: [
    {
      id: "choose-topic",
      title: "Choose Topic",
      description:
        "Select from Core JS, TypeScript, or advanced Algorithms tailored to current market demands.",
    },
    {
      id: "solve-tasks",
      title: "Solve Tasks",
      description:
        "Write real code in our interactive browser-based editor with instant feedback and hints.",
    },
    {
      id: "track-progress",
      title: "Track Progress",
      description:
        "Monitor your XP, maintain daily streaks, and climb the global developer leaderboard.",
    },
  ],
};