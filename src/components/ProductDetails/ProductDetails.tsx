import React from 'react';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Products } from '@interfaces/Products';
import './ProductDetails.css';

interface ProductDetailsProps extends Products{
  onQuantityChange: (query: number) => void;
  baseQuantity: number;
  onTabChange: (activeTab: string) => void;
  onSearch: (query: string) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ products, baseQuantity, onQuantityChange, onTabChange, onSearch }) => {
  useEffect(() => {    
    onTabChange('');
    tg.BackButton.show();
    tg.BackButton.onClick(handleClick);
  }, []);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === id);
  const tg = window.Telegram.WebApp;
  const userData = tg.initDataUnsafe;


  const handleClick = () => {
    navigate("/vapestore/");
    onQuantityChange(1);
    onTabChange('home');
    onSearch(''); 
    tg.BackButton.hide();
  }

  const orderHandler = () => {
    if (!product) {
      console.error("Продукт отсутствует, запрос не будет отправлен.");
      return;
    }  

    const reqBody = {
      ...product,
      id: userData.user?.id
    }

    fetch("https://e03f-80-94-250-110.ngrok-free.app/sendHello", {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(reqBody)
    });
  };
  

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div className="product-details">
      {/* <div className="close" onClick={handleClick}>&#215;</div> */}
      <img src={'/vapestore/' + product.image} alt={product.name} className="product-details-image" />
      <h1 className="product-details-name">{product.name}</h1>
      <p className="product-details-price">Цена: <span>{product.price} ₽ / {(Math.round((product.price * 1.09)/10)*10).toFixed(0)} lei</span></p>
      <div className="product-details-description">{product.description}</div>
      <button className="product-add-to-cart" onClick={() => {orderHandler()}}>Заказать товар</button>
    </div>
  );
};

export default ProductDetails;
