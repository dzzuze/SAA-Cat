import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { loginUser } from "../auth/login";
import getFirebaseErrorMessage from "../helpers/getFirebaseErrorMessage";
import { FirebaseError } from "firebase/app";
import toast from "react-hot-toast";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      await loginUser(email, password);
      toast.success("Successful login!");
      navigate(from, { replace: true });
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
    <div className="flex flex-col items-center justify-center text-white pt-11">
      <div className="mb-8 flex flex-col items-center">
        <h1 className="text-4xl font-black tracking-tighter">
          SAA<span>🐱</span>
          <span className="text-yellow-400">CAT</span>
        </h1>
      </div>

      <div className="w-full max-w-md rounded-2xl bg-[#0f0f11] p-8 shadow-2xl border border-zinc-800">
        <h2 className="mb-6 text-xl font-semibold text-zinc-200">Entrance</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-400">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg bg-[#18181b] border border-zinc-700 p-3"
              placeholder="meow@example.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-400">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-[#18181b] border border-zinc-700 p-3"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-400 text-black font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:shadow-[0_0_25px_rgba(234,179,8,0.4)] active:scale-[0.98]"
          >
            {loading ? "Entrance..." : "Sign in"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-zinc-500">
          Forgot your password?{" "}
          <Link
            to="/reset-password"
            className="text-yellow-400 hover:underline hover:text-yellow-300"
          >
            Meow!
          </Link>
        </div>
      </div>
    </div>
  );
}
