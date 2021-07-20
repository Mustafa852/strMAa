const Discord = require("discord.js");
const Database = require("../Helpers/Database");
const data = require('quick.db');
exports.run = async (client, message, args) => {
  let açıkmı = await data.fetch(`premium.${message.guild.id}`)
  if(açıkmı) {

// premium açıksa yapılack işlemler buraya

} else { return message.channel.send(`${message.author}, bu komut premium bir komuttur. Bu sunucu da premium bulunmamakta.`) }
  
  
  const db = new Database("./Servers/" + message.guild.id, "Rewards");//
    var data = db.get(`rewards`) || {};//

    var list = data.sort((x, y) => y.targetInvite - x.targetInvite);//
      if(list.length === 0){
        var yok = new Discord.MessageEmbed()//
            .setAuthor("Hiç Bir Rank Ayarlanmamış")//
            .setDescription("Ayarlamak İçin !rütbe-ekle @ davetsayi");//
            return message.channel.send(yok);
        }

    var embed = new Discord.MessageEmbed()//
        .addField("Rütbeler", `
    ** **${list.splice(0, 10).map((item, index) => `\`${index + 1}.\` <@&${item.Id}>: \`${item.Invite} Davete\``).join("\n")}//pythonic
    `);

    message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'rütbeler',
  description: 'Logo Yaparsınız',
  usage: 'm-logo <yazı>'
};
