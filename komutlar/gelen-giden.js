const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
 
exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  
  const gelgit = message.mentions.channels.first()
  if(!gelgit) {
   message.channel.send(`Sayaç kanalını etiketlemelisin.`)
  }
  db.set(`ggk_${message.guild.id}`, gelgit.name)
  message.channel.send(`Gelen Giden Kanalı ${gelgit} olarak ayarlandı.`)
}
 
exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: ['sayac'],
        permLevel: 3
}
 
exports.help = {
        name: 'gelen-giden',
        description: 'Sayacı ayarlar.',
        usage: 'gelen-giden <#kanal> / sıfırla'
}