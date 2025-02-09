import { useEffect } from 'react';
import React, { useState, useMemo } from 'react';
import Tabs from '@components/Tabs/Tabs'
import Header from '@components/Header/Header';
import ProductList from '@components/ProductList/ProductList';
import OrderCreated from '@components/OrderCreated/OrderCreated';
import BottomMenu from '@components/BottomMenu/BottomMenu';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ProductDetails from '@components/ProductDetails/ProductDetails';
import Database from '@interfaces/Database'

import db from '../../db.json';

import './app.css';

const database: Database = db;

export type Category = keyof Database | 'All';

const categories = (Object.keys(database).concat(['All'])).reverse(); 
const allProducts = Object.values(database).flat(); 

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
    const [activeCategory, setActiveCategory] = useState<Category>('All');

    const filteredProducts = useMemo(() => {
            const products = activeCategory === 'All' ? allProducts : database[activeCategory] || [];
            
            return products.filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [activeCategory, searchQuery]);

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
                                element={<ProductDetails onSearch={setSearchQuery} products={allProducts} onTabChange={setActiveTab}/>}
                            />
                            <Route
                                path="/orderCreated"
                                element={<OrderCreated onTabChange={setActiveTab} onSearch={setSearchQuery}/>}
                            />
                        </Routes>
                    </div>
                    {activeTab === 'home' && <Tabs onTabChange={setActiveCategory} categories={categories}/>}
                    {/* <BottomMenu activeTab={activeTab} onTabChange={setActiveTab} /> */}
                </div>
            </div>
        </Router>
    );
};

export default App;
