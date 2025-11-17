// Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:5000/dashboard", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => setUser(res.data.user))
      .catch((err) => console.log(err));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.name}</p>
      <p>Role: {user.role}</p>
      <p>Token: {localStorage.getItem("token")}</p>
    </div>
  );
}
