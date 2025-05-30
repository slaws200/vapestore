import React, { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Products } from "@interfaces/Products";
import { motion } from "framer-motion";
import "./ProductDetails.css";

interface ProductDetailsProps extends Products {
  onTabChange: (activeTab: string) => void;
  onSearch: (query: string) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  products,
  onTabChange,
  onSearch,
}) => {
  useEffect(() => {
    onTabChange("");
    tg.BackButton.show();
    tg.BackButton.onClick(handleClick);
  }, []);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const product = products.find((p) => p.id === id);
  const tg = window.Telegram.WebApp;
  const userData = tg.initDataUnsafe;

  const handleAvaliable = () => {
    if (product) {
      product.available = !product.available;
      tg.showAlert("Состояние изменено.");
    }
  };

  const handleClick = () => {
    if (location.pathname.includes("/orderCreated")) {
      navigate(-2);
      onTabChange("home");
      onSearch("");
      tg.BackButton.hide();
    } else {
      navigate(-1);
      onTabChange("home");
      onSearch("");
      tg.BackButton.hide();
    }
  };

  const orderHandler = async () => {
    if (!product) {
      console.error("Продукт отсутствует, запрос не будет отправлен.");
      return;
    }

    setLoading(true);

    const reqBody = {
      ...product,
      id: userData.user?.id,
      username: userData.user?.username,
    };

    try {
      const response = await fetch(
        "https://mybot-pmod.onrender.com/sendHello",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(reqBody),
        }
      );

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log("Ответ от сервера:", data);

      navigate("/orderCreated/"); // 🔹 Переход теперь происходит после ответа от сервера
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
      tg.showAlert("Произошла ошибка при оформлении заказа. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <>
      <motion.div
        className="product-details"
        initial={{ x: "100%" }} // Начальное положение (справа за экраном)
        animate={{ x: 0 }} // Появление (сдвиг влево)
        exit={{ x: "100%" }} // Закрытие (сдвиг вправо)
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="avaliable-wrapper">
          <div className="avaliable">
            <span>Наличи</span>е товара ут<span>очняйт</span>е у админи
            <span>страто</span>ра
          </div>
        </div>
        <img
          src={"/vapestore/" + product.image}
          alt={product.name}
          className="product-details-image"
        />
        <h1 className="product-details-name">{product.name}</h1>
        {userData.user?.id == 790578256 ? (
          <div className="avaliable-buttons-wrapper">
            <div className="handleAvailable" onClick={handleAvaliable}>
              {product.available ? "Скрыть" : "Показать"}
            </div>
          </div>
        ) : null}
        <p className="product-details-price">
          Цена:{" "}
          <span>
            {product.price} ₽ /{" "}
            {(Math.round((product.price * 1.09) / 10) * 10).toFixed(0)} lei
          </span>
        </p>
        <div className="product-details-description">{product.description}</div>
      </motion.div>
      {loading ? (
        // 🔹 Показываем спиннер во время ожидания ответа
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Обрабатываем заказ, подождите пожалуйста...</p>
        </div>
      ) : (
        <button
          className="product-add-to-cart"
          onClick={() => {
            tg.showPopup(
              {
                title: "Подтверждение",
                message: "Оформить заказ?",
                buttons: [
                  { id: "yes", type: "default", text: "Подтвердить" },
                  { id: "no", type: "destructive", text: "Отменить" },
                ],
              },
              (buttonId) => {
                if (buttonId === "yes") {
                  orderHandler();
                }
              }
            );
          }}
        >
          Заказать товар
        </button>
      )}
    </>
  );
};

export default ProductDetails;
