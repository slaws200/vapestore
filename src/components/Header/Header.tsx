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
        placeholder="Search for products..."
        onChange={handleSearch}
      />
    </header>
  );
};

export default Header;
