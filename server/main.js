const TelegramBot = require('node-telegram-bot-api');
require("dotenv").config();

const bot = new TelegramBot(process.env.API_KEY_BOT, {

    polling: true
    
});

bot.on('text', async msg => {

    console.log(msg);
    try {

        if(msg.text == '/start') {

            await bot.sendMessage(msg.chat.id, `Приветствую, ${msg.chat.first_name}! Ты попал в магазин жидкостей для вейпа LIQUID LOUNGE 😎, наша официальная группа - https://t.me/LiquidLoungevk, подписывайся и следи за обновлениями!`);

        }
        else {

            await bot.sendMessage(msg.chat.id, `Здесь ты можешь посмотреть весь наш ассортимент премиум-жидкостей для вейпа и под систем💨\n[Смотреть ассортимент](https://t.me/LiquidLoungeBot/LiquidLounge)`, { parse_mode: 'Markdown', disable_web_page_preview: true});

        }

    }
    catch(error) {

        console.log(error);

    }

})

