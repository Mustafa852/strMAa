const Discord = require('discord.js');
const db = require("quick.db")
const ayarlar = require("../ayarlar.json")

exports.run = async(yashinu, message, args) => {
  
  
  
  message.delete();
  let prefix = ayarlar.prefix
  let saniye = 10;
  if(db.get(`${message.author.id}.cooldown.${message.content.split(" ")[0].replace(prefix,"")}`) > Date.now()) {
    return message.reply(`Bu komudu kullanmak için ${Math.floor(((db.get(`${message.author.id}.cooldown.${message.content.split(" ")[0].replace(prefix,"")}`)-Date.now())*100)/10)/10000} saniye beklemelisin!`).then(s => s.delete({ timeout: 10000 }));
  }
  db.set(`${message.author.id}.cooldown.${message.content.split(" ")[0].replace(prefix,"")}`, Date.now()+(saniye*1000))
  let botunrakami = Math.floor(Math.random()*10)
  if(!args[0]){
    message.reply(`Bir rakam girmen gerek.Örneğin : \`*bilkazan 1\` (Bu rakam 1-10 arasında bulunmalıdır)`).then(s => s.delete({ timeout: 15000 }));  
    return;
  }
  if(isNaN(args[0])){
    message.reply(`Bir rakam girmen gerek.Örneğin : \`*bilkazan 1\` (Bu rakam 1-10 arasında bulunmalıdır)`).then(s => s.delete({ timeout: 15000 }));  
    return;
  }  
  if(0 > args[0]){
    message.reply(`Bir rakam girmen gerek.Örneğin : \`*bilkazan 1\` (Bu rakam 1-10 arasında bulunmalıdır)`).then(s => s.delete({ timeout: 15000 }));  
    return;
  }
  if(10 < args[0]){
    message.reply(`Bir rakam girmen gerek.Örneğin : \`*bilkazan 1\` (Bu rakam 1-10 arasında bulunmalıdır)`).then(s => s.delete({ timeout: 15000 }));  
    return;
  }

  let mesaj = message.channel.send(`Bil kazan sorusuna ${args[0]} cevabını verdin.Bakalım doğrumu`)  
  mesaj.then(s => setTimeout(() => {s.edit(`Bil kazan sorusuna ${args[0]} cevabını verdin.Bakalım doğrumu.`)}, 1000))  
  mesaj.then(s => setTimeout(() => {s.edit(`Bil kazan sorusuna ${args[0]} cevabını verdin.Bakalım doğrumu..`)}, 2000))  
  mesaj.then(s => setTimeout(() => {s.edit(`Bil kazan sorusuna ${args[0]} cevabını verdin.Bakalım doğrumu...`)}, 3000))  
  if(args[0]!=botunrakami){
    mesaj.then(s => setTimeout(() => {s.edit(`Malesef kaybettin, Düşündüğüm rakam ${botunrakami} iken sen ${args[0]} dedin.<a:arp:855388529055629323>`)}, 5000))  
    mesaj.then(s => s.delete({ timeout: 50000 }));
    return;  
  }
  if(args[0]==botunrakami){
    db.add(`para_${message.author.id}`, +25000)
    mesaj.then(s => setTimeout(() => {s.edit(`Tebrikler 🎉 , Düşündüğüm rakamı doğru tahmin ederek 25000 kazandın.Düşündüğüm rakam : ${botunrakami} <a:tik:855388519841005569>`)}, 5000))  
    mesaj.then(s => s.delete({ timeout: 50000 }));
    return;  
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["bil-kazan"],
  permLevel: 0
};

exports.help = { 
  name: 'bilkazan', 
  description: '',
  usage: '',
};