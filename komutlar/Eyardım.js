const Discord = require('discord.js');
const db = require("quick.db")

exports.run = async(yashinu, message, args) => {
  
  

  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setAuthor("Strom Ekonomi")
  .setFooter("Strom Ekonomi")
  .setDescription(`[***Komutlar***](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`)
  .addFields(
		{ 
      name: `> ***Para yollama işlemleri***`, 
      value: `\`!parayolla\`\n\`!demiryolla\`\n\`!altınyolla\`\n\`!elmasyolla\`\n\`!titanyumyolla\`\n\`!neodniumyolla\`\n\`!texnoniumyolla\`` ,  
      inline: true
    },

		{ 
      name: `> ***Para dönüştürme işlemleri***`, 
      value: `\`!demiral\`\n\`!altınal\`\n\`!elmasal\`\n\`!titanyumal\`\n\`!neodniumal\`\n\`!texnoniumal\`` , 
      inline: true
    },

		{ 
      name: `> ***Para kazanma işlemleri***`, 
      value: `\`!bahis\`\n\`!bilkazan\`\n\`!adamasmaca\`\n\`!günlük\`` , 
      inline: true
    },

		{ 
      name: `> ***Özel para birimleri***`, 
      value: `\`1 Texnonium = 10 Neodnium\`\n\`1 Neodnium = 10 Titanyum\`\n\`1 Titanyum = 10 Elmas\`` , 
      inline: true
    },

		{ 
      name: `> ***Para birimi geçişleri***`, 
      value: `\`1 Elmas = 10 Altın\`\n\`1 Altın = 10 Demir\`\n\`1 Demir = 10 Para\`` , 
      inline: true
    },


  )
  message.channel.send(embed).then(s => s.delete({ timeout: 50000 }));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ekonomi-yardım"],
  permLevel: 0
};

exports.help = { 
  name: 'ekonomi', 
  description: '',
  usage: '',
};