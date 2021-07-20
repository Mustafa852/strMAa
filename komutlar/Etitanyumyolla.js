const Discord = require('discord.js');
const db = require("quick.db")

exports.run = async(yashinu, message, args) => {
  
  
  
  message.delete()
  let uye = message.mentions.users.first();
  let miktar = args[1];
  if(!uye){
    message.reply("Titanyumu yollayacağın üyeyi etiketle!").then(s => s.delete({ timeout: 15000 }));
    return;
  }
  if(!miktar){
    message.reply("Titanyum miktarını belirt!").then(s => s.delete({ timeout: 15000 }));
    return;
  }
  if(isNaN(miktar)){
    message.reply("Titanyum miktarını belirt!").then(s => s.delete({ timeout: 15000 }));
    return;
  }
  if(db.fetch(`titanyum_${message.author.id}`) < miktar){
    message.reply("Bu titanyuma sahip degilsin!").then(s => s.delete({ timeout: 15000 }));
    return;  
  }
  db.add(`titanyum_${uye.id}`, +miktar)
  db.add(`titanyum_${message.author.id}`, -miktar)
  const embed = new Discord.MessageEmbed().setDescription(`${uye} isimli kullanıcıya ${miktar} titanyum yollandı\n<a:B_Kristal:813086838067429406> Senin titanyumun : ${db.fetch(`titanyum_${message.author.id}`)}\n<a:B_Kristal:813086838067429406> ${uye}nin titanyumu : ${db.fetch(`titanyum_${uye.id}`)}`)
  message.channel.send(embed).then(s => s.delete({ timeout: 15000 }));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["titanyumyolla"],
  permLevel: 0
};

exports.help = { 
  name: "titanyum-yolla", 
  description: '',
  usage: '',
};