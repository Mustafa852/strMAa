const Discord = require('discord.js');

let botid = ('')

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
    .setColor("")
    .addField(`**Booster Rolü Bilgileri**`,`Booster Rolü Almak İçin Sunucuya Boost Basmanız Gereklidir.`)
    .addField(`<a:booster:706824717704626188>  **Booster Avantajları**\n`, `

 <a:boost:706824674168012860>  | Sadece Boosterlere Özel <@&705810600915370056> Rolü Alırsınız.

 <a:boost:706824674168012860>  | <@&706259236711301122> Rolü Alırsınız.

 <a:boost:706824674168012860>  | 10 İnvitelik <@&705809158410338408> Rolünü Alırsınız.

 <a:boost:706824674168012860>  | İsim Değiştirme Hakkı.

 <a:boost:706824674168012860>  | Size Özel Sohbet Kanalları .

 <a:boost:706824674168012860>  | Adınızın Yanına Booster Sembolü.

 <a:boost:706824674168012860>  | Yardımlarda Öncelik.`)
    message.channel.sendEmbed(embed);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'booster',
  description: 'Booster Rolü Hakkındaki Bilgileri Gösterir.',
  usage: 'booster'
};
   