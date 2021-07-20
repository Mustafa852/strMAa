const Discord = require('discord.js');
const db = require("quick.db")
const ayarlar = require("../ayarlar.json")

exports.run = async(yashinu, message, args) => {
  
  
  
  message.delete()
  let prefix = ayarlar.prefix
  let saniye = 43200;
  if(db.get(`${message.author.id}.cooldown.${message.content.split(" ")[0].replace(prefix,"")}`) > Date.now()) {
    return message.reply(`Bu komudu kullanmak için ${Math.floor(((db.get(`${message.author.id}.cooldown.${message.content.split(" ")[0].replace(prefix,"")}`)-Date.now())*100)/3600000)/100} saat beklemelisin!`).then(s => s.delete({ timeout: 10000 }));
  }
  db.set(`${message.author.id}.cooldown.${message.content.split(" ")[0].replace(prefix,"")}`, Date.now()+(saniye*1000))
  db.add(`para_${message.author.id}`, +100000)
  message.reply("Günlük ödülünüzü alarak hesabınıza 💸 10000 para eklemiş oldunuz!\n💸 Yeni paranız :"+db.get(`para_${message.author.id}`))
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = { 
  name: 'günlük', 
  description: '',
  usage: '',
};