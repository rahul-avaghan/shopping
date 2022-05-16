import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '../model/Product';
import { RootState } from '../store';

export type ProductState = {
  products: Product[];
  loading: boolean;
};
const initialState: ProductState = {
  products: [],
  loading: true,
};

// can be stored in .env file.
export const PRODUCTS_ENDPOINT = 'https://api.up42.com/marketplace/blocks';
export const fetchProducts = createAsyncThunk('users/fetchByIdStatus', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(PRODUCTS_ENDPOINT);
    if (response.ok) {
      const json = await response.json();
      const products = json.data;
      return products?.filter((product: Product) => product.metadata.blockPricingStrategy.name === 'simple') || [];
    }
  } catch (error) {
    rejectWithValue('Failed to fetch product information.');
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const selectProducts = (state: RootState) => state.productsInfo;

export default productSlice;
