import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, updateProduct, setCurrentProduct } from '../redux/productSlice';
import './ProductForm.css';

const ProductForm = () => {
  const dispatch = useDispatch();
  const currentProduct = useSelector((state) => state.product.currentProduct);
  const [product, setProduct] = useState({ name: '', price: '' });

  useEffect(() => {
    if (currentProduct) {
      setProduct(currentProduct);
    }
  }, [currentProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product.id) {
      dispatch(updateProduct(product));
    } else {
      dispatch(addProduct({ ...product, id: Date.now() }));
    }
    setProduct({ name: '', price: '' });
    dispatch(setCurrentProduct(null));
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
  <div className="form-group">
    <input
      className="form-input"
      type="text"
      placeholder="Product Name"
      value={product.name}
      onChange={(e) => setProduct({ ...product, name: e.target.value })}
    />
  </div>
  <div className="form-group">
    <input
      className="form-input"
      type="number"
      placeholder="Price"
      value={product.price}
      onChange={(e) => setProduct({ ...product, price: e.target.value })}
    />
  </div>
  <button className="submit-button" type="submit">
    {product.id ? 'Update' : 'Add'} Product
  </button>
</form>
  );
};

export default ProductForm;
