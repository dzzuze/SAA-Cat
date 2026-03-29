import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./firebase";
import type { Lesson } from "../../types/lesson";

export default async function getLessonsByTopicId(
  topicId: string,
): Promise<Lesson[]> {
  const lessonsRef = collection(db, "topics", topicId, "lessons");
  const lessonsQuery = query(lessonsRef, orderBy("order"));
  const snapshot = await getDocs(lessonsQuery);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Lesson[];
}
