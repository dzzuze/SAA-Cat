const firebaseErrorMessages: Record<string, string> = {
  "auth/invalid-credential": "Invalid email or password.",
  "auth/user-not-found": "User not found",
  "auth/wrong-password": "Incorrect password",
  "auth/invalid-email": "Invalid email",
  "auth/user-disabled":
    "This account has been disabled. Please contact support.",
  "auth/too-many-requests": "Too many attempts. Try again later.",
  "auth/email-already-in-use": "An account with this email already exists.",
  "auth/weak-password": "Password should be at least 6 characters long.",
};

export default function getFirebaseErrorMessage(code: string): string {
  return (
    firebaseErrorMessages[code] ?? "Login error"
  );
}
