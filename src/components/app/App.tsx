
import { useEffect } from 'react';
import React, { useState } from 'react';
import Header from '@components/Header/Header';
import ProductList from '@components/ProductList/ProductList';
import OrderCreated from '@components/OrderCreated/OrderCreated';
import BottomMenu from '@components/BottomMenu/BottomMenu';
import { BrowserRouter as Router, Routes, Route, data } from 'react-router-dom';
import ProductDetails from '@components/ProductDetails/ProductDetails';

import database from '../../db.json';

import './app.css';
const mockProducts = database.cartriges.concat(database.elfbarelfx).concat(database.elfliq).concat(database.chaser).concat(database.octobar).concat(database.vozol);

const App: React.FC = () => {

    useEffect(() => {
        if (window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.ready(); // Уведомляем Telegram, что приложение готово
            window.Telegram.WebApp.platform !== 'tdesktop' ? tg.requestFullscreen() : null;
            tg.disableVerticalSwipes();
            tg.lockOrientation();
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
                    {activeTab === 'home' && <Header onSearch={setSearchQuery} />}                                           
                    <div className="main-content">
                        <Routes>
                            <Route
                                path="/vapestore"
                                element={activeTab === 'home' && <ProductList products={filteredProducts} />}
                            />
                            <Route
                                path="/vapestore/product/:id"
                                element={<ProductDetails onSearch={setSearchQuery} products={mockProducts} onTabChange={setActiveTab}/>}
                            />
                            <Route
                                path="/orderCreated"
                                element={<OrderCreated onTabChange={setActiveTab} onSearch={setSearchQuery}/>}
                            />
                        </Routes>
                    </div>
                    {/* <BottomMenu activeTab={activeTab} onTabChange={setActiveTab} /> */}
                </div>
            </div>
        </Router>
    );
};

export default App;
