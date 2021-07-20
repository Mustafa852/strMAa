const Strom = require('discord.js');
const StromClient = new Strom.Client();
const ayarlar = require('../ayarlar.json');
let Prefix = ayarlar.prefix

exports.run = (client, message) => {
 const StromEmbed = new Strom.MessageEmbed()
  .setColor(0xff000)
 .setAuthor(`${client.user.username} | Ekonomi Sistemi Yardım Menüsü`)
 .setDescription(`**Bota Oy Vermek için** [TIKLA](https://top.gg/bot/756883309270663229/vote)
 **Bota yorum atıp 5 yıldız vermeyi unutma :)** [TIKLA](https://top.gg/bot/756883309270663229)
 
<a:money:823900161201405972> **${Prefix}bilgilerim** \n-> Hesap Bilgisini Gösterir
<a:money:823900161201405972> **${Prefix}bakiye** \n-> Bakiyeyi Gösterir
<a:money:823900161201405972> **${Prefix}günlükpara** \n->  Günlük Para Ödülü Alırsın
<a:money:823900161201405972> **${Prefix}hesap-oluştur** \n->  Hesap Oluşturursun
<a:money:823900161201405972> **${Prefix}hesap-sil** \n->  Hesap Silersin
<a:money:823900161201405972> **${Prefix}kasa-aç** \n->  Kasa Açarsın
<a:money:823900161201405972> **${Prefix}kasa-bilgi** \n->  Kasalar Hakkında Bilgi Alırsın
<a:money:823900161201405972> **${Prefix}transfer** \n->  Belirtilen Kişiye Belirtilen Miktarda Para Gönderirsin
<a:money:823900161201405972> **${Prefix}kasaaç <Kasaid>** \n->  Belirtilen İD'ye Sahip Kasayı Açarsın



`)
 .setFooter(`Strom Ekonomi Botu`)
 .setTimestamp()
 message.channel.send(StromEmbed)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kasa-yardım"],
  kategori: "Bot",
  permLevel: 0
};

exports.help = {
  name: 'kasa-yardım',
  description: 'Bot ile ilgili bilgi verir.',
  usage: 'bilgi'
};