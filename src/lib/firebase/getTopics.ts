import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";
import type { Topic } from "../../types/topic";

export const getTopics = async (): Promise<Topic[]> => {
  const q = query(collection(db, "topics"), orderBy("order"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Topic[];
};
