import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import validateProduct from "../fake.api";

export interface Product {
  title: string;
  price: number;
  id: string;
}

export enum ValidationState {
    Fulfilled,
    Pending,
    Rejected,
}

interface ProductsSliceState {
    products: Product[],
    validationState?: ValidationState,
    errorMessage?: string
}

export const addProductAsync = createAsyncThunk('products/addNewProduct', async(initialProduct: Product) => {
    const product = await validateProduct(initialProduct);
    //or we can create a request to server using axio like below
    //const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
    //const response = await axios.get(POSTS_URL)
    //return response.data
    return product;
});

const initialProducts: Product[] = [
  { title: "Mario", price: 60, id: "Mro" },
  { title: "Dialo", price: 70, id: "Dal" },
  { title: "Hell", price: 50, id: "Hel" },
];

const initialState: ProductsSliceState = {
    products: initialProducts,
    validationState: undefined,
    errorMessage: undefined
}

const productsSlice = createSlice({
  name: "products", //for devtool
  initialState: initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      //return [action.payload, ...state];
      state.products.push(action.payload); //using immer;
    },
    removeProduct: (state, action: PayloadAction<string>) => ({
        ...state,
        products: state.products.filter((product) => product.id !== action.payload)
    }),
  },
  extraReducers: builder => {
    builder.addCase(addProductAsync.fulfilled, (state, action) => ({
        ...state,
        validationState: ValidationState.Fulfilled,
        errorMessage: undefined,
        products: [...state.products, action.payload]
    }))
    builder.addCase(addProductAsync.rejected, (state, action) => ({
        ...state,
        validationState: ValidationState.Rejected,
        errorMessage: action.error.message
    }))
    builder.addCase(addProductAsync.pending, (state, action) => ({
        ...state,
        validationState: ValidationState.Pending,
        errorMessage: undefined
    }))
  }
});

export const { addProduct, removeProduct } = productsSlice.actions;

export const getProductsSelector = (state: RootState) => state.products.products;
export const getErrorMessage = (state: RootState) => state.products.errorMessage;

export default productsSlice.reducer;
