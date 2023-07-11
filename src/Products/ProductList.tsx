import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getProductsSelector } from "./products.slice";

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
  //const [products, setProducts] = useState<Product[]>(initialProducts);
  const products = useSelector(getProductsSelector);

  return (
    <div>
      <label>ProductList</label>
      {products.map((product: Product) => (
        <div key={product.id}>
          <span>{`${product.title} : ${product.price}`}</span>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
