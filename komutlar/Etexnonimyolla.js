const Discord = require('discord.js');
const db = require("quick.db")

exports.run = async(yashinu, message, args) => {
 
  
  
  message.delete()
  let uye = message.mentions.users.first();
  let miktar = args[1];
  if(!uye){
    message.reply("Texnoniumu yollayacağın üyeyi etiketle!").then(s => s.delete({ timeout: 15000 }));
    return;
  }
  if(!miktar){
    message.reply("Texnonium miktarını belirt!").then(s => s.delete({ timeout: 15000 }));
    return;
  }
  if(isNaN(miktar)){
    message.reply("Texnonium miktarını belirt!").then(s => s.delete({ timeout: 15000 }));
    return;
  }
  if(db.fetch(`texnonium_${message.author.id}`) < miktar){
    message.reply("Bu texnoniuma sahip degilsin!").then(s => s.delete({ timeout: 15000 }));
    return;  
  }
  db.add(`texnonium_${uye.id}`, +miktar)
  db.add(`texnonium_${message.author.id}`, -miktar)
  const embed = new Discord.MessageEmbed().setDescription(`${uye} isimli kullanıcıya ${miktar} texnonium yollandı\n<:texnonium:813480484570791977> Senin texnoniumun : ${db.fetch(`texnonium_${message.author.id}`)}\n<:texnonium:813480484570791977> ${uye}nin texnoniumu : ${db.fetch(`texnonium_${uye.id}`)}`)
  message.channel.send(embed).then(s => s.delete({ timeout: 15000 }));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["texnoniumyolla"],
  permLevel: 0
};

exports.help = { 
  name: "texnonium-yolla", 
  description: '',
  usage: '',
};