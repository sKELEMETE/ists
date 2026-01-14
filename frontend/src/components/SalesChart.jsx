import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SalesChart() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadSales = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/sales", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const salesData = res.data || [];

        // Group by product and sum quantity
        const groupedData = salesData.reduce((acc, item) => {
          const existing = acc.find((i) => i.product === item.product);
          if (existing) {
            existing.quantity += item.quantity;
          } else {
            acc.push({ product: item.product, quantity: item.quantity });
          }
          return acc;
        }, []);

        setData(groupedData);
      } catch (err) {
        console.error("Failed to load sales data:", err);
      }
    };

    loadSales();
  }, []);

  return (
    <div className="sales-chart">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="product" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="quantity" fill="#3498db" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
