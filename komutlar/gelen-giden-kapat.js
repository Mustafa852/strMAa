const Discord = require('discord.js')
const db = require('quick.db')
const fs = require('fs')

exports.run = (client, message, params, args, member) => {
  let gelengiden = JSON.parse(fs.readFileSync('./ayarlar/gelengiden.json', 'utf8'));
  var codeshare = message.mentions.channels.first()
  
      if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`**Bu komut için yeterli iznin yok!**`)
    db.delete(`hgbb_${message.guild.id}`, codeshare)
    message.channel.send("Kapatıldı!")

}  
exports.conf = {
  enable: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
}
exports.help = {
  name: "gelen-giden-kapat"
}