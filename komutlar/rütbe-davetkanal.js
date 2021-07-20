const Discord = require("discord.js");
const Database = require("../Helpers/Database");
const data = require('quick.db');
exports.run = async (client, message, args) => {
	let açıkmı = await data.fetch(`premium.${message.guild.id}`)
  if(açıkmı) {

// premium açıksa yapılack işlemler buraya

} else { return message.channel.send(`${message.author}, bu komut premium bir komuttur. Bu sunucu da premium bulunmamakta.`) }
   
  
  const db = new Database("./Servers/" + message.guild.id, "Settings");//
    if(!message.member.hasPermission("ADMINISTRATOR") && !message.member.hasPermission("MANAGE_GUILD")) return message.reply("Yetkiniz Bulunmamaktadır.")//
        let kanal = message.mentions.channels.first()//
    if(kanal){
    var type = ["Channel"];
    db.set(`settings.${type}`, kanal.id);

    message.reply(`Başarılı.`);


}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'davet-kanal',
  description: 'Bot adminlerinin bot üzerinde kod test etmesini sağlar.',
  usage: 'eval <kod>'
};