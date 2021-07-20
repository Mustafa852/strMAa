const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
  const yardim = new Discord.MessageEmbed()
  .setTitle("Komutlar")
  .setDescription('')
  .setColor(0x00ffff)
  .addField("**Nasıl Premium olursunuz:**", `Premium sahibi olabilmek için Bot sahibi ile iletişime geç <@846736343593779230>`)
  .addField("**Yetkilisi Komutlar**", `Fiyatlarımız oldukça uygundur \ 1 haftalık 2.50 TL ,\ 1 aylık 5 TL, \ Sınırsız 10 Tl`)
  .addField("Umarımki fiyatlardan Memnunsunuz")
  .addField("**Yapımcı**", " **ℬ ShAdOw#0001** ")
  .setFooter('**--------------------------**')
  if (!params[0]) {
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    message.channel.send(yardim);
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.author.send('asciidoc', `= ${command.help.name} = \n${command.help.description}\nDoğru kullanım: ` + prefix + `${command.help.usage}`);
    }
  }
};

exports.conf = {
 enabled: true,
 guildOnly: true,
 aliases: ['pre-satın-al','pre-s-al'],
 permLevel: 0,
};

exports.help = {
 name: 'premium-satın-al',
 description: '',
 usage: ''
};