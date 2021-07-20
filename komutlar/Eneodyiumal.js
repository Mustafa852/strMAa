const Discord = require('discord.js');
const db = require("quick.db")

exports.run = async(client, message, args) => {
  
  
  
  message.delete()
  if(!db.fetch(`neodnium_${message.author.id}`)){
    db.set(`neodnium_${message.author.id}`, 0)
  }
  if(!db.fetch(`titanyum_${message.author.id}`)){
    db.set(`titanyum_${message.author.id}`, 0)
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
  if(db.fetch(`titanyum_${message.author.id}`) < rakam*10){
    message.channel.send("Yeterli titanyum bulunamadı!").then(s => s.delete({ timeout: 15000 }));
    return;
  }
  if(db.fetch(`titanyum_${message.author.id}`) >= rakam*10){
    db.add(`neodnium_${message.author.id}`, +rakam)
    db.add(`titanyum_${message.author.id}`, -(rakam*10))
    message.channel.send(new Discord.MessageEmbed().setDescription(`Neodniumunuz güncellendi! \n💸 **Neodniumunuz :** ${db.fetch(`neodnium_${message.author.id}`)}\n💸 **Titanyumunuz :** ${db.fetch(`titanyum_${message.author.id}`)}`)).then(s => s.delete({ timeout: 15000 }));
    client.channels.cache.get("814545762696167464").send(new Discord.MessageEmbed().setDescription(`[<@${message.author.id}> isimli kullanıcı 💸 ${rakam} neodnium satın aldı](https://discordapp.com/channels/${message.guild.id}/${message.channel.id})`))
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["neodnium-al"],
  permLevel: 0
};

exports.help = { 
  name: 'neodniumal', 
  description: '',
  usage: '',
};