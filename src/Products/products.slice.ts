import { createAsyncThunk, createSlice, PayloadAction, createEntityAdapter } from "@reduxjs/toolkit";
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
    //entities: Product[],
    validationState?: ValidationState,
    errorMessage?: string
}

// const initialState: ProductsSliceState = {
//     products: initialProducts,
//     validationState: undefined,
//     errorMessage: undefined
// }

const productAdapter = createEntityAdapter<Product>();
const initialState = productAdapter.getInitialState<ProductsSliceState>({
    errorMessage: undefined,
    validationState: undefined
});

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

const filledInitialState = productAdapter.upsertMany(initialState, initialProducts);

const productsSlice = createSlice({
  name: "products", //for devtool
  initialState: filledInitialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      //return [action.payload, ...state];
      //state.products.push(action.payload); //using immer;
      productAdapter.upsertOne(state, action.payload);
    },
    removeProduct: (state, action: PayloadAction<string>) => {
        productAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(addProductAsync.fulfilled, (state, action) => {
        productAdapter.upsertOne(state, action.payload);
        state.validationState = ValidationState.Fulfilled;
        state.errorMessage = undefined
    })
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

export const getProductsSelector = (state: RootState) => state.products.entities;
export const getErrorMessage = (state: RootState) => state.products.errorMessage;

export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectEntities: selectProductEntities,
  selectIds: selectProductIds,
  selectTotal: selecTotalProducts
} = productAdapter.getSelectors<RootState>(state => state.products);

export default productsSlice.reducer;
