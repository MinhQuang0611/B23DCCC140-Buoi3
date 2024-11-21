import React, { useState, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks.ts';
import { deleteProduct, setCurrentProduct } from '../redux/productSlice.ts';
import ProductModal from './ProductModal.tsx';
import { Product } from '../types';
import "./ProductList.css";

const ProductList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.product.products);

  const productsPerPage = 5;

  const filteredProducts = useMemo(() => 
    products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), 
    [products, searchTerm]
  );

  const paginatedProducts = useMemo(() => {
    const lastIndex = currentPage * productsPerPage;
    const firstIndex = lastIndex - productsPerPage;
    return filteredProducts.slice(firstIndex, lastIndex);
  }, [filteredProducts, currentPage, productsPerPage]);

  const totalProducts = useMemo(() => filteredProducts.length, [filteredProducts]);
  
  const totalValue = useMemo(() => 
    filteredProducts.reduce((sum, product) => sum + product.price, 0),
    [filteredProducts]
  );

  const handleEdit = (product: Product) => {
    dispatch(setCurrentProduct(product));
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  const handleOpenAddModal = () => {
    dispatch(setCurrentProduct(null));
    setIsModalOpen(true);
  };

  return (
    <div className="product-list-container">
      <div className="list-header">
        <h2 className="product-list-title">Danh Sách Sản Phẩm</h2>
        <button 
          className="btn-add-product" 
          onClick={handleOpenAddModal}
        >
          Thêm Sản Phẩm
        </button>
      </div>
      
      <input
        className="search-input"
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <ul className="product-list">
        {paginatedProducts.map((product) => (
          <li key={product.id} className="product-item">
            <div className="product-info">
              {product.name} - {product.price.toFixed(2)} VND
            </div>
            <div className="product-actions">
              <button 
                className="action-button edit-button" 
                onClick={() => handleEdit(product)}
              >
                Sửa
              </button>
              <button 
                className="action-button delete-button" 
                onClick={() => handleDelete(product.id)}
              >
                Xóa
              </button>
            </div>
          </li>
        ))}
      </ul>
      
      <div className="pagination">
        <button 
          disabled={currentPage === 1} 
          onClick={() => setCurrentPage(prev => prev - 1)}
        >
          Trước
        </button>
        <button 
          disabled={currentPage * productsPerPage >= filteredProducts.length} 
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          Sau
        </button>
      </div>
      
      <div className="product-summary-footer">
        <div className="total-products">
          Tổng số sản phẩm: {totalProducts}
        </div>
        <div className="total-value">
          Tổng giá trị: {totalValue.toFixed(2)} VND
        </div>
      </div>

      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default ProductList;