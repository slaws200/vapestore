import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { motion } from "framer-motion";
import "./Header.css";

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    onSearch(newValue);
  };

  const clearSearch = () => {
    setSearchValue("");
    onSearch("");
  };

  return (
    <header className="header">
      <IoIosSearch fill={"#999999"} />
      <div className="input-wrapper">
        <motion.div
          key={searchValue}
          className="fake-text"
          animate={{ opacity: [1, 0.6, 1], scale: [1, 1.1, 1] }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {searchValue}
        </motion.div>
        <input
          type="text"
          className="search-bar real-input"
          placeholder="Найти товар..."
          value={searchValue}
          onChange={handleSearch}
        />
      </div>
      <div className="clear-text" onClick={clearSearch}>
        &#215;
      </div>
    </header>
  );
};

export default Header;
