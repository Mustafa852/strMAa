const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, args) => {
  

if(!message.member.roles.has('716700896054214656')) return message.channel.send(`<:duyur:706167586483863593> Şuanlık sadece Kod paylaşımcılar kod paylaşabilir!`).then(message => message.delete(6000)); 

let kanal = message.mentions.channels.first()
if(!kanal) return message.channel.send('Hangi kanala kod paylaşacağımı yaz!').then(message => message.delete(6000)); 
let isim = args[1]
if(!isim) return message.channel.send('Komutun ismini yaz!').then(message => message.delete(6000));
let atılacak = args[2]
if(!atılacak) return message.channel.send('Nereye Atılacağınıda Yaz!').then(message => message.delete(6000)); 
let judgelink = args[3]
if(!judgelink) return message.channel.send('Alternatif Linki `https://judge-developer-hastebin.glitch.me/` Bu Siteye Yükleyerek Paylaşınız.').then(message => message.delete(6000)); 
  
message.channel.send(`Başarılı <#${kanal.id}> adlı kanala kod paylaşıldı.`).then(message => message.delete(6000)); 
  
const embed = new Discord.RichEmbed()
.setColor('BLUE')
.setTitle('Darknes Code Share')
.setTimestamp()
.setDescription(`**Paylaşılan Kod :** \`${isim}\` 
**Paylaşan :** <@${message.author.id}>  
**Link** : [Koda Fırla!](${judgelink})
**Nereye Atılacak?** : \`${atılacak}\``)
kanal.send(embed)
};
exports.conf = {
enabled: true,
guildOnly: false,
permLevel: 0,
aliases: []
};
exports.help = {
name: 'kod-ekle',    
description: "Sunucuda kod paylaşmaya yarar.",
usage: "kod-paylaş"  
};