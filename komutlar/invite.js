const Discord = require("discord.js");
const config = require("../config.json");
const db = require("quick.db");
exports.run = async (client, message, args) => {
    let user = message.mentions.users.first() || message.author;
    let inv =  db.fetch(`inv.${user.id}.total`) || 0;  
    message.channel.send(new Discord.MessageEmbed().addField("Toplam Davetin:",inv)) 
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["davetlerim"],
  permLevel: 0
};

exports.help = { 
  name: 'invite', 
  description: "Şapka Verir.",
  usage: "invite"
}
