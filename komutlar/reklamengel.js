const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {

  if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(` Bu komudu kullanabilmek için "ADMINISTRATOR" yetkisine sahip olman gerek.`)
  if (!args[0]) return message.channel.send(`:no_entry: Reklam Filtresini Ayarlamak İçin \`-reklam aç\` | Kapatmak İstiyorsanız \`-reklam kapat\` Yazabilirsiniz`)
  if (args[0] !== 'aç' && args[0] !== 'kapat') return message.channel.send(`:no_entry: Reklam Filtresini Ayarlamak İçin \`-reklam aç\` | Kapatmak İstiyorsanız \`-reklam  kapat\` Yazabilirsiniz`)

    if (args[0] == 'aç') {
    db.set(`reklamFiltre_${message.guild.id}`, 'acik')
    let i = await db.fetch(`reklamFiltre_${message.guild.id}`)
  message.channel.send(`Reklam Filtresi başarıyla ayarlandı`)   
    
  }

  if (args[0] == 'kapat') {
      
    db.delete(`reklamFiltre_${message.guild.id}`)
    
    message.channel.send(`Reklam Filtresini Kapattım`)
  }
 
};


exports.conf = {
 enabled: true,
 guildOnly: false,
  aliases: ['link-engel'],
 permLevel: 0
};

exports.help = {
 name: 'reklam',
 description: 'reklamm',
 usage: 's$$kanal'
};