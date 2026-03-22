import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../lib/firebase/firebase";

import { doc, setDoc } from "firebase/firestore";
import type { IUserData } from "../types/users";

export const registerUser = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const user = userCredential.user;

  const newProfile: IUserData = {
    uid: user.uid,
    email: user.email || email,
    firstName: "",
    lastName: "",
    nickName: "",
    role: "student",
    createdAt: new Date().toISOString(),
    completed: [],
    stats: {
      completedQuizzes: 0,
      points: 0,
    },
  };

  await setDoc(doc(db, "users", user.uid), newProfile);

  return user;
};
