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
  let uye = message.mentions.users.first();
  let miktar = args[0];
  if(!miktar){
    message.reply("Neodnium miktarını belirt!\n`!neodniumekle <miktar>` veya `!neodniumekle <miktar> @etiket`").then(s => s.delete({ timeout: 15000 }));
    return;
  }
  if(isNaN(miktar)){
    message.reply("Neodnium miktarını belirt!\n`!neodniumekle <miktar>` veya `!neodniumekle <miktar> @etiket`").then(s => s.delete({ timeout: 15000 }));
    return;
  }
  if(yetkililer.some(y => y.hesap === message.author.id)){
    if(uye){
      message.channel.send(`${uye} isimli kullanıcıya 💸 \`${miktar}\` neodnium eklendi.`).then(s => s.delete({ timeout: 15000 }));
      db.add(`neodnium_${uye.id}`, +miktar)
      return;  
    }
    if(!uye){
      db.add(`neodnium_${message.author.id}`, +miktar)
      message.channel.send(`💸 Neodniumuna \`${miktar}\` eklendi.`).then(s => s.delete({ timeout: 15000 }));
      return;  
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["neodnium-ekle"],
  permLevel: 0
};

exports.help = { 
  name: 'neodniumekle', 
  description: '',
  usage: '',
};