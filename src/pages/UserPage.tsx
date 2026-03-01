import { useAuth } from "../auth/useAuth";

export default function UserPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>Not authorized</p>;
  }

  return (
    <div>
      <h1>Hello {user.email}</h1>
    </div>
  );
}
