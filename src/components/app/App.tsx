import { useEffect } from "react";
import React, { useState, useMemo } from "react";
import Tabs from "@components/Tabs/Tabs";
import Header from "@components/Header/Header";
import ProductList from "@components/ProductList/ProductList";
import OrderCreated from "@components/OrderCreated/OrderCreated";
import { AnimatePresence, motion } from "framer-motion";
import BottomMenu from "@components/BottomMenu/BottomMenu";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import ProductDetails from "@components/ProductDetails/ProductDetails";
import Database from "@interfaces/Database";

import db from "../../db.json";

import "./app.css";

const database: Database = db;

export type Category = keyof Database | "All";

const categories = Object.keys(database).concat(["All"]).reverse();
const allProducts = Object.values(database).flat();

const Apps: React.FC = () => {
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready(); // Уведомляем Telegram, что приложение готово
      window.Telegram.WebApp.platform !== "tdesktop"
        ? tg.requestFullscreen()
        : null;
      tg.disableVerticalSwipes();
      tg.lockOrientation();

      try {
        fetch("https://mybot-pmod.onrender.com/", { method: "GET" });
      } catch (error) {
        console.error("Ошибка при разбудке сервера:", error);
      }
    } else {
      console.log("Запущено вне Telegram");
    }
  }, []);
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const location = useLocation();
  const filteredProducts = useMemo(() => {
    const products =
      activeCategory === "All" ? allProducts : database[activeCategory] || [];

    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeCategory, searchQuery]);

  return (
    <div className="app">
      <div className="app-container">
        {activeTab === "home" && <Header onSearch={setSearchQuery} />}
        <div className="main-content">
          {/* Обёртка для анимации маршрутов */}
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/vapestore"
                element={
                  activeTab === "home" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <ProductList products={filteredProducts} />
                    </motion.div>
                  )
                }
              />
              <Route
                path="/vapestore/product/:id"
                element={
                  <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "tween", duration: 0.1 }}
                  >
                    <ProductDetails
                      onSearch={setSearchQuery}
                      products={allProducts}
                      onTabChange={setActiveTab}
                    />
                  </motion.div>
                }
              />
              <Route
                path="/orderCreated"
                element={
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                  >
                    <OrderCreated
                      onTabChange={setActiveTab}
                      onSearch={setSearchQuery}
                    />
                  </motion.div>
                }
              />
            </Routes>
          </AnimatePresence>
        </div>
        {activeTab === "home" && (
          <Tabs onTabChange={setActiveCategory} categories={categories} />
        )}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Apps />
    </Router>
  );
};

export default App;
