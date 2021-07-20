const Discord = require("discord.js");
const Database = require("../Helpers/Database");
const data = require('quick.db');

exports.run = async (client, message, args) => {
  let açıkmı = await data.fetch(`premium.${message.guild.id}`)
  if(açıkmı) {

// premium açıksa yapılack işlemler buraya

} else { return message.channel.send(`${message.author}, bu komut premium bir komuttur. Bu sunucu da premium bulunmamakta.`) }
 
  
  if(!message.member.hasPermission("ADMINISTRATOR") && !message.member.hasPermission("MANAGE_GUILD")) return message.reply("Yetkin Yok!");//

    const db2 = new Database("./Servers/" + message.guild.id, "Invites");//

db2.set("invites")
message.channel.send("Tüm Kullanıcıların Davetleri Sıfırlandı")//
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'davetleri-sıfırla',
  description: '',
  usage: ''
};

