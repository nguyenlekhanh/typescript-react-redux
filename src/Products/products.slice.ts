import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface Product {
  title: string;
  price: number;
  id: string;
}

const initialProducts: Product[] = [
  { title: "Mario", price: 60, id: "Mro" },
  { title: "Dialo", price: 70, id: "Dal" },
  { title: "Hell", price: 50, id: "Hel" },
];

const productsSlice = createSlice({
  name: "products", //for devtool
  initialState: initialProducts,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      //return [action.payload, ...state];
      state.push(action.payload); //using immer;
    },
    removeProduct: (state, action: PayloadAction<string>) => {
        console.log('a1');
      return state.filter((product) => product.id !== action.payload);
    },
  },
});

export const { addProduct, removeProduct } = productsSlice.actions;

export const getProductsSelector = (state: RootState) => state.products;

export default productsSlice.reducer;
