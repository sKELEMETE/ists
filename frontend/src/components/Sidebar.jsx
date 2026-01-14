import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBox,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import "../assets/styles/Sidebar.css";
import LogoutButton from "../components/logout";

export default function Sidebar() {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
  };

  return (
    <aside className="sidebar">
      <nav className="sidebar-menu">
        {/* DISCOVER SECTION */}
        <h2 className="sidebar-section">DISCOVER</h2>
        <button className="sidebar-link" onClick={() => goTo("/dashboard")}>
          <FaTachometerAlt />
          <span>Dashboard</span>
        </button>

        {/* INVENTORY SECTION */}
        <h2 className="sidebar-section">INVENTORY</h2>
        <button className="sidebar-link" onClick={() => goTo("/products")}>
          <FaBox />
          <span>Products</span>
        </button>
        <button className="sidebar-link" onClick={() => goTo("/sales")}>
          <FaChartBar />
          <span>Sales</span>
        </button>

        {/* SETTINGS SECTION */}
        <h2 className="sidebar-section">SETTINGS</h2>
        <button className="sidebar-link" onClick={() => goTo("/profiles")}>
          <FaCog />
          <span>Profile</span>
        </button>
        <button className="sidebar-link" onClick={() => goTo("/logs")}>
          <FaCog />
          <span>Logs</span>
        </button>
      </nav>

      {/* LOGOUT AT THE BOTTOM */}
      <div className="sidebar-footer">
        <LogoutButton className="sidebar-link" />
      </div>
    </aside>
  );
}
