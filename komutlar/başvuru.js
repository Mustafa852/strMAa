const Discord = require('discord.js');
const db = require('quick.db');


exports.run = function(client, message, args) {

	let adınız = args[0]
	let yaşınız = args[1]
  let katagori = args[2]

  let basvuru = db.fetch(`basvuruk_${message.guild.id}`)
	let kanal = db.fetch(`başvuru-ekle_${message.guild.id}`)
  let log =   db.fetch(`başvuru-log_${message.guild.id}`)
 
	if(!log) return message.channel.send("Bu komudu kullanmak için başvurulist kanallarının sunucuda ayarlı olması gerekiyor.")
  if(!basvuru) return message.channel.send("Bu komudu kullanmak için başvurulist kanallarının sunucuda ayarlı olması gerekiyor.")
  if(!kanal) return message.channel.send("Bu komudu kullanmak için başvurulist kanallarının sunucuda ayarlı olması gerekiyor.")
  
  if (message.channel.id !== kanal) return message.channel.send(`Bu komutu sadece <#${kanal}> kanalında kullanabilirsin.`)
	if (message.channel.id == kanal) {
    message.delete()
  if (!adınız)return message.channel.send(`<a:alarm3:823900153831620658> Adınızı yazmalısınız`).then(m => m.delete({timeout: 10000}))
  if(isNaN(yaşınız)) return message.channel.send(`<a:alarm3:823900153831620658> Yaşlar rakamdan oluşmalıdır.`).then(m => m.delete({timeout: 10000}))
  if (!yaşınız) return message.channel.send(`<a:alarm3:823900153831620658> Yaşınızı yazmalısınız`).then(m => m.delete({timeout: 10000}))
  
  if (!katagori) return message.channel.send(`<a:alarm3:823900153831620658> Hangi bölümü seçiceksiniz (<@&818220083595313162>, <@&844981379200843826>, <@&822869084667904030>, <@&819602002497110017>)`).then(m => m.delete({timeout: 10000}))
 
  
  const basvuruuu = new Discord.MessageEmbed()
  .setColor("PURPLE")
  .setDescription(`${message.author} adlı kullanıcı ${katagori} Yetkisine başvuru yaptı`)
  const embed = new Discord.MessageEmbed()
  .setColor("BLUE")
  .setTitle("Başvuru Geldi!")
  .addField("<a:sarta:855249764500373564> **•** Başvuran kişinin adı", `\`\`\`${adınız}\`\`\`(<@${message.author.id}>)` )
  .addField("<a:sarta:855249764500373564> **•** Başvuran kişinin yaşı", `\`\`\`${yaşınız}\`\`\``)
  .addField("<a:sarta:855249764500373564> **•** Başvurduğu kategori", `\`\`\`${katagori}\`\`\``)

  client.channels.cache.get(basvuru).send(embed)
  client.channels.cache.get(log).send(basvuruuu)
  message.channel.send(`Yetkili başvuru istek alındı.`)
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yetkili-başvuru'],
  permLevel: 0
};

exports.help = {
  name: 'başvuru', 
  description: "Sunucuya başvuru eklemenizi sağlar.",
  usage: 'başvur <adınız> <yaşınız> <katagori>'
};