import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import type { Lesson } from "../../types/lesson";

export default async function getLessonById(
  topicId: string,
  lessonId: string,
): Promise<Lesson | null> {
  const ref = doc(db, "topics", topicId, "lessons", lessonId);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as Lesson;
}