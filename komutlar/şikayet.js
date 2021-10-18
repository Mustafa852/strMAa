const Discord = require('discord.js');
exports.run = function(client, message, args) {
    let type = args.slice(0).join(' ');
    if (type.length < 1) return message.channel.send(
new Discord.MessageEmbed()
.setDescription('Kullanım: s!sikayet <Şikayet>'));
const embed = new Discord.MessageEmbed()
.setColor('RANDOM')
.setDescription('Şikayetiniz Bildirildi!')
message.channel.send(embed)
const embed2 = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`**${message.author.tag}** adlı kullanıcının Şikayeti:`)
.addField(`Kulanıcı Bilgileri`, `Kullanıcı ID: ${message.author.id}\nKullanıcı Adı: ${message.author.username}\nKullanıcı Tagı: ${message.author.discriminator}`)
.addField("Şikayet", type)
.setThumbnail(message.author.avatarURL())
client.channels.cache.get('833300996032823308').send(embed2); // Kanal ID 
};
exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ["report","rep","şikayet"],
  permLevel: 0 
};
exports.help = {
  name: 'sikayet',
  description: 'Şikayet de bulunursunuz.',
  usage: 'sikayet <Şikayet>'
};