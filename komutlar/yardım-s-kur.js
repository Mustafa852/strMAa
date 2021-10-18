const Discord = require('discord.js');
const data = require('quick.db');

exports.run = async (client, message, args) => {
 
  
  
  Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)];
  }

let images = [''];
message.channel.send(new Discord.MessageEmbed().setColor('#000001').setDescription(`**Bota Oy Vermek için** [TIKLA](https://top.gg/bot/756883309270663229/vote)
**Bota yorum atıp 5 yıldız vermeyi unutma :)** [TIKLA](https://top.gg/bot/756883309270663229)

**Sunucu-kur Ana Menüsüne Hoş Geldin Dostum :innocent:

${client.user} Kullanırken Botun Özel Rolünü rolünü en yukarıda tutunuz.**
**

🦋 \`s!sunucu-kur-botlist\` botlist sunucusu kurar.

🦋 \`s!sunucu-kur-gelişmiş\` Gelişmiş sunucu kurar.

🦋 \`s!nitro-sunucu-kur\` Nitro Sunucusu Kurar.

🦋 \`s!normal-sunucu-kur\` Normal Sunucusu Kurar.

🔥 \`s!davet\` Menüsün de neler var?


**`).setThumbnail(message.author.avatarURL() ? message.author.avatarURL({dynamic: true}) : '').setImage(images.random()))

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sunucu-kur', 'sunucu-yardım'],
  permLevel: 0
}

exports.help = {
  name: 'sunucu-kur'
};