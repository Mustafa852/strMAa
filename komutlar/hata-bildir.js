const Discord = require('discord.js');

exports.run = async(client, message, args) => {
    let type = args.slice(0).join(' ');
    if (type.length < 1) return message.channel.send('Doğru Kullanım : -hata-bildir sayaç kodundaki link')
const embed = new Discord.RichEmbed()
.setColor('#00ff00')
.setDescription('Bildiriniz başarıyla iletildi <a:istek:706431026804818001> \nEn Yakın Zamanda <#716699793065246761>  Kanalından Cevap Vereceğiz. <a:dikat:706431490027814914>')
message.channel.send(embed)
const embed2 = new Discord.RichEmbed()
.setColor("#ff0009")
.setDescription(`**Bir Hata Bildirisi Geldi!**`)
.addField(`:envelope: **Gönderen Kişinin Bilgileri**`, `:white_small_square:Kullanıcı ID : ${message.author.id}\n:white_small_square:Kullanıcı : ${message.member}`)
.addField(":pencil: **Gönderilen Hatalı/Buglu Kod Mesajı**", type)
.setThumbnail(message.author.avatarURL)
client.channels.get('716699793065246761').send(embed2); // Kanal ID 

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
  permLevel: 0
}

exports.help = {
    name: 'hata-bildir',
    description: 'Sunucuya giren kullanıcıya seçtiğiniz rolü otomatik verir.',
    usage: 'hata <hata>'
}