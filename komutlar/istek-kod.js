const Discord = require('discord.js');

exports.run = async(client, message, args) => {
    let type = args.slice(0).join(' ');
    if (type.length < 1) return message.channel.send('Doğru Kullanım : -istek sayaç komutu')
message.reply('İstek Kodunuz başarıyla bildirildi <a:yaniyorsun:712619592937373786> \nEn Yakın Zamanda <#727267176418902178> Kanalından Cevap Vereceğiz. <a:zilller:727562113471479898>')
const çalanlaraselamçatışmayadevam = new Discord.RichEmbed()
.setColor("GRAY")
.setThumbnail(message.author.avatarURL)
.addField(`İsteyen`, `${message.member}`)
.addField(`İstenilen`, type)
client.channels.get('727267176418902178').send(çalanlaraselamçatışmayadevam).then(codework => {
   let cw1 = codework.react('710511879834828853');
   let cw2 = codework.react('727543119024881735');
  
    })
    }


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
  permLevel: 0
}

exports.help = {
    name: 'istek',
    description: 'Sunucuya giren kullanıcıya seçtiğiniz rolü otomatik verir.',
    usage: 'istek <istek>'
}