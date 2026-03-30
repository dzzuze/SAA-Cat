import { useState, useEffect } from "react";
import { useAuth } from "../auth/useAuth";
import toast from "react-hot-toast";
import { updateUserData } from "../auth/updateUserData";
import { updateProfile as updateFirebaseProfile } from "firebase/auth";
import BgCat from "../assets/bg-cat.svg?react";
import CompletedLessonsCard from "../components/user/CompletedLessonsCard";


export default function UserPage() {
  const { profile, user, updateProfile } = useAuth();
  const [isPending, setIsPending] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nickName: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        nickName: profile.nickName || "",
      });
    }
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || isPending) return;

    setIsPending(true);
    try {
      await updateUserData(user.uid, formData);
      updateProfile(formData);
      await updateFirebaseProfile(user, {
        displayName: formData.nickName,
      });
      toast.success("Saved!");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#1a1a1d] px-4 py-16 text-white sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0 flex justify-between opacity-6"
        aria-hidden
      >
        <BgCat className="h-full w-1/3 object-cover" />
        <BgCat className="h-full w-1/3 object-cover" />
        <BgCat className="h-full w-1/3 object-cover" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <h1 className="mb-10 text-center text-3xl font-black tracking-tighter sm:mb-12 sm:text-4xl lg:text-5xl">
          <span className="text-main-yellow">User</span>
          <span className="text-white"> information</span>
        </h1>

        <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 lg:flex-row lg:items-stretch lg:justify-center">
          <div className="relative w-full max-w-md rounded-2xl border border-[#4a2e15] bg-[#5d3a1a] p-6 shadow-2xl sm:p-8">
            <div className="absolute -top-4 left-1/2 flex h-10 w-32 -translate-x-1/2 items-center justify-center rounded-t-lg bg-gradient-to-b from-zinc-400 to-zinc-500 shadow-md">
              <div className="h-3 w-3 rounded-full border border-zinc-700 bg-zinc-600 shadow-inner"></div>
            </div>

            <form onSubmit={handleSave} className="space-y-5 pt-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Name
                </label>
                <input
                  id="firstName"
                  className="w-full rounded-lg border border-zinc-700 bg-[#18181b] p-3 text-white outline-none transition focus:border-main-yellow"
                  placeholder="Name"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  className="w-full rounded-lg border border-zinc-700 bg-[#18181b] p-3 text-white outline-none transition focus:border-main-yellow"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="nickName"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Nickname
                </label>
                <input
                  id="nickName"
                  className="w-full rounded-lg border border-zinc-700 bg-[#18181b] p-3 text-white outline-none transition focus:border-main-yellow"
                  placeholder="Nickname"
                  value={formData.nickName}
                  onChange={(e) =>
                    setFormData({ ...formData, nickName: e.target.value })
                  }
                />
              </div>

              <button
                disabled={isPending}
                className="mt-6 w-full cursor-pointer rounded-xl bg-yellow-400 py-3 font-bold text-black transition-all shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:bg-yellow-400 hover:shadow-[0_0_25px_rgba(234,179,8,0.4)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isPending ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>

          <CompletedLessonsCard />
        </div>
      </div>
    </div>
  );
}