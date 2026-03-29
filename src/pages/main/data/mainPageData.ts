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
export type TopicLevel = "Beginner" | "Intermediate" | "Advanced";

export type TopicItemId = "core-javascript" | "typescript" | "algorithms";

export interface TopicItem {
  id: TopicItemId;
  title: string;
  description: string;
  level: TopicLevel;
  difficultyFilter: string;
}

interface TopicsSectionData {
  title: string;
  description: string;
  actionLabel: string;
  items: TopicItem[];
}

export const topicsSectionData: TopicsSectionData = {
  title: "Practice by Topic",
  description:
    "Hand-picked challenges across the most popular categories to help you build confidence step by step.",
  actionLabel: "See all topics",
  items: [
    {
      id: "core-javascript",
      title: "Core JavaScript",
      description:
        "Master closures, prototypes, scope, hoisting, and the event loop through practical tasks.",
      level: "Beginner",
      difficultyFilter: "beginner",
    },
    {
      id: "typescript",
      title: "TypeScript",
      description:
        "Practice interfaces, generics, utility types, and strongly typed component architecture.",
      level: "Intermediate",
      difficultyFilter: "intermediate",
    },
    {
      id: "algorithms",
      title: "Algorithms",
      description:
        "Train logical thinking with sorting, searching, recursion, and real interview-style tasks.",
      level: "Advanced",
      difficultyFilter: "advanced",
    },
  ],
};
