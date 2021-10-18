const Strom = require('discord.js');
const ayarlar = require('../ayarlar.json')
exports.run = function(client, message) {
  
  let prefix  = ayarlar.prefix

const yardım = new Strom.MessageEmbed()
.setColor('GREEN')
.setAuthor(`Strom Yardım`)
.setDescription(`**Bota Oy Vermek için** [TIKLA](https://top.gg/bot/756883309270663229/vote)
**Bota yorum atıp 5 yıldız vermeyi unutma :)** [TIKLA](https://top.gg/bot/756883309270663229)

<a:mod:855390640946806784> \`${prefix}ban\`:  **Belirttiğiniz Üyeyi Sunucudan Yasaklar**\`\n
<a:mod:855390640946806784> \`${prefix}nuke\`:  **Kanaldaki bütün mesajları siler**\`\n
<a:mod:855390640946806784> \`${prefix}otorol\`:  **Etiketlediğiniz rolü her gelen üyeye verir**\`\n
<a:mod:855390640946806784> \`${prefix}ototag\`:  **Etiketlediğiniz tagı her gelen üyeye verir**\`\n
<a:mod:855390640946806784> \`${prefix}yetkilerim\`:  **Sunucudaki yetkilerinizi gösterir**\`\n
<a:mod:855390640946806784> \`${prefix}roller\`:  **Sunucudaki rolleri gösterir**\`\n
<a:mod:855390640946806784> \`${prefix}sunucutanıt\`:  **Sunucunuzu bizim sunucuda tanıtır.**\`\n
<a:mod:855390640946806784> \`${prefix}kullanıcıbilgi\`:  **Kullanıcının bilgilerini gösterir..**\`\n
<a:mod:855390640946806784> \`${prefix}tavsiye\`:  **Bot için tafsiye verin.**\`\n
<a:mod:855390640946806784> \`${prefix}bugbildir\`:  **bu komut oluşabilecek hatalar içindir.**\`\n
<a:mod:855390640946806784> \`${prefix}sayaç-ayarla\`:  **Sunucunuza sayaç ayarlarsınız.**\`\n
<a:mod:855390640946806784> \`${prefix}kurallar\`:  **Sunucu için kurallar atar.**\`\n
<a:mod:855390640946806784> \`${prefix}servericon\`:  **sunucu iconunu gösterir.**\`\n
<a:mod:855390640946806784> \`${prefix}şablon-gönder\`:  **bize sunucu şablonu gönderir. Beğenirsek !diğer-temalar larına eklenir.**\`\n
<a:mod:855390640946806784> \`${prefix}rank\`:  **Seviyenizi gösterir.**\`\n
<a:mod:855390640946806784> \`${prefix}sohbet-aç\`:  **sohbet i yazılabilir hale getirir.**\`\n
<a:mod:855390640946806784> \`${prefix}sohbet-kapat\`:  **sohbet i yazılamaz hale getirir.**\`\n
<a:mod:855390640946806784> \`${prefix}kick-limit\`:  **kick limiti ayarlarsınız.**\`\n
<a:mod:855390640946806784> \`${prefix}ban-limit\`:  **ban limiti ayarlarsınız.**\`\n
<a:mod:855390640946806784> \`${prefix}oylama\`:  **oylama.**\`\n
<a:mod:855390640946806784> \`${prefix}çoklu-oylama\`:  **şıklı oylama.**\`\n
<a:mod:855390640946806784> \`${prefix}komutlar\`:  **bottaki bütün komutları gösterir.**\`\n
<a:mod:855390640946806784> \`${prefix}toplamkomut\`:  **bottaki toplam kaç komut var onu gösterir.**\`\n
<a:mod:855390640946806784> \`${prefix}hesapla\`:  **Matematik işlemi.**\`\n
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