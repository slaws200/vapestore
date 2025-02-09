import React, { useRef, useState } from 'react';
import './Tabs.css';
import { Category } from '@components/app/App';

interface TabsProps {
    onTabChange: (query: Category) => void;
    categories: Category[] | string[];
}

const Tabs: React.FC<TabsProps> = ({ onTabChange, categories }) => {
    const [activeTab, setActiveTab] = useState<string>(categories[0]); // Первый таб активен по умолчанию
    const wrapperRef = useRef<HTMLDivElement>(null);
    let startX = 0;
    let scrollLeft = 0;

    const handleTabChange = (category: string) => {
        setActiveTab(category); // Устанавливаем активный таб
        onTabChange(category as Category);
    };

    // 🖱️ Горизонтальный скролл колесом мыши
    const handleWheelScroll = (event: React.WheelEvent) => {
        if (wrapperRef.current) {
            wrapperRef.current.scrollLeft += event.deltaY; // Скролл влево/вправо
        }
    };

    // 📱 Начало свайпа
    const handleTouchStart = (event: React.TouchEvent) => {
        if (wrapperRef.current) {
            startX = event.touches[0].pageX - wrapperRef.current.offsetLeft;
            scrollLeft = wrapperRef.current.scrollLeft;
        }
    };

    // 📱 Движение свайпа
    const handleTouchMove = (event: React.TouchEvent) => {
        if (wrapperRef.current) {
            const x = event.touches[0].pageX - wrapperRef.current.offsetLeft;
            const walk = (x - startX) * 1.5; // Коэффициент чувствительности
            wrapperRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    return (
        <div
            className="tabs-wrapper"
            ref={wrapperRef}
            onWheel={handleWheelScroll}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
        >
            {categories.map((category) => (
                <div
                    className={`tab ${activeTab === category ? 'active' : ''}`} // Добавляем класс активного таба
                    onClick={() => handleTabChange(category)}
                    key={category}
                >
                    {category.toLocaleUpperCase()}
                </div>
            ))}
        </div>
    );
};

export default Tabs;
