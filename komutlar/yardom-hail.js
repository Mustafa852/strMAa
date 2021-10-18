const Strom = require('discord.js');
const ayarlar = require('../ayarlar.json')
exports.run = function(client, message) {
  
  let prefix  = ayarlar.prefix

const yardım = new Strom.MessageEmbed()
.setColor('GREEN')
.setAuthor(`Strom jail Sistemi`)
.setAuthor(``)
.setDescription(`**Bota Oy Vermek için** [TIKLA](https://top.gg/bot/756883309270663229/vote)
**Bota yorum atıp 5 yıldız vermeyi unutma :)** [TIKLA](https://top.gg/bot/756883309270663229)

👮 \`${prefix}jail\` : **Bir kişiyi belirlediğiniz rol ile jaile yollarsınız**
👮 \`${prefix}jail-kanal\`:  **Birisi jaile atılınca hangi kanala mesaj atılacağını ayarlarsınız**
👮 \`${prefix}jail-rol\` :  **Birisi jaile atılınca hangi role sahip olacağını ayarlarsınız**
👮 \`${prefix}jail-yetkilisi\` :  **Hangi role sahip kişilerin jaile atabileceğini ayarlarsınız**

`)
.setThumbnail(message.author.avatarURL())
message.channel.send(yardım)

  
   
  
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ['jailyardım','jail-yardım'], 
  permLevel: 0
};

exports.help = {
  name: "jail-sistemi",
  description: 'Bizim yaptığımız bir yardım kodu.',
  usage: 'guardhelp'
};