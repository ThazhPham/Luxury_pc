import axiosClient from "../api/axiosClient";

const productService = {
  getAll() {
    return axiosClient.get("/products");
  },

  create(data) {
    return axiosClient.post("/products", data);
  },

  delete(id) {
    return axiosClient.delete(`/products/${id}`);
  }
};

export default productService;
