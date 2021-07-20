const Discord = require('discord.js');
const db = require('quick.db');


exports.run = function(client, message, args) {
if (message.author.id != "846736343593779230") return message.channel.send('Bot Sahibinin özel komudu'); 
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`:no_entry: Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
	if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
                                          .setTitle("Doğru Kullanım:")
                                          .addField("Yardım Menüsü", `
                                          ╔══════════════════════════════════════╗
                                          ║
                                          ║ <a:mod:855390640946806784> \`!başvuru-ayarla başvuru-yap-kanal #kanal\` ➡ **Başvuru kanalını ayarlarsınız.**\n
                                          ║ <a:mod:855390640946806784> \`!başvuru-ayarla başvuru-log-kanal #kanal\` ➡ **Başvuru log kanalını ayarlarsınız.**\n
                                          ║ <a:mod:855390640946806784> \`!başvuru-ayarla başvuru-giden-kanal #kanal\` ➡ **Başvuruların gideceği kanalı ayarlarsınız.**\n
                                          ║ <a:mod:855390640946806784> \`!başvuru-ayarla yetkili @rol\` ➡ **Yetkili rolünü ayarlarsınız.**\n
                                          ║
                                          ╚══════════════════════════════════════╝
                                          \`\`\`Strom | Başvuru sistemi.\`\`\`
                                          `)
                                          .setColor(message.guild.me.displayColor)
                                          )
  if(args[0] === "başvuru-yap-kanal"){
    if(db.has(`başvuru-ekle_${message.guild.id}`)) return message.channel.send("Bu kanal zaten ayarlanmış.Sıfırlamak için **!başvuru-ayarla sıfırla**")
    let başvuruekle = message.mentions.channels.first();
    if(!başvuruekle) return message.channel.send("Lütfen kanal seçin")
    db.set(`başvuru-ekle_${message.guild.id}`, başvuruekle.id)
    message.channel.send("başvuru-ekle kanalı başarıyla ayarlandı")
  }
   if(args[0] === "başvuru-log-kanal"){
     if(db.has(`başvuru-log_${message.guild.id}`)) return message.channel.send("Bu kanal zaten ayarlanmış.Sıfırlamak için **!başvuru-ayarla sıfırla**")
     let başvurulog = message.mentions.channels.first();
     if(!başvurulog) return message.channel.send("Lütfen kanal seçiniz.")
     db.set(`başvuru-log_${message.guild.id}`, başvurulog.id)
     message.channel.send("başvuru-log kanalı başarıyla ayarlandı")
  }
   if(args[0] === "başvuru-giden-kanal"){
     if(db.has(`basvuruk_${message.guild.id}`)) return message.channel.send("Bu kanal zaten ayarlanmış.Sıfırlamak için **!başvuru-ayarla sıfırla**")
     let basvurukanal = message.mentions.channels.first();
     if(!basvurukanal) return message.channel.send("Lütfen kanal seçin.")
     db.set(`basvuruk_${message.guild.id}`, basvurukanal.id)
     message.channel.send("Başvuru kanalı başarıyla ayarlandı")}
  if(args[0] === "yetkili"){
    if(db.has(`byetkili_${message.guild.id}`)) return message.channel.send("Yetkili zaten ayarlanmış.")
    let yetkilirol = message.mentions.roles.first();
    if(!yetkilirol) return message.channel.send("Lütfen rol seçin.")
    db.set(`byetkili_${message.guild.id}`, yetkilirol.id)
    message.channel.send("Başarıyla ayarlandı.")
  }
   if(args[0] === "sıfırla"){
     if(!db.has(`başvuru-ekle_${message.guild.id}`)) return message.channel.send("Kanallar önceden ayarlanmamış.")
     if(!db.has(`başvuru-log_${message.guild.id}`)) return message.channel.send("Kanallar önceden ayarlanmamış.")
     if(!db.has(`basvuruk_${message.guild.id}`)) return message.channel.send("Kanallar önceden ayarlanmamış.")
     if(!db.has(`basvuruk_${message.guild.id}`)) return message.channel.send("Rol önceden ayarlanmamış")
     db.delete(`basvuruk_${message.guild.id}`)
     db.delete(`başvuru-log_${message.guild.id}`)
     db.delete(`başvuru-ekle_${message.guild.id}`)
     db.delete(`byetkili_${message.guild.id}`)
     message.channel.send("Başarıyla sıfırlandı.")
     

   }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['başvuruayarla'],
  permLevel: 0,
};

exports.help = {
  name: 'başvuru-ayarla',
  description: "başvuru List Ayarları",
  usage: 'başvuruayarla'
};