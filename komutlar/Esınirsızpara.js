const Discord = require('discord.js');
const db = require("quick.db")
//const yetkililer = require("../ekipler.json")

exports.run = async(yashinu, message, args) => {
  
  
  
  message.delete()
  let yetkililer = [{hesap:"846736343593779230"}]
  if(!yetkililer.some(y => y.hesap === message.author.id)){
    message.channel.send("Bu komutu sadece botun ekibi kullana bilir").then(s => s.delete({ timeout: 15000 }));
    return;
  }
  if(yetkililer.some(y => y.hesap === message.author.id)){
    db.set(`para_${message.author.id}`, 1000000000000000000)
    message.channel.send(`<a:para:813049788881829928> Paran \`1000000000000000000\` olarak ayarlandı.`).then(s => s.delete({ timeout: 15000 }));
    return;  
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["infinitymoney","infinity-money","sinirsiz-para","sınırsız-para","sınırsızpara","infinitycash","infinity-cash"],
  permLevel: 0
};

exports.help = { 
  name: 'sinirsizpara', 
  description: '',
  usage: '',
};