const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    try {
        await message.channel.send(`Komutlar: \n${client.komutlar.map(props => `\`${props.help.name}\``).join(" | ")}`);
    } catch (e) {
        throw e;
    }
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["komutlar"],
  permLevel: 0
};

module.exports.help = {
  name: 'komutlar',
  description: 'Botta bulunan tüm komutları gösterir',
  usage: 'komutlar'
};