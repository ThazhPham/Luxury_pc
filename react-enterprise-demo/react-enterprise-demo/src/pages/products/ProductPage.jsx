import ProductForm from "../../components/products/ProductForm";
import ProductList from "../../components/products/ProductList";
import useProducts from "../../hooks/useProducts";
import productService from "../../services/productService";

function ProductPage() {
  const { products, setProducts, fetchProducts } = useProducts();

  const handleAdd = async (product) => {
    await productService.create(product);
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await productService.delete(id);

    setProducts(products.filter((item) => item.id !== id));
  };

  return (
    <div>
      <ProductForm onAdd={handleAdd} />

      <ProductList
        products={products}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default ProductPage;
