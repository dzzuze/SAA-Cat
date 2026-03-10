export default function getFirebaseErrorMessage(code: string): string {
  switch (code) {
    case "auth/user-not-found":
      return "User not found";
    case "auth/wrong-password":
      return "Incorrect password";
    case "auth/invalid-email":
      return "Invalid email";
    case "auth/too-many-requests":
      return "Too many attempts. Try again later.";
    default:
      return "Login error";
  }
}
