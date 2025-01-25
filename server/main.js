const { Bot } = require("grammy");
const express = require("express");
require("dotenv").config();

const bot = new Bot(process.env.API_KEY_BOT);

// Команда /start
bot.command("start", (ctx) =>
  ctx.reply(
    `Приветствую${
      ctx.chat.username ? ", @" + ctx.chat.username : ", " + ctx.chat.first_name
    }! Ты попал в магазин жидкостей для вейпа LIQUID  LOUNGE 😎, наша официальная группа - https://t.me/LiquidLoungevk, подписывайся и следи за обновлениями!`
  )
);

// Запуск бота
bot.start();

// Инициализация HTTP-сервера
const app = express();
const PORT = process.env.PORT || 3005;

// Включаем парсинг JSON в запросах
app.use(express.json());

// Эндпоинт для вызова sendHello()
app.post("/sendHello", async (req, res) => {
  try {
    await bot.api.sendMessage({
      chat_id: -1002277090632, // Укажите свой чат ID
      text: `<i>Привет! В приложении оформили заказ ${req.name} на сумму ${req.price} рублей</i>`,
      parse_mode: "HTML",
    });
    console.log('done');
    res.status(200).send({ success: true, message: "Сообщение отправлено!" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Ошибка отправки сообщения." });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
