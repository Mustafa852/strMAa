const Discord = require ("discord.js");

exports.run = (client, message) => {
const mhelp = new Discord.RichEmbed()
.setColor("#5ab1bb")
.setTitle("Upper Moderasyon Sistemi")
.setDescription("Prefixim: /")
.setThumbnail("https://cdn.discordapp.com/attachments/718563633009000531/731477372674768916/unnamed.png")
.addField("<a:ayars:731479176904704060> ban <@kullanıcı> <sebep>", "» Kullanıcıyı Sunucunuzdan Yasaklar!")
.addField("<a:ayars:731479176904704060> sil-üye <@kullanıcı> <1-100 Arası Sayı>", "» İstediğiniz Kullanıcının Mesajını Siler!")
.addField("<a:ayars:731479176904704060> modlog <#kanal>" , "» Mod Log Kanalını Ayarlarsınız!")
.addField("<a:ayars:731479176904704060> kick <@kullanıcı> <sebep>", "» Kullanıcıyı Sunucudan Atar!")
.addField("<a:ayars:731479176904704060> mute <@kullanıcı> <sebep>", "» Kullanıcıyı Susturur!")
.addField("<a:ayars:731479176904704060> sürelimute <@kullanıcı> <süre> <sebep>" , "» Kullanıcıyı Süreli Susturur!")
.addField("<a:ayars:731479176904704060> sunucudetay", "» Sunucu Hakkında Detayları Gösterir!")
.addField("<a:ayars:731479176904704060> yavaşmod <0-180 Arası Süre>", "» Yavaş Modu Açar!")
.addField("<a:ayars:731479176904704060> sa-as <aç-kapat>", "» Sa-As Sistemini Aktif Eder!")
.addField("<a:ayars:731479176904704060> unmute <member>" , "» Unmutes a member")
.addField("<a:ayars:731479176904704060> kullanıcıdetay <@kullanıcı>" , "» Kullanıcı Detaylarını Gösterir!")
.addField("<a:ayars:731479176904704060> uyar <@kullanıcı> <sebep>" , `» Kullanıcıyı Uyarır!

<a:zilbe:731478436731682816> » [Davet Et](Yakında) | [Oyver](Yakında) | [Support Server](https://discord.gg/Z2zuGCR) `)
message.channel.sendEmbed(mhelp)

}; 
exports.conf = {
    enabled: true, 
    guildOnly: false, 
    aliases: ['mod-help' , 'mod'],
    permLevel: 0 
  };
 
  exports.help = {
    name: 'moderasyon', 
    description: 'MEE6 HELP MENU',
    usage: 'help'
  };