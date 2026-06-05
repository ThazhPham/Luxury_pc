import { useEffect, useState } from "react";
import productService from "../services/productService";

function useProducts() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await productService.getAll();
    setProducts(response.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    setProducts,
    fetchProducts
  };
}

export default useProducts;
