import React from 'react';
import { useDispatch } from 'react-redux';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import { setCurrentProduct } from './redux/productSlice';
import './App.css';

const App = () => {
  const dispatch = useDispatch();

  const handleEdit = (product) => {
    dispatch(setCurrentProduct(product));
  };

  return (
    <div className="app-container">
  <h1 className="app-title">Product Management</h1>
  <div className="content-wrapper">
    <ProductForm />
    <ProductList onEdit={handleEdit} />
  </div>
</div>
  );
};

export default App;
