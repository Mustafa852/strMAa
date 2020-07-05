const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('| Üzgünüm Bu Komutu Kullana Bilmen İçin `Yönetici` Yetkisine Sahip Olmalısın!')
  let rol = message.mentions.roles.first() || message.guild.roles.get(args[0]) || message.guild.roles.find(rol => rol.name === args[0]);
  if (!rol) return message.channel.send('Alıcagım Rolu Etiketle')

  
   const embed = new Discord.RichEmbed()
     .setDescription(`Herkesten ${rol} adlı rol alındı!`)
        .setColor(rol.hexColor)
   
   
   message.guild.members.forEach(u => {
u.removeRole(rol)
   })
  message.channel.send(embed)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['toplu-rol-al','herkestenrolal'],
    permLevel: 3
}

exports.help = {
    name: 'herkesten-rol-al',
    description: 'Etiketelediğin Rolu Herkesten Alır.',
    usage: 'herkestenrolal rol / rol-ismi'
}