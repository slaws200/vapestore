// src/components/BottomMenu.tsx
import React from 'react';
import { AiOutlineHome, AiOutlineAppstore, AiOutlineShoppingCart } from 'react-icons/ai';
import './BottomMenu.css';

interface BottomMenuProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomMenu: React.FC<BottomMenuProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="bottom-menu">
      <button
        className={`menu-item ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => onTabChange('home')}
      >
        <AiOutlineHome size={24} />
        <span>Главная</span>
      </button>
      <button
        className={`menu-item ${activeTab === 'categories' ? 'active' : ''}`}
        onClick={() => onTabChange('categories')}
      >
        <AiOutlineAppstore size={24} />
        <span>Категории</span>
      </button>
      <button
        className={`menu-item ${activeTab === 'cart' ? 'active' : ''}`}
        onClick={() => onTabChange('cart')}
      >
        <AiOutlineShoppingCart size={24} />
        <span>Корзина</span>
      </button>
    </div>
  );
};

export default BottomMenu;
