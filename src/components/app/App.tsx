
import { useEffect } from 'react';
import React, { useState } from 'react';
import Header from '@components/Header/Header';
import ProductList from '@components/ProductList/ProductList';
import BottomMenu from '@components/BottomMenu/BottomMenu';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetails from '@components/ProductDetails/ProductDetails';

import database from '../../db.json';

import './app.css';

// const mockProducts = [
//   { id: '1', name: 'Angry Wape', image: 'img/product1.jpeg', price: '$100', description: 'Краткое описание жидкости для вейпа,Краткое описание жидкости для вейпа,Краткое описание жидкости для вейпа,Краткое описание жидкости для вейпа,Краткое описание жидкости для вейпа,Краткое описание жидкости для вейпа,Краткое описание жидкости для вейпа,Краткое описание жидкости для вейпа,Краткое описание жидкости для вейпа,Краткое описание жидкости для вейпа,Краткое описание жидкости для вейпа,Краткое описание жидкости для вейпа,Краткое описание жидкости для вейпа,Краткое описание жидкости для вейпа,Краткое описание жидкости для вейпа,Краткое описание жидкости для вейпа, Краткое описание жидкости для вейпа,Краткое описание жидкости для вейпа' },
//   { id: '2', name: 'Jewel Juice', image: 'img/product2.png', price: '$20', description: 'Краткое описание жидкости для вейпа, Краткое описание жидкости для вейпа,Краткое описание жидкости для вейпа' },
//   { id: '3', name: 'Island Man', image: 'img/product3.jpg', price: '$155', description: 'Краткое описание жидкости для вейпа, Краткое описание жидкости для вейпа,Краткое описание жидкости для вейпа' },
//   { id: '4', name: 'Pawn Juice', image: 'img/product4.jpg', price: '$65', description: 'Краткое описание жидкости для вейпа, Краткое описание жидкости для вейпа,Краткое описание жидкости для вейпа' },
//   { id: '5', name: 'Own Juice', image: 'img/product4.jpg', price: '$525', description: 'Краткое описание жидкости для вейпа, Краткое описание жидкости для вейпа,Краткое описание жидкости для вейпа' },  
//   { id: '6', name: 'Pawn Puice', image: 'img/product2.png', price: '$215', description: 'Краткое описание жидкости для вейпа, Краткое описание жидкости для вейпа,Краткое описание жидкости для вейпа' },
//   { id: '7', name: 'Main Kaye', image: 'img/product4.jpg', price: '$80', description: 'Краткое описание жидкости для вейпа, Краткое описание жидкости для вейпа,Краткое описание жидкости для вейпа' },
//   { id: '8', name: 'Angry Wape', image: 'img/product1.jpeg', price: '$100', description: 'Краткое описание жидкости для вейпа, Краткое описание жидкости для вейпа,Краткое описание жидкости для вейпа' },
//   { id: '9', name: 'Jewel Juice', image: 'img/product2.png', price: '$20', description: 'Краткое описание жидкости для вейпа, Краткое описание жидкости для вейпа,Краткое описание жидкости для вейпа' },
//   { id: '10', name: 'Island Man', image: 'img/product3.jpg', price: '$155', description: 'Краткое описание жидкости для вейпа, Краткое описание жидкости для вейпа,Краткое описание жидкости для вейпа' },
//   { id: '11', name: 'Roiwn Juice', image: 'img/product4.jpg', price: '$65', description: 'Краткое описание жидкости для вейпа, Краткое описание жидкости для вейпа,Краткое описание жидкости для вейпа' },
//   { id: '12', name: 'Old Morce', image: 'img/product3.jpg', price: '$525', description: 'Краткое описание жидкости для вейпа, Краткое описание жидкости для вейпа,Краткое описание жидкости для вейпа' },  
//   { id: '13', name: 'Pawn Juice', image: 'img/product4.jpg', price: '$215', description: 'Краткое описание жидкости для вейпа, Краткое описание жидкости для вейпа,Краткое описание жидкости для вейпа' },  
// ];

const mockProducts = (database.elfbarelfx).concat(database.cartriges);

const App: React.FC = () => {
    useEffect(() => {
        if (window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.ready(); // Уведомляем Telegram, что приложение готово
            tg.requestFullscreen();
        } else {
            console.log("Запущено вне Telegram");
        }
    }, []);
    const [activeTab, setActiveTab] = useState('home');
    const [searchQuery, setSearchQuery] = useState('');
    const [quantity, setQuantity] = useState(1);

    const filteredProducts = mockProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Router>
            <div className="app">
                <div className="app-container">
                    {activeTab === 'home' && <Header onSearch={setSearchQuery} />}                                                    
                    <div className="main-content">
                        <Routes>
                            <Route
                                path="/vapestore"
                                element={activeTab === 'home' && <ProductList products={filteredProducts} />}
                            />
                            <Route
                                path="/vapestore/product/:id"
                                element={<ProductDetails baseQuantity={quantity} onQuantityChange={setQuantity} products={mockProducts} />}
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
