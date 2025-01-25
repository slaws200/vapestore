import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Products } from '@interfaces/Products';
import './ProductList.css';


const ProductList: React.FC<Products> = ({ products }) => {
  const navigate = useNavigate();

  return (
    <div className="product-list">
      {products.map((product) => (
        <div
          className="product-item"
          key={product.id}
          onClick={() => navigate(`/vapestore/product/${product.id}`)}
        >
          <img src={product.image} alt={product.name} className="product-image" />
          <div className="product-info">
            <span className="product-name">{product.name}</span>
            <div className="product-name-price-wrapper">
              <span>Цена: </span>
              <span className="product-price">{product.price} ₽</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
