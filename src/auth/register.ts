import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase/firebase";

export const registerUser = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};