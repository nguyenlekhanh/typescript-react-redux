import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { create } from 'domain';
import { RootState } from '../store';

interface Product {
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
    name: 'products', //for devtool
    initialState: initialProducts,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            return [action.payload, ...state];
        }
    }
});

export const {addProduct} = productsSlice.actions;

export const getProductsSelector = (state: RootState) => state.products;

export default productsSlice.reducer;