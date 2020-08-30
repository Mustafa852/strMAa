const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json")
module.exports.run = async (client, message, args) => {

  let sayfalar = ['**Komutlar Hangi Tepkilerde?**\n📜 = Ana Menü\n🤖 = Anti Raid Sistemi\n🔍 = Engel ve Tarama Sistemi\n📡 = Koruma Sistemi\n🔐 = Yetkili Sistemi', '**Anti Raid Sistemi**\n!anti-raid <aç/kapat>\n!bot-izni ver <botid>\n!bot-izni kaldır <botid>\n\n**Not:** İzin Sisteminin Çalışması İçin\nAnti-Raidi Açmalısınız! ']; 
  let sayfa = 1;
   let sayfalar2 = ['**Komutlar Hangi Tepkilerde?**\n🤖 = Anti Raid Sistemi\n🔍 = Engel ve Tarama Sistemi\n📡 = Koruma Sistemi\n🔐 = Yetkili Sistemi', '**Anti Raid Sistemi**\n!anti-raid <aç/kapat>\n!bot-izni ver <botid>\n!bot-izni kaldır <botid>\n\n**Not:** İzin Sisteminin Çalışması İçin\nAnti-Raidi Açmalısınız! ']; 
  let sayfas = 2;

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setFooter(`Sayfa ${sayfa} - ${sayfalar.length}`)
    .setDescription(sayfalar[sayfa-1])
  .setDescription('**Komutlar Hangi Tepkilerde?**\n📜 = Ana Menü\n🤖 = Anti Raid Sistemi\n🔍 = Engel ve Tarama Sistemi\n📡 = Koruma Sistemi\n🔐 = Yetkili Sistemi')
  .addField(`:scroll: Linkler`,`[Discord](https://discord.gg/vE4wub8) | [Website](https://www.youtube.com/channel/UCBbC9MUCQl8kDd7b07fPCCw?view_as=subscriber) | [Oyver](https://discord.gg/vE4wub8)`)
  .setFooter(`${message.author.tag} Tarafından İstendi.`, message.author.avatarURL)
  
  const embed2 = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setFooter(`Sayfa ${sayfa} - ${sayfalar.length}`)
    .setDescription(sayfalar[sayfa-2])
  .setDescription('**Komutlar Hangi Tepkilerde?**\n📜 = Ana Menü\n🤖 = Anti Raid Sistemi\n🔍 = Engel ve Tarama Sistemi\n📡 = Koruma Sistemi\n🔐 = Yetkili Sistemi')
  .addField(`:scroll: Linkler`,`[Discord](https://discord.gg/vE4wub8) | [Website](https://www.youtube.com/channel/UCBbC9MUCQl8kDd7b07fPCCw?view_as=subscriber) | [Oyver](https://discord.gg/vE4wub8)`)
  .setFooter(`${message.author.tag} Tarafından İstendi.`, message.author.avatarURL)


  message.channel.send(embed).then(msg => {

      msg.react('🤖')
      msg.react('🔍')
      msg.react('📡')
      msg.react('📜')
      msg.react('🔐')

      const backwardsFilter = (reaction, user) => reaction.emoji.name === '🤖' && user.id === message.author.id;
      const backwardsFilter2 = (reaction, user) => reaction.emoji.name === '🤖' && user.id === message.author.id;
      const forwardsFilter = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id;
      const forwardsFilter2 = (reaction, user) => reaction.emoji.name === '🤖' && user.id === message.author.id;


      const backwards = msg.createReactionCollector(backwardsFilter);
            const backwards2 = msg.createReactionCollector(backwardsFilter2);

      const forwards = msg.createReactionCollector(forwardsFilter);

      backwards.on('collect', r => {
        if (sayfa === 1) return;
        sayfa--;
        embed.setDescription(sayfalar[sayfa-1]);
        embed.setFooter(`Sayfa ${sayfa} - ${sayfalar.length}`);
        msg.edit(embed)
      })
      
      backwards2.on('collect', r => {
        if (sayfa === 2) return;
        sayfa--;
        embed.setDescription(sayfalar[sayfa-1]);
        embed.setFooter(`Sayfa ${sayfa} - ${sayfalar.length}`);
        msg.edit(embed)
      })

      forwards.on('collect', r => {
        if (sayfa === sayfalar.length) return;
        sayfa++;
        embed.setDescription(sayfalar[sayfa-1]);
        embed.setFooter(`Sayfa ${sayfa} - ${sayfalar.length}`);
        msg.edit(embed)
      })

    })

  
  }
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["gelişmekteyardım","demoyardım","h","dy"],
  category: "admin",
  permLevel: 0
};

module.exports.help = {
  name: 'yardım2',
  description: 'Gelişmiş Sayfalı Yardım.',
  usage: 'yardım'
};