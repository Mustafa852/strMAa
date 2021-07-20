const Discord = require('discord.js');
const data = require('quick.db');

exports.run = async (client, message, args) => {

let açıkmı = await data.fetch(`premium.${message.guild.id}`)
  if(açıkmı) {

// premium açıksa yapılack işlemler buraya

} else { return message.channel.send(`${message.author}, bu komut premium bir komuttur. Bu sunucu da premium bulunmamakta.`) }
 

  
  
  message.channel.send(new Discord.MessageEmbed()
.setColor('#00001')
.setTitle('Strom')
.setDescription(`**Bota Oy Vermek için** [TIKLA](https://top.gg/bot/756883309270663229/vote)
**Bota yorum atıp 5 yıldız vermeyi unutma :)** [TIKLA](https://top.gg/bot/756883309270663229)

**${client.user.username} Sizlere hizmet vermekten şeref duyar..**

İçerikler de birden fazla tema var.

\`!j4j-tema\` 
**Hazır __join 4 join__ sunucu teması yollar**

\`!public-tema\` 
**Hazır karışık __public__ sunucu teması yollar**

\`!oyun-tema\` 
**Hazır __oyun__ sunucu teması yollar**

\`!gif-tema\` 
**Hazır gif share sunucu teması yollar**

\`!sunucu-kur\` 
**Klasik oyun & sohbet sunucusu kurar**

\`\`\`Birini seç\`\`\``)
.setThumbnail(''));

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sunucu-tema'],
  permLevel: 0
}

exports.help = {
  name: 'sunucu-tema-sistem'
};