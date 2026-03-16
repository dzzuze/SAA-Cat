import { useState } from "react";
import { Link } from "react-router-dom";
import { resetPassword } from "../auth/resetPassword";
import { FirebaseError } from "firebase/app";
import toast from "react-hot-toast";
import getFirebaseErrorMessage from "../helpers/getFirebaseErrorMessage";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      await resetPassword(email);
      setSuccess(true);
      toast.success("A password reset email has been sent to your email.");
      setEmail("");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        const message = getFirebaseErrorMessage(error.code);
        setError(message);
        toast.error(message);
      } else {
        const message = "Unknown error";
        setError(message);
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <h2>Reset password</h2>
      </div>

      {success ? (
        <>
          <p>A password reset email has been sent to your email.</p>
          <Link
            className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            to="/login"
          >
            Return to the login page
          </Link>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="meow@example.com"
            />
          </div>

          {error && <p>{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            {loading ? "Sending..." : "Send link"}
          </button>
        </form>
      )}
    </div>
  );
}
