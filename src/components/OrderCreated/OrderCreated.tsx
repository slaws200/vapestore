import React from "react";
import { motion } from "framer-motion";
import "./OrderCreated.css";

interface OrderCreatedProps {
  onTabChange: (activeTab: string) => void;
  onSearch: (query: string) => void;
}

const OrderCreated: React.FC<OrderCreatedProps> = () => {
  const handleClick = () => {
    window.Telegram.WebApp.openTelegramLink("https://t.me/Liquid_Lounge");
  };

  return (
    <>
      <motion.div className="order">
        <div className="checkmark"></div>
        <div className="text">
          Спасибо за заказ! <br /> <br />
          Чтобы завершить перейдите пожалуйста в чат с администратором и
          сообщите ему свой ID.
        </div>
        <div
          className="userID"
          onClick={() => {
            navigator.clipboard
              .writeText(`${window.Telegram.WebApp.initDataUnsafe.user?.id}`)
              .then(() => {
                window.Telegram.WebApp.showAlert("Текст скопирован!");
              })
              .catch((err) => {
                window.Telegram.WebApp.showAlert(
                  "Ошибка копирования, попробуйте вручную."
                );
              });
          }}
        >
          ID: {window.Telegram.WebApp.initDataUnsafe.user?.id}{" "}
          <span>(кликните чтобы скопировать)</span>
        </div>
      </motion.div>
      <button className="toChat" onClick={handleClick}>
        Чат с администратором
      </button>
    </>
  );
};

export default OrderCreated;
