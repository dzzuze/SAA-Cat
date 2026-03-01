import { useState } from "react";
import { registerUser } from "../auth/register";
import { useNavigate } from "react-router-dom";
import getFirebaseErrorMessage from "../helpers/getFirebaseErrorMessage";
import { FirebaseError } from "firebase/app";

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
      setError("Пароли не совпадают");
      return;
    }

    try {
      setLoading(true);
      await registerUser(email, password);

      navigate("/dashboard");
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
    <div className="flex  flex-col items-center justify-center bg-[#18181b] text-white">
      <div className="mb-8 flex flex-col items-center">
        <div className="mb-4 text-6xl">🐱</div>
        <h1 className="text-4xl font-black tracking-tighter text-white">
          SAA-<span className="text-yellow-400">CAT</span>
        </h1>
      </div>

      <div className="w-full max-w-md rounded-2xl bg-[#27272a] p-8 shadow-2xl border border-zinc-800">
        <h2 className="mb-6 text-xl font-semibold text-zinc-200">
          Регистрация
        </h2>

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
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-[#18181b] border border-zinc-700 p-3"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-400">
              Повторите пароль
            </label>
            <input
              type="password"
              required
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="w-full rounded-lg bg-[#18181b] border border-zinc-700 p-3"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-yellow-400 py-3 font-bold text-black"
          >
            {loading ? "Регистрация..." : "Регистрироваться"}
          </button>
        </form>
      </div>
    </div>
  );
}
