const Discord = require('discord.js');
const db = require('quick.db');
const client = new Discord.Client();
const moment = require("moment");
const ayarlar = require("../ayarlar.json");

exports.run = (client, message, args) => {

const embed = new Discord.RichEmbed()
.setColor("GRAY")
.addField("**Bulunduğu Toplam Sunucu:**", `${client.guilds.size.toLocaleString()} sunucu`)
.addField("**Toplam Kullanıcı Sayısı**:", `${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} kullanıcı`)
.addField("**Toplam Kanal Sayısı:**", `${client.channels.size.toLocaleString()} kanal`)
.addField("**Bellek Kullanımı:**",`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} mb`)
.addField("**Sahip:**", `<@536470606166622208>`) /// Burda Doldurulacak Yer Var !!!!!!
.addField("**Prefix:**", `${ayarlar.prefix}`)
.addField("**Ping:**", Math.round(client.ping)  +  "ms")
message.channel.send(embed)
};
exports.conf = {
enabled: true,
guildOnly: false,
aliases: ["botinfo","bot-bilgi","bot-info"],
permLevel: 0
};
exports.help = {
name: 'botbilgi',
description: 'Botun Bilgilerini gösterir.',
usage: '-botbilgi'
};