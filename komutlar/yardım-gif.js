const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require('moment');
var ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args, msg) => {

    const embed = new Discord.MessageEmbed()
    
    .setColor('BLACK')
    
    .addField(`Strom Gif Bot Yardım Menüsü!`,
              
    `
     !**man-gif** Rastgele Erkek Gifi Atar!
     !**woman-gif** Rastgele Kadın Gifi Atar!
     !**couple-gif** Rastgele Sevgili Gifi Atar!
     !**baby-gif** Rastgele Bebek Gifi Atar!
     !**animal-gif** Rastgele Hayvan Gifi Atar!

  `)
    
     message.channel.send({embed});
    }
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yardım-gif','gif'],
  permLevel: 0
};

exports.help = {
  name: 'yardım-gif',
  description: '',
  usage: 'yardım'
};