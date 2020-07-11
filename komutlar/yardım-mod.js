const Discord = require ("discord.js");

exports.run = (client, message) => {
const mhelp = new Discord.RichEmbed()
.setColor("#5ab1bb")
.setTitle("Upper Moderasyon Sistemi")
.setThumbnail("https://cdn.discordapp.com/attachments/718563633009000531/731473630323671080/upper_bots.jpg")
.addField("/ban [@kullanıcı] (sebep)", "Kullanıcıyı Sunucunuzdan Yasaklar!")
.addField("/sil-üye [@kullanıcı] (1-100 Arası Sayı)", "İstediğiniz Kullanıcının Mesajını Siler!")
.addField("/modlog [#kanal]" , "Mod Log Kanalını Ayarlarsınız!")
.addField("/kick [@kullanıcı] (sebep)", "Kullanıcıyı Sunucudan Atar!")
.addField("/mute [@kullanıcı] (sebep)", "Kullanıcıyı Susturur!")
.addField("/sürelimute [@kullanıcı] [süre] (sebep)" , "Kullanıcıyı Süreli Susturur!")
.addField("/sunucudetay", "Sunucu Hakkında Detayları Gösterir!")
.addField("/server-info", "--")
.addField("/yavaşmod (0-180 Arası Süre) (optional off)", "Yavaş Modu Açar!")
.addField("/sa-as (aç-kapat)", "Sa-As Sistemini Aktif Eder!")
.addField("/unmute [member]" , "Unmutes a member")
.addField("/kullanıcıdetay [@kullanıcı]" , "Kullanıcı Detaylarını Gösterir!")
.addField("/uyar [@kullanıcı] (sebep)" , "Kullanıcıyı Uyarır!")
message.channel.sendEmbed(mhelp)

}; 
exports.conf = {
    enabled: true, 
    guildOnly: false, 
    aliases: ['help'], 
    permLevel: 0 
  };
 
  exports.help = {
    name: 'moderasyon', 
    description: 'MEE6 HELP MENU',
    usage: 'help'
  };