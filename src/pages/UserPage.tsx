import { useState, useEffect } from "react";
import { useAuth } from "../auth/useAuth";

import toast from "react-hot-toast";
import { updateUserData } from "../auth/updateUserData";

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
      toast.success("Saved!");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2>User information</h2>

      <form onSubmit={handleSave} className="flex flex-col gap-4">
        <label htmlFor="firstName">Name</label>
        <input
          id="firstName"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Name"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
        />
        <label htmlFor="nickName">Nickname</label>
        <input
          id="nickName"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Nickname"
          value={formData.nickName}
          onChange={(e) =>
            setFormData({ ...formData, nickName: e.target.value })
          }
        />
        <button
          disabled={isPending}
          className="bg-yellow-500 text-white px-4 py-2 cursor-pointer rounded hover:bg-yellow-600"
        >
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
