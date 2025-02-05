import React from 'react';
import './OrderCreated.css';

interface OrderCreatedProps{
    onTabChange: (activeTab: string) => void;
    onSearch: (query: string) => void;
  }

const OrderCreated: React.FC<OrderCreatedProps> = () => {
  const handleClick = () => {
    window.Telegram.WebApp.openTelegramLink('https://t.me/Liquid_Lounge');
  }

  return (
    <div className="order">
        <div className="checkmark"></div>
        <div className="text">Остался всего 1 шаг! <br /> <br />
                              Для оформления заказа перейдите в чат с администратором и сообщите ему свой ID.
        </div>
        <div className="userID" onClick={() => {
            navigator.clipboard.writeText(`${window.Telegram.WebApp.initDataUnsafe.user?.id}`).then(() => {
                window.Telegram.WebApp.showAlert("Текст скопирован!");
            }).catch(err => {
                window.Telegram.WebApp.showAlert("Ошибка копирования, попробуйте вручную.");
            });
        }}>ID: {window.Telegram.WebApp.initDataUnsafe.user?.id} <span>(кликните чтобы скопировать)</span></div>
        <button className='toChat' onClick={handleClick}>Чат с администратором</button>
    </div>
  );
};

export default OrderCreated;