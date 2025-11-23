import { useEffect, useState } from "react";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../../backend/src/services/productService";
import { useNavigate } from "react-router-dom";

export default function ProductPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", stock: "" });
  const [editId, setEditId] = useState(null);

  const [noAccess, setNoAccess] = useState(false);
  const role = localStorage.getItem("role");

  const load = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    if (role !== "admin") {
      setNoAccess(true);
      return;
    }

    if (editId) {
      await updateProduct(editId, form);
    } else {
      await addProduct(form);
    }

    setForm({ name: "", price: "", stock: "" });
    setEditId(null);
    load();
  };

  const onEdit = (p) => {
    setForm({ name: p.name, price: p.price, stock: p.stock });
    setEditId(p.id);
  };

  const remove = async (id) => {
    await deleteProduct(id);
    load();
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
      <h2>Products</h2>

      <form onSubmit={submit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          placeholder="Stock"
          type="number"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        />
        <button type="submit">{editId ? "Update" : "Add"}</button>
      </form>

      {noAccess && (
        <h1 style={{ color: "red", marginTop: "10px" }}>Admin Only</h1>
      )}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.stock}</td>
              <td>
                <button onClick={() => onEdit(p)}>Edit</button>
                <button onClick={() => remove(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate("/dashboard")}>Dashboard</button>
    </div>
  );
}
