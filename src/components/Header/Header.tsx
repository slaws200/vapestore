// src/components/Header.tsx
import React from 'react';
import './Header.css';

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <header className="header">
      <input
        type="text"
        className="search-bar"
        placeholder="Найти товар..."
        onChange={handleSearch}
      />
      <span className='clear-text' onClick={() => {
        onSearch('');
      }}>&#215;</span>
    </header>
  );
};

export default Header;
