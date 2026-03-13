import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../lib/firebase/firebase";

export const resetPassword = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};
