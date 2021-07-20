  
  const Discord = require('discord.js');
const client = new Discord.Client();
var Manzara = require('cool-images')

exports.run = (client, message) => {
 message.channel.send({embed: {
          "image": {
          url: Manzara.one(600, 800)},
          color: 0xD97634,
            }});};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'manzara'
}; 