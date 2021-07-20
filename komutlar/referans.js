const Discord = require('discord.js');
const db = require("quick.db")
 
exports.run = async (client, message, args) => { /// Created by ByMayFe_0#3960 && Zeaste#2841 for CodAre 
  const msg = message
 
  var kisi = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if (!kisi) return message.reply("ReferansOlmak İçin Bir Kullanıcı Belirtiniz!");
  var referansSayisi = await db.fetch(`Referans_${message.guild.id}_${kisi.id}`);
 
    if(referansSayisi >= 5) return message.reply("5'ten fazla kişiye referans olamazsın!");
 
 
 
  var logkanali = message.guild.channels.cache.get("841390806320545842")  // LOGKANALİİD
    if(!logkanali) return message.reply("Log Kanalı Ayarlı Değil")
 
    var rolcukE = message.guild.roles.cache.get("818220084866187304","819657439309201408") // ERKEK ROLÜ İD
    var rolcukK = message.guild.roles.cache.get("818220084866187304","822869085405839380") // KIZ ROLÜ İD
 
    var mesaj = await logkanali.send(`${kisi} seni ${message.author} referansı ile sunucuya alacağım. Kabul etmek için 10 dakikan var .Kabul ediyor musun ?\nKız İsen Kırmızı\n Erkek İsen Mavi`);
    await mesaj.react("💙")
    await mesaj.react("❤️")
 
    
    const filter = (r, user) => user.id !== client.user.id && user.id == kisi.id;
 
 
    try {
        var collector = mesaj.createReactionCollector(filter, {
            max: 1,
            time: 600000,
        });
 
      
    } catch(e) {
            console.log(e)  
    }
   
 
    collector.on("collect", async (r, user) => {
 
        if(r.emoji.name == "💙") {
            var kırmızı = mesaj.reactions.cache.get("❤️").users.cache.get(user.id);
            if(kırmızı) {
             r.users.remove(user).catch(console.error);
             return kisi.send("Zaten Tıkladın");
            }
            await kisi.roles.set([rolcukE])
            await db.add(`Referans_${message.guild.id}_${message.author.id}`, 1)
           }
           if(r.emoji.name == "❤️") {
             var mavi = mesaj.reactions.cache.get("💙").users.cache.get(user.id);
             if(mavi) {
               r.users.remove(user).catch(console.error);
               return kisi.send("Zaten Daha Önce Birine Tıkladın");
              }
              await kisi.roles.set([rolcukK])
              await db.add(`Referans_${message.guild.id}_${message.author.id}`, 1)
           }
 
     });
 
 
     collector.on('end', async collected => {
        if(mesaj) await mesaj.delete({timeout: 1000});
    });
 
 
};
 
 
exports.conf = {
  aliases: [],
  permLevel: 0
};
 
exports.help = { ///CODARE
  name: 'ref',
  description: 'Kullanıcıya Referans Olursunuz!',
  usage: 'referans [@bymayfe/402047297963294730]'
};