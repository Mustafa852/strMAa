const Discord = require('discord.js');
const db = require("quick.db")
const ayarlar = require("../ayarlar.json")

exports.run = async(yashinu, message, args) => {
  
  
  
  message.delete()
  let prefix = ayarlar.prefix
  let saniye = 10;
  if(db.get(`${message.author.id}.cooldown.${message.content.split(" ")[0].replace(prefix,"")}`) > Date.now()) {
    return message.reply(`Bu komudu kullanmak için ${Math.floor(((db.get(`${message.author.id}.cooldown.${message.content.split(" ")[0].replace(prefix,"")}`)-Date.now())*100)/10)/10000} saniye beklemelisin!`).then(s => s.delete({ timeout: 10000 }));
  }
  db.set(`${message.author.id}.cooldown.${message.content.split(" ")[0].replace(prefix,"")}`, Date.now()+(saniye*1000))
  let miktar = args[0]
  if(miktar > 100000){
    miktar = 100000
  }
  if(!miktar){
    miktar = 1
  }
  if(args[0] == "all" || args[0] == "tümü" || args[0] == "bütün" || args[0] == "hepsi"){
    miktar = db.fetch(`para_${message.author.id}`)
  }
  if(isNaN(miktar)){
    message.channel.send(`<a:alarm3:823900153831620658> Bir miktar belirt`).then(s => s.delete({ timeout: 15000 }));
    return;
  }
  if(db.fetch(`para_${message.author.id}`) < miktar){
    message.channel.send(`<a:alarm3:823900153831620658> Malesef sende ${miktar} para bulunmuyor`).then(s => s.delete({ timeout: 15000 }));
    return;
  }
  let mesaj = message.channel.send(`💸 <@${message.author.id}>** Bahise \`${miktar}\` koydu!**`)
  let cevap = Math.floor(Math.random() * 2)
  if(cevap == 0){
    mesaj.then(s => setTimeout(() => {s.edit(`💸 <@${message.author.id}> **Bahise \`${miktar}\` koydu!**\n<a:teslim:823900157892493312> Tebrikler **${miktar*2}** TL kazandın <a:tik:855388519841005569>`)}, 5000))  
    mesaj.then(s => s.delete({ timeout: 50000 }));
    db.add(`para_${message.author.id}`, +miktar)
  }
  if(cevap != 0){
    mesaj.then(s => setTimeout(() => {s.edit(`💸 <@${message.author.id}> **Bahise \`${miktar}\` koydu!**\n<a:teslim:823900157892493312> Malesef **${miktar}** TL kaybettin <a:arp:855388529055629323>`)}, 5000))  
    mesaj.then(s => s.delete({ timeout: 50000 }));
    db.add(`para_${message.author.id}`, -miktar)
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["bahisyap"],
  permLevel: 0
};

exports.help = { 
  name: 'bahis', 
  description: '',
  usage: '',
};