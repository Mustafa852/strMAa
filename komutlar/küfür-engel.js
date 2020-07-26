const db = require('quick.db')
const Discord = require('discord.js')

exports.run = async (client, message, args) => {
  if (!args[0]) return message.channel.send('Aç yada Kapat yazmalısın! Örnek: !küfürengel aç')
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('`SUNUCUYU_YÖNET` yetkisine sahip olmalısın!')
  
  if (args[0] == 'aç') {
    db.set(`kufur_${message.guild.id}`, 'Açık').then(i => {
      message.channel.send("Küfür engelleme sistemi başarıyla, aktif edildi.Bundan sonra küfürler engellenecek!")
    })
  }
  if (args[0] == 'kapat') {
    db.set(`kufur_${message.guild.id}`, 'Kapalı').then(i => {
      message.channel.send('Bu sunucu için, küfür engelleme sistemi kapalı oldu.Bundan sonra küfürler engellenmeyecek.')
    })
  }

}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'küfürengel',
  description: 'küfürengel',
  usage: 'küfürengel'
};