const Discord = require('discord.js');
const db = require("quick.db")

exports.run = async(yashinu, message, args) => {
  
  
  
  message.delete()
  let uye = message.mentions.users.first()
  if(!uye){
      if(!db.fetch(`para_${message.author.id}`)){
        db.set(`para_${message.author.id}`, 0)
      }
      if(!db.fetch(`elmas_${message.author.id}`)){
        db.set(`elmas_${message.author.id}`, 0)
      }
      if(!db.fetch(`altin_${message.author.id}`)){
        db.set(`altin_${message.author.id}`, 0)
      }
      if(!db.fetch(`demir_${message.author.id}`)){
        db.set(`demir_${message.author.id}`, 0)
      }
      if(!db.fetch(`neodnium_${message.author.id}`)){
        db.set(`neodnium_${message.author.id}`, 0)
      }
      if(!db.fetch(`titanyum_${message.author.id}`)){
        db.set(`titanyum_${message.author.id}`, 0)
      }
      if(!db.fetch(`texnonium_${message.author.id}`)){
        db.set(`texnonium_${message.author.id}`, 0)
      }
      let para = db.fetch(`para_${message.author.id}`)
      let elmas = db.fetch(`elmas_${message.author.id}`)
      let altin = db.fetch(`altin_${message.author.id}`)
      let demir = db.fetch(`demir_${message.author.id}`)
      let texnonium = db.fetch(`texnonium_${message.author.id}`)
      let neodium = db.fetch(`neodnium_${message.author.id}`)
      let titanyum = db.fetch(`titanyum_${message.author.id}`)
      const param = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle(message.author.username+"'in parası")
      .setAuthor("Texno Ekonomi","https://media.discordapp.net/attachments/800024849187733526/813480716075270184/TexnoNium.png","https://youtube.com/c/texnovideo")
      .setDescription(`💸 **T.Paranız** : ${texnonium}\n\n💸 Neodniumunuz : ${neodium}\n💸 Titanyumunuz : ${titanyum}\n💸 Elmasınız : ${elmas}\n💸 Altınınız : ${altin}\n💸 Demiriniz : ${demir}\n\n💸 **Paranız :** ${para}`)
      .setFooter("Texno Ekonomi","https://media.discordapp.net/attachments/800024849187733526/813480716075270184/TexnoNium.png")
      .setImage("https://cdn.discordapp.com/attachments/813019323425488927/813020080571940894/Iskl_cizgi_dc_icin.gif")  
      message.channel.send(param).then(s => s.delete({ timeout: 15000 }));
  }
  if(uye){
      if(!db.fetch(`para_${uye.id}`)){
        db.set(`para_${uye.id}`, 0)
      }
      if(!db.fetch(`elmas_${uye.id}`)){
        db.set(`elmas_${uye.id}`, 0)
      }
      if(!db.fetch(`altin_${uye.id}`)){
        db.set(`altin_${uye.id}`, 0)
      }
      if(!db.fetch(`demir_${uye.id}`)){
        db.set(`demir_${uye.id}`, 0)
      }
      if(!db.fetch(`neodnium_${uye.id}`)){
        db.set(`neodnium_${uye.id}`, 0)
      }
      if(!db.fetch(`titanyum_${uye.id}`)){
        db.set(`titanyum_${uye.id}`, 0)
      }
      if(!db.fetch(`texnonium_${uye.id}`)){
        db.set(`texnonium_${uye.id}`, 0)
      }
      let texnonium = db.fetch(`texnonium_${uye.id}`)
      let neodium = db.fetch(`neodnium_${uye.id}`)
      let titanyum = db.fetch(`titanyum_${uye.id}`)
      let para = db.fetch(`para_${uye.id}`)
      let elmas = db.fetch(`elmas_${uye.id}`)
      let altin = db.fetch(`altin_${uye.id}`)
      let demir = db.fetch(`demir_${uye.id}`)
      const param = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle(uye.username+"'in parası")
      .setAuthor("Strom Ekonomi")
      .setDescription(`💸 **Üyenin Paranız** : ${texnonium}\n\n<a:tvhypesquad:800045471573082182> Üyenin neodniumunuz : ${neodium}\n<a:B_Kristal:813086838067429406> Üyenin titanyumu : ${titanyum}\n<a:tvelmas:800045836100173854> Üyenin elması : ${elmas}\n<:tvaltin:800028839358365727> Üyenin altını : ${altin}\n<:tvdemir:813087299872751736> Üyenin demiri : ${demir}\n\n<a:para:813049788881829928> **Üyenin parası :** ${para}`)
      .setFooter("Strom Ekonomi")
      .setImage("https://cdn.discordapp.com/attachments/813019323425488927/813020080571940894/Iskl_cizgi_dc_icin.gif")  
      message.channel.send(param).then(s => s.delete({ timeout: 15000 }));
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["money","cash","cüzdan","cuzdan","para"],
  permLevel: 0
};

exports.help = { 
  name: 'param', 
  description: '',
  usage: '',
};