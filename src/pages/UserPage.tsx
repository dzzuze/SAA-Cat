import { useState, useEffect } from "react";
import { useAuth } from "../auth/useAuth";
import toast from "react-hot-toast";
import { updateUserData } from "../auth/updateUserData";
import { updateProfile as updateFirebaseProfile } from "firebase/auth";
import BgCat from "../assets/bg-cat.svg?react";

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
    <div className="flex flex-col flex-1 items-center justify-center text-white pt-11 bg-[#1a1a1d]">
      <div
        className="absolute inset-0 flex justify-between opacity-6 pointer-events-none "
        aria-hidden
      >
        <BgCat className="h-full w-1/3 object-cover" />
        <BgCat className="h-full w-1/3 object-cover" />
        <BgCat className="h-full w-1/3 object-cover" />
      </div>

      <h1 className="text-4xl font-black tracking-tighter mb-8">
        <span className="text-main-yellow">User</span>
        <span className="text-white"> information</span>
      </h1>

      <div className="relative z-10 w-full max-w-xs rounded-2xl p-8 shadow-2xl border bg-[#5d3a1a] border-[#4a2e15]">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-10 bg-gradient-to-b from-zinc-400 to-zinc-500 rounded-t-lg shadow-md flex items-center justify-center">
          <div className="w-3 h-3 bg-zinc-600 rounded-full border border-zinc-700 shadow-inner"></div>
        </div>
        <form onSubmit={handleSave} className="space-y-5">
          <label
            htmlFor="firstName"
            className="mb-1 block text-sm font-medium text-white"
          >
            Name
          </label>
          <input
            id="firstName"
            className="w-full rounded-lg bg-[#18181b] border border-zinc-700 p-3"
            placeholder="Name"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
          <label
            htmlFor="lastName"
            className="mb-1 block text-sm font-medium text-white"
          >
            Last Name
          </label>
          <input
            id="lastName"
            className="w-full rounded-lg bg-[#18181b] border border-zinc-700 p-3"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
          <label
            htmlFor="nickName"
            className="mb-1 block text-sm font-medium text-white"
          >
            Nickname
          </label>
          <input
            id="nickName"
            className="w-full rounded-lg bg-[#18181b] border border-zinc-700 p-3"
            placeholder="Nickname"
            value={formData.nickName}
            onChange={(e) =>
              setFormData({ ...formData, nickName: e.target.value })
            }
          />
          <button
            disabled={isPending}
            className="mt-5 mb-2 w-full bg-yellow-400 hover:bg-yellow-400 cursor-pointer text-black font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:shadow-[0_0_25px_rgba(234,179,8,0.4)] active:scale-[0.98]"
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
