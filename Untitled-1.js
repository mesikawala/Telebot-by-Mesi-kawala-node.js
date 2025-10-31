bot.on("message", async (data) => {
  if (data.text == "nama") {
    const botProfile = await bot.getMe();
    bot.sendMessage(
      data.from.id,
      `Hi nama ku ${botProfile.first_name}\nkenapa kamu nge chat aku?`
    );
  }
});

// ini Listener untuk message spesific sticker only
bot.on("sticker", (data) => {
  bot.sendMessage(data.from.id, data.sticker.emoji);
});

// spesifik hanya ketika user ketik !halo saja
bot.onText(/^!ino$/, (data) => {
  bot.sendMessage(data.from.id, "cihuyyyyyy");
});

// ketika user ketik !follow testing, maka kata2 testing akan di tangkap
bot.onText(/^!follow(.+)/, (data, after) => {
  bot.sendMessage(data.from.id, `lu bilang${after[1]} ya`);
});

// fetching quotes API
bot.onText(/^!quote$/, async (data) => {
  // ambil data dari quotes
  const quoteEndpoint = "https://api.kanye.rest";
  try {
    const apiCall = await fetch(quoteEndpoint);
    const { quote } = await apiCall.json();
    bot.sendMessage(data.from.id, `kata kata hari ini: ${quote}`);
  } catch (error) {
    console.error(error);
    bot.sendMessage(data.from.id, "API nya lagi lemot, coba lagi nanti");
  }
});

// berita
bot.onText(/^!news$/, async (data) => {
  const newsEndpoint = "https://jakpost.vercel.app/api/category/indonesia";
  bot.sendMessage(data.from.id, "sebentar berita nya lagi di cari...");

  try {
    const apiCall = await fetch(newsEndpoint);
    const response = await apiCall.json();
    const maxNews = 2;

    for (let i = 0; i < maxNews; i++) {
      const news = response.posts[i];
      const { title, image, headline } = news;
      bot.sendPhoto(data.from.id, image, {
        caption: `judul: ${title}\n\nHeadline: ${headline}`,
      });
    }
  } catch (error) {
    console.error(error);
  }
});

// Menu
bot.onText(/^!menu$/, (data) => {
  bot.sendMessage(
    data.from.id,
    "menu nya ada:\n\n-!quote: untuk mendapatkan quote\n-!follow: untuk mengikuti mu\n-!ino: untuk memunculkan kata kata cihuy\n-nama: untuk memperkenalkan bot\n-stiker: ketika kamu kirim stiker maka bot akan menjawab dengan stiker juga\n-!news: buat nyari berita"
  );
});

// typo atau salah ketik
bot.on("message", (data) => {
  const validCommand = ["!quote", "!follow", "!ino", "nama", "!news", "!menu"];

  if (!validCommand.includes(data.text)) {
    bot.sendMessage(data.from.id, "lu ngetik apa anjir, kgk ngerti gua");
  }
});

  Tanggal: '27 Okt 2025',
      Jam: '00:04:28 WIB',
      DateTime: '2025-10-26T17:04:28+00:00',
      Coordinates: '-9.06,123.97',
      Lintang: '9.06 LS',
      Bujur: '123.97 BT',
      Magnitude: '6.3',
      Kedalaman: '75 km',
      Wilayah: 'Pusat gempa berada di laut 82 km barat laut Timor Tengah Utara',
      Potensi: 'Gempa ini dirasakan untuk diteruskan pada masyarakat',
      Dirasakan: 'III-IV Maumere, III-IV Ende, III-IV Kefamenanu, III-IV Kupang, III-IV Waingapu, III-IV Lembata, III-IV Alor, III-IV Larantuka, III-IV Niki Niki',
      Shakemap: '20251027000428.mmi.jpg'

        // getTypo() {
  //   this.on("message", (data) => {
  //     const validCommand = [
  //       "!quote",
  //       "!follow",
  //       "!halo",
  //       "!name",
  //       "!news",
  //       "!menu",
  //       "!quake",
  //     ];

  //     if (!validCommand.includes(data.text)) {
  //       this.sendMessage(data.from.id, "lu ngetik apa anjir, kgk ngerti gua");
  //     }
  //   });
  // }