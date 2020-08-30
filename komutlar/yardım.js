const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json")
module.exports.run = async (client, message, args) => {

  let sayfalar = ['**Komutlar Hangi Sayfada?**\n2.Sayfa = Anti Raid Sistemi\n3.Sayfa = Engel ve Tarama Sistemi\n4.Sayfa = Koruma Sistemi\n5.Sayfa = Yetkili Sistemi\n\nSonraki Sayfa = ➡\nÖnceki Sayfa = ⬅'+ client.commands.filter(cmd => exports.help.category === 'admin').map(cmd => '\ ' + exports.help.name + '\ ').join("\n"), '**Anti Raid Sistemi**\n!anti-raid <aç/kapat>\n!bot-izni ver <botid>\n!bot-izni kaldır <botid>\n\n**Not:** İzin Sisteminin Çalışması İçin\nAnti-Raidi Açmalısınız! '+client.commands.filter(cmd => exports.help.category === 'util').map(cmd => '\ ' + exports.help.name + '\ ').join("\n"),'**Engel Ve Tarama Sistemi**\n!capsengel\n!everyone-engelle\n!küfürengel\n!reklam-engel\n!reklamban\n!reklambankapat\n!reklamtara'+client.commands.filter(cmd => exports.help.category === 'photo').map(cmd => '\ ' + exports.help.name + '\ ').join("\n"),'**Koruma Sistemi**\n!kanal-koruma\n!kanal-koruma-sıfırla\n!rolkoruma'+ client.commands.filter(cmd => exports.help.category === 'fun').map(cmd => '\ ' + exports.help.name + '\ ').join("\n"),'**Yetkili Sistemler**\n!ban\n!kick\n!ban\n!mod-log <#kanal>\n!mod-log <sıfırla>\n!otobotmesajsilici\n!otobotmesajsilicikapat\n!sohbet-aç\n!sohbet-kapat\n!süreliban\n!sürelimute\n!sil-üye\n!sil\n!yavaş-mod <1/120>']; 
  let sayfa = 1;

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setFooter(`Sayfa ${sayfa} - ${sayfalar.length}`)
    .setDescription(sayfalar[sayfa-1])
  .setDescription('**Komutlar Hangi Sayfada?**\n2.Sayfa = Anti Raid Sistemi\n3.Sayfa = Engel ve Tarama Sistemi\n4.Sayfa = Koruma Sistemi\n5.Sayfa = Yetkili Sistemi\n\nSonraki Sayfa = ➡\nÖnceki Sayfa = ⬅')
  .addField('Dikkat',`Bu Altyapı Winvon Youtube Kanalının Sahibi Baran Tarafından Yapılmıştır, İzinsiz Paylaşmak Yasaktır! Aşşağıdaki Linkten Discord Sunucuma Gelebilirsiniz.`)
  .addField(`:scroll: Linkler`,`[Discord](https://discord.gg/vE4wub8) | [Website](https://www.youtube.com/channel/UCBbC9MUCQl8kDd7b07fPCCw?view_as=subscriber) | [Oyver](https://discord.gg/vE4wub8)`)
  .setFooter(`${message.author.tag} Tarafından İstendi.`, message.author.avatarURL)

  message.channel.send(embed).then(msg => {

    msg.react('⬅').then( r => {
      msg.react('➡')

      const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id;
      const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id;


      const backwards = msg.createReactionCollector(backwardsFilter);
      const forwards = msg.createReactionCollector(forwardsFilter);

      backwards.on('collect', r => {
        if (sayfa === 1) return;
        sayfa--;
        embed.setDescription(sayfalar[sayfa-1]);
        embed.setFooter(`Sayfa ${sayfa} | ${sayfalar.length}`);
        msg.edit(embed)
      })

      forwards.on('collect', r => {
        if (sayfa === sayfalar.length) return;
        sayfa++;
        embed.setDescription(sayfalar[sayfa-1]);
        embed.setFooter(`Sayfa ${sayfa} | ${sayfalar.length}`);
        msg.edit(embed)
      })

    })

  })
  }
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["help","emojiyardım","winvon","codework"],
  category: "admin",
  permLevel: 0
};

module.exports.help = {
  name: 'yardım',
  description: 'Gelişmiş Sayfalı Yardım.',
  usage: 'yardım'
};