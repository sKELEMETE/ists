import { useEffect, useState } from "react";
import axios from "axios";
import DashboardCards from "../Components/DashboardCards";
import SalesChart from "../Components/SalesChart";
import "../assets/styles/Dashboard.css"; // make sure CSS exists

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [stockLevels, setStockLevels] = useState([]);
  const [filteredStock, setFilteredStock] = useState([]);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("All Items");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    // Fetch user
    axios
      .get("http://localhost:5000/dashboard", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => setUser(res.data.user))
      .catch((err) => console.log(err));

    // Fetch stock levels
    axios
      .get("http://localhost:5000/api/products", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log("Stock data:", res.data);
        setStockLevels(res.data);
        setFilteredStock(res.data);
      })
      .catch((err) => console.log(err));
  }, [token]);

  // Filter stock based on dropdown selection
  const handleFilter = (type) => {
    setFilter(type);
    switch (type) {
      case "Low Stock":
        setFilteredStock(
          stockLevels.filter((item) => item.stock > 0 && item.stock <= 5)
        );
        break;
      case "Out of Stock":
        setFilteredStock(stockLevels.filter((item) => item.stock === 0));
        break;
      default:
        setFilteredStock(stockLevels);
    }
    setOpen(false);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="dashboard">
      <h1 className="page-title">Dashboard</h1>
      <DashboardCards />

      <div className="main-grid">
        {/* Sales Chart */}
        <div className="chart-box">
          <h3>Sales by Category</h3>
          <SalesChart />
        </div>

        {/* Stock Level */}
        <div className="chart-box stock-box">
          <div className="stock-header">
            <h3>Stock Level</h3>
            <div className="dropdown">
              <button
                className={`dropdown-btn ${open ? "open" : ""}`}
                onClick={() => setOpen(!open)}
              >
                {filter} <span className="arrow">▾</span>
              </button>
              {open && (
                <div className="dropdown-menu">
                  <ul>
                    <li onClick={() => handleFilter("All Items")}>All Items</li>
                    <li onClick={() => handleFilter("Low Stock")}>Low Stock</li>
                    <li onClick={() => handleFilter("Out of Stock")}>
                      Out of Stock
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="stock-list">
            {filteredStock.length === 0 && (
              <p className="empty-stock">No stock data</p>
            )}
            {filteredStock.map((item) => {
              const stockPercent = Math.min((item.stock / 100) * 100, 100);
              let barColor = "#2ecc71"; // green
              if (item.stock <= 5 && item.stock > 0) barColor = "#f39c12"; // orange
              if (item.stock === 0) barColor = "#e74c3c"; // red

              return (
                <div key={item.id} className="stock-item-bar">
                  {/* Product name and stock */}
                  <div className="stock-info">
                    <span className="product-name">{item.name}</span>
                    <span className="product-stock">{item.stock}</span>
                  </div>

                  {/* Visual bar */}
                  <div className="stock-bar-container">
                    <div
                      className="stock-bar"
                      style={{
                        width: `${stockPercent}%`,
                        backgroundColor: barColor,
                      }}
                    >
                      <span className="bar-label">{item.product}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
