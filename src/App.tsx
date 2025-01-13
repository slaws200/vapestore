import React from 'react';
import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();
  }, []);

  return <div>Welcome to the store!</div>;
};

export default App;
