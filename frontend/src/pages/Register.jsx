import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "cashier",
  });

  const [response, setResponse] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );

      // Show success message
      setResponse("User created successfully");

      // Save token and user info if returned
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.user.role);
        localStorage.setItem("fullname", res.data.user.fullname);
      }

      // Optional: clear form
      setForm({
        fullname: "",
        email: "",
        password: "",
        role: "cashier",
      });

      // Redirect
      navigate("/dashboard");
    } catch (err) {
      if (err.response?.status === 409) {
        setResponse("Duplicate Email");
      } else {
        setResponse("Something went wrong");
      }
    }
  };

  const [toggled, setToggled] = useState(false);
  const handleToggle = () => {
    setToggled(!toggled);
  };

  return (
    <div className="admin-login-container">
      <div
        className={`admin-login-form ${toggled ? "form-left" : "form-right"}`}
      >
        <div className="admin-form-content">
          <form onSubmit={handleSubmit}>
            <h2>Register User</h2>
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={form.fullname}
              onChange={handleChange}
              required
            />
            <br />
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
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="cashier">Cashier</option>
              <option value="admin">Admin</option>
            </select>
            <br />
            <button type="submit">Register</button>
          </form>
          <p onClick={() => navigate("/login")} className="Register-button">
            To Login
          </p>
          <p
            className="Message"
            style={{
              color: response.includes("successfully") ? "green" : "red",
              textAlign: "center",
              position: "absolute",
              top: "590px",
              width: "100%",
            }}
          >
            {response}
          </p>
        </div>
      </div>

      <div className={`admin-intro-text ${toggled ? "box-left" : "box-right"}`}>
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
    </div>
  );
}
