import { describe, it, expect } from "vitest";
import getFirebaseErrorMessage from "./getFirebaseErrorMessage";

describe("getFirebaseErrorMessage", () => {
  it("returns message for user-not-found", () => {
    expect(getFirebaseErrorMessage("auth/user-not-found")).toBe(
      "User not found",
    );
  });

  it("returns message for wrong-password", () => {
    expect(getFirebaseErrorMessage("auth/wrong-password")).toBe(
      "Incorrect password",
    );
  });

  it("returns message for invalid-email", () => {
    expect(getFirebaseErrorMessage("auth/invalid-email")).toBe("Invalid email");
  });

  it("returns message for too-many-requests", () => {
    expect(getFirebaseErrorMessage("auth/too-many-requests")).toBe(
      "Too many attempts. Try again later.",
    );
  });

  it("returns default message for unknown code", () => {
    expect(getFirebaseErrorMessage("some-random-error")).toBe("Login error");
  });
});
