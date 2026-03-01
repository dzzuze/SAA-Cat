import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./config";

export const appFireBase = initializeApp(firebaseConfig);
export const auth = getAuth(appFireBase);