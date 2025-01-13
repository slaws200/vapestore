import React from 'react';
import { useEffect } from 'react';

const App = () => {
    useEffect(() => {
        if (window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;
            tg.ready(); // Уведомляем Telegram, что приложение готово
        } else {
            console.log("Запущено вне Telegram");
        }
    }, []);

  return <div>Welcome to the store!</div>;
};

export default App;
