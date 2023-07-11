import React, { useState } from "react";

interface ProductsListProps {}

interface Product {
  title: string;
  price: number;
  id: string;
}

const initialProducts = [
  { title: "Mario", price: 60, id: "Mro" },
  { title: "Dialo", price: 70, id: "Dal" },
  { title: "Hell", price: 50, id: "Hel" },
];

const ProductList: React.FC<ProductsListProps> = ({}) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  return (
    <div>
      <label>ProductList</label>
      {products.map((product) => (
        <div key={product.id}>
          <span>{`${product.title} : ${product.price}`}</span>
        </div>
      ))}

      <button
        onClick={() =>
          setProducts((prevProducts) => [
            { title: "test", price: 100, id: "test" },
            ...prevProducts,
          ])
        }
      >
        Add Product
      </button>
    </div>
  );
};

export default ProductList;
