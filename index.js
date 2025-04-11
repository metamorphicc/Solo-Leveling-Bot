require('dotenv').config();
const {Bot, Keyboard, InlineKeyboard} = require('grammy');
const { hydrate } = require('@grammyjs/hydrate');

const bot = new Bot(process.env.TOKEN);
bot.use(hydrate())
// const keyboardStart = new Keyboard().text('Кнопка 1').text('Кнопка 2').text('Кнопка 3').resized()

const keyboardList = ["Кнопка 1", "Кнопка 2", "Кнопка 3"]
const row = keyboardList.map((char) => {
    return [
        Keyboard.text(char)
    ] 
}) 
const keyboardStart = Keyboard.from(row).resized().placeholder('Какую кнопку?').oneTime()

TEXT=`Ежедневные задания:


Выполнено: ${0}`

bot.api.setMyCommands([
    {
      command: 'pythonshit',
      description: 'Правда всея руси',
    }, 
    {
      command: 'start',
      description: 'Запустить бота'
    },
    {
        command: 'dailytasks',
        description: 'Показать ежедневные задания'
    },
    {
        command: 'inlinebuttons',
        description: 'Инлайн клавиатура'
    }
]);

bot.command('help', async (ctx) => {
    await ctx.react('❤‍🔥')
    await ctx.reply(`<b>Доступные команды:</b>
/pythonshit — <i>устрашающая правда...</i>
/dailytasks — Ежедневные задания
/tg — ТГК создателя -> <a href='https://t.me/lowbankerr'>тык</a>`, {
    parse_mode: "HTML",
    disable_web_page_preview: true
})
})

bot.command('inlinebuttons', async (ctx) => {
    const inlineKeyboard = new InlineKeyboard()
    .text('Кнопка 1', 'button-1')
    .text('Кнопка 2', 'button-2')
    .text('Кнопка 3', 'button-3')
    await ctx.reply('Окей. Теперь выбери кнопку здесь',
        {
            reply_markup: inlineKeyboard
        }
    )

})

bot.callbackQuery('button-1', async (ctx) => {
    await ctx.answerCallbackQuery()
    await ctx.reply('Кнопка 1')
})

bot.callbackQuery('button-2', async (ctx) => {
    await ctx.answerCallbackQuery()
    await ctx.reply('Секретная кнопка.')
})

bot.hears('Кнопка 1', async (ctx) => {
    await ctx.reply('Кнопка 1.')
})

bot.command('dailytasks', async (ctx) => {
    await ctx.reply(TEXT)
})

bot.hears([/задания/, /Задания/], async (ctx) => {
    await ctx.reply(TEXT)
})

bot.command('pythonshit', async (ctx) => {
    await ctx.reply('')
})

bot.command('start', async (ctx) => {

    await ctx.reply('Привет! Ты нажал команду /start.', {
        reply_markup: keyboardStart
    });
})


bot.start();

