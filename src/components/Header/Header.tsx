import React, { useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import './Header.css';

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState<string>(''); // Добавляем состояние для value

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue); // Обновляем состояние
    onSearch(newValue); // Передаём новое значение в родительский компонент
  };

  const clearSearch = () => {
    setSearchValue(''); // Очищаем значение в инпуте
    onSearch(''); // Уведомляем родительский компонент об очистке
  };

  return (
    <header className="header">
      <IoIosSearch fill={'#999999'} />
      <input
        type="text"
        className="search-bar"
        placeholder="Найти товар..."
        value={searchValue} // Привязываем value к состоянию
        onChange={handleSearch} // Обработчик изменения инпута
      />
      <div
        className="clear-text"
        onClick={clearSearch} // Очищаем текст при клике
      >
        &#215;
      </div>
    </header>
  );
};

export default Header;
