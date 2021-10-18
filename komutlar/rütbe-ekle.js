const Discord = require("discord.js");
const Database = require("../Helpers/Database");
const data = require('quick.db');
exports.run = async (client, message, args) => {

  
  
  if(!message.member.hasPermission("ADMINISTRATOR") && !message.member.hasPermission("MANAGE_GUILD")) return message.reply("Yetkin Yok!");//

    
    var roleId = message.mentions.roles.first(), targetInvite = Number(args[1]);
  
    if(isNaN(targetInvite)) return message.reply("Bir Numara Gir");//

    const db = new Database("./Servers/" + message.guild.id, "Rewards");//

    var rewards = db.get("rewards") || [];//
    rewards.push({
        Id: roleId.id,
        Invite: targetInvite
    });

    db.set("rewards", rewards);
const embed = new Discord.MessageEmbed()
.setDescription(`**${roleId} Rolünü Ulaşabilmek İçin Toplam ${targetInvite} Davet Yapmaları Gerekmektedir.**`)//
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'rütbe-ekle',
  description: 'Logo Yaparsınız',
  usage: 'm-logo <yazı>'
};
