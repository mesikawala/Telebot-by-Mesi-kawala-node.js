// ======== import dan inisialisasi ========
const express = require("express");
const bodyParser = require("body-parser");
const CuyBot = require("./app/CuyBot");
require("dotenv").config();
const TelegramBot = require('node-telegram-bot-api');

const app = express();
app.use(bodyParser.json());

// ambil token dan server url dari .env
const TOKEN = process.env.TELEGRAM_TOKEN;
const SERVER_URL = process.env.SERVER_URL;

// buat instance bot tanpa polling
const cuybot = new CuyBot(TOKEN, { polling: true });

// ======== set webhook ========
const webhookPath = `/bot${TOKEN}`;
const webhookUrl = `${SERVER_URL}${webhookPath}`;

cuybot.setWebHook(`${SERVER_URL}`);

// endpoint webhook untuk terima update dari Telegram
app.post("/", (req, res) => {
  cuybot.processUpdate(req.body);
  res.sendStatus(200);
});
// ======== fungsi utama ========
const main = () => {
  console.log("Checking features...");
  cuybot.getSticker();
  cuybot.getGreeting();
  cuybot.getFollow();
  cuybot.getQuote();
  cuybot.getNews();
  cuybot.getIntroduction();
  cuybot.getHelp();
  cuybot.getQuake();
  console.log("Features ready!");
};

main();

// ======== jalankan server ========
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Bot server running on port ${PORT}`);
});
