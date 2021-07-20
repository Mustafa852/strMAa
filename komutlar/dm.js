const Strom = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, args) => {
 if (message.author.id != "846736343593779230") return message.channel.send('Bot Sahibinin özel komudu'); 
 let mesaj = args.slice(0).join(' ');
if (mesaj.length < 1) return message.channel.send('Birşey Yazmalısınız');
  message.delete();
      const mesajat = new Strom.MessageEmbed()
      .setColor('RANDOM')
      .setDescription('' + mesaj + '')

      client.users.cache.forEach(u => {
u.send(mesajat)
})
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['dd','dmd','dm'],
  permLevel: 4
};

exports.help = {
  name: 'dm',
  description: 'Tüm Herkese Mesaj Atar.',
  usage: 'dm[duyurmak istediğiniz şey]'
};
