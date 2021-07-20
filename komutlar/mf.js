var Jimp = require('jimp');
const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

  var user = message.mentions.users.first() || message.author;
      message.channel.startTyping();
        var user = message.mentions.users.first() || message.author;
        if (!message.guild) user = message.author;

        Jimp.read(user.avatarURL()(), (err, image) => {
            image.resize(295, 295)
            image.gaussian(3)
            Jimp.read("https://cdn.discordapp.com/attachments/750091427148726402/751143609994182742/Untitled-1.png", (err, avatar) => {
                avatar.resize(295, 295)
                image.composite(avatar, 4, 0).write(`./img/wasted/${bot.user.id}-${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.MessageAttachment(`./img/wasted/${bot.user.id}-${user.id}.png`));
                }, 1000);
          message.channel.stopTyping();
            });
        });
    };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['mf'],
  permLevel: 0
};

exports.help = {
  name: 'missionfailed',
  description: 'mp',
  usage: 'missonfailed'
};

//Kod CodeAre'a Aittir!