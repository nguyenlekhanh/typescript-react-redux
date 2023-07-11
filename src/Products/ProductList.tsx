import React from "react";
import { useSelector } from "react-redux";
import { getProductsSelector, removeProduct, selectAllProducts, selectProductById, selectProductEntities } from "./products.slice";
import { useAppDispatch } from "../store.hooks";
import { addToCart } from "../Cart/cart.slice";
import { Root } from "react-dom/client";
import { RootState } from "../store";

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

const ProductList: React.FC = () => {
  //const [products, setProducts] = useState<Product[]>(initialProducts);
  const products = useSelector(selectAllProducts);
  const Mro = useSelector<RootState>(state => selectProductById(state, 'Mro'));
  console.log(Mro);
  const entities = useSelector(selectProductEntities);
  console.log(entities['Mro']);

  const dispatch = useAppDispatch();

  const removeFromStore = (id: string) => {
    dispatch(removeProduct(id));
  }

  const addToCartHandler = (product: Product) => {
    dispatch(addToCart(product));
  }

  return (
    <div>
      <label>ProductList</label>
      {products.map((product: Product) => (
        <div key={product.id}>
          <span>{`${product.title} : ${product.price}`}</span>
          &nbsp;<button onClick={() => addToCartHandler(product)}>Add to Cart</button>
          &nbsp;<button onClick={() => removeFromStore(product.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
