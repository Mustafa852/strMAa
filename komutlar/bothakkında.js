const Strom = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
const talkedRecently = new Set();
let botid = ('756883309270663229') 
 
exports.run = async(client, message, args) => { 
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "!";

    const embed = new Strom.MessageEmbed()
        .setAuthor(`${client.user.username} `, client.user.displayAvatarURL({dynamic: true}))
        .setColor('#d02090')
       .setTitle(` **Strom Bot Yardım Menüsüne Hoşgeldiniz** `)
        .setDescription(`
**»   📢 ${prefix}davet __Botu Davet Edebilirsiniz!__**
**»   📢 ${prefix}istatistik __Yazarak Botun İstatistiklerini Göre Bilirsiniz.__**
**»   📢 ${prefix}prefix __Yazarak Botun Prefixini Değiştirebilirsiniz.__**
**»   📢 ${prefix}prefix-sıfırla __Yazarak Ayarladığınız Prefixi Sıfırlayabilirsiniz.__**
**»   📢 ${prefix}sunucutanıt__sunucunuzu tanıtırsınız.__**
`)
        .setImage(``)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))
    return  message.channel.send(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bothakkında',"hakkında"],
  permLevel: 0,
};

exports.help = {
  name: 'bot-hakkında',
  description: 'a!davet-sistemi Menüsü',
  usage: 'yardım'
};