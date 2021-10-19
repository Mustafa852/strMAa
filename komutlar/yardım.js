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
    .setDescription(`**Bota Oy Vermek için** [TIKLA](https://top.gg/bot/756883309270663229/vote)
  **Bota yorum atıp 5 yıldız vermeyi unutma :)** [TIKLA](https://top.gg/bot/756883309270663229)
  
  **<a:rainbow:855248569136578570> tag** \`Destek sunucusunun tagını gösterir.\`\n
  **<a:rainbow:855248569136578570> ${prefix}kayıt-sistemi**  \`Kayıt Komutlarını Gösterir.\`  \n
  **<a:rainbow:855248569136578570> ${prefix}moderasyon-sistemi**  \`Moderasyon komutlarını gösterir.\` \n
  **<a:rainbow:855248569136578570> ${prefix}guard-sistemi**  \`Koruma Komutlarını Gösterir.\` \n
  **<a:rainbow:855248569136578570> ${prefix}mutesistem**  \`İlk Olarak Kurulum Yapınız.\`\n
  **<a:rainbow:855248569136578570> ${prefix}kasa-yardım**  \`kasa Komutlarını Gösterir.\` \n
  **<a:rainbow:855248569136578570> ${prefix}say**  \`Sunucu Bilgilerini Gösterir.\` \n
  **<a:rainbow:855248569136578570> ${prefix}yardım-sunucu-kur**\`Sunucu-kur komutlarını gösterir.\`\n
  **<a:rainbow:855248569136578570> ${prefix}rütbe-yardım**\`rütbe sistemini gösterir. \`\n
  **<a:rainbow:855248569136578570> ${prefix}eğlence-yardım**\`Eğlence komutlarını gösterir.\` \n
  **<a:rainbow:855248569136578570> ${prefix}jail-yardım**\`jail.\` \n
`
    
    
  )
    .setFooter( "Strom / Discord'da Yeni Devrim!", client.user.avatarURL())
  return message.channel.send(embed);
},

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yardım","yardim"],
  permLevel: 0
};

exports.help = {
  name: "yardım",
  description: "a!davet-sistemi Menüsü",
  usage: "yardım"
};
