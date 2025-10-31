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

==========

`;

const invalidCommandMessage = `Maaf saya tidak mengerti apa yang anda kirim, ketik !menu untuk melihat menu 🙏`;

module.exports = { helpTextMessage, invalidCommandMessage };
