import { useState } from "react";
import { Link } from "react-router-dom";
import { resetPassword } from "../auth/resetPassword";
import { FirebaseError } from "firebase/app";
import toast from "react-hot-toast";
import getFirebaseErrorMessage from "../helpers/getFirebaseErrorMessage";
import BgCat from "../assets/bg-cat.svg?react";

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
    <div className="flex flex-col flex-1 items-center justify-center text-white pt-11 bg-[#1a1a1d]">
      <div
        className="absolute inset-0 flex justify-between opacity-6 pointer-events-none "
        aria-hidden
      >
        <BgCat className="h-full w-1/3 object-cover" />
        <BgCat className="h-full w-1/3 object-cover" />
        <BgCat className="h-full w-1/3 object-cover" />
      </div>

      <div className="mb-8 flex flex-col items-center">
        <h1 className="text-4xl font-black tracking-tighter">
          Reset<br></br>
          <span className="text-yellow-400">password</span>
        </h1>
      </div>

      <div className="w-full max-w-xs rounded-2xl bg-[#0f0f11] p-8 shadow-2xl border border-zinc-800">
        {success ? (
          <>
            <p>A password reset email has been sent to your email.</p>
            <Link
              className="w-full bg-yellow-400 hover:bg-yellow-400 cursor-pointer text-black font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:shadow-[0_0_25px_rgba(234,179,8,0.4)] active:scale-[0.98]"
              to="/login"
            >
              Return to the login page
            </Link>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-400">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                className="w-full rounded-lg bg-[#18181b] border border-zinc-700 p-3"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="meow@example.com"
              />
            </div>

            {error && <p>{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-400 cursor-pointer text-black font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:shadow-[0_0_25px_rgba(234,179,8,0.4)] active:scale-[0.98]"
            >
              {loading ? "Sending..." : "Send link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
