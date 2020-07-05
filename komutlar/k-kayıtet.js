const Discord = require('discord.js');

exports.run = async (client, message, args) => {

let kayityetkili = '728199390182899833' //KAYIT YETKİLİSİ ID
let judgever = '722069345475493948' //VERİLECEK ROL İD
let judgever2 = '722069345475493948' //VERİLECEK ROL ID
let judgeal = '728278215017103452' //ALINACAK ROL İD
let judgeal2 = '728278215017103452'//ALINACAK ROL ID

  if(!message.member.roles.has(kayityetkili)) 
  if(!message.member.hasPermission("ADMINISTRATOR"))
  return message.channel.send(`Bu komutu kullanabilmek için \`Kayıt\` yetkisine sahip olmasınız.`);
  let member = message.mentions.members.first()
  const isim = args[1];
  const yas = args[2];
  if (!member) return message.channel.send('Bir Üye Etiketlemelisin')
    if (!isim) return message.channel.send('Bir İsim Yazmalısın')
      if(!yas) return message.channel.send("Bir yaş girin.")
  
  setTimeout(function(){
  member.setNickname(`${isim} | ${yas}`)
  },2000)
  setTimeout(function(){
  member.addRole(judgever)
  },3000)
  setTimeout(function(){
  member.addRole(judgever2)
  },3000)
  setTimeout(function(){
  member.removeRole(judgeal)
  },4000)
  setTimeout(function(){
  member.removeRole(judgeal2)
  },4000)
  
 let embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setDescription(`<a:yaniyorsun:712619592937373786> Kayıt işlemi Başarılı <a:yaniyorsun:712619592937373786>

<a:zilller:727562113471479898> **Kayıt eden yetkili :** ${message.author}, ${message.author.username}

<a:7051_fire:723498413664108564> **Kayıt edilen kullanıcı :** ${member}, ${isim} | ${yas}

<a:keltos:728293897427484673> **Kayıt işleminde verilen rol :** <@&${judgever}>

<a:toskel:728293931552604192> **Kayıt işleminde alınan rol :** <@&${judgeal}>`)
  
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['erkek','k'],
  permLevel: 0
}
exports.help = {
  name: 'kayıt',
  description: "Kullanıcıları kayıt etme komutu.",
  usage: 'kayıt <yeni nick>'
}