import axiosClient from "../api/axiosClient";

const productService = {
  getAll() {
    return axiosClient.get("/products");
  },

  create(product) {
    return axiosClient.post("/products", product);
  },

  delete(id) {
    return axiosClient.delete(`/products/${id}`);
  },
};

export default productService;