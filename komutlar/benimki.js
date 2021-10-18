const Discord = require ("discord.js");
exports.run = (client, message) => {
  
  
  var embed = new Discord.MessageEmbed()
  
  .setColor("RANDOM")
  .setDescription("Yaklaşma !!! :snake:")
  .setImage(`https://media.discordapp.net/attachments/468763884698730511/806629241163743242/Opera_Anlk_Goruntu_2020-09-18_111414_www.youtube.com.png`)
  .setFooter("Yaklaşma!!!")
  
  message.channel.send(embed)
  
}
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  kategori: "",
  permLevel: 0
};
module.exports.help = {
  name: 'benimki',
  description: 'Korana olmak için en iyi yöntem',
  usage: 'korona-ol'
};  