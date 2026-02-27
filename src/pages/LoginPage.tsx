export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#18181b] text-white">
      <div className="mb-8 flex flex-col items-center">
        <div className="mb-4 text-6xl">🐱</div>
        <h1 className="text-4xl font-black tracking-tighter text-white">
          SAA-<span className="text-yellow-400">CAT</span>
        </h1>
      </div>

      <div className="w-full max-w-md rounded-2xl bg-[#27272a] p-8 shadow-2xl border border-zinc-800">
        <h2 className="mb-6 text-xl font-semibold text-zinc-200">Вход</h2>

        <form className="space-y-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-400">
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-lg bg-[#18181b] border border-zinc-700 p-3 text-white placeholder-zinc-600 focus:border-yellow-400 focus:outline-none transition-colors"
              placeholder="meow@example.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-400">
              Пароль
            </label>
            <input
              type="password"
              className="w-full rounded-lg bg-[#18181b] border border-zinc-700 p-3 text-white placeholder-zinc-600 focus:border-yellow-400 focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-yellow-400 py-3 font-bold text-black hover:bg-yellow-300 active:scale-[0.98] transition-all"
          >
            Войти в систему
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
