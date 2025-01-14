
import { useEffect } from 'react';
import React, { useState } from 'react';
import Header from '@components/Header/Header';
import ProductList from '@components/ProductList/ProductList';
import BottomMenu from '@components/BottomMenu/BottomMenu';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetails from '@components/ProductDetails/ProductDetails';
import './app.css';

const mockProducts = [
  { id: '1', name: 'Angry Wape', image: 'img/product1.jpeg', price: '$100', description: 'Краткое описание жидкости для вейпа, Краткое описание жидкости для вейпа,Краткое описание жидкости для вейпа' },
  { id: '2', name: 'Jewel Juice', image: 'img/product2.png', price: '$20', description: 'Краткое описание жидкости для вейпа, Краткое описание жидкости для вейпа,Краткое описание жидкости для вейпа' },
  { id: '3', name: 'Island Man', image: 'img/product3.jpg', price: '$155', description: 'Краткое описание жидкости для вейпа, Краткое описание жидкости для вейпа,Краткое описание жидкости для вейпа' },
  { id: '4', name: 'Pawn Juice', image: 'img/product4.jpg', price: '$65', description: 'Краткое описание жидкости для вейпа, Краткое описание жидкости для вейпа,Краткое описание жидкости для вейпа' },
  { id: '5', name: 'Pawn Juice', image: 'img/product4.jpg', price: '$525', description: 'Краткое описание жидкости для вейпа, Краткое описание жидкости для вейпа,Краткое описание жидкости для вейпа' },  
  { id: '6', name: 'Pawn Juice', image: 'img/product4.jpg', price: '$215', description: 'Краткое описание жидкости для вейпа, Краткое описание жидкости для вейпа,Краткое описание жидкости для вейпа' },
  { id: '7', name: 'Pawn Juice', image: 'img/product4.jpg', price: '$80', description: 'Краткое описание жидкости для вейпа, Краткое описание жидкости для вейпа,Краткое описание жидкости для вейпа' },
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
        <Router>
            <div className="app">
                <div className="app-container">
                    <Header onSearch={setSearchQuery} />
                    <div className="main-content">
                        <Routes>
                            <Route
                                path="/vapestore"
                                element={activeTab === 'home' && <ProductList products={filteredProducts} />}
                            />
                            <Route
                                path="/vapestore/product/:id"
                                element={<ProductDetails products={mockProducts} />}
                            />
                        </Routes>
                    </div>
                    <BottomMenu activeTab={activeTab} onTabChange={setActiveTab} />
                </div>
            </div>
        </Router>
    );
};

export default App;
