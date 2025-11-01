// ======== import dan inisialisasi ========
const express = require("express");
const bodyParser = require("body-parser");
const CuyBot = require("./app/CuyBot");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

const TOKEN = process.env.TELEGRAM_TOKEN;
const SERVER_URL = process.env.SERVER_URL;

const cuybot = new CuyBot(TOKEN, { webhook: true });

const webhookPath = `/bot${TOKEN}`;
const webhookUrl = `${SERVER_URL}${webhookPath}`;

cuybot.setWebHook(webhookUrl);

app.post(webhookPath, (req, res) => {
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
