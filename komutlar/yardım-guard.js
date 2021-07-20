const Strom = require('discord.js');
const ayarlar = require('../ayarlar.json')
exports.run = function(client, message) {
  
  let prefix  = ayarlar.prefix

const yardım = new Strom.MessageEmbed()
.setColor('GREEN')
.setAuthor(`Strom Guard Sistemi`)
.setAuthor(``)
.setDescription(`**Bota Oy Vermek için** [TIKLA](https://top.gg/bot/756883309270663229/vote)
**Bota yorum atıp 5 yıldız vermeyi unutma :)** [TIKLA](https://top.gg/bot/756883309270663229)

🔰 \`!kanal-koruma\` : **Kanal Koruma Aç/Kapat**
🔰 \`!küfür-engel\`:  **Küfür Engel Aç/Kapat**
🔰 \`!reklam-engel\` :  **Reklam Engel Aç/Kapat**
🔰 \`!Antiraid\` :  **Antiraid sistemini Açıp Kapatırsınız**
🔰 \`!caps-engel\` :  **Büyük harf engeli**
🔰 \`!spam-engel\` :  **Spam yapanları durdurur**
🔰 \`!isim-reklam-koruma\`:  **Kullanıcının isminde reklam varsa onu sunucudan banlar**
🔰 \`!sohbet aç-kapat\` :  **Sohbeti Açıp Kapatırsınız**
🔰 \`!ban\`: **Belirttiğiniz Kişiyi Sunucudan Banlarsınız**
🔰 \`!unban\`:  **Belirttiğiniz Kişinin Banını Kaldırırsınız**
🔰\`!istatistik\`:  **Botun İstatistiklerini Atar**
🔰 \`!temizle\`:  **Belirttiğiniz Sayıda Mesajı Siler**
🔰 \`!ping\`:  **Pinginizi Ölçüp Atar**

`)
.setThumbnail(message.author.avatarURL())
message.channel.send(yardım)

  
   
  
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ['guardyardım','guard'], 
  permLevel: 0
};

exports.help = {
  name: "guard-sistemi",
  description: 'Bizim yaptığımız bir yardım kodu.',
  usage: 'guardhelp'
};