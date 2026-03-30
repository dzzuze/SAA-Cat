import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";

import { useAuth } from "../../auth/useAuth";
import { db } from "../../lib/firebase/firebase";

function formatTopicName(topic: string) {
  return topic
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatLessonName(lessonName: string) {
  return lessonName
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function groupLessonsByTopic(lessons: string[]) {
  return lessons.reduce<Record<string, string[]>>((acc, lesson) => {
    const [topic, lessonName] = lesson.split(":");
    const topicKey = topic?.trim() || "other";
    const lessonValue = lessonName?.trim() || lesson;

    if (!acc[topicKey]) {
      acc[topicKey] = [];
    }

    acc[topicKey].push(lessonValue);

    return acc;
  }, {});
}

export default function CompletedLessonsCard() {
  const { user } = useAuth();

  const [completedLessons, setCompletedLessons] = useState<string[] | null>(null);
  const [completedError, setCompletedError] = useState("");

  useEffect(() => {
    if (!user) {
      return undefined;
    }

    const userRef = doc(db, "users", user.uid);

    const unsubscribe = onSnapshot(
      userRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          setCompletedLessons([]);
          setCompletedError("");
          return;
        }

        const userData = snapshot.data();
        const completed = Array.isArray(userData.completed)
          ? userData.completed
          : [];

        setCompletedLessons(completed);
        setCompletedError("");
      },
      (error) => {
        console.error("Failed to load completed lessons:", error);
        setCompletedError("Could not load completed lessons.");
        setCompletedLessons([]);
      },
    );

    return () => unsubscribe();
  }, [user]);

  const isCompletedLoading = user ? completedLessons === null : false;

  const groupedLessons = completedLessons
    ? groupLessonsByTopic(completedLessons)
    : {};

  const groupedTopics = Object.entries(groupedLessons).sort(([topicA], [topicB]) =>
    topicA.localeCompare(topicB),
  );

  return (
    <div className="w-full max-w-md rounded-2xl border border-border-soft bg-surface p-6 shadow-2xl transition-colors duration-300 sm:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-black tracking-tight text-text-primary sm:text-3xl">
          Completed <span className="text-main-yellow">lessons</span>
        </h2>
        <p className="mt-1 text-sm text-text-muted">Your learning progress</p>
      </div>

      {!user && (
        <p className="text-sm text-text-muted">
          Sign in to see your completed lessons.
        </p>
      )}

      {user && isCompletedLoading && (
        <p className="text-sm text-text-muted">Loading completed lessons...</p>
      )}

      {user && !isCompletedLoading && completedError && (
        <p className="text-sm text-red-500">{completedError}</p>
      )}

      {user &&
        !isCompletedLoading &&
        !completedError &&
        completedLessons &&
        completedLessons.length === 0 && (
          <p className="text-sm text-text-muted">
            You have not completed any lessons yet.
          </p>
        )}

      {user &&
        !isCompletedLoading &&
        !completedError &&
        completedLessons &&
        completedLessons.length > 0 && (
          <div className="space-y-5">
            <div className="rounded-xl border border-border-soft bg-surface-muted p-4">
              <p className="text-sm text-text-muted">Total completed</p>
              <p className="mt-1 text-3xl font-black text-main-yellow">
                {completedLessons.length}
              </p>
            </div>

            <div className="max-h-[420px] space-y-4 overflow-y-auto pr-1">
              {groupedTopics.map(([topic, lessons]) => (
                <div
                  key={topic}
                  className="rounded-xl border border-border-soft bg-surface-muted p-4"
                >
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-main-yellow">
                    {formatTopicName(topic)}
                  </p>

                  <ul className="space-y-2">
                    {lessons.map((lesson) => (
                      <li
                        key={`${topic}-${lesson}`}
                        className="rounded-lg bg-app px-3 py-2 text-sm text-text-primary"
                      >
                        {formatLessonName(lesson)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
}