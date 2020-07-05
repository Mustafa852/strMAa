const Discord = require('discord.js');

let botid = ('')

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
    .setColor("")
    .addField(`**Premium Rolü Bilgileri**`,`Premium Rolü Almak İçin 50 İnvite Yapmanız Gerekiyor.`)
    .addField(`<a:ta:706832320052854855> **Premium Avantajları**`, `

 <a:disco:706438922317856839>  | Sadece Size Özel <@&705809158410338408> Rolünü Alırsınız.

 <a:disco:706438922317856839>  | Sunucu İçinde 2 Kez Adınızı Değiştirebilirsiniz.

 <a:disco:706438922317856839>  | <@&705810957258981448> Rolünü Alırsınız !

 <a:disco:706438922317856839>  | Size Özel Altyapılara Ve Kodlara Erişim Sağlarsınız !

 <a:disco:706438922317856839>  | Size Özel Sohbet Kanalları !

 <a:disco:706438922317856839>  | Size Özel Çekilişler !

 <a:disco:706438922317856839>  | Yardımlarda Öncelik !

 <a:disco:706438922317856839>  | <@&705809158410338408> Kişilere Özel Genel Log`)
    message.channel.sendEmbed(embed);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'premium',
  description: 'Premium Rolü Hakkındaki Bilgileri Gösterir.',
  usage: 'premium'
};
   