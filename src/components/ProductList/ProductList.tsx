import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Products } from '@interfaces/Products';
import './ProductList.css';


const ProductList: React.FC<Products> = ({ products }) => {
  const navigate = useNavigate();
  useEffect(() => {
    // Функция для отправки запроса
    const fetchData = async () => {
        try {
            const response = await fetch("https://mybot-pmod.onrender.com/"); // Замените на ваш URL
            const data = await response.json();
            console.log('Данные получены:', data);
        } catch (error) {
            console.error('Ошибка при запросе:', error);
        }
    };

    // Выполняем запрос сразу при монтировании компонента
    fetchData();

    // Устанавливаем интервал для выполнения запроса каждые 29 минут
    const interval = setInterval(fetchData, 29 * 60 * 1000); // 29 минут в миллисекундах

    // Очищаем интервал при размонтировании компонента
    return () => clearInterval(interval);
}, []);

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
