export const getLessonKey = (topicId: string, lessonId: string) =>
  `${topicId}:${lessonId}`;

export const isLessonCompleted = (
  completed: string[],
  topicId: string,
  lessonId: string,
) => completed.includes(getLessonKey(topicId, lessonId));

export const isLessonUnlocked = (
  lessons: { id: string }[],
  completed: string[],
  topicId: string,
  lessonId: string,
) => {
  const currentIndex = lessons.findIndex((lesson) => lesson.id === lessonId);

  if (currentIndex === -1) return false;
  if (currentIndex === 0) return true;

  if (isLessonCompleted(completed, topicId, lessonId)) return true;

  const previousLesson = lessons[currentIndex - 1];
  if (!previousLesson) return false;

  return isLessonCompleted(completed, topicId, previousLesson.id);
};
