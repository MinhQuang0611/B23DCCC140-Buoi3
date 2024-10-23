import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../redux/productSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

export default store;
