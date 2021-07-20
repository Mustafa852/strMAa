const Strom = require('discord.js');
const db = require('quick.db')
exports.run = async (client, message, args) => { 
const fynx = require("../ayarlar.json");
let prefix = await db.fetch(`prefix.${message.guild.id}`) || fynx.prefix     
let rol = message.mentions.roles.first() 
let kanal = message.mentions.channels.first()
if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(` **Bu komutu kullanabilmek için** "\`Yönetici\`" **yetkisine sahip olmalısın.**`);
 
 if(!rol) return message.channel.send(`<a:eyes:847531483127087144>  **Lütfen Bir Rol Belirt!**\nRolü Etiketleyemiyorsan **Rolün Etiketleme Seçeneğini Aktif Etmeyi Unutma** \n**__Örnek Kullanım__** : \`${prefix}otorol-ayarla #kanal <@rol>\`\n\n**__Önemli Not!!__**: **Oto Rol'u Ayarlayabilmek İçin Botun Rolü, Verilecek Rolün Üstünde Bir Rolde Olmalı Yoksa Rolü Veremez!** `)
 
 if(!kanal) return message.channel.send(`<a:eyes:847531483127087144>  **Lütfen Bir Kanal Belirt!** \n**__Örnek Kullanım__** : \`${prefix}otorol-ayarla @Rol #Kanal\``)
 
  message.channel.send(`
╔▬▬▬▬▬▬▬▬Strom Otorol▬▬▬▬▬▬▬▬▬
║► Otorol Aktif Edildi.
║► **${rol}** Olarak Güncelledim! 
║► Log Kanalını **${kanal}** Olarak Güncelledim! 
╚▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)

 
  db.set(`otoRL_${message.guild.id}`, rol.id)  
  db.set(`otoRK_${message.guild.id}`, kanal.id) 
};
exports.conf = {
enabled: false,
guildOnly: false,
aliases: ["otorol-ayarla","otorol"],
permLevel: 0
};

exports.help = {
name: 'otorol-ayarla'
};