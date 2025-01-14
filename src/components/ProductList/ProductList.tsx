import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductList.css';

interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
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
            <span className="product-price">{product.price}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
