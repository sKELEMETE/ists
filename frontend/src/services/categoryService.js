import axios from "axios";

const API = "http://localhost:5000/api/categories";

export const getCategories = () => {
  const token = localStorage.getItem("token");
  return axios.get(API, { headers: { Authorization: `Bearer ${token}` } });
};

export const addCategory = (data) => {
  const token = localStorage.getItem("token");
  return axios.post(API, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
