const CuyBot = require("./app/CuyBot");
require("dotenv").config();

const token = process.env.TELEGRAM_TOKEN;
const options = {
  polling: true,
};

console.log("starting cuybot...");
const cuybot = new CuyBot(token, options);

const main = () => {
  console.log("checking feature...");
  cuybot.getSticker();
  cuybot.getGreeting();
  cuybot.getFollow();
  cuybot.getQuote();
  cuybot.getNews();
  cuybot.getIntroduction();
  cuybot.getHelp();
  cuybot.getQuake();
  console.log("feature ready!")
};

main();
console.log("bot is ready now!")