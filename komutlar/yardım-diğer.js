const Discord = require("discord.js")
const data = require('quick.db');
const client = new Discord.Client();
 
module.exports.run = (client, message, args) => {   
let açıkmı = data.fetch(`premium.${message.guild.id}`)
  if(açıkmı) {

// premium açıksa yapılack işlemler buraya

} else { return message.channel.send(`${message.author}, bu komut premium bir komuttur. Bu sunucu da premium bulunmamakta.`) }  let pages = [
`**Sunucu Şablanları;**\n\n Yardım menüsünü görmeden önce <@!${client.user.id}> 'i kullandığınız için sizlere teşekkür ederiz.\n\n  \` !tasarım-tema \` **Tasarım Sunucusu Şablonu Atar**\n\n \` !bot-satış-tema \` **Bot Satış Sunucusu Şablonu Atar**.\n\n  \` !kod-tema \` **Kod Sunucusu Şablonu Atar** \n\n \` !uptime-support-tema \` **Uptimeli Support Sunucusu Şablonu Atar.** \n\n \` !botlist-tema \` **Bot List Şablonu Atar** \n\n ** Şablonlara Bakmaya Devam Etmek için ➡ Emojisine Bas **`,
`**Sunucu Şablanları;**\n\n \`!j4j-tema \` **J4J Sunucu Şablonu Atar.** \n\n  \` !site-satış-tema \` **Site Satış Sunucusu Şablonu Atar**\n\n  \` !youtube-twitch-tema \` **Youtube/Twitch Şablonu Atar**.\n\n  \` !zula-tema \` **Zula Klan Sunucusu Şablonu atar.** \n\n \` !mta-tema \` **MTA Roleplay Sunucusu Şablonu atar.** \n\n \` !atlantis-tema \` **Atlantis Sunucu Şablonu Atar.** \n\n ** Şablonlara Bakmaya Devam Etmek için ➡ Emojisine Bas**`,
`**Sunucu Şablanları;**\n\n \`!sınıf-tema \` **Sınıf Sunucu Şablonu Atar.** \n\n \`!şablon-tema \` **Şablon Sunucusu Şablonu Atar**\n\n \` !dil-değisen-sunucu-tema \` **Dili Değişen Sunucu Şablonu Atar**.\n\n  \` !nivo-tema \` **Nivo TV Sunucusunun Şablununu atar** \n\n \` !gelişmis-satış-tema \` **Gelişmiş Şablon Sunucusu Şablonu Atar.** \n\n \` !j4j-v2-tema \` **J4J V2 Şablonu Atar.** \n\n **Şablonlara Bakmaya Devam Etmek için ➡ Emojisine Bas**`,

];
let page = 1; 
const embed = new Discord.MessageEmbed()
.setColor('RANDOM')
.setThumbnail('')
.setAuthor(`Servers Template Yardım Menüsü`, client.user.avatarURL)
.setFooter(`Sayfa ${page} / ${pages.length}`)
.setDescription(pages[page-1])
message.channel.send(embed).then(msg => {
msg.react('⬅')
.then(r => {
msg.react('➡')
const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id;
const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id;
const backwards = msg.createReactionCollector(backwardsFilter, { time: 100000 });
const forwards = msg.createReactionCollector(forwardsFilter, { time: 100000 });
forwards.on('collect', r => {
if(page === pages.length) return;
page++;
embed.setDescription(pages[page-1]);
embed.setColor('RANDOM')
embed.setFooter(`Sayfa ${page} / ${pages.length}`)
msg.edit(embed)
})
backwards.on('collect', r => {
if(page === 1) return;
page--;
embed.setColor('RANDOM')
embed.setDescription(pages[page-1]);
embed.setFooter(`Sayfa ${page} / ${pages.length}`)
msg.edit(embed)
}) 
})
})
};
 
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['diğer-temalar', 'other-templates'],
  permLevel: 0
}

exports.help = {
  name: 'diğer-temalar'
};
