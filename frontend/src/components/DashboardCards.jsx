import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/styles/Dashboard.css";

export default function DashboardCards() {
  const [cards, setCards] = useState([
    { title: "Total Products", value: "0" },
    { title: "Available Stock", value: "0" },
    { title: "Low Stock", value: "0" },
    { title: "Out of Stock", value: "0" },
  ]);

  const [topItems, setTopItems] = useState([]);
  const token = localStorage.getItem("token");

  const loadData = async () => {
    try {
      // Fetch products
      const productsRes = await axios.get(
        "http://localhost:5000/api/products",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const products = productsRes.data || [];

      const totalProducts = products.length;
      const availableStock = products.reduce(
        (sum, p) => sum + (p.stock || 0),
        0
      );
      const lowStock = products.filter(
        (p) => p.stock > 0 && p.stock <= 5
      ).length;
      const outOfStock = products.filter((p) => p.stock === 0).length;

      setCards([
        { title: "Total Products", value: totalProducts },
        { title: "Available Stock", value: availableStock },
        { title: "Low Stock", value: lowStock },
        { title: "Out of Stock", value: outOfStock },
      ]);

      // Fetch sales
      const salesRes = await axios.get("http://localhost:5000/api/sales", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const sales = salesRes.data || [];

      // Match sales to products
      const topDisplay = sales
        .reduce((acc, sale) => {
          const product = products.find((p) => p.name === sale.product); // match by product name
          if (!product) return acc;

          const existing = acc.find((i) => i.name === product.name);
          if (existing) {
            existing.sold += sale.quantity;
          } else {
            acc.push({
              name: product.name,
              category: product.category || "N/A",
              price: product.price,
              stock: product.stock,
              sold: sale.quantity,
            });
          }
          return acc;
        }, [])
        .sort((a, b) => b.sold - a.sold) // sort descending by sold
        .slice(0, 5); // top 5

      setTopItems(topDisplay);
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
      setTopItems([]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="cards-grid">
      {cards.map((card, i) => (
        <div key={i} className="card-box">
          <h4>{card.title}</h4>
          <p>{card.value}</p>
        </div>
      ))}

      <div className="top-items-card">
        <h3>Top Items</h3>
        {topItems.length === 0 ? (
          <p>No sales yet</p>
        ) : (
          <div className="top-items-list">
            {topItems.map((item, i) => (
              <div key={i} className="top-item">
                <div className="top-item-name">{item.name}</div>
                <div className="top-item-details">
                  <span>Category: {item.category_name ?? "No category"}</span>
                  <span>Price: ${item.price}</span>
                  <span>Stock: {item.stock}</span>
                  <span>Sold: {item.sold}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
