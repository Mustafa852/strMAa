const Discord = require('discord.js');
module.exports.run = async (bot, message, args, guild, user) => {
    let sahip = message.member
   let jsrolu = message.guild.roles.find('id', '692045635074916433')
  if(message.guild.id !== '687044388559257634') return message.channel.sendEmbed(new Discord.RichEmbed().setDescription('Bu Rolü <#722750731664490538> Kanalından Alabilirsin !').setColor('RED'));
    if(!jsrolu) return message.channel.send('Bu Rol Geçici Olarak Kullanım Dışı.')
      if(message.member.roles.has(jsrolu.id)) return message.channel.send('❌ | **Bu Role Zaten Sahipsin!**')

  try {
      await (sahip.addRole(jsrolu.id));
    const embed = new Discord.RichEmbed()
      .setColor('GREEN')
      .setTitle('<a:okke:706822258512887879> | Başarılı! JavaScript Rolü Verildi.')
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
  name: "js",
  description: "js rolu",
  usage: "js"
};