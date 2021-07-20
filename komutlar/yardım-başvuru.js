const Discord = require("discord.js")

exports.run = async (client, message, args) => {


const embed = new Discord.MessageEmbed()
.addField("Yardım Menüsü", `
 ╔══════════════════════════════════════╗
 ║
 ║<a:rainbow:855248569136578570> **•** \`!başvuru-ayarla\` = **Başvuru ayarlarını yaparsınız.**
 ║<a:rainbow:855248569136578570> **•** \`!başvuru-onay\` = **Başvuru yapan birinin başvurusunu onaylarsınız.**
 ║<a:rainbow:855248569136578570> **•** \`!başvuru-reddet\` = **Başvuru yapan birinin başvurusunu reddedersiniz.**
 ║<a:rainbow:855248569136578570> **•** \`!başvuru\` = **Başvuru yaparsınız.**
 ║
 ╚══════════════════════════════════════╝
 \`\`\`Strom | Başvuru sistemi.\`\`\`
 `);



message.channel.send(embed)
 



}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: 'başvuru-yardım',
    description: 'Yardım menüsü.',
    usage: 'yardım'
}