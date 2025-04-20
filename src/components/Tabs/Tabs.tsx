import React, { useRef, useState } from 'react';
import './Tabs.css';
import { Category } from '@components/app/App';

interface TabsProps {
  onTabChange: (query: Category) => void;
  categories: Category[] | string[];
}

const Tabs: React.FC<TabsProps> = ({ onTabChange, categories }) => {
  const [activeTab, setActiveTab] = useState<string>(categories[0]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number>(0);
  const scrollLeftRef = useRef<number>(0);

  const handleTabChange = (category: string) => {
    setActiveTab(category);
    onTabChange(category as Category);

    // Прокрутка к активному элементу
    const activeTabElement = document.getElementById(`tab-${category}`);
    if (activeTabElement) {
      activeTabElement.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  };

  const handleWheelScroll = (event: React.WheelEvent) => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollLeft += event.deltaY;
    }
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    if (wrapperRef.current) {
      startXRef.current = event.touches[0].pageX - wrapperRef.current.offsetLeft;
      scrollLeftRef.current = wrapperRef.current.scrollLeft;
    }
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    if (wrapperRef.current) {
      const x = event.touches[0].pageX - wrapperRef.current.offsetLeft;
      const walk = (x - startXRef.current) * 1;
      wrapperRef.current.scrollLeft = scrollLeftRef.current - walk;
    }
  };

  return (
    <div
      className="tabs-wrapper"
      ref={wrapperRef}
      onWheel={handleWheelScroll}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      role="tablist"
    >
      {categories.map((category) => (
        <div
          id={`tab-${category}`}
          className={`tab ${activeTab === category ? 'active' : ''}`}
          onClick={() => handleTabChange(category)}
          key={category}
          role="tab"
          aria-selected={activeTab === category}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleTabChange(category);
            }
          }}
        >
          {category.toString().toUpperCase()}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
