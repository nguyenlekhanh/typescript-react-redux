import React, { useState } from "react";
import { Product, addProduct } from "./products.slice";
import { useAppDispatch } from "../store.hooks";

const ProductForm = () => {
    const dispatch = useAppDispatch();
  const [product, setProduct] = useState<Product>({
    id: "",
    title: "",
    price: 0,
  });

  const { title, price, id } = product;
  
  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setProduct((prev) => {
      (prev as any)[name] = value;
      const newValue = { ...prev };
      return newValue;
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addProduct(product));
    setProduct({
        id: "",
        title: "",
        price: 0,
      })
  }

  return (
    <>
      <h2>Add Game To Cart</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Game title"
          name="title"
          value={title}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Price"
          name="price"
          value={price}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="id"
          name="id"
          value={id}
          onChange={handleChange}
        />
        <button type="submit">Add Product</button>
      </form>
    </>
  );
};

export default ProductForm;
