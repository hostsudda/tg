const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// Replace 'YOUR_TELEGRAM_BOT_API_TOKEN' with your bot's API token
const bot = new TelegramBot('YOUR_TELEGRAM_BOT_API_TOKEN', { polling: true });

// API endpoint and key
const AI_API_URL = 'https://prabath-md-api.up.railway.app/api/gptv4';
const API_KEY = '259758ae4d7a3a1e882058d10e435a57c3d634cb';

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Welcome! I am your AI chatbot. Type something and I will respond.');
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '/start') return;

  try {
    const response = await axios.get(`${AI_API_URL}?q=${encodeURIComponent(text)}&apikey=${API_KEY}`);
    const aiResponse = response.data.data; // Adjust according to your API response structure

    bot.sendMessage(chatId, aiResponse);
  } catch (error) {
    console.error('Error:', error);
    bot.sendMessage(chatId, 'Sorry, there was an error processing your request.');
  }
});
