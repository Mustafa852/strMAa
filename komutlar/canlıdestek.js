const Discord = require('discord.js');

exports.run = async (client, message, params) => {
  var channel = client.channels.cache.find('846736343593779230', '863868946142461984')
    const asdf = await client.channels.cache.get(message.channel.id).createInvite()
  message.delete();
  const embed = new Discord.MessageEmbed()
  .setTitle("» Strom | Canlı Destek")
  .setDescription("**Canlı Desteği kullandğın için teşekkür ederiz, Seninle ekibim ilgilenicektir lütfen bekle!**")
  .setFooter("30 Saniye içinde geri dönülmezse lütfen iletişime geçin ℬ ShAdOw#0001")
 message.channel.send(embed)
      const invite = new Discord.MessageEmbed()
  .setAuthor("» Canlı Destek | Talep")
  .addField('**» Kullanıcı Adı: **', message.author.username + '#' + message.author.discriminator)
  .addField('**» Sunucu Adı: **', message.guild.name)
  .setDescription(asdf.url)
      channel.send(invite)
};
 
  exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'canlıdestek',
  description: 'Canlı Destek Tablebi Oluşturur.',
  usage: '!canlıdestek'
};