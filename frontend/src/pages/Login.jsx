import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      const token = res.data.token;
      const role = res.data.user.role;

      localStorage.setItem("token", token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("fullname", res.data.user.fullname);

      navigate("/dashboard");
    } catch (err) {
      setMessage("Wrong email or password");
    }
  };

  const [toggled, setToggled] = useState(false);
  const handleToggle = () => {
    setToggled(!toggled);
  };

  return (
    <div className="admin-login-container">
      <div className={`admin-intro-text ${toggled ? "box-right" : "box-left"}`}>
        <h1 className="admin-company-title">Storix</h1>
        <img
          src="src/assets/images/storix.png"
          alt="Box Icon"
          className="admin-company-icon"
        />
        <div className="admin-text-content">
          <h1>Web-Based Inventory and Sales Tracking System</h1>
          <p>
            This system provides role-based access, product management, stock
            updates, and reports to improve business efficiency.
          </p>
          <img
            src="src/assets/images/box.png"
            alt="Box Icon"
            className="admin-box-icon"
          />
        </div>
      </div>

      <div
        className={`admin-login-form ${toggled ? "form-right" : "form-left"}`}
      >
        <div className="admin-form-content">
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <br />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <br />
            <button type="submit">Login</button>
          </form>

          <p onClick={() => navigate("/register")} className="toggle-button">
            Register
          </p>
          {message && (
            <p
              style={{
                position: "absolute",
                right: "5px",
                top: "520px",
                textAlign: "center",
                color: "rgba(255, 0, 0, 1)",
                border: "none",
                cursor: "pointer",
                borderRadius: "6px",
                transition: "all 0.3s ease",
                width: "100%",
              }}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
