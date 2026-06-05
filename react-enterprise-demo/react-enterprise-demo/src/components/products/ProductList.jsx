function ProductList({ products, onDelete }) {
  return (
    <div>
      {products.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.price}$</p>

          <button onClick={() => onDelete(item.id)}>
            Xóa
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
