const TelegramBot = require("node-telegram-bot-api");
const commands = require("../libs/commands");
// const Photo = require("../RandomPhoto");
const {
  helpTextMessage,
  invalidCommandMessage,
  fotoList,
} = require("../libs/constant");
class CuyBot extends TelegramBot {
  constructor(token, options) {
    super(token, options);
    this.on("message", (data) => {
      if (!data.text) return;
      const isInCommand = Object.values(commands).some((keyword) =>
        keyword.test(data.text)
      );

      if (!isInCommand) {
        this.sendMessage(data.from.id, invalidCommandMessage, {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Help",
                  callback_data: "go_to_help",
                },
              ],
            ],
          },
        });
        this.on("callback_query", (callback) => {
          const callbackcName = callback.data;
          if (callbackcName == "go_to_help") {
            this.sendMessage(callback.from.id, helpTextMessage);
          }
        });
        console.log(
          `Invalid command Executed By ${data.from.username}\nText => ${data.text}`
        );
      }
    });
  }
  getStart() {
    this.onText(/\/start/, async (data) => {
      const botProfile = await this.getMe();
      this.sendMessage(
        data.chat.id,
        `Haloooo nama ku ${botProfile.first_name}, senang bertemu denganmu! Ada yang bisa aku bantu?`
      );
    });
  }
  getSticker() {
    this.on("sticker", (data) => {
      console.log("getSticker Executed By " + data.from.username);
      this.sendMessage(data.from.id, data.sticker.emoji);
      this.sendMessage(data.from.id, data.sticker.emoji);
    });
  }
  getGreeting() {
    this.onText(commands.greeting, async (data) => {
      console.log("getGreeting Executed By " + data.from.username);
      const botProfile = await this.getMe();
      this.sendMessage(
        data.from.id,
        `halo, juga aku ${botProfile.first_name} ada yang bisa aku bantu?`
      );
    });
  }
  getFollow() {
    this.onText(commands.follow, (data, after) => {
      console.log("getFollow Executed By " + data.from.username);
      this.sendMessage(data.from.id, `lu bilang${after[1]} ya`);
    });
  }
  getQuote() {
    this.onText(commands.quote, async (data) => {
      console.log("getQuote Executed By " + data.from.username);
      // ambil data dari quotes
      const quoteEndpoint = "https://api.kanye.rest";
      try {
        const apiCall = await fetch(quoteEndpoint);
        const { quote } = await apiCall.json();
        this.sendMessage(data.from.id, `kata kata hari ini: ${quote}`);
      } catch (error) {
        console.error(error);
        this.sendMessage(data.from.id, "API nya lagi lemot, coba lagi nanti");
      }
    });
  }
  getNews() {
    this.onText(commands.news, async (data) => {
      console.log("getNews Executed By " + data.from.username);
      const newsEndpoint = "https://jakpost.vercel.app/api/category/indonesia";
      this.sendMessage(data.from.id, "sebentar berita nya lagi di cari...");

      try {
        const apiCall = await fetch(newsEndpoint);
        const response = await apiCall.json();
        const maxNews = 3;

        for (let i = 0; i < maxNews; i++) {
          const news = response.posts[i];
          const { title, image, headline } = news;
          this.sendPhoto(data.from.id, image, {
            caption: `judul: ${title}\n\nHeadline: ${headline}`,
          });
        }
      } catch (error) {
        console.error(error);
      }
    });
  }
  getHelp() {
    this.onText(commands.help, (data) => {
      console.log("getHelp Executed By " + data.from.username);
      this.sendMessage(data.from.id, helpTextMessage);
    });
  }
  getIntroduction() {
    this.onText(commands.introduction, async (data) => {
      console.log("getIntroduction Executed By " + data.from.username);
      const botProfile = await this.getMe();
      this.sendMessage(
        data.from.id,
        `✨━━━━━━━━━━━━━━━━━━━━━━✨
🤖✨ *Haiii~ aku ${botProfile.first_name}!* ✨🤖
✨━━━━━━━━━━━━━━━━━━━━━━✨

🧠 Diciptakan oleh *Mesi Kawala* — calon fullstack programmer 💻  
🚀 Aku adalah proyek portofolio pertamanya, tapi jangan remehin aku ya!  
Aku terus belajar, berkembang, dan siap nemenin kamu kapan pun 💬  

💡 Kalau ada ide keren atau saran buat aku, bilang aja yaa~ 
✨━━━━━━━━━━━━━━━━━━━━━━✨`,
        { parse_mode: "Markdown" }
      );
    });
  }
  getQuake() {
    this.onText(commands.quake, async (data) => {
      console.log("getQuake Executed By " + data.from.username);
      const quakeEndpoint =
        "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json";

      // kasih respon awal
      this.sendMessage(
        data.from.id,
        "Tunggu sebentar ya... lagi ambil data gempa dari BMKG ⏳"
      );

      try {
        const apiCall = await fetch(quakeEndpoint);
        const response = await apiCall.json();
        const { gempa } = response.Infogempa;
        const { Wilayah, Magnitude, Tanggal, Jam, Kedalaman, Shakemap } = gempa;

        const imgSourceUrl = "https://data.bmkg.go.id/DataMKG/TEWS/" + Shakemap;

        this.sendPhoto(data.from.id, imgSourceUrl, {
          caption: `📢 *Info Gempa Terbaru* 📢
Tanggal: ${Tanggal}
Waktu: ${Jam}

📍 Wilayah: ${Wilayah}
💥 Magnitudo: ${Magnitude} SR
🌊 Kedalaman: ${Kedalaman}`,
          parse_mode: "Markdown",
        });
      } catch (error) {
        console.error(error);
        this.sendMessage(
          data.from.id,
          "Maaf, ada kesalahan saat mengambil data dari BMKG 😿"
        );
      }
    });
  }
  getRandomFoto() {
    this.onText(commands.foto, (data) => {
      const chatId = data.from.id;

      const randomIndex = Math.floor(Math.random() * fotoList.length);
      const selected = fotoList[randomIndex];

      console.log(`Random Foto Executed by ${data.from.username}`);

      this.sendPhoto(chatId, selected, {
        caption: "nih foto random",
      });
    });
  }
  getHot() {
    this.onText(commands.Hot, (data) => {
      console.log(`Random Hot Executed by ${data.from.username}`);
      this.sendMessage(data.from.id, "apakah kamu di atas 18 tahun?", {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "iya",
                callback_data: "Hot_Yes",
              },
              {
                text: "tidak",
                callback_data: "Hot_No",
              },
            ],
          ],
        },
      });
    });
  }
  getVideo() {
    this.on("callback_query", (callback) => {
      const chatId = callback.from.id;
      const data = callback.data;
      const rickroll = "https://files.catbox.moe/w9zgad.mp4";

      if (data === "Hot_Yes") {
        console.log(`Random Hot Yes Executed by ${data.from.username}`);
        this.sendMessage(
          chatId,
          "pilih yang mana? masing masing durasi 10 menit",
          {
            reply_markup: {
              inline_keyboard: [
                [
                  { text: "SMP", callback_data: "SMP" },
                  { text: "SMA", callback_data: "SMA" },
                  { text: "di hotel", callback_data: "di_hotel" },
                ],
              ],
            },
          }
        );
        return;
      }
      if (data === "Hot_No") {
        console.log(`Random Hot No Executed by ${data.from.username}`);
        this.sendMessage(
          chatId,
          "umur kamu belum 18 tahun ke atas berarti kamu belum bisa"
        );
        return;
      }

      if (data === "SMP") {
        console.log(`Random SMP Executed by ${data.from.username}`);
        this.sendVideo(chatId, rickroll, {
          caption: "prannnkkkkkkkkk",
          parse_mode: "Markdown",
        });
      }
      if (data === "SMA") {
        console.log(`Random SMA Executed by ${data.from.username}`);
        S;
        this.sendVideo(chatId, rickroll, {
          caption: "prannnkkkkkkkkk",
          parse_mode: "Markdown",
        });
      }
      if (data === "di_hotel") {
        console.log(`Random di hotel Executed by ${data.from.username}`);
        this.sendMessage(chatId, rickroll, {
          caption: "prannnkkkkkkkkk",
          parse_mode: "Markdown",
        });
      }
    });
  }
}

module.exports = CuyBot;
