const Discord = require('discord.js');
const db = require("quick.db")
//const yetkililer = require("../ekipler.json")

exports.run = async(bot, message, args) => {
  let uye = message.mentions.users.first()
  message.delete()
  const embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setDescription(`**Paranızın sıfırlanmasını onaylıyor musunuz?** 1/3`)
    .setFooter(bot.user.username, bot.user.avatarURL());
  const embed2 = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setDescription(`**Paranızın sıfırlanmasını onaylıyor musunuz?** 2/3`)
    .setFooter(bot.user.username, bot.user.avatarURL());
  const embed3 = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setDescription(`**Paranızın sıfırlanmasını onaylıyor musunuz?** 3/3`)
    .setFooter(bot.user.username, bot.user.avatarURL());
  if(!uye){
      message.channel.send(embed).then(async function(sentEmbed) {
        const emojiArray = ["✅"];
        const filter = (reaction, user) =>
          emojiArray.includes(reaction.emoji.name) && user.id === message.author.id;
        await sentEmbed.react(emojiArray[0]).catch(function() {});
        var reactions = sentEmbed.createReactionCollector(filter, {
          time: 30000
        });
        reactions.on("collect", async function(reaction) {
          if (reaction.emoji.name === "✅") {
                  message.channel.send(embed2).then(async function(sentEmbed) {
                  const filter = (reaction, user) =>
                    emojiArray.includes(reaction.emoji.name) && user.id === message.author.id;
                  await sentEmbed.react(emojiArray[0]).catch(function() {});
                  var reactions = sentEmbed.createReactionCollector(filter, {
                    time: 30000
                  });
                  reactions.on("collect", async function(reaction) {
                    if (reaction.emoji.name === "✅") {
                            message.channel.send(embed3).then(async function(sentEmbed) {
                            const filter = (reaction, user) =>
                              emojiArray.includes(reaction.emoji.name) && user.id === message.author.id;
                            await sentEmbed.react(emojiArray[0]).catch(function() {});
                            var reactions = sentEmbed.createReactionCollector(filter, {
                              time: 30000
                            });
                            reactions.on("collect", async function(reaction) {
                              if (reaction.emoji.name === "✅") {
                                message.channel.send(
                                  `:white_check_mark: **Paranız sıfırlandı!**`
                                ).then(s => s.delete({ timeout: 15000 }));
                                db.set(`para_${message.author.id}`, 0)
                                db.set(`demir_${message.author.id}`, 0)
                                db.set(`altin_${message.author.id}`, 0)
                                db.set(`elmas_${message.author.id}`, 0)
                                db.set(`neodnium_${message.author.id}`, 0)
                                db.set(`titanyum_${message.author.id}`, 0)
                                db.set(`texnonium_${message.author.id}`, 0)

                              }
                            });
                          });  
                    }
                  });
                });  
          }
        });
      });  
  }
  if(uye){
      let yetkililer = [{hesap:"846736343593779230"}]
      if(!yetkililer.some(y => y.hesap === message.author.id)){
        message.channel.send("Bu komutu sadece botun ekibi kullana bilir").then(s => s.delete({ timeout: 15000 }));
        return;
      }
      
      
      message.channel.send(embed).then(async function(sentEmbed) {
        const emojiArray = ["✅"];
        const filter = (reaction, user) =>
          emojiArray.includes(reaction.emoji.name) && user.id === message.author.id;
        await sentEmbed.react(emojiArray[0]).catch(function() {});
        var reactions = sentEmbed.createReactionCollector(filter, {
          time: 30000
        });
        reactions.on("collect", async function(reaction) {
          if (reaction.emoji.name === "✅") {
                  message.channel.send(embed2).then(async function(sentEmbed) {
                  const filter = (reaction, user) =>
                    emojiArray.includes(reaction.emoji.name) && user.id === message.author.id;
                  await sentEmbed.react(emojiArray[0]).catch(function() {});
                  var reactions = sentEmbed.createReactionCollector(filter, {
                    time: 30000
                  });
                  reactions.on("collect", async function(reaction) {
                    if (reaction.emoji.name === "✅") {
                            message.channel.send(embed3).then(async function(sentEmbed) {
                            const filter = (reaction, user) =>
                              emojiArray.includes(reaction.emoji.name) && user.id === message.author.id;
                            await sentEmbed.react(emojiArray[0]).catch(function() {});
                            var reactions = sentEmbed.createReactionCollector(filter, {
                              time: 30000
                            });
                            reactions.on("collect", async function(reaction) {
                              if (reaction.emoji.name === "✅") {
                                message.channel.send(
                                  `:white_check_mark: **Para sıfırlandı!**`
                                ).then(s => s.delete({ timeout: 15000 }));
                                db.set(`para_${uye.id}`, 0)
                                db.set(`demir_${uye.id}`, 0)
                                db.set(`altin_${uye.id}`, 0)
                                db.set(`elmas_${uye.id}`, 0)
                                db.set(`neodnium_${uye.id}`, 0)
                                db.set(`titanyum_${uye.id}`, 0)
                                db.set(`texnonium_${uye.id}`, 0)

                              }
                            });
                          });  
                    }
                  });
                });  
          }
        });
      });  
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["resetmoney","reset-money","para-sifirla","para-sıfırla","parasıfırla","moneyreset","money-reset"],
  permLevel: 0
};

exports.help = { 
  name: 'parasifirla', 
  description: '',
  usage: '',
};