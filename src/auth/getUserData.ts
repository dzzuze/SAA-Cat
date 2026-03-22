import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase/firebase";
import type { IUserData } from "../types/users";

export const getUserData = async (uid: string): Promise<IUserData | null> => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as IUserData;
    } else {
      console.log("The user's document was not found in Firestore.");
      return null;
    }
  } catch (error) {
    console.error("Error occurred while fetching the profile:", error);
    return null;
  }
};
