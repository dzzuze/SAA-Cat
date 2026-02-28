import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase/firebase";
import { useAuth } from "../../auth/useAuth";

export default function Header() {
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <header className="w-full bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <div className="font-bold text-lg">🐱 SAA-CAT</div>

      <nav className="flex gap-6 items-center">
        {!user ? (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/user">Profile</NavLink>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 cursor-pointer px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
