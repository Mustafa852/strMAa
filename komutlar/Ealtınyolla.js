const Discord = require('discord.js');
const db = require("quick.db")

exports.run = async(yashinu, message, args) => {
 
  
  
  message.delete()
  let uye = message.mentions.users.first();
  let miktar = args[1];
  if(!uye){
    message.reply("Altını yollayacağın üyeyi etiketle!").then(s => s.delete({ timeout: 15000 }));
    return;
  }
  if(!miktar){
    message.reply("Altın miktarını belirt!").then(s => s.delete({ timeout: 15000 }));
    return;
  }
  if(isNaN(miktar)){
    message.reply("Altın miktarını belirt!").then(s => s.delete({ timeout: 15000 }));
    return;
  }
  if(db.fetch(`altin_${message.author.id}`) < miktar){
    message.reply("Bu altına sahip degilsin!").then(s => s.delete({ timeout: 15000 }));
    return;  
  }
  db.add(`altin_${uye.id}`, +miktar)
  db.add(`altin_${message.author.id}`, -miktar)
  const embed = new Discord.MessageEmbed().setDescription(`${uye} isimli kullanıcıya ${miktar} altın yollandı\n💸 Senin altının : ${db.fetch(`altin_${message.author.id}`)}\n💸 ${uye}nin altını : ${db.fetch(`altin_${uye.id}`)}`)
  message.channel.send(embed).then(s => s.delete({ timeout: 15000 }));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["altinyolla","altınyolla","altın-yolla"],
  permLevel: 0
};

exports.help = { 
  name: "altin-yolla", 
  description: '',
  usage: '',
};