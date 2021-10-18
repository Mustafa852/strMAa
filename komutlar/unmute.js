const Discord = require('discord.js');
const database = require('quick.db');

exports.run = async (client, message, args) => {// can#0002

if(!message.member.hasPermission('MANAGE_MESSAGES')) return;

const muteRoleFetch = await database.fetch(`strom-mute-role.${message.guild.id}`);
if(!muteRoleFetch) return message.channel.send('Bu sunucunun mute rolü yok, bir tane ayarlamak için `s!muterole ` veya bir tane oluşturmak için `s!muterole create [name]` kullanın .');

if(!args[0]) return message.channel.send(`\`\`\`${message.content.split('unmute')[0]}unmute  [reason]
      ^^^^^^^^
member is a required argument that is missing.\`\`\``);

let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.guild.members.cache.find(a => message.guild.members.cache.get(a.user.id).nickname && a.nickname.toLowerCase().includes(args[0].toLowerCase())) || message.guild.members.cache.find(a => a.user.username.toLowerCase().includes(args[0].toLowerCase()))
if(!member) return message.channel.send(`Member "${args[0]}" not found`);
member.roles.remove(muteRoleFetch).then(() => {
return message.channel.send('mute kaldırıldı! **'+member.user.tag+'**');
})
}; 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
 
exports.help = {
  name: 'unmute'
};// codare ♥