const Discord = require('discord.js');

exports.run = async (client, message, args) => {
const darknesyoutube = new Discord.RichEmbed();
darknesyoutube.setDescription("Tagınızı Yazın")

message.channel.send(darknesyoutube)
}
exports.conf = {
enabled: true,
guildOnly: false,
aliases: ['site'],
permLevel: 0
}

exports.help = {
name: 'tag',

}
 