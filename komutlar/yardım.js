const Discord = require ("discord.js");

exports.run = (client, message) => {
const mhelp = new Discord.RichEmbed()
.setColor("#5ab1bb")
.setTitle("Upper Yardım Menüsü")
.addField("Upper Bot Hakkında!", `Upper Bot Sunucunuzu Daha Kaliteli Hale Getirmek İçin Üretilmiş Bir Bottur. Sizde Bu Bottan Faydanlanmak İçin Aşşağıdaki Linkten Davet Edebilirsiniz! Upper Bot Sadece Yetkili, Koruma Ve Müzik Komutlarını İçermektedir. Herhangi Bir Sorun Oluşursa **/canlıdestek** Yazarak Canlı Destek Ekibimizle Görüşebilirsiniz!\n\n**Sponsor Hakkında!**\nSponsor İsim: Sponsor Aranıyor!\nSponsor Website: Sponsor Aranıyor!\nSponsor Discord: Sponsor Aranıyor!`)
.setThumbnail("https://cdn.discordapp.com/attachments/718563633009000531/731477372674768916/unnamed.png")
.addField("<a:ayars:731479176904704060> /moderasyon", "» Moderasyon Komutlarını Listeler!")
.addField("<a:ayars:731479176904704060> /koruma","» Koruma Komutlarını Listeler!")
.addField("<a:ayars:731479176904704060> /müzik",`» Müzik Komutlarını Listeler!

<a:zilbe:731478436731682816> » [Davet Et](Yakında) | [Oyver](Yakında) | [Support Server](https://discord.gg/Z2zuGCR) `)

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