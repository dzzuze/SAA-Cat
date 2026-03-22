import { doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase/firebase";
import type { IUserData } from "../types/users";

export const updateUserData = async (uid: string, data: Partial<IUserData>) => {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, data);
  } catch (error) {
    console.error("Error updating Firestore document:", error);
    throw error;
  }
};
