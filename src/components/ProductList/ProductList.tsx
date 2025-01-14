// src/components/ProductList.tsx
import React from 'react';
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
  return (
    <div className="product-list">
      {products.map((product) => (
        <div className="product-item" key={product.id}>
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
