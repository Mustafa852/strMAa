const Discord = require('discord.js');
const database = require('quick.db');

exports.run = async (client, message, args) => {// can#0002

if(!message.member.hasPermission('MANAGE_MESSAGES')) return;
if(!args[0]) return message.channel.send('You need to specify a role.');

if(args[0] === 'create') {
  
message.guild.roles.create({ data: { name: args.slice(1).join(' ') || 'muted', color: '#f4424b' }}).then(role => {
role.setPermissions(0);
message.channel.send("Rol başarıyla oluşturuldu. Üzerine yazmalar şimdi uygulanıyor. Bu bir kaç saniye alabilir. Bitirdiğimde bir mesaj alacaksın .").then(() => {
let arrayed = message.guild.channels.cache.filter(a => a.type === 'text').array();

var okay = 0;

for(const key in arrayed) {
arrayed[key].overwritePermissions([{
id: role.id,
deny: ['SEND_MESSAGES', 'ADD_REACTIONS'],
}], 'Muterole güncellendi by '+message.author.tag);
okay++;
};
database.set(`Strom-mute-role.${message.guild.id}`, role.id);
return message.channel.send("Başarılı! rol **"+role.name+"** ile oluşturuldu  "+okay+" başarılı kanal geçersiz kılmalar ve 0 atlandı .");

});
});
};

if(!args[0] === 'create') {
let role = message.guild.roles.cache.get(args[0]) || message.mentions.roles.first() || message.guild.roles.cache.find(a => a.name.toLowerCase().includes(args.slice(0).join(' ').toLowerCase()))
if(!role) return message.channel.send('Role "'+args.slice(0).join(' ')+'" Bulunamadı.');

database.set(`carl-mute-role.${message.guild.id}`, role.id);
return message.channel.send(`Set **${role.name}** as the muterole.`);
};

}; 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
 
exports.help = {
  name: 'muterole'
};// codare ♥