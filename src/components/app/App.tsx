
import { useEffect } from 'react';

import React, { useState } from 'react';
import Header from '@components/Header/Header';
import ProductList from '@components/ProductList/ProductList';
import BottomMenu from '@components/BottomMenu/BottomMenu';
import './app.css';

const mockProducts = [
  { id: '1', name: 'Product 1', image: '/images/product1.jpg', price: '$10' },
  { id: '2', name: 'Product 2', image: '/images/product2.jpg', price: '$20' },
  { id: '3', name: 'Product 3', image: '/images/product3.jpg', price: '$15' },
  { id: '4', name: 'Product 4', image: '/images/product4.jpg', price: '$25' },
];

const App: React.FC = () => {
    useEffect(() => {
        if (window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.ready(); // Уведомляем Telegram, что приложение готово
        } else {
            console.log("Запущено вне Telegram");
        }
    }, []);
    const [activeTab, setActiveTab] = useState('home');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = mockProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="app">
        <Header onSearch={setSearchQuery} />
        {activeTab === 'home' && <ProductList products={filteredProducts} />}
        <BottomMenu activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
    );
};

export default App;
