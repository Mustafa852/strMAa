const Strom = require('discord.js');
const db = require('quick.db')
const kasalar = require('.././kasalar');

exports.run = async (client, message, args) => {
  const kasaid = args[0];
  const kasasayisi = kasalar.length
  const kasaidembeds = new Strom.MessageEmbed()
  .setTitle(`Bir kasa İD si girmelisin!`)
  .setFooter(`Kasa listesine bakmak için: ${client.ekoayarlar.botunuzunprefixi}kasalar`)
  .setColor(client.ekoayarlar.renk)
  if(!kasaid) return message.channel.send(kasaidembeds)
  if(kasaid > kasasayisi) return message.channel.send(kasaidembeds)
  if(isNaN(kasaid)) return message.channel.send(kasaidembeds)
  
  const kasalarfilter = kasalar.filter(x => x.kasaid == kasaid).map(x => `Kasa İsmi: **${x.isim}** Kasa Fiyatı: **${x.fiyat}** Kasa Açıklaması: **${x.açıklama}**`).join('\n ')
  const icindekiler = require(`.././kasa${kasaid}`)
  const kasalariçindekilerfilter = icindekiler.map(x => x).join(' ')
  const embed = new Strom.MessageEmbed()
  .addField(`Kasa Bilgisi (İD: ${kasaid})`, `${kasalarfilter}`)
  .addField(`İçindekiler;`, `${kasalariçindekilerfilter}`)
  .setFooter(`Kasa listesine bakmak için: ${client.ekoayarlar.botunuzunprefixi}kasalar`)
  .setColor(client.ekoayarlar.renk)
  message.channel.send(embed)
  
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kasabilgi', 'kasabilgisi', 'kasa'],
    permLevel: 0
}

exports.help = {
    name: 'kasa-bilgi',
    description: 'Strom',
    usage: 'Strom'
}