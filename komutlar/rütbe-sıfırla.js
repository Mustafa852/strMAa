const Discord = require("discord.js");
const Database = require("../Helpers/Database");
const data = require('quick.db');

exports.run = async (client, message, args) => {
 
  
  
  if(!message.member.hasPermission("ADMINISTRATOR") && !message.member.hasPermission("MANAGE_GUILD")) return message.reply("Yetkin Yok!");//pythonic
const db = new Database("./Servers/" + message.guild.id, "Rewards");//
    const db2 = new Database("./Servers/" + message.guild.id, "Invites");//
db.set("rewards");//
message.channel.send("Rütbeler Sıfırlandı")//
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'rütbe-sıfırla',
  description: 'Logo Yaparsınız',
  usage: 'm-logo <yazı>'
};

