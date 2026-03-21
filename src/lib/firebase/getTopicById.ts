import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import type { Topic } from "../../types/topic";

export default async function getTopicById(id: string): Promise<Topic | null> {
  const ref = doc(db, "topics", id);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as Topic;
}
