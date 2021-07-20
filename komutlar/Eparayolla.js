const Discord = require('discord.js');
const db = require("quick.db")

exports.run = async(yashinu, message, args) => {
  
  
  
  message.delete()
  let uye = message.mentions.users.first();
  let miktar = args[1];
  if(!uye){
    message.reply("Parayı yollayacağın üyeyi etiketle!").then(s => s.delete({ timeout: 15000 }));
    return;
  }
  if(!miktar){
    message.reply("Para miktarını belirt!").then(s => s.delete({ timeout: 15000 }));
    return;
  }
  if(isNaN(miktar)){
    message.reply("Para miktarını belirt!").then(s => s.delete({ timeout: 15000 }));
    return;
  }
  if(db.fetch(`para_${message.author.id}`) < miktar){
    message.reply("Bu paraya sahip degilsin!").then(s => s.delete({ timeout: 15000 }));
    return;  
  }
  db.add(`para_${uye.id}`, +miktar)
  db.add(`para_${message.author.id}`, -miktar)
  const embed = new Discord.MessageEmbed().setDescription(`${uye} isimli kullanıcıya ${miktar} para yollandı\n<a:para:813049788881829928> Senin paran : ${db.fetch(`para_${message.author.id}`)}\n<a:para:813049788881829928> ${uye}nin parası : ${db.fetch(`para_${uye.id}`)}`)
  message.channel.send(embed).then(s => s.delete({ timeout: 15000 }));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["parayolla","para-yolla","transferet","transfer-et"],
  permLevel: 0
};

exports.help = { 
  name: 'transfer', 
  description: '',
  usage: '',
};