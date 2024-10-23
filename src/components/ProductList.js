import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct } from '../redux/productSlice';
import './ProductList.css';

const ProductList = ({ onEdit }) => {
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const productsPerPage = 5;

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const currentProducts = filteredProducts.slice(firstIndex, lastIndex);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div className="product-list-container">
  <h2 className="product-list-title">Product List</h2>
  <input
    className="search-input"
    type="text"
    placeholder="Search products..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <ul className="product-list">
    {currentProducts.map((product) => (
      <li key={product.id} className="product-item">
        <div className="product-info">
          {product.name} - ${product.price}
        </div>
        <div className="product-actions">
          <button className="action-button edit-button" onClick={() => onEdit(product)}>Edit</button>
          <button className="action-button delete-button" onClick={() => handleDelete(product.id)}>Delete</button>
        </div>
      </li>
    ))}
  </ul>
  <div className="pagination">
    <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
    <button disabled={lastIndex >= filteredProducts.length} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
  </div>
</div>
  );
};

export default ProductList;
