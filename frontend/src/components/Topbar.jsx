import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/styles/Topbar.css";

export default function Topbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:5000/dashboard", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setUser(res.data.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <header className="topbar">
        <p>Loading...</p>
      </header>
    );

  return (
    <header className="topbar">
      <h1 className="company-name">Storix</h1>
      <div className="user">
        <img
          src="https://i.imgflip.com/893yt7.png"
          alt="User"
          className="avatar"
        />
        <div className="info">
          <span className="name">{user?.name || "User"}</span>
          <span className="role">{user?.role || "N/A"}</span>
        </div>
      </div>
    </header>
  );
}
