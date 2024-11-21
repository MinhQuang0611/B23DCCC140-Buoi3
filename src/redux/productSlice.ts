import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductState } from '../types';

const initialState: ProductState = {
  products: [],
  currentProduct: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    setCurrentProduct: (state, action: PayloadAction<Product | null>) => {
      state.currentProduct = action.payload;
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    }
  },
});

export const { addProduct, updateProduct, setCurrentProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;