const Discord = require('discord.js')
const db = require("quick.db");
const database = require('quick.db');


exports.run = async(client, message, args) => {

   var başarılı = ['**İŞTE BU!** <a:tik1:823900091143159828>', '**SÜPER!** <a:tik1:823900091143159828>', '**NASIL YAPTIN BUNU?!** <a:tik1:823900091143159828>', '**MÜKEMMEL!** <a:tik1:823900091143159828>', '**SEVDİM BUNU!** <a:tik1:823900091143159828>', '**ŞİMDİ OLDU!** <a:tik1:823900091143159828>'];
   var x = başarılı[Math.floor(Math.random() * başarılı.length)];

   var başarısız = ['**TÜH!** <a:nope:819837486741192784>', '**OLMADI BU!** <a:alarm3:823900153831620658>', '**HAY AKSİ!** <a:alarm3:823900153831620658>', '**HADİ ORADAN!** <a:alarm3:823900153831620658>', '**OLMADI YA!** <a:alarm3:823900153831620658>', '**BÖYLE OLMAZ?!** <a:alarm3:823900153831620658>', '**HADİ YA!** <a:alarm3:823900153831620658>'];
   var x2 = başarısız[Math.floor(Math.random() * başarısız.length)];
  
if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply(`**!jail-kanal ayarla/sıfırla** isimli komutu kullanabilmek için \`SUNUCUYU YÖNET\` yetkisine sahip olman gerekiyor.`)
if (!args[0]) return message.reply(`Sistemi kullanabilmek için, !jail-kanal ayarla/sıfırla #kanal yazmalısın.`)
   
  
  if (args[0] == 'ayarla') {
  
  let kanal = message.mentions.channels.first() || message.guild.channels.find(c => c.name === args[1].join('-'))
  if (!kanal) return message.channel.send(x2 + ` Bir kanal etiketle.`)
  
  db.set(`jailkanal_${message.guild.id}`, kanal.id)
  message.channel.send(x + ` Jail logunun tutulacağı kanal ${kanal} olarak ayarlandı.`)
  } 
  

  if (args[0] == 'sıfırla') {
    db.delete(`jailkanal_${message.guild.id}`)
    message.channel.send(x + ` Jail logunun tutulduğu kanal başarıyla sıfırlandı.`)
  }
  
  
};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['jailkanal'],
 permLevel: 0
};

exports.help = {
 name: 'jail-kanal',
 description: 'Birisi jaile atılınca hangi kanala mesaj atılacağını ayarlarsınız.',
 usage: 'jail-kanal ayarla/sıfırla #kanal'
}