// src/components/BottomMenu.tsx
import React from 'react';
import { AiFillProduct } from "react-icons/ai";
import { TiHome } from "react-icons/ti";
import { HiShoppingCart } from "react-icons/hi";
import './BottomMenu.css';

interface BottomMenuProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomMenu: React.FC<BottomMenuProps> = ({ activeTab, onTabChange }) => {
  let homeColor: string|undefined = 'black',
      productsColor: string|undefined = 'black',
      cartColor: string|undefined = 'black',
      accentTextColor: string|undefined = '#0088cc';

  if (window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp;
    homeColor = tg.themeParams.text_color;
    productsColor = tg.themeParams.text_color;
    cartColor = tg.themeParams.text_color;
    accentTextColor = tg.themeParams.accent_text_color;
    } 
  const checkActive = (tabname: string, tabColor: string|undefined) :string => {
    return `${activeTab === tabname ? accentTextColor : tabColor}`
  }

  return (
    <div className="bottom-menu">
      <button
        className={`menu-item ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => onTabChange('home')}
      >
        <TiHome size={24} fill={checkActive('home', homeColor)}/>
        <span style={{color: `${checkActive('home', homeColor)}`}}>Главная</span>
      </button>
      <button
        className={`menu-item ${activeTab === 'categories' ? 'active' : ''}`}
        onClick={() => onTabChange('categories')}
      >
        <AiFillProduct  size={24} fill={checkActive('categories', productsColor)}/>
        <span style={{color: `${checkActive('categories', productsColor)}`}}>Категории</span>
      </button>
      <button
        className={`menu-item ${activeTab === 'cart' ? 'active' : ''}`}
        onClick={() => onTabChange('cart')}
      >
        <HiShoppingCart size={24} color={checkActive('cart', cartColor)}/>
        <span style={{color: `${checkActive('cart', cartColor)}`}}>Корзина</span>
      </button>
    </div>
  );
};

export default BottomMenu;
