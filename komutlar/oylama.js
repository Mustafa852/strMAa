const Discord = require("discord.js");
const fs = require("fs");
const db = require('quick.db')

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Bu Komutu kullanmanız için `Yönetici` yetkisine sahip olmalısınız.') 
    let yazi = args.slice(0).join(' ')
    if (!yazi) return message.channel.send('Lütfen Oylamada Ne Olacağını Yaz!')
    message.channel.send(`Oylama gönderildi.`)
   let filtre = mes => mes.author.id === message.author.id;    
  message.channel.awaitMessages(filtre, {
          max: 1,
          time: 20000,
          errors: ["time"]
        })
     
   s.edit('🎰 | Kumar oynanıyor..!').then(codeming => {
     
  setTimeout(() => {
    
  s.edit('🎰 | Zarlar atılıyor..!')  
    
    const embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .addField('Heey , Oylamaya Katılmayı Unutma!',`**${yazi}**`)
    .setFooter(`${message.author.tag} Tarafından Yapıldı.`)
    .setTimestamp()
     client.channels.get('722069375544459344').send(embed).then(m => {
   let re = m.react('✅');
   let ra = m.react('❌');
        
    })
    }

exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['oylama-yap', 'oylamayap', 'oylamalar'],
 permLevel: 2,
 kategori: "yetkili"
};

exports.help = {
 name: 'oylama',
 description: 'Bulunduğunuz kanala oylama yapar.',
 usage: 'oylama'
};