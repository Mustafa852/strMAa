const Strom = require('discord.js');
const db = require("quick.db")
const ayarlar = require("../ayarlar.json")
exports.run = async(client, message, args) => {
  if(message.author.id !== ayarlar.sahip) return message.reply("Bu komutu sadece yapımcım kullana bilir!");
  try {
    message.channel.send(JSON.stringify(eval(args.join(" "))), {code: "js", split: true});
  } catch(err) {
    try {
      message.channel.send(err, {code: "xl", split: true});
    } catch(err) {
      message.channel.send("Hatayı atarken hata verdi wtf");
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = { 
  name: 'eval', 
  description: '',
  usage: '',
};