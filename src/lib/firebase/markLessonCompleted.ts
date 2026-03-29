import { arrayUnion, doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export default async function markLessonCompleted(
  userId: string,
  lessonKey: string,
) {
  const userRef = doc(db, "users", userId);

  await setDoc(
    userRef,
    {
      completed: arrayUnion(lessonKey),
    },
    { merge: true },
  );
}
