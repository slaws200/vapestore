import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetails.css';

interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
  description: string;
}

interface ProductDetailsProps {
  products: Product[];
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ products }) => {
  const { id } = useParams<{ id: string }>();
  
  const navigate = useNavigate();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div className="product-details">
      <div className="close" onClick={() => navigate("/vapestore/")}>&#10008;</div>
      <img src={'/vapestore/' + product.image} alt={product.name} className="product-details-image" />
      <h1 className="product-details-name">{product.name}</h1>
      <p className="product-details-price">Цена: {product.price}</p>
      <p className="product-details-description">{product.description}</p>
    </div>
  );
};

export default ProductDetails;
