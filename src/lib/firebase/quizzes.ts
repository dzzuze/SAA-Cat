import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { db } from "../firebase/firebase"; 
import type { Quiz, QuizQuestion } from "../../types/quiz";

export async function getQuizzesByTopicId(topicId: string): Promise<Quiz[]> {
  const quizzesRef = collection(db, "quizzes");

  const quizzesQuery = query(
    quizzesRef,
    where("topicId", "==", topicId),
    where("isPublished", "==", true),
    orderBy("order"),
  );

  const snapshot = await getDocs(quizzesQuery);

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...(docItem.data() as Omit<Quiz, "id">),
  }));
}

export async function getQuizById(quizId: string): Promise<Quiz> {
  const quizRef = doc(db, "quizzes", quizId);
  const snapshot = await getDoc(quizRef);

  if (!snapshot.exists()) {
    throw new Error("Quiz not found");
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as Omit<Quiz, "id">),
  };
}

export async function getQuizQuestions(quizId: string): Promise<QuizQuestion[]> {
  const questionsRef = collection(db, "quizQuestions");

  const questionsQuery = query(
    questionsRef,
    where("quizId", "==", quizId),
    where("isPublished", "==", true),
    orderBy("order"),
  );

  const snapshot = await getDocs(questionsQuery);

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...(docItem.data() as Omit<QuizQuestion, "id">),
  }));
}