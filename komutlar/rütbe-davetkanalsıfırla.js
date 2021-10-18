const Discord = require("discord.js");
const Database = require("../Helpers/Database");
const data = require('quick.db');
exports.run = async (client, message, args) => {
	
 
  
  const db = new Database("./Servers/" + message.guild.id, "Settings");//
    if(!message.member.hasPermission("ADMINISTRATOR") && !message.member.hasPermission("MANAGE_GUILD")) return message.reply("Yetkiniz Bulunmamaktadır.")//pythonic
    
    var type = ["Channel"];//
    db.set(`settings`);

    message.reply(`Başarılı.`);


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'davet-kanal-sıfırla',
  description: 'Bot adminlerinin bot üzerinde kod test etmesini sağlar.',
  usage: 'eval <kod>'
};