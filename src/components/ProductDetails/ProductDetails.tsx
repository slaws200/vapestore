import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Products } from '@interfaces/Products';
import './ProductDetails.css';

interface ProductDetailsProps extends Products{
  onQuantityChange: (query: number) => void;
  baseQuantity: number;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ products, baseQuantity, onQuantityChange }) => {
  const { id } = useParams<{ id: string }>();
  
  const navigate = useNavigate();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div className="product-details">
      <div className="close" onClick={() => navigate("/vapestore/")}>&#215;</div>
      <img src={'/vapestore/' + product.image} alt={product.name} className="product-details-image" />
      <h1 className="product-details-name">{product.name}</h1>
      <p className="product-details-price">Цена: {product.price}</p>
      <div className="product-buttons-wrapper">
        <button className="product-dec-button" onClick={() => {
          onQuantityChange(baseQuantity === 1 ? 1 : baseQuantity - 1)
        }}>&#8722;</button>
        <div className="product-quantity">{baseQuantity}</div>
        <button className="product-inc-button" onClick={() => {
          onQuantityChange(baseQuantity === 10 ? 10 : baseQuantity + 1)
        }}>&#43;</button>
      </div>
      <p className="product-details-description">{product.description}</p>
      <button className="product-add-to-cart">Добавить в корзину</button>
    </div>
  );
};

export default ProductDetails;
