const Discord = require('discord.js');
const db = require("quick.db")

exports.run = async(yashinu, message, args) => {
  
  
  message.delete()
  let uye = message.mentions.users.first();
  let miktar = args[1];
  if(!uye){
    message.reply("Elması yollayacağın üyeyi etiketle!").then(s => s.delete({ timeout: 15000 }));
    return;
  }
  if(!miktar){
    message.reply("Elmas miktarını belirt!").then(s => s.delete({ timeout: 15000 }));
    return;
  }
  if(isNaN(miktar)){
    message.reply("Elmas miktarını belirt!").then(s => s.delete({ timeout: 15000 }));
    return;
  }
  if(db.fetch(`elmas_${message.author.id}`) < miktar){
    message.reply("Bu elmasa sahip degilsin!").then(s => s.delete({ timeout: 15000 }));
    return;  
  }
  db.add(`elmas_${uye.id}`, +miktar)
  db.add(`elmas_${message.author.id}`, -miktar)
  const embed = new Discord.MessageEmbed().setDescription(`${uye} isimli kullanıcıya ${miktar} elmas yollandı\n💸 Senin elmasın : ${db.fetch(`elmas_${message.author.id}`)}\n💸 ${uye}nin elması : ${db.fetch(`elmas_${uye.id}`)}`)
  message.channel.send(embed).then(s => s.delete({ timeout: 15000 }));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["elmasyolla"],
  permLevel: 0
};

exports.help = { 
  name: "elmas-yolla", 
  description: '',
  usage: '',
};