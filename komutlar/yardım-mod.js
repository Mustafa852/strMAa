const Strom = require('discord.js');
const ayarlar = require('../ayarlar.json')
exports.run = function(client, message) {
  
  let prefix  = ayarlar.prefix

const yardım = new Strom.MessageEmbed()
.setColor('GREEN')
.setAuthor(`Strom Yardım`)
.setDescription(`**Bota Oy Vermek için** [TIKLA](https://top.gg/bot/756883309270663229/vote)
**Bota yorum atıp 5 yıldız vermeyi unutma :)** [TIKLA](https://top.gg/bot/756883309270663229)

<a:mod:855390640946806784> \`!ban\`:  **Belirttiğiniz Üyeyi Sunucudan Yasaklar**
<a:mod:855390640946806784> \`!nuke\`:  **Kanaldaki bütün mesajları siler**
<a:mod:855390640946806784> \`!otorol\`:  **Etiketlediğiniz rolü her gelen üyeye verir**
<a:mod:855390640946806784> \`!ototag\`:  **Etiketlediğiniz tagı her gelen üyeye verir**
<a:mod:855390640946806784> \`!yetkilerim\`:  **Sunucudaki yetkilerinizi gösterir**
<a:mod:855390640946806784> \`!roller\`:  **Sunucudaki rolleri gösterir**
<a:mod:855390640946806784> \`!sunucutanıt\`:  **Sunucunuzu bizim sunucuda tanıtır.**
<a:mod:855390640946806784> \`!kullanıcıbilgi\`:  **Kullanıcının bilgilerini gösterir..**
<a:mod:855390640946806784> \`!tavsiye\`:  **Bot için tafsiye verin.**
<a:mod:855390640946806784> \`!bugbildir\`:  **bu komut oluşabilecek hatalar içindir.**
<a:mod:855390640946806784> \`!prefix\`:  **prefix değiştirirsiniz.**
<a:mod:855390640946806784> \`!sayaç-ayarla\`:  **Sunucunuza sayaç ayarlarsınız.**
<a:mod:855390640946806784> \`!kurallar\`:  **Sunucu için kurallar atar.**
<a:mod:855390640946806784> \`!servericon\`:  **sunucu iconunu gösterir.**
<a:mod:855390640946806784> \`!şablon-gönder\`:  **bize sunucu şablonu gönderir. Beğenirsek !sunucu-tema larına eklenir.**
<a:mod:855390640946806784> \`!rank\`:  **Seviyenizi gösterir.**
<a:mod:855390640946806784> \`!sohbet-aç\`:  **sohbet i yazılabilir hale getirir.**
<a:mod:855390640946806784> \`!sohbet-kapat\`:  **sohbet i yazılamaz hale getirir.**
<a:mod:855390640946806784> \`!kick-limit\`:  **kick limiti ayarlarsınız.**
<a:mod:855390640946806784> \`!ban-limit\`:  **ban limiti ayarlarsınız.**
<a:mod:855390640946806784> \`!oylama\`:  **oylama.**
<a:mod:855390640946806784> \`!çoklu-oylama\`:  **şıklı oylama.**
<a:mod:855390640946806784> \`!komutlar\`:  **bottaki bütün komutları gösterir.**
<a:mod:855390640946806784> \`!toplamkomut\`:  **bottaki toplam kaç komut var onu gösterir.**
<a:mod:855390640946806784> \`!hesapla\`:  **Matematik işlemi.**
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