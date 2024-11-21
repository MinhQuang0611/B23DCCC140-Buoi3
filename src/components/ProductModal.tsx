import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks.ts';
import { addProduct, updateProduct, setCurrentProduct } from '../redux/productSlice.ts';
import { Product } from '../types';
import './ProductModal.css';
interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const currentProduct = useAppSelector(state => state.product.currentProduct);
  const [product, setProduct] = useState<Omit<Product, 'id'>>({ 
    name: '', 
    price: 0 
  });

  useEffect(() => {
    if (currentProduct) {
      setProduct({
        name: currentProduct.name, 
        price: currentProduct.price
      });
    } else {
      setProduct({ name: '', price: 0 });
    }
  }, [currentProduct, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!product.name || product.price <= 0) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    const productToSave: Product = {
      id: currentProduct?.id || Date.now(),
      ...product
    };

    if (currentProduct) {
      dispatch(updateProduct(productToSave));
    } else {
      dispatch(addProduct(productToSave));
    }
    
    onClose();
    dispatch(setCurrentProduct(null));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>{currentProduct ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tên Sản Phẩm</label>
            <input
              type="text"
              value={product.name}
              onChange={(e) => setProduct(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Nhập tên sản phẩm"
              required
            />
          </div>
          <div className="form-group">
            <label>Giá</label>
            <input
              type="number"
              value={product.price}
              onChange={(e) => setProduct(prev => ({ ...prev, price: Number(e.target.value) }))}
              placeholder="Nhập giá sản phẩm"
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="modal-actions">
            <button type="submit" className="btn-submit">
              {currentProduct ? 'Cập Nhật' : 'Thêm Sản Phẩm'}
            </button>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
