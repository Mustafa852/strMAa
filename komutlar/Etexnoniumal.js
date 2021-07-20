const Discord = require('discord.js');
const db = require("quick.db")

exports.run = async(client, message, args) => {
 
  
  
  message.delete()
  if(!db.fetch(`neodnium_${message.author.id}`)){
    db.set(`neodnium_${message.author.id}`, 0)
  }
  if(!db.fetch(`texnonium_${message.author.id}`)){
    db.set(`texnonium_${message.author.id}`, 0)
  }
  let rakam = args[0]
  if(!rakam){
    message.channel.send("Bir rakam belirt!").then(s => s.delete({ timeout: 15000 }));
    return;
  }
  if(isNaN(rakam)){
    message.channel.send("Bir rakam belirt!").then(s => s.delete({ timeout: 15000 }));
    return;
  }
  if(db.fetch(`neodnium_${message.author.id}`) < rakam*10){
    message.channel.send("Yeterli neodnium bulunamadı!").then(s => s.delete({ timeout: 15000 }));
    return;
  }
  if(db.fetch(`neodnium_${message.author.id}`) >= rakam*10){
    db.add(`texnonium_${message.author.id}`, +rakam)
    db.add(`neodnium_${message.author.id}`, -(rakam*10))
    message.channel.send(new Discord.MessageEmbed().setDescription(`Texnoniumunuz güncellendi! \n<:texnonium:813480484570791977> **Texnoniumunuz :** ${db.fetch(`texnonium_${message.author.id}`)}\n<a:tvhypesquad:800045471573082182> **Neodniumunuz :** ${db.fetch(`neodnium_${message.author.id}`)}`)).then(s => s.delete({ timeout: 15000 }));
    client.channels.cache.get("814545762696167464").send(new Discord.MessageEmbed().setDescription(`[<@${message.author.id}> isimli kullanıcı <:texnonium:813480484570791977> ${rakam} texnonium satın aldı](https://discordapp.com/channels/${message.guild.id}/${message.channel.id})`))
  } 
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["texnonium-al"],
  permLevel: 0
};

exports.help = { 
  name: 'texnoniumal', 
  description: '',
  usage: '',
};