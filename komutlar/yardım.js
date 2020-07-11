const Discord = require ("discord.js");

exports.run = (client, message) => {
const mhelp = new Discord.RichEmbed()
.setColor("#5ab1bb")
.setTitle("Upper Yardım Sistemi")
.setThumbnail("https://cdn.discordapp.com/attachments/718563633009000531/731477372674768916/unnamed.png")
.addField("/moderasyon", "Moderasyon Komutlarını Listeler!")
.addField("/koruma","Koruma Komutlarını Listeler!")
.addField("/kullanıcı", "Kullanıcı Komutlarını Listeler!")
.addField("» Linkler",`
      [Davet Et](Yakında) | [Oyver](Yakında) | [Support Server](https://discord.gg/Z2zuGCR) `)
message.channel.sendEmbed(mhelp)

}; 
exports.conf = {
    enabled: true, 
    guildOnly: false, 
    aliases: ['help'], 
    permLevel: 0 
  };
 
  exports.help = {
    name: 'yardım', 
    description: 'MEE6 HELP MENU',
    usage: 'help'
  };