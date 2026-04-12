import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FirebaseError } from "firebase/app";

import { registerUser } from "../auth/register";
import getFirebaseErrorMessage from "../helpers/getFirebaseErrorMessage";

import BgCat from "../assets/bg-cat.svg?react";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== repeatPassword) {
      setError("The passwords don't match");
      return;
    }

    try {
      setLoading(true);
      await registerUser(email, password);
      navigate("/user");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        setError(getFirebaseErrorMessage(error.code));
      } else {
        setError("Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center bg-app pt-11 text-text-primary transition-colors duration-300">
      <div
        className="pointer-events-none absolute inset-0 flex justify-between opacity-[0.04] dark:opacity-[0.06]"
        aria-hidden
      >
        <BgCat className="h-full w-1/3 object-cover text-text-primary" />
        <BgCat className="h-full w-1/3 object-cover text-text-primary" />
        <BgCat className="h-full w-1/3 object-cover text-text-primary" />
      </div>

      <div className="relative z-10 mb-8 flex flex-col items-center">
        <h1 className="text-4xl font-black tracking-tighter text-text-primary">
          SAA<span>🐱</span>
          <span className="text-main-yellow">CAT</span>
        </h1>
      </div>

      <div className="relative z-10 w-full max-w-xs rounded-2xl border border-border-soft bg-surface p-8 shadow-2xl">
        <h2 className="mb-6 text-xl font-semibold text-text-primary">
          Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-text-muted"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-border-soft bg-app p-3 text-text-primary outline-none transition placeholder:text-text-muted focus:border-main-yellow"
              placeholder="meow@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-text-muted"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-border-soft bg-app p-3 text-text-primary outline-none transition placeholder:text-text-muted focus:border-main-yellow"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label
              htmlFor="repeatPassword"
              className="mb-1 block text-sm font-medium text-text-muted"
            >
              Repeat password
            </label>
            <input
              id="repeatPassword"
              type="password"
              required
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="w-full rounded-lg border border-border-soft bg-app p-3 text-text-primary outline-none transition placeholder:text-text-muted focus:border-main-yellow"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-xl bg-main-yellow py-3 font-bold text-main-dark shadow-[0_0_20px_rgba(234,179,8,0.2)] transition-all hover:shadow-[0_0_25px_rgba(234,179,8,0.35)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Registration..." : "Register"}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-text-muted">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-main-yellow transition-opacity hover:opacity-80"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

    
