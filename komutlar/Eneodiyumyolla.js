const Discord = require('discord.js');
const db = require("quick.db")

exports.run = async(yashinu, message, args) => {
  
  
  
  message.delete()
  let uye = message.mentions.users.first();
  let miktar = args[1];
  if(!uye){
    message.reply("Neodniumu yollayacağın üyeyi etiketle!").then(s => s.delete({ timeout: 15000 }));
    return;
  }
  if(!miktar){
    message.reply("Neodnium miktarını belirt!").then(s => s.delete({ timeout: 15000 }));
    return;
  }
  if(isNaN(miktar)){
    message.reply("Neodnium miktarını belirt!").then(s => s.delete({ timeout: 15000 }));
    return;
  }
  if(db.fetch(`neodnium_${message.author.id}`) < miktar){
    message.reply("Bu neodniuma sahip degilsin!").then(s => s.delete({ timeout: 15000 }));
    return;  
  }
  db.add(`neodnium_${uye.id}`, +miktar)
  db.add(`neodnium_${message.author.id}`, -miktar)
  const embed = new Discord.MessageEmbed().setDescription(`${uye} isimli kullanıcıya ${miktar} neodnium yollandı\n💸 Senin neodniumun : ${db.fetch(`neodnium_${message.author.id}`)}\n💸 ${uye}nin neodniumu : ${db.fetch(`neodnium_${uye.id}`)}`)
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