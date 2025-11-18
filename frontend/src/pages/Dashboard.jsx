// Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

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
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Dashboard</h1>
      <p>Welcome, {user.name}</p>
      <p>Role: {user.role}</p>
      <p
        style={{
          width: "50%",
          overflow: "auto",
        }}
      >
        Token: {localStorage.getItem("token")}
      </p>
      <button
        onClick={() => {
          // if (user.role !== "admin") {
          //   setError("Unauthorized access");
          //   return;
          // }
          navigate("/products");
        }}
      >
        products
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button
        onClick={() => {
          navigate("/sales");
        }}
      >
        Sales
      </button>
      <button
        onClick={() => {
          navigate("/logs");
        }}
      >
        Logs
      </button>
    </div>
  );
}
