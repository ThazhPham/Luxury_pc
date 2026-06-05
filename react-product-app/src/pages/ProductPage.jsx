import { useEffect, useState } from "react";
import productService from "../services/productService";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await productService.getAll();

      setProducts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = async (product) => {
    try {
      await productService.create(product);

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await productService.delete(id);

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Product Management</h1>

      <ProductForm onAdd={handleAdd} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ProductList
          products={products}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default ProductPage;