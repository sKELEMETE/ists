import { useEffect, useState } from "react";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";
import { getCategories, addCategory } from "../services/categoryService";
import "../assets/styles/Products.css";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category_id: "",
  });
  const [editId, setEditId] = useState(null);
  const [deleteError, setDeleteError] = useState("");
  const [noAccess, setNoAccess] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [newCategory, setNewCategory] = useState("");
  const [showNewCategory, setShowNewCategory] = useState(false);

  const role = localStorage.getItem("role");

  const loadProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to load products", err);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await getCategories();
      setCategories([{ id: "all", name: "All" }, ...res.data]);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const addNewCategoryHandler = async () => {
    if (!newCategory.trim()) return;
    try {
      const res = await addCategory({ name: newCategory });
      setCategories([...categories, res.data]);
      setForm({ ...form, category_id: res.data.id });
      setNewCategory("");
      setShowNewCategory(false);
    } catch (err) {
      console.error("Failed to add category", err);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (role !== "admin") {
      setNoAccess(true);
      return;
    }
    try {
      if (editId) {
        await updateProduct(editId, form);
      } else {
        await addProduct(form);
      }
      setForm({ name: "", price: "", stock: "", category_id: "" });
      setEditId(null);
      loadProducts();
    } catch (err) {
      console.error("Failed to save product", err);
    }
  };

  const onEdit = (product) => {
    setForm({
      name: product.name || "",
      price: product.price || "",
      stock: product.stock || "",
      category_id: product.category_id || "",
    });
    setEditId(product.id);
  };

  const remove = async (id) => {
    setDeleteError("");
    try {
      await deleteProduct(id);
      loadProducts();
    } catch {
      setDeleteError("Unable to delete. Product linked to a sale.");
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      activeCategory === "all" || p.category_id === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="dashboard">
      <h2>Products</h2>

      <input
        type="text"
        placeholder="Search items"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="category-tabs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={activeCategory === cat.id ? "active" : ""}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="content-grid">
        <div className="product-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => {
                const catName =
                  categories.find((c) => c.id === p.category_id)?.name || "";
                return (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{catName}</td>
                    <td>₱{p.price}</td>
                    <td>{p.stock}</td>
                    <td>
                      <button onClick={() => onEdit(p)}>Edit</button>
                      <button onClick={() => remove(p.id)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="add-product">
          <h2>{editId ? "Edit Product" : "Add Product"}</h2>
          <form onSubmit={submit}>
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <div className="category-select">
              <select
                value={form.category_id}
                onChange={(e) =>
                  setForm({ ...form, category_id: e.target.value })
                }
              >
                <option value="">Select Category</option>
                {categories
                  .filter((c) => c.id !== "all")
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
              </select>
              <button type="button" onClick={() => setShowNewCategory(true)}>
                +
              </button>
            </div>

            {showNewCategory && (
              <div className="new-category-box">
                <input
                  placeholder="New Category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
                <button type="button" onClick={addNewCategoryHandler}>
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowNewCategory(false);
                    setNewCategory("");
                  }}
                >
                  Cancel
                </button>
              </div>
            )}

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
            <button
              type="button"
              onClick={() =>
                setForm({ name: "", price: "", stock: "", category_id: "" })
              }
            >
              Cancel
            </button>
          </form>
        </div>
      </div>

      {noAccess && <p style={{ color: "red" }}>Admin Only</p>}
      {deleteError && <p style={{ color: "red" }}>{deleteError}</p>}
    </div>
  );
}
