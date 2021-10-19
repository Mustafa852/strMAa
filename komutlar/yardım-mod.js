const Strom = require('discord.js');
const ayarlar = require('../ayarlar.json')
exports.run = function(client, message) {
  
  let prefix  = ayarlar.prefix

const yardım = new Strom.MessageEmbed()
.setColor('GREEN')
.setAuthor(`Strom Yardım`)
.setDescription(`**Bota Oy Vermek için** [TIKLA](https://top.gg/bot/756883309270663229/vote)
**Bota yorum atıp 5 yıldız vermeyi unutma :)** [TIKLA](https://top.gg/bot/756883309270663229)

🔧 \`${prefix}ban\`:  **Belirttiğiniz Üyeyi Sunucudan Yasaklar**\`\n
🔧 \`${prefix}nuke\`:  **Kanaldaki bütün mesajları siler**\`\n
🔧 \`${prefix}otorol\`:  **Etiketlediğiniz rolü her gelen üyeye verir**\`\n\`${prefix}ototag\`:  **Etiketlediğiniz tagı her gelen üyeye verir**\`\n
 \`${prefix}yetkilerim\`:  **Sunucudaki yetkilerinizi gösterir**\`\n
 \`${prefix}sunucutanıt\`:  **Sunucunuzu bizim sunucuda tanıtır.**\`\n
\`${prefix}kullanıcıbilgi\`:  **Kullanıcının bilgilerini gösterir..**\`\n
 \`${prefix}tavsiye\`:  **Bot için tafsiye verin.**\`\n
 \`${prefix}bugbildir\`:  **bu komut oluşabilecek hatalar içindir.**\`\n
 \`${prefix}sayaç-ayarla\`:  **Sunucunuza sayaç ayarlarsınız.**\`\n
 \`${prefix}kurallar\`:  **Sunucu için kurallar atar.**\`\n
 \`${prefix}servericon\`:  **sunucu iconunu gösterir.**\`\n
 \`${prefix}şablon-gönder\`:  **bize sunucu şablonu gönderir. Beğenirsek s!diğer-temalar larına eklenir.**\`\n
\`${prefix}rank\`:  **Seviyenizi gösterir.**\`\n
\`${prefix}sohbet-aç\`:  **sohbet i yazılabilir hale getirir.**\`\n
 \`${prefix}sohbet-kapat\`:  **sohbet i yazılamaz hale getirir.**\`\n
 \`${prefix}kick-limit\`:  **kick limiti ayarlarsınız.**\`\n
\`${prefix}ban-limit\`:  **ban limiti ayarlarsınız.**\`\n
 \`${prefix}oylama\`:  **oylama.**\`\n
 \`${prefix}çoklu-oylama\`:  **şıklı oylama.**\`\n
 \`${prefix}komutlar\`:  **bottaki bütün komutları gösterir.**\`\n
 \`${prefix}toplamkomut\`:  **bottaki toplam kaç komut var onu gösterir.**\`\n
 \`${prefix}hesapla\`:  **Matematik işlemi.**\`\n
`)
.setThumbnail(message.author.avatarURL())
message.channel.send(yardım)

  
   
  
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ['mod',"moderasyon"], 
  permLevel: 0
};

exports.help = {
  name: "moderasyon-sistemi",
  description: 'Bizim yaptığımız bir yardım kodu.',
  usage: 'moderasyonhelp'
};