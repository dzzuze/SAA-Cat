import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../auth/login";
import getFirebaseErrorMessage from "../helpers/getFirebaseErrorMessage";
import { FirebaseError } from "firebase/app";

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
      navigate(from, { replace: true });
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        setError(getFirebaseErrorMessage(error.code));
      } else {
        setError("Неизвестная ошибка");
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
          <span className="text-green-800">CAT</span>
        </h1>
      </div>

      <div className="w-full max-w-md rounded-2xl bg-[#27272a] p-8 shadow-2xl border border-zinc-800">
        <h2 className="mb-6 text-xl font-semibold text-zinc-200">Вход</h2>

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
              Пароль
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
            className="w-full rounded-lg bg-green-800 py-3 font-bold text-black hover:bg-yellow-300 active:scale-[0.98] transition-all"
          >
            {loading ? "Вход..." : "Войти в систему"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-zinc-500">
          Забыли пароль?{" "}
          <span className="cursor-pointer text-yellow-400 hover:underline">
            Мяу!
          </span>
        </div>
      </div>
    </div>
  );
}
