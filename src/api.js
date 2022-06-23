import axios from "axios";
const API_BASE_URL = axios.create({
  baseURL: "http://localhost:3004/products",
});
const getProducts = async () => {
  try {
    const response = await API_BASE_URL.get("/");
    return response.data;
  } catch (error) {
    return console.error(error.response.message);
  }
};
const getProduct = async (id) => {
  try {
    const response = await API_BASE_URL.get(`/${id}`);
    return response.data;
  } catch (error) {
    return console.error(error.response.message);
  }
};
const addProduct = async (product) => {
  try {
    const response = await API_BASE_URL.post("/", product);
    return response.data;
  } catch (error) {
    return console.error(error.response.message);
  }
};
const updateProduct = async (id, product) => {
  try {
    const response = await API_BASE_URL.put(`/${id}`, product);
    return response.data;
  } catch (error) {
    return console.error(error.response.message);
  }
};
const deleteProduct = async (id) => {
  try {
    const response = await API_BASE_URL.delete(`/${id}`);
    return response.data;
  } catch (error) {
    return console.error(error.response.message);
  }
};
const api = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
export default api;
