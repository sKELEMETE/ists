import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Sales() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [form, setForm] = useState({ product_id: "", quantity: 1 });
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token"); // JWT token

  // Fetch products
  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  };

  // Fetch sales
  const fetchSales = () => {
    axios
      .get("http://localhost:5000/api/sales", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setSales(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
    fetchSales();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    axios
      .post("http://localhost:5000/api/sales", form, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setMessage(res.data.message);
        setForm({ product_id: "", quantity: 1 });
        fetchProducts(); // update stock
        fetchSales(); // update sales table
      })
      .catch((err) => {
        setMessage(err.response?.data?.error || "Error recording sale");
      });
  };

  const handleClearSales = () => {
    axios
      .delete("http://localhost:5000/api/sales", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => fetchSales());
  };

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
      <h1 className="text-2xl font-bold mb-4">Record Sale</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <select
          name="product_id"
          value={form.product_id}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} (Stock: {p.stock})
            </option>
          ))}
        </select>

        <input
          type="number"
          name="quantity"
          min="1"
          value={form.quantity}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Record Sale or Sell
        </button>
      </form>

      {message && <p className="mb-4 text-red-500">{message}</p>}

      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">Sales Records</h2>
        <button
          onClick={fetchSales}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Refresh Sales
        </button>
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="border-b">
            <th className="p-2">ID</th>
            <th className="p-2">Product</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Total Price</th>
            <th className="p-2">Sold By</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((s) => (
            <tr key={s.id} className="border-b">
              <td className="p-2">{s.id}</td>
              <td className="p-2">{s.product}</td>
              <td className="p-2">{s.quantity}</td>
              <td className="p-2">{s.total_price}</td>
              <td className="p-2">{s.sold_by}</td>
              <td className="p-2">{new Date(s.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleClearSales}>Clean Sales</button>
    </div>
  );
}
