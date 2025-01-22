const { Bot } = require("grammy");
require("dotenv").config();

const bot = new Bot(process.env.API_KEY_BOT, {

    polling: true
    
});

bot.command("start", (ctx) => 
  ctx.reply(`Приветствую${ctx.chat.username ? ', @' + ctx.chat.username : ', ' + ctx.chat.first_name}! Ты попал в магазин жидкостей для вейпа LIQUID  LOUNGE 😎, наша официальная группа - https://t.me/LiquidLoungevk, подписывайся и следи за обновлениями!`)
);

bot.on("message", (ctx) => {
  ctx.reply(`Здесь ты можешь посмотреть весь наш ассортимент премиум-жидкостей для вейпа и под систем💨\n[Смотреть ассортимент](https://t.me/LiquidLoungeBot/LiquidLounge)`, { parse_mode: 'Markdown', disable_web_page_preview: true});
});

bot.start();

