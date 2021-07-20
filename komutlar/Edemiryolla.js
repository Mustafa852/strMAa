const Discord = require('discord.js');
const db = require("quick.db")

exports.run = async(yashinu, message, args) => {
  
  
  
  message.delete()
  let uye = message.mentions.users.first();
  let miktar = args[1];
  if(!uye){
    message.reply("Demiri yollayacağın üyeyi etiketle!").then(s => s.delete({ timeout: 15000 }));
    return;
  }
  if(!miktar){
    message.reply("Demir miktarını belirt!").then(s => s.delete({ timeout: 15000 }));
    return;
  }
  if(isNaN(miktar)){
    message.reply("Demir miktarını belirt!").then(s => s.delete({ timeout: 15000 }));
    return;
  }
  if(db.fetch(`demir_${message.author.id}`) < miktar){
    message.reply("Bu demire sahip degilsin!").then(s => s.delete({ timeout: 15000 }));
    return;  
  }
  db.add(`demir_${uye.id}`, +miktar)
  db.add(`demir_${message.author.id}`, -miktar)
  const embed = new Discord.MessageEmbed().setDescription(`${uye} isimli kullanıcıya ${miktar} demir yollandı\n💸 Senin demirin : ${db.fetch(`demir_${message.author.id}`)}\n💸 ${uye}nin demiri : ${db.fetch(`demir_${uye.id}`)}`)
  message.channel.send(embed).then(s => s.delete({ timeout: 15000 }));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["demiryolla"],
  permLevel: 0
};

exports.help = { 
  name: "demir-yolla", 
  description: '',
  usage: '',
};