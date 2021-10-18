const Strom = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
const talkedRecently = new Set();
let botid = "756883309270663229";

exports.run = async (client, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "!";

  const embed = new Strom.MessageEmbed()
    .setAuthor(
      `${client.user.username} `,
      client.user.displayAvatarURL({ dynamic: true })
    )
    .setColor("#d02090")
    .setTitle(` **Strom Bot Yardım Menüsüne Hoşgeldiniz** `)
    .setDescription(
      `
  **<:sessiz:855393464606130207>  mute** Kişiyi Yazılı Kanalda Susturur\n


`
    
    
  
    )
    .setFooter(
      `${message.author.username} Tarafından İstendi.`,
      message.author.displayAvatarURL({ dynamic: true })
    );
  return message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yardım","mute-sistemi"],
  permLevel: 0
};

exports.help = {
  name: "mutesistem",
  description: "",
  usage: "yardım"
};
