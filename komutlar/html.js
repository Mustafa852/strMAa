const Discord = require('discord.js');
module.exports.run = async (bot, message, args, guild, user) => {
    let sahip = message.member
   let htmlrolü = message.guild.roles.find('id', 'rol id')
  if(message.guild.id !== '687044388559257634') return message.channel.sendEmbed(new Discord.RichEmbed().setDescription('Bu Rolü <#722069372826419280> Kanalından Alabilirsin !').setColor('RED'));
    if(!htmlrolü) return message.channel.send('Bu Rolü <#704994323560923186> Kanalından Alabilirsin!')
      if(message.member.roles.has(htmlrolü.id)) return message.channel.send('❌ | **Bu Role Zaten Sahipsin!**')

  try {
      await (sahip.addRole(htmlrolü.id));
      const embed = new Discord.RichEmbed()
      .setColor('GREEN')
      .setTitle('<a:okke:706822258512887879> | Başarılı! Html Rolü Verildi.')
      .setDescription(":small_blue_diamond: **İstek Bildir = ** \`-istek <mesajınız>\`\n:small_blue_diamond: **Hata Bildir = ** \`-hata-bildir <mesajınız>\`")
      .addField("**<a:Cyrus2:706514992824057896> Diğer Roller Hakkında Bilgi Almak İçin;**","<#704994323560923186>")
      message.channel.sendMessage(embed)
    } catch (error) {
      return message.channel.send('❌ | **Bu Role Zaten Sahipsin!****')
   
};
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: []
};

exports.help = {
  name: "html",
  description: "html rolü verir.",
  usage: "html"
};