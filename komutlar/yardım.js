const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
var prefix = ayarlar.prefix;
exports.run = (client, message, args) => {
  
    const juke = new Discord.RichEmbed()
    .setColor('GRAY')
    .setAuthor(`CodeWork`, client.user.avatarURL)
.setThumbnail(client.user.avatarURL)
      .addField('** Yetkili [13]**', '`terfi`, `ban`, `erkek`, `kadın`, `kick`, `emojiler`, `dm-hg`, `güvenlik`, `capsengel`, `ping`, `rol-bilgi`, `oylama`, `rol-koruma`')
      .addField('** Yetkili 2 [16]**', '`küfür`, `modlog`, `otorol ayarla`, `sa-as`, `reklam`, `sayaç`, `reklamtara`, `sil`, `kayıt`, `hatırlat`, `yaz`,`seviye-sistemi`,`otorol-ayarla`,`otorol-mesajı`,`otorolkapat`')
      .addField('** Kullanıcı [10]**', '`avatar`, `sunucubilgi`, `ping`, `havadurumu`,`top5`,`yasaklar`,`üyedurum`,`döviz`,`değişiklikler`,`saat`')
      .addField('** Kullanıcı 2 [10]**', '`hata`,`istek`,`youtube`,`servericon`,`say`,`website`,`hesapla`,`korona`,`kısalt`,`başvuru`')    
    .setFooter(``, client.user.avatarURL)
    .setTimestamp()
    message.channel.send(juke).catch()

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};


exports.help = {
    name: 'yardım',
      category: 'Yardım',
      description: 'Yardım kategorilerini gösterir.',
};