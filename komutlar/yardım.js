const Discord = require ("discord.js");

exports.run = (client, message) => {
const mhelp = new Discord.RichEmbed()
.setColor("#5ab1bb")
.setTitle("Moderator Plugin Commands")
.setThumbnail("https://i.imgur.com/JsgxK3Y.png")
.addField("!ban [member] (optional reason)", "Bans a member from the server")
.addField("!clear (optional member) (optional count)", "Clears messages in a particular channel")
.addField("!infractions [member]" , "Displays how many infractions this member has")
.addField("!kick [member] (optional reason)", "Kicks a member from the server")
.addField("!mute [member] (optional reason)", "Mutes a member in the whole server")
.addField("!tempmute [member] [duration] (optional reason)" , "Temporarly mutes a member in the server")
.addField("!role-info [role]", "--")
.addField("!server-info", "--")
.addField("!slowmode (optional timeout) (optional off)", "Enables/Disables slowmode in a channel")
.addField("!unban [member]", "--")
.addField("!unmute [member]" , "Unmutes a member")
.addField("!user-info (optional member" , "--")
.addField("!warn [member] (optional reason)" , "Warns a member")
message.channel.sendEmbed(mhelp)

}; 
exports.conf = {
    enabled: true, 
    guildOnly: false, 
    aliases: ['help'], 
    permLevel: 0 
  };
 
  exports.help = {
    name: 'yardım', 
    description: 'MEE6 HELP MENU',
    usage: 'help'
  };