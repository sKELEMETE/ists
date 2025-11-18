import axios from "axios";

const API = "http://localhost:5000/api/products";

export const getProducts = async () => {
  const token = localStorage.getItem("token");
  return axios.get(API, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addProduct = async (data) => {
  const token = localStorage.getItem("token");
  return axios.post(API, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateProduct = async (id, data) => {
  const token = localStorage.getItem("token");
  return axios.put(`${API}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteProduct = async (id) => {
  const token = localStorage.getItem("token");
  return axios.delete(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
