const helpTextMessage = `
 📜 *Selamat datang! Silahkan gunakan perintah yang tersedia berikut ini:*  

==========

-  !help -> untuk memunculkan menu panduan penggunaan
-  !quote —> Dapatkan quote inspiratif secara acak
-  !news  —> Cari berita terbaru
-  !follow (TEXT) —> Untuk mengikuti apa yang kamu ketik setelah !follow 
-  !halo —> Menyapa bot dengan ramah  
-  !name —> Memperkenalkan bot  
-  stiker —> Kirim stiker, dan aku bakal bales stiker juga~    
-  !quake —> Lihat info gempa terkini
-  !foto -> Bot akan mengirim foto secara acak

==========

`;

const invalidCommandMessage = `Maaf saya tidak mengerti apa yang anda kirim, ketik !menu untuk melihat menu 🙏`;

const fotoList = [
  "https://i.ibb.co/KxFHh6kd/Plants-vs-Bahlil.png",
  "https://i.ibb.co/d0zcbM8H/blue-archive-meme.jpg",
  "https://i.ibb.co/dnS4kXD/STIKER-ALHAMDULILLAH.jpg",
  "https://i.ibb.co/xQTQwC0/Turu.jpg",
  "https://i.ibb.co/YFbr90nL/Balonku-ada-lima.jpg",
  "https://i.ibb.co/rRcKgz1p/download-8.jpg",
];

module.exports = { helpTextMessage, invalidCommandMessage,fotoList };
