const Discord = require("discord.js");
const db = require('quick.db');
exports.run = (client, message, args) => {  
  if (!args[0]) return message.reply({embed:{description:'Lütfen bir şablon linki belirt.'}})

    const link = args[0];
    const açıklama = args.slice(1).join(" ") 
    if (!link.includes("https://discord.new")) return message.channel.send(new Discord.MessageEmbed().setColor('#ff0004').setTitle(`İşlem Başarısız`).setDescription(`<a:arp:855388529055629323> ${message.author}, **Lütfen Geçerli Bir Şablon Link Belirtin!**`))
  
    const gönderildi = new Discord.MessageEmbed()
    .setAuthor("Yeni Şablon Gönderildi!!")
    .setDescription(`<a:tik:855388519841005569> Desteklerinizden Dolayı Teşekkür Ederiz. Uygun görülürse Bota Eklenicektir.`)
    .setColor("#2bfe0f")
    message.channel.send(gönderildi)

    const embed = new Discord.MessageEmbed()
    .setAuthor("Yeni Şablon Gönderildi!!")
    .addField("Şablonu Gönderen \n", message.author)
    .addField(`Gönderilen Şablon\n`, `${link}`)
    .addField(`Açıklama \n`, `${açıklama}`)
    .setFooter("Serves Şablonu | Strom Şablon sistemi")
    .setColor("#000000")
    client.channels.cache.get("844201987964796968").send(embed)
  }
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["g","send","şablon-gönder"],
  permLevel: 0
};
exports.help = {
  name: "gönder",
  description: "k",
  usage: "gönder"
};