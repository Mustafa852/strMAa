const Strom = require("discord.js");


exports.run = async (client, message, args) => {

  
const exampleEmbed = new Strom.MessageEmbed()
  .addField(`Pingim` ,`${client.ws.ping}ms`)
  message.channel.send(exampleEmbed)
  
  
}
  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Ping',
  usage: 'ping'
}; 