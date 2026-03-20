import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./config";
import { getFirestore } from "firebase/firestore";

export const appFireBase = initializeApp(firebaseConfig);
export const auth = getAuth(appFireBase);
export const db = getFirestore(appFireBase);
