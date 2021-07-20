const Discord = require('discord.js');
const db = require("quick.db")

exports.run = async(client, message, args) => {
 
  
  
  message.delete()
  if(!db.fetch(`elmas_${message.author.id}`)){
    db.set(`elmas_${message.author.id}`, 0)
  }
  if(!db.fetch(`altin_${message.author.id}`)){
    db.set(`altin_${message.author.id}`, 0)
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
  if(db.fetch(`altin_${message.author.id}`) < rakam*10){
    message.channel.send("Yeterli altın bulunamadı!").then(s => s.delete({ timeout: 15000 }));
    return;
  }
  if(db.fetch(`altin_${message.author.id}`) >= rakam*10){
    db.add(`elmas_${message.author.id}`, +rakam)
    db.add(`altin_${message.author.id}`, -(rakam*10))
    message.channel.send(new Discord.MessageEmbed().setDescription(`Elmasınız güncellendi! \n💸 **Elmasınız :** ${db.fetch(`elmas_${message.author.id}`)}\n💸 **Altınınız :** ${db.fetch(`altin_${message.author.id}`)}`)).then(s => s.delete({ timeout: 15000 }));
    client.channels.cache.get("814545762696167464").send(new Discord.MessageEmbed().setDescription(`[<@${message.author.id}> isimli kullanıcı 💸 ${rakam} elmas satın aldı](https://discordapp.com/channels/${message.guild.id}/${message.channel.id})`))
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["elmas-al"],
  permLevel: 0
};

exports.help = { 
  name: 'elmasal', 
  description: '',
  usage: '',
};