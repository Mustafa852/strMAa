const Strom = require('discord.js')
const db = require('quick.db');
var ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  let kllanç = message.mentions.users.first() || message.author;
  const bakiye = await db.fetch(`bakiyeasreaper-${kllanç.id}`);
  const hesapdurumu = await db.fetch(`hesapdurumasreaper-${kllanç.id}`);
  const hesapismi = await db.fetch(`hesapismiasreaper-${kllanç.id}`);
  const hesaptarihyıl = await db.fetch(`hesaptarihyılasreaper-${kllanç.id}`);
  const hesaptarihay = await db.fetch(`hesaptarihayasreaper-${kllanç.id}`);
  const hesaptarihgün = await db.fetch(`hesaptarihgünasreaper-${kllanç.id}`)
  
  if(!hesapdurumu) {
    if(args[0]) return message.reply(`Bakmak istediğin kullanıcının bir hesabı bulunmamakta.`)
    message.reply(`İlk olarak hesap oluşturmalısın. ${client.ekoayarlar.botunuzunprefixi}hesap-oluştur <Hesap İsmi>`)
  } else {
    if(hesapdurumu) {
      if(!hesapismi) {
        const embedczdn = new Strom.MessageEmbed()
        .setColor(client.ekoayarlar.renk)
        .setDescription(`Hesap İsmi: ${client.ekoayarlar.isimsiz}\n Hesap Bakiyesi: ${bakiye}\n Hesap Oluşturma Tarihi: Bilinmiyor`)
        message.channel.send(embedczdn)
      } else {
        if(hesapdurumu) {
          if(hesapismi) {
            const embedczdnv2 = new Strom.MessageEmbed()
            .setColor(client.ekoayarlar.renk)
            .setDescription(`Hesap İsmi: ${hesapismi}\n Bakiye: ${bakiye}\n Hesap Oluşturma Tarihi: *${hesaptarihay}/ ${hesaptarihgün}/${hesaptarihyıl}* gününde hesabın oluşturuldu!`)
            message.channel.send(embedczdnv2)
          }
        }
      }
    }
  }
}
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["param"],
    permLevel: 0,
    katagori: "Ekonomi"
}
exports.help = {
    name: 'bilgilerim',
    description: 'Strom',
    usage: 'Strom',
}