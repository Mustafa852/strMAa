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
    message.reply("Titanyum miktarını belirt!\n`!titanyumekle <miktar>` veya `!titanyumekle <miktar> @etiket`").then(s => s.delete({ timeout: 15000 }));
    return;
  }
  if(isNaN(miktar)){
    message.reply("Titanyum miktarını belirt!\n`!titanyumekle <miktar>` veya `!titanyumekle <miktar> @etiket`").then(s => s.delete({ timeout: 15000 }));
    return;
  }
  if(yetkililer.some(y => y.hesap === message.author.id)){
    if(uye){
      message.channel.send(`${uye} isimli kullanıcıya <a:B_Kristal:813086838067429406> \`${miktar}\` titanyum eklendi.`).then(s => s.delete({ timeout: 15000 }));
      db.add(`titanyum_${uye.id}`, +miktar)
      return;  
    }
    if(!uye){
      db.add(`titanyum_${message.author.id}`, +miktar)
      message.channel.send(`<a:B_Kristal:813086838067429406> Titanyumuna \`${miktar}\` eklendi.`).then(s => s.delete({ timeout: 15000 }));
      return;  
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["titanyum-ekle"],
  permLevel: 0
};

exports.help = { 
  name: 'titanyumekle', 
  description: '',
  usage: '',
};