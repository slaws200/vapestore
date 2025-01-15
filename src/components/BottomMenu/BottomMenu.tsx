// src/components/BottomMenu.tsx
import React from 'react';
import { AiOutlineProduct  } from 'react-icons/ai';
import { RiHomeLine } from "react-icons/ri";
import { LuShoppingCart } from "react-icons/lu";
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
        <RiHomeLine size={24} fill={checkActive('home', homeColor)}/>
        <span style={{color: `${checkActive('home', homeColor)}`}}>Главная</span>
      </button>
      <button
        className={`menu-item ${activeTab === 'categories' ? 'active' : ''}`}
        onClick={() => onTabChange('categories')}
      >
        <AiOutlineProduct  size={24} fill={checkActive('categories', productsColor)}/>
        <span style={{color: `${checkActive('categories', productsColor)}`}}>Категории</span>
      </button>
      <button
        className={`menu-item ${activeTab === 'cart' ? 'active' : ''}`}
        onClick={() => onTabChange('cart')}
      >
        <LuShoppingCart size={24} color={checkActive('cart', cartColor)}/>
        <span style={{color: `${checkActive('cart', cartColor)}`}}>Корзина</span>
      </button>
    </div>
  );
};

export default BottomMenu;
