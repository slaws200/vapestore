
import { useEffect } from 'react';

import React, { useState } from 'react';
import Header from '@components/Header/Header';
import ProductList from '@components/ProductList/ProductList';
import BottomMenu from '@components/BottomMenu/BottomMenu';
import './app.css';

const mockProducts = [
  { id: '1', name: 'Angry Wape', image: 'src/resources/img/product1.jpeg', price: '$10' },
  { id: '2', name: 'Jewel Juice', image: 'src/resources/img/product2.png', price: '$20' },
  { id: '3', name: 'Island Man', image: 'src/resources/img/product3.jpg', price: '$15' },
  { id: '4', name: 'Pawn Juice', image: 'src/resources/img/product4.jpg', price: '$25' },
  { id: '5', name: 'Pawn Juice', image: 'src/resources/img/product4.jpg', price: '$25' },  
  { id: '6', name: 'Pawn Juice', image: 'src/resources/img/product4.jpg', price: '$25' },
  { id: '7', name: 'Pawn Juice', image: 'src/resources/img/product4.jpg', price: '$25' },
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
            <div className="app-container">
                <Header onSearch={setSearchQuery} />
                    <div className="main-content">
                        {activeTab === 'home' && <ProductList products={filteredProducts} />}
                    </div>
                <BottomMenu activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
        </div>
    );
};

export default App;
