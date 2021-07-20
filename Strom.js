const express = require("express")
const app = express()
app.get("/foo", (req, res, next) => {
    const foo = JSON.parse(req.body.jsonString)
})
process.on("unhandledRejection", (reason, promise) => {})



const Strom = require('discord.js');
const client = new Strom.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util, Collection } = require('discord.js');
const Database = require("./Helpers/Database");
const Invites = new Collection(); //
const fs = require('fs');
const db = require('quick.db');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');
const ms = require('ms');
const fetch = require('node-fetch')



setInterval(async () => {
  await fetch('https://glitch.com/edit/#!/yedek-public').then(console.log('Uptimed!'))
}, 20000)

let prefix = ayarlar.prefix;

client.ekoayarlar = {
  parabirimi: "TL", //Para Birimi TL İsterseniz Dolar Euro Vb. Para Birimleri Girebilirsiniz.
  botunuzunprefixi: "!",
  botunuzunidsi: "756883309270663229",
  botismi: "Strom Public",
  renk: "RANDOM", //İNGİLİZCE TERCİH ETTİĞİNİZ RENGİ YAZINIZ! EĞER BÖYLE BIRAKIRSANIZ RASTGELE ATAR!
  isimsiz: "Bilinmiyor", //İSİMSİZ KİŞİLERİN HANGİ İSİM İLE GÖZÜKECEĞİNİ BELİRLEYEBİLİRSİNİZ!
  rastgelepara: true, //EĞER BUNU TRUE YAPARSANIZ RASTGELE PARA VERME ÖZELLİĞİ AKTİF OLUR VE GÜNLÜK PARALARI RASTGELE VERİR!
  minpara: 100, //EĞER RASTGELE PARA DURUMUNU AKTİF ETTİYSENİZ BURADAN RASTGELE PARA PARAMETRESİNİNİN MİNUMUM PARASINI BELİRTİNİZ!
  maxpara: 500, //EĞER RASTGELE PARA DURUMUNU AKTİF ETTİYSENİZ BURADAN RASTGELE PARA PARAMETRESİNİNİN MAXİMUM PARASINI BELİRTİNİZ!
  günlükpara: 100, //EĞER RASTGELE PARAYI TRUE YAPTIYSANIZ BURAYI ELLEMENİZE GEREK YOK!
  dbloy: true, //EĞER BOTUNUZ DBL (DİSCORD BOT LİST) DE KAYITLIYSA GÜNLÜK ÖDÜL ALMAK İÇİN OY İSTER FALSE KAPALI, TRUE AKTİF DEMEK!
  dblkey: "https://top.gg/bot/756883309270663229/vote", //EĞER DBLOY U AKTİF ETMEDİYSENİZ BURAYA KEY EKLEMENİZE GEREK YOK EĞER AKTİF ETTİYSENİZ DBL SİTESİNDEN BULABİLİRSİNİZ!
  dblmsj: "Bu komutu kullanabilmek için bota oy vermelisiniz. Oy vermek için !oyver", //EĞER DBLOY U AKTİF ETMEDİYSENİZ BURAYA MESAJ YAZMANIZA GEREK YOK! EĞER AKTİF ETTİYSENİZ BOTA OY VERMEK İÇİN HANGİ MESAJI YAZACAĞINI AYARLAYABİLİRSİNİZ.
  başlangıçparası: 50, //EĞER RASTGELE PARAYI TRUE YAPTIYSANIZ BURAYI ELLEMENİZE GEREK YOK!
  admin: ["846736343593779230"]//["id","",""]
}

const log = message => {
    console.log(`${message}`);
};
client.commands = new Strom.Collection();
client.aliases = new Strom.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`${props.help.name} Komutu Yüklendi.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};



client.on("guildMemberAdd", async member => {
    let kanal = await db.fetch(`hgkanal_${member.guild.id}`) 
    if(!kanal || !kanal) return
    let sonuç = kanal - member.guild.memberCount
     let user = client.users.cache.get(member.id);
  let yetkilirole = db.fetch(`yetkilirole_${member.guild.id}`)
  require("moment-duration-format");
    let kurulus = new Date().getTime() - user.createdAt.getTime();  
    var kontrol;
if (kurulus < 1296000000) kontrol = '**Şüpheli**'
if (kurulus > 1296000000) kontrol = '**Güvenli**'
  moment.locale("tr");
  const embed = new Strom.MessageEmbed()
    .setTitle(member.guild.name + ` Sunucusuna Hoş Geldin!`)
    .setDescription(`${member} **Bizde Seni Bekliyorduk..**
  \nSeninle Birlikte \`${member.guild.memberCount}\` Kişiyiz!
  \nKaydının yapılması için **sesli odaya** gelip ses vermen yeterli.
  \nSunucumuzdaki kaydını yapmak için <@&${yetkilirole}> Rolündekilerle İletişime Geçebilirsin.
  \nHesap Durumu ${moment(member.user.createdAt).format("**DD MMMM YYYY dddd (hh<:mm:723226315972673658>ss)**") } - ${kontrol}`)
  client.channels.cache.get(kanal).send(`<@&${yetkilirole}>`)
  client.channels.cache.get(kanal).send(embed)
  return
    })

client.login(process.env.token);

//----------komut------------//

//ototag//
client.on('guildMemberAdd', async member => {
  
  let tag = await db.fetch(`tag_${member.guild.id}`);
  let tagyazi;
  if (tag == null) tagyazi = member.setNickname(`${member.user.username}`)
  else tagyazi = member.setNickname(`${tag} | ${member.user.username}`)
});
//ototagson//


client.on('message', message => {
let prefix = ayarlar.prefix;
if (message.content === `<@${client.user.id}>`) {
 message.reply(`Prefix'im: **${prefix}**, Yardım için: **${prefix}yardım**
 __**https://discord.gg/FV2rwt6GRF**__ Tarafından kodlandım!`)
}
});


///tag//

client.on('message', message => {
let prefix = ayarlar.prefix;
if (message.content === `tag`) {
 message.reply(`**Tagımızı Alarak Bize Destek Çıkabilirsin! Tag: ℬ **`)
}
});



//kanalkoruma//
client.on("roleDelete", async role => {
  let synx2 = await db.fetch(`synx_${role.guild.id}`);
  if (synx2) {
    const entry = await role.guild
      .fetchAuditLogs({ type: "ROLE_DELETE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    role.guild.roles.create({
      data: {
        name: role.name,
        color: role.color,
        hoist: role.hoist,
        permissions: role.permissions,
        mentionable: role.mentionable,
        position: role.position
      },
      reason: "Silinen Roller Tekrar Açıldı."
    });
  }
});

//

client.on("roleCreate", async role => {
  let synx = await db.fetch(`synx_${role.guild.id}`);
  if (synx) {
    const entry = await role.guild
      .fetchAuditLogs({ type: "ROLE_CREATE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    role.delete();
  }
});

//

client.on("channelDelete", async function(channel) {
  let rol = await db.fetch(`kanalk_${channel.guild.id}`);

  if (rol) {
    const guild = channel.guild.cache;
    let channelp = channel.parentID;

    channel.clone().then(z => {
      let kanal = z.guild.channels.find(c => c.name === z.name);
      kanal.setParent(
        kanal.guild.channels.find(channel => channel.id === channelp)
      );
    });
  }
});

//

client.on("emojiDelete", async (emoji, message, channels) => {
  let emojik = await db.fetch(`emojik_${emoji.guild.id}`);
  if (emojik) {
    const entry = await emoji.guild
      .fetchAuditLogs({ type: "EMOJI_DELETE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == emoji.guild.owner.id) return;
    if (
      !emoji.guild.members.cache
        .get(entry.executor.id)
        .hasPermission("ADMINISTRATOR")
    ) {
      emoji.guild.emojis
        .create(`${emoji.url}`, `${emoji.name}`)
        .catch(console.error);
    }
  }
});

//kanalkorumason//

//küfürengel//



client.on("message", async msg => {
  
  
  let a = await db.fetch(`kufur_${msg.guild.id}`)
    if (a == 'acik') {
      const küfür = [
        "mk", "amk", "aq", "orospu", "oruspu", "oç", "sikerim", "yarrak", "piç", "amq", "sik", "amcık", "çocu", "sex", "seks", "amına", "orospu çocuğu", "sg", "siktir git","A M K","A m K","a M K","a m k","porno","p o r n o","ororspu çocugu","orusbu","orusbu çocuğu","orosbu cocu","orospu cocu","orosbuçoocu","anancı","anneni sikeyim","ananı sikeyim","annen piç","anai sikeyim","ananı sikeyim","ananı skm","anneni skm","anneni sikm"
                  ]
            if (küfür.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("MANAGE_GUILD")) {
                  msg.delete();
                          
                    return msg.channel.send(`${msg.author},  **Kanka Naber? Sanırsam Küfür Ediyorsun Fakat Ben Buradayken Bunu Yapamazsınn :))`).then(msg => msg.delete(10000));
            }              msg.author
                } catch(err) {
                  console.log(err);
                }
              }
          }
          if (!a) return;
          })



////Bot DM

client.on("message", msg => {
var dm = client.channels.cache.get("826137261363560488")
if(msg.channel.type === "dm") {
if(msg.author.id === client.user.id) return;
const botdm = new Strom.MessageEmbed()
.setTitle(`${client.user.username} Dm`)
.setTimestamp()
.setColor("RED")
.setThumbnail(`${msg.author.avatarURL()}`)
.addField("Gönderen", msg.author.tag)
.addField("Gönderen ID", msg.author.id)
.addField("Gönderilen Mesaj", msg.content)

dm.send(botdm)

}
if(msg.channel.bot) return;
});


////Bot Dm son



////Bot istatistiklerini atar

client.on('ready', () => {
  const moment = require("moment");
require("moment-duration-format");

 setInterval(() => {
const calismasure = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
let botdurum = client.channels.cache.find(c => c.id === '826129251690086420')//Botun sürekli mesaj atacağı kanal.
const botistatistik = new Strom.MessageEmbed()
	.setColor('RED')
	.setTitle('= Bot İstatistikleri =')
	
.addField(`RAM`,`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/512mb`)
.addField(`Çalışma Süresi`,`${calismasure}`)
.addField(`Ping`,`${client.ws.ping}`)
.addField(`discord.js`,`v${Strom.version}`)
.addField(`Bilgi`,`${client.guilds.cache.size.toLocaleString()} sunucu ve ${client.users.cache.array().length} kullanıcıya hizmet veriyor.`)
.setTimestamp()
.setFooter('Strom');
//https://cnslink.cf
botdurum.send(botistatistik);

  }, 300000); //Milisaniye cinsinden. 1 saniye =  1000 milisaniye. Örnek Olarak 1 saat = 3600000milisaniye
  //https://convertlive.com/tr/u/dönüştürmek/milisaniye/a/saniye Bu siteden hesaplamasını yapabilirsiniz.
});




///Bot i son




//////UPTİME 

const { Uptime } = require("better-uptime")

var uptime = new Uptime({
  url: "https://glitch.com/edit/#!/strom-public-bot",
  time: 1,
  time_type: 'minute',
  callback: "console.log('uptime oldu')"
})


////UPTİME SON



//-------------------- Mod Log Sistemi --------------------//

client.on("channelCreate", async channel => {
  const c = channel.guild.channels.cache.get(
    db.fetch(`narcosmodlog_${channel.guild.id}`)
  );
  if (!c) return;
  var embed = new Strom.MessageEmbed()
    .addField(
      `Kanal oluşturuldu`,
      ` İsmi: \`${channel.name}\`\n Türü: **${channel.type}**\nID: ${channel.id}`
    )
    .setTimestamp()
    .setColor("BLUE")
    .setFooter( "Strom / Discord'da Yeni Devrim!", client.user.avatarURL())
  c.send(embed);
});

client.on("guildMemberBoost", async (member, guild) => {
  const c = member.guild.channels.cache.get(
    db.fetch(`narcosmodlog_${member.guild.id}`)
  );
   if (!c) return;
    var embed = new Strom.MessageEmbed()
      .addField(
        `WUHU, BOOST BASILDI!`,
        ` Boost Basan: \`${member}\`\n Sunucu Boost Seviyesi: **${member.guild.premiumTier}/3**\nSunucu Boost Sayısı: **${member.guild.premiumSubscriptionCount}**`
      )
      .setTimestamp()
      .setColor("BLUE")
      .setFooter( "Strom / Discord'da Yeni Devrim!", client.user.avatarURL())
    c.send(embed);

});

client.on("guildMemberUnboost", async (member, guild) => {
  const c = member.guild.channels.cache.get(
    db.fetch(`narcosmodlog_${member.guild.id}`)
  );
   if (!c) return;
    var embed = new Strom.MessageEmbed()
      .addField(
        `Bir boost geri çekildi.`,
        ` Boost'u Çeken: \`${member}\`\n Sunucu Boost Seviyesi: **${member.guild.premiumTier}/3**\nSunucu Boost Sayısı: **${member.guild.premiumSubscriptionCount}**`
      )
      .setTimestamp()
      .setColor("BLUE")
      .setFooter( "Strom / Discord'da Yeni Devrim!", client.user.avatarURL())
    c.send(embed);

});

client.on("channelDelete", async channel => {
  const c = channel.guild.channels.cache.get(
    db.fetch(`narcosmodlog_${channel.guild.id}`)
  );
  if (!c) return;
  let embed = new Strom.MessageEmbed()
    .addField(
      `Kanal silindi`,
      ` İsmi: \`${channel.name}\`\n Türü: **${channel.type}**\nID: ${channel.id}`
    )
    .setTimestamp()
    .setColor("BLUE")
    .setFooter( "Strom / Discord'da Yeni Devrim!", client.user.avatarURL())

  c.send(embed);
});

client.on("channelNameUpdate", async channel => {
  const c = channel.guild.channels.cache.get(
    db.fetch(`narcosmodlog_${channel.guild.id}`)
  );
  if (!c) return;
  var embed = new Strom.MessageEmbed()
    .addField(
      `Kanal İsmi değiştirildi`,
      ` Yeni İsmi: \`${channel.name}\`\nID: ${channel.id}`
    )
    .setTimestamp()
    .setColor("BLUE")
    .setFooter( "Strom / Discord'da Yeni Devrim!", client.user.avatarURL())
  c.send(embed);
});

client.on("emojiCreate", emoji => {
  const c = emoji.guild.channels.cache.get(
    db.fetch(`narcosmodlog_${emoji.guild.id}`)
  );
  if (!c) return;

  let embed = new Strom.MessageEmbed()
    .addField(
      `Emoji oluşturuldu`,
      ` İsmi: \`${emoji.name}\`\n GIF?: **${emoji.animated}**\nID: ${emoji.id}`
    )
    .setTimestamp()
    .setColor("BLUE")
    .setFooter( "Strom / Discord'da Yeni Devrim!", client.user.avatarURL())

  c.send(embed);
});
client.on("emojiDelete", emoji => {
  const c = emoji.guild.channels.cache.get(
    db.fetch(`narcosmodlog_${emoji.guild.id}`)
  );
  if (!c) return;

  let embed = new Strom.MessageEmbed()
    .addField(
      `Emoji silindi`,
      ` İsmi: \`${emoji.name}\`\n GIF? : **${emoji.animated}**\nID: ${emoji.id}`
    )
    .setTimestamp()
    .setColor("BLUE")
    .setFooter( "Strom / Discord'da Yeni Devrim!", client.user.avatarURL())

  c.send(embed);
});
client.on("emojiUpdate", (oldEmoji, newEmoji) => {
  const c = newEmoji.guild.channels.cache.get(
    db.fetch(`narcosmodlog_${newEmoji.guild.id}`)
  );
  if (!c) return;

  let embed = new Strom.MessageEmbed()
    .addField(
      `Emoji güncellendi`,
      ` Eski ismi: \`${oldEmoji.name}\`\n Yeni ismi: \`${newEmoji.name}\`\nID: ${oldEmoji.id}`
    )
    .setTimestamp()
    .setColor("BLUE")
    .setFooter( "Strom / Discord'da Yeni Devrim!", client.user.avatarURL())

  c.send(embed);
});

client.on("guildBanAdd", async (guild, user) => {
  const channel = guild.channels.cache.get(
    db.fetch(`narcosmodlog_${guild.id}`)
  );
  if (!channel) return;

  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
    .then(audit => audit.entries.first());

  let embed = new Strom.MessageEmbed()
    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
    .addField(
      `Kullanıcı banlandı`,
      ` İsmi: \`${user.username}\`\n ID: **${
        user.id
      }**\n Sebep: **${entry.reason || "Belirtmedi"}**\n Banlayan: **${
        entry.executor.username
      }#${entry.executor.discriminator}**`
    )
    .setTimestamp()
    .setColor("BLUE")
    .setFooter( "Strom / Discord'da Yeni Devrim!", client.user.avatarURL())

  channel.send(embed);
});

client.on("guildBanRemove", async (guild, user) => {
  const channel = guild.channels.cache.get(
    db.fetch(`narcosmodlog_${guild.id}`)
  );
  if (!channel) return;

  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
    .then(audit => audit.entries.first());

  let embed = new Strom.MessageEmbed()
    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
    .addField(
      `Kullanıcının banı açıldı`,
      ` İsmi: \`${user.username}\`\n ID: **${user.id}**\n Banı Kaldıran: **${entry.executor.username}#${entry.executor.discriminator}**`
    )
    .setTimestamp()
    .setColor("BLUE")
    .setFooter( "Strom / Discord'da Yeni Devrim!", client.user.avatarURL())

  channel.send(embed);
});

function extension(attachment) {

    let imageLink = attachment.split('.');

    let typeOfImage = imageLink[imageLink.length - 1];

    let image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);

    if (!image) return '';

    return attachment;

}

client.on("messageDelete", async message => {
  if (message.author.bot) return;

  const channel = message.guild.channels.cache.get(
    db.fetch(`narcosmodlog_${message.guild.id}`)
  );
  if (!channel) return;
  
      let image = message.attachments.size > 0 ? await extension(message.attachments.array()[0].url) : '';

 if (message.attachments.size < 1) {
  
  let embed = new Strom.MessageEmbed()
    .setAuthor(
      `${message.author.username}#${message.author.discriminator}`,
      message.author.avatarURL
    )
    .setTitle("Mesaj silindi")
    .addField(
      `Silinen mesaj : ${message.content}`,
      `Kanal: ${message.channel.name}`
    )
  
    //  .addField(`Kanal:`,`${message.channel.name}`)
    .setTimestamp()
    .setColor("BLUE")
    .setFooter( "Strom / Discord'da Yeni Devrim!", client.user.avatarURL())

  channel.send(embed);
 }else {
   if(message.content !== 0) {
   const embeds = new Strom.MessageEmbed()
       .setAuthor(
      `${message.author.username}#${message.author.discriminator}`,
      message.author.avatarURL
    )
    .setTitle("Mesaj silindi")
    .addField(
      `Silinen mesaj : ${message.content}`,
      `Kanal: ${message.channel.name}`
    )
  
    //  .addField(`Kanal:`,`${message.channel.name}`)
    .setTimestamp()
    .setColor("BLUE")
   .setImage(image)
    .setFooter( "Strom / Discord'da Yeni Devrim!", client.user.avatarURL())

  channel.send(embeds);
     }else {
          const embedabim = new Strom.MessageEmbed()
       .setAuthor(
      `${message.author.username}#${message.author.discriminator}`,
      message.author.avatarURL
    )
    .setTitle("Mesaj silindi")
    .setDescription(
      `Kanal: ${message.channel.name}`
    )
  
    //  .addField(`Kanal:`,`${message.channel.name}`)
    .setTimestamp()
    .setColor("BLUE")
   .setImage(image)
   .setFooter( "Strom / Discord'da Yeni Devrim!", client.user.avatarURL())

  channel.send(embedabim);
     }
 }
   
});


////GİF İÇİM

//------------------------ Halka Açık Random Gif Pp -----------------------//
//------------------------ Halka Açık Random Gif Pp -----------------------//
//------------------------ Halka Açık Random Gif Pp -----------------------//

client.on("userUpdate", async(Revenge, NYKS) => {
  
if(Revenge.avatarURL() === NYKS.avatarURL()) return;
let RevengePP = NYKS.avatarURL().split("?")[0]

const Kanal = client.channels.cache.filter(Revenge => Revenge.name === 'random-gif' && Revenge.type === 'text').array().forEach(Nucceteere => {
if (RevengePP.endsWith('.gif')) {
Nucceteere.send(new Strom.MessageAttachment(RevengePP))
}
const Kanal2 = client.channels.cache.filter(Revenge => Revenge.name === 'random-pp' && Revenge.type === 'text').array().forEach(Revenge => {
if (!RevengePP.endsWith('.gif')) {
Revenge.send(new Strom.MessageAttachment(RevengePP))
}
})
})
})


//------------------------ Halka Açık Random Gif Pp -----------------------//
//------------------------ Halka Açık Random Gif Pp -----------------------//
//------------------------ Halka Açık Random Gif Pp -----------------------//

//------------------------ Eklendim Atıldım -----------------------//
//------------------------ Eklendim Atıldım -----------------------//
//------------------------ Eklendim Atıldım -----------------------//

client.on('guildDelete', guild => {

let rrrsembed = new Strom.MessageEmbed()

.setColor("RED")
.setTitle("Bot Kicklendi")
.addField("Sunucu Adı:", guild.name)
.addField("Sunucu sahibi", guild.owner)
.addField("Sunucu Sahibi'nin İd'si", guild.ownerID)
.addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
.addField("Sunucudaki Kişi Sayısı:", guild.memberCount)

   client.channels.cache.get('857903634071027752').send(rrrsembed);
  
});

client.on('guildCreate', guild => {

let rrrsembed = new Strom.MessageEmbed()

.setColor("GREEN")
.setTitle("Bot Eklendi")
.addField("Sunucu Adı:", guild.name)
.addField("Sunucu sahibi", guild.owner)
.addField("Sunucu Sahibi'nin İd'si", guild.ownerID)
.addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
.addField("Sunucudaki Kişi Sayısı:", guild.memberCount)

   client.channels.cache.get('857903634071027752').send(rrrsembed);
  
});

//------------------------ Eklendim Atıldım -----------------------//
//------------------------ Eklendim Atıldım -----------------------//
//------------------------ Eklendim Atıldım -----------------------//



///////davet sistemi

const guildInvites = new Map();

client.on("ready", () => {
  client.guilds.cache.forEach(guild => {
    guild.fetchInvites()
    .then(invites => guildInvites.set(guild.id, invites))
    .catch(err => console.log(err));
    });
});
client.on('inviteCreate', async invite => {
  guildInvites.set(invite.guild.id, await invite.guild.fetchInvites())
});
client.on('guildMemberAdd', async member => {
  const cachedInvites = guildInvites.get(member.guild.id);
  const newInvites = await member.guild.fetchInvites();
  guildInvites.set(member.guild.id, newInvites);
  try {
    console.log("Davet Eklendi")
    const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses);
    const currentInvites = await db.get(`inv.${usedInvite.inviter.id}.total`)
    if(currentInvites) {
      db.set(`inv.${member.id}.inviter`, usedInvite.inviter.id)
      db.add(`${usedInvite.inviter.id}`, 1)
    } else {
      db.set(`inv.${usedInvite.inviter.id}.total`, 1)
      db.set(`inv.${member.id}.inviter`, usedInvite.inviter.id)
    }
  }
  catch(err) {
    console.log(err);
  }
});

client.on('guildMemberRemove', async member => {
  const inviter = await db.get(`inv.${member.id}.inviter`)
  const userinviter = await member.guild.members.fetch(`${inviter}`);
  const currentInvites = await db.get(`inv.${inviter}.total`)
  try {
    console.log("Davet Silindi")
    db.add(`inv.${inviter}.total`, -1)
    db.delete(`inv.${member.id}.inviter`)
  } catch(err) {
    console.log(err);
  }
});

////davet son


///hakiki davet sistemi

client.on("ready", () => {//
    client.guilds.cache.forEach(guild => {//
        guild.fetchInvites().then(_invites => {//
            Invites.set(guild.id, _invites);//
        }).catch(err => { });//
    });
});
client.on("inviteCreate", (invite) => {
    var gi = Invites.get(invite.guild.id);//
    gi.set(invite.code, invite);
    Invites.set(invite.guild.id, gi);//
});
client.on("inviteDelete", (invite) => {
    var gi = Invites.get(invite.guild.id);//
    gi.delete(invite.code);
    Invites.set(invite.guild.id, gi);//
});


client.on("guildCreate", (guild) => {
	guild.fetchInvites().then(invites => {
		Invites.set(guild.id, invites);
	}).catch(e => {})//
});

//
client.on("guildMemberAdd", (member) => {
    //const gi = new Collection().concat(Invites.get(member.guild.id));
    const db = new Database("./Servers/" + member.guild.id, "Invites"), gi = (Invites.get(member.guild.id) || new Collection()).clone(), settings = new Database("./Servers/" + member.guild.id, "Settings").get("settings") || {};//
    var guild = member.guild, fake = (Date.now() - member.createdAt) / (1000 * 60 * 60 * 24) <= 3 ? true : false, channel = guild.channels.cache.get(settings.Channel);//
    guild.fetchInvites().then(invites => {
        // var invite = invites.find(_i => gi.has(_i.code) && gi.get(_i.code).maxUses != 1 && gi.get(_i.code).uses < _i.uses) || gi.find(_i => !invites.has(_i.code)) || guild.vanityURLCode;
        var invite = invites.find(_i => gi.has(_i.code) && gi.get(_i.code).uses < _i.uses) || gi.find(_i => !invites.has(_i.code)) || guild.vanityURLCode;
        Invites.set(member.guild.id, invites);
        var content = `${member} is joined the server.`, total = 0, regular = 0, _fake = 0, bonus = 0;
        if(invite == guild.vanityURLCode) content = settings.defaultMessage ? settings.defaultMessage : `-member- is joined the server! But don't know that invitation he came up with. :tada:`;//
        else content = settings.welcomeMessage ? settings.welcomeMessage : `The -member-, joined the server using the invitation of the -target-.`;//

        if (invite.inviter) { 
            db.set(`invites.${member.id}.inviter`, invite.inviter.id); 
            if(fake){
                total = db.add(`invites.${invite.inviter.id}.total`, 1);
                _fake = db.add(`invites.${invite.inviter.id}.fake`, 1);
            }
            else{
                total = db.add(`invites.${invite.inviter.id}.total`, 1);
                regular = db.add(`invites.${invite.inviter.id}.regular`, 1);
            }
            var im = guild.member(invite.inviter.id);
            bonus = db.get(`invites.${invite.inviter.id}.bonus`) || 0;
            if(im) global.onUpdateInvite(im, guild.id, Number(total + Number(bonus)));
            
        }


        db.set(`invites.${member.id}.isfake`, fake);

        if(channel){
       channel.send(`${member} Adlı Kişi Sunucuya Katıldı **Davet Eden Şahıs:** ${invite.inviter.tag} (**${total + bonus}** Davet! :white_check_mark:)`)
        }
    }).catch();
});

client.on("guildMemberRemove", (member) => {
    const db = new Database("./Servers/" + member.guild.id, "Invites"), settings = new Database("./Servers/" + member.guild.id, "Settings").get("settings") || {};//
    var total = 0, bonus = 0, regular = 0, fakecount = 0, channel = member.guild.channels.cache.get(settings.Channel), content = settings.leaveMessage ? settings.leaveMessage : `${member} is left the server.`, data = db.get(`invites.${member.id}`);//
    if(!data){
        return;
    }
        if(data === null) data = "Bulunamadı"
    if(data.isfake && data.inviter){//
        fakecount = db.sub(`invites.${data.inviter}.fake`, 1);//
        total = db.sub(`invites.${data.inviter}.total`, 1);
    }
    else if(data.inviter){
        regular = db.sub(`invites.${data.inviter}.regular`, 1);//
        total = db.sub(`invites.${data.inviter}.total`, 1);
    }
    if(data.inviter) bonus = db.get(`invites.${data.inviter}.bonus`) || 0;//
    
    var im = member.guild.member(data.inviter)
    if(im) global.onUpdateInvite(im, member.guild.id, Number(total) + Number(bonus));//

    db.add(`invites.${data.inviter}.leave`, 1);
     if(channel){
        let user = client.users.cache.get(data.inviter)
     	channel.send(`${member.user.tag} Sunucudan Ayrıldı **Şahsı Davet Eden:** ${user.tag} (**${Number(total) + Number(bonus)}** Davet! :x:)`)
     }
});


global.onUpdateInvite = (guildMember, guild, total) => {
    if(!guildMember.manageable) return;
    const rewards = new Database("./Servers/" + guild, "Rewards").get("rewards") || [];//
    if(rewards.length <= 0) return;
    var taken = rewards.filter(reward => reward.Invite > total && guildMember.roles.cache.has(reward.Id));//
    taken.forEach(take => {
        guildMember.roles.remove(take.Id);
    });
    var possible = rewards.filter(reward => reward.Invite <= total && !guildMember.roles.cache.has(reward.Id));//
    possible.forEach(pos =>{
        guildMember.roles.add(pos.Id);
    });
}

///hakiki davet sistemi son



///afk sistemi

client.on("message" , async msg => {
  
  if(!msg.guild) return;
  if(msg.content.startsWith(ayarlar.prefix+"afk")) return; 
  
  let afk = msg.mentions.users.first()
  
  const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`)
  
  const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`)
 if(afk){
   const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`)
   const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`)
   if(msg.content.includes(kisi3)){

       msg.reply(`Etiketlediğiniz Kişi Afk \nSebep : ${sebep}`)
   }
 }
  if(msg.author.id === kisi){

       msg.reply(`Afk'lıktan Çıktınız`)
   db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkid_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`)
    msg.member.setNickname(isim)
    
  }
  
});

//afk son



///reklam engel

client.on("message", msg => {
  const veri = db.fetch(`${msg.guild.id}.reklam`);
  if (veri) {
    const reklam = [
      ".com",
      ".net",
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".org",
      ".com.tr",
      ".biz",
      "net",
      ".rf.gd",
      ".az",
      ".party",
      ".tv",
      "discord.gg",
      "youtube.com"
    ];
    if (reklam.some(word => msg.content.includes(word))) {
      try {
        if (!msg.member.permissions.has("BAN_MEMBERS")) {
          msg.delete();
          return msg
            .reply("**Kanka Naber? Sanırsam Reklam Yapıyorsun Fakat Ben Buradayken Bunu Yapamazsınn :))**.")
            .then(wiskyx => wiskyx.delete({ timeout: 5000 }));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!veri) return;
});

//REKLAM ENGEL

///son


//ANTİ RAİD

client.on("guildMemberAdd", async member => {
  let kanal =
    (await db.fetch(`antiraidK_${member.guild.id}`)) == "anti-raid-aç";
  if (!kanal) return;
  var synx2 = member.guild.owner;
  if (member.user.bot === true) {
    if (db.fetch(`botizin_${member.guild.id}.${member.id}`) == "aktif") {
      let synx = new Strom.MessageEmbed()
        .setColor("RANDOM")
        .setThumbnail(member.user.avatarURL())
        .setDescription(
          `**${member.user.tag}** (${member.id}) adlı bota bir yetkili izin verdi eğer kaldırmak istiyorsanız **!bot-izni kaldır <botid>**.`
        );
      synx2.send(synx);
    } else {
      let izinverilmemişbot = new Strom.MessageEmbed()
        .setColor("RANDOM")
        .setThumbnail(member.user.avatarURL())
        .setDescription(
          "**" +
            member.user.tag +
            "**" +
            " (" +
            member.id +
            ") " +
            "adlı bot sunucuya eklendi ve banladım eğer izin vermek istiyorsanız **" +
            "!bot-izni ver <botid>**"
        );
      member.kick(); // Eğer sunucudan atmak istiyorsanız ban kısmını kick yapın
      synx2.send(izinverilmemişbot);
    }
  }
});

//ANTİ RAİD SON


///sunucua özel





//---------------------------------KOMUTLAR---------------------------------\\
client.on('message', async message => {
     if(!ayarlar.sahip.includes(message.author.id)) return; 
  if (message.content === '.katıl') { 
    client.emit('guildMemberAdd', message.member);
    message.channel.send('Katılış Eventi Tetiklendi.')
      }
     if(!ayarlar.sahip.includes(message.author.id)) return; 
  if (message.content === '.ayrıl') { // 
    client.emit('guildMemberRemove', message.member);
   message.channel.send('Çıkış Eventi Tetiklendi.')
      }
  
    if(!ayarlar.sahip.includes(message.author.id)) return; 
  if (message.content === '.banekle') { // 
    client.emit('guildBanAdd', message.member);
   message.channel.send('Ban Eventi Tetiklendi.')
      }
  });

client.on("guildMemberAdd", async (member) => {
    let { oldu, hata, prefix, bot } = require("./ayarlar.json")
    let log = await db.fetch(`logkayıt.${member.guild.id}`)
    let destek = await db.fetch(`destekekibi.${member.guild.id}`)
    let kayıtalınacakrol = await db.fetch(`kayıtalınacakrol.${member.guild.id}`)
    let mesaj = await db.fetch(`kmesaj.${member.guild.id}`)
        let kmesajg = await db.fetch(`kmesajg.${member.guild.id}`)
                let kmesajr = await db.fetch(`kmesajr.${member.guild.id}`)

    let otoisim = await db.fetch(`otoisim.${member.guild.id}`)
    let kayıte = await db.fetch(`kayıte.${member.guild.id}`)
    let kayıtoto = await db.fetch(`otokayıt.${member.guild.id}`)
    let kayıty = await db.fetch(`kayıty.${member.guild.id}`) 
    let kmesajayarla = await db.fetch(`kmesajayarla.${member.guild.id}`)
      let kayıtkadın = await db.fetch(`kayıtkadın.${member.guild.id}`)
            let kmesaju = await db.fetch(`kmesaju.${member.guild.id}`)
            let kmesajt = await db.fetch(`kmesajt.${member.guild.id}`)

          let isimdüzen = await db.fetch(`isimdüzen.${member.guild.id}`)
     let kmesajembed = await  db.fetch(`kmesajembed.${member.guild.id}`)
let kmesajc = await db.fetch(`kmesajc.${member.guild.id}`)
    let member2 = member.user 
    let zaman = new Date().getTime() - member2.createdAt.getTime()
  var takizaman = [];
if(zaman < 604800000) {
takizaman = '**Tehlikeli**'
} else {
takizaman = `**Güvenli**`}require("moment-duration-format");
    moment.locale("tr")


  if(!kayıty) return 
    if(!kayıtalınacakrol) return 
if(!log) return
  if(!kmesajc) return
if(!kayıte) return
  if(!kayıtkadın) return
  if(kayıtoto) {
member.roles.add(kayıtoto) 
    
    
  }
  
    var takizaman2 = [];
if(zaman < 604800000) {
takizaman2 = '**Tehlikeli**'
} else {
takizaman2 = `**Güvenli**`}require("moment-duration-format");
  moment.locale("tr")
                  let kanal = client.channels.cache.get(log)

if(destek) {

    kanal.send(`<@&${kayıty}>`)
  }
  if(kmesajc) {
    
    
    if(kmesajembed) {
      
      let embed = new Strom.MessageEmbed()
      if(kmesajg) {
        embed.setImage(kmesajg)
      }
      if(kmesaju) {
        embed.setURL(kmesaju)
      }
      if(kmesajr) {
        embed.setColor(kmesajr)
      } else if(!kmesajr) {
        embed.setColor(oldu)
      }
      if(kmesajt) {
        embed.setAuthor(kmesajt)
      }
      let member2 = member.user
                let kanal = client.channels.cache.get(log)

        kanal.send(embed.setTitle(` Kayıt Sistemi`)
                   .setDescription(`${kmesajc.replace("{user:tehlike}", takizaman2)
        .replace("{user:ad}", member2.username)
                                                                                              .replace("{user:hastag}", `#${member2.discriminator}`)
//{guild:ad}
        .replace("{user:etiket}", member)
                                                    .replace("{user:durum}",  member.user.presence.activities[0] || 'Özel durumu yok')
        .replace("{user:id}", member2.id)
        .replace("{user:tag}", member2.tag)
        .replace("{user:kurulus}", moment(member.user.createdAt).format("DD MMMM YYYY, dddd (hh:mm)"))
        .replace("{guild:tehlike}", takizaman)
        .replace("{guild:bolge}", member.guild.region)
        .replace("{guild:uye}", member.guild.memberCount).replace("{guild:ad}", member.guild.name)
        .replace("{guild:yetkili}", `<@&${kayıty}>`).replace("{guild:kayıtsız}", `<@&${kayıtalınacakrol}>`)
}`).setFooter(` Kayıt Sistemi`))
      return
    } else if(!kmesajembed) {

      kanal.send(kmesajc.replace("{user:tehlike}", takizaman2)
        .replace("{user:ad}", member2.username)
                      .replace("{user:hastag}", `#${member2.discriminator}`)

        .replace("{user:etiket}", member)
                                                    .replace("{user:durum}",   member.user.presence.activities[0] || 'Özel durumu yok'

)

        .replace("{user:id}", member2.id)
        .replace("{user:tag}", member2.tag)
        .replace("{user:kurulus}", moment(member.user.createdAt).format("DD MMMM YYYY, dddd (hh:mm)"))
        .replace("{guild:tehlike}", takizaman)
                 .replace("{guild:bolge}", member.guild.region)
        .replace("{guild:uye}", member.guild.memberCount).replace("{guild:ad}", member.guild.name)
        .replace("{guild:yetkili}", `<@&${kayıty}>`).replace("{guild:kayıtsız}", `<@&${kayıtalınacakrol}>`)
)
      return
    }

    
  }


    

    
  
if(otoisim) {
  member.setNickname(otoisim)
  
}
  
  
})



client.on("guildMemberAdd", async (member) => {
    let { oldu, hata, prefix, bot } = require("./ayarlar.json")
let usercim = await db.fetch(`otorolu.${member.guild.id}`)
let botcum = await db.fetch(`otorolb.${member.guild.id}`)



if(!usercim) return 
  if(!botcum) return 


  

  
    if(member.user.bot === true) {
    member.roles.add(botcum)  

      return
    }
  
  
  member.roles.add(usercim)
  
  


  
  
})



//görsel engel
client.on("message", async message => {
  let kanal = db.fetch(`görselengel.${message.guild.id}`);
  if(message.channel.id == kanal){
    if(!message.attachments.first()){

      if(message.author.bot) return;
      message.delete()
      const embed = new Strom.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`${message.author}, Bu Kanalda Sadece Gif Veya Fotoğraf Paylaşabilirsiniz, Mesaj Değil!`)
      .setFooter(`${message.author.tag} UYARI!`)
      .setTimestamp()
      message.channel.send(embed).then(x => x.delete({timeout: 6000}))

    };
  
  };
});

//Anti Raid
client.on("guildMemberAdd", async member => {
  let antiraidcam = await db.fetch(`antiraidcam.${member.guild.id}`)
  
  if(!antiraidcam) return
  if (!member.guild) return
if (db.has(`antiraid_${member.guild.id}`) === false)
if (member.user.bot === false) return;
if (db.has(`botizin_${member.id}`) === true) return;
let antikanal = db.fetch(`antiraid_${member.guild.id}`)


if(member.user.bot === true) {
  

member.kick(member)
    let prefix2 = await db.fetch(`prefix.${member.guild.id}`) || ayarlar.prefix

  if(antikanal) {
    var embed = new Strom.MessageEmbed()
.setDescription(`**Sunucuya Bir Bot Eklendi Anti Raid Sistemi Aktif Olduğundan Bot Atıldı. Botu Sunucuya Sokmak İçin ${prefix2}botizni botunid**`)
    .setColor(ayarlar.oldu)
  member.guild.channels.cache.get(antikanal).send(embed) 
  }
}
})




//tehlike / tehlikesiz
client.on("guildMemberAdd", async member => {
  let { oldu, hata } = require("./ayarlar.json")
  let tehlikerol = await db.fetch(`gtehlike.${member.guild.id}`)
    let güvenlirol = await db.fetch(`ggüven.${member.guild.id}`)
    let log = await db.fetch(`logg.${member.guild.id}`)
let log2 = client.channels.cache.get(log)


  if(!tehlikerol) return
     let member2 = member.user 
    let zaman = new Date().getTime() - member2.createdAt.getTime()

  var takizaman = [];
if(zaman < 604800000) {
takizaman = '**Tehlikeli**'
  member.roles.add(tehlikerol)
  if(log) {
        log2.send(new Strom.MessageEmbed().setDescription(`Bu Kişi **7** Günün Altında Discorda Giriş Yaptığı İçin Ona <@&${tehlikerol}> Rolünü Verdim!`).setColor(oldu))

    return
  }
if(güvenlirol) {
  

} else {
takizaman = `**Güvenli**`}
  member.roles.add(güvenlirol)

  if(log) {
  
    log2.send(new Strom.MessageEmbed().setDescription(`Bu Kişi **7** Günün Altında Olmadığı İçin Ona <@&${güvenlirol}> Rolünü Verdim!`).setColor(oldu))
    
    return
  }
}
})



client.on("message", async message => {
  let premium = await db.fetch(`premium.${message.guild.id}`)
  if( message.content === "sa" || message.content === "Sa" || message.content === "Selamın Aleyküm" || message.content === "selamın aleyküm" || message.content === "sea" || message.content === "Sea") {

    
  if(premium) {

          if (message.content.length > 64) {

    let embed = new Strom.MessageEmbed()
    .setDescription("Hizaya Geçin. Bir Gold Üye Belirdi!")
    .setColor(ayarlar.oldu)
    message.channel.send(embed)
  } else {
    return
  }
  }
  }
})


client.on("message", async msg => {
  let prefix535 = await db.fetch(`prefix.${msg.guild.id}`) || ayarlar.prefix
    if(msg.content.includes(`<@${client.user.id}>`) || msg.content.includes(`<@!${client.user.id}>`)) {
  msg.channel.send({embed: {color: ayarlar.oldu, description: `
  Sunucudaki Prefixim: ${prefix535}
  Orijinal Prefixim: ${ayarlar.prefix}
  
  **__Prefixi Değiştirmek İçin : ${prefix}prefix ayarla ${prefix}__**`}})
}
  

});





////iism reklam engel
  // İsim Reklam Koruma
  client.on('guildMemberAdd', youthanasia => {
    if (db.has(`isimreklamkoruma.${youthanasia.guild.id}`) && youthanasia.user.username.toLowerCase().replace(/ /g, '').includes('discord.gg')) {
      youthanasia.send('İsminde reklam içerikli bir şey olabileceğinden dolayı seni yasakladım.').catch(err => console.warn('Bir kişiyi reklam içerikli isimden banladım ancak o kişiye mesaj yollayamadım.'));
      youthanasia.ban({ reason: 'Reklam içerikli kullanıcı adı.' });
    };
  });

  client.on('guildMemberUpdate', (rifleman, youthanasia) => {
    if (db.has(`isimreklamkoruma.${youthanasia.guild.id}`) && youthanasia.displayName.toLowerCase().replace(/ /g, '').includes('discord.gg')) {
      youthanasia.send('İsminde reklam içerikli bir şey olabileceğinden dolayı seni yasakladım.').catch(err => console.warn('Bir kişiyi reklam içerikli isimden banladım ancak o kişiye mesaj yollayamadım.'));
      youthanasia.ban({ reason: 'Reklam içerikli kullanıcı adı.' });
    };
  });


///isim reklam engel son


//sayaç

client.on("message", async message => {
  if (!message.guild) return;

  if (db.has(`sayac_${message.guild.id}`) === true) {
    if (db.fetch(`sayac_${message.guild.id}`) <= message.guild.members.cache.size) {
      const embed = new Strom.MessageEmbed()
        .setTitle(`Tebrikler ${message.guild.name}!`)
        .setDescription(`Başarıyla \`${db.fetch(`sayac_${message.guild.id}`)}\` kullanıcıya ulaştık! Sayaç sıfırlandı!`)
        .setColor("RANDOM");
      message.channel.send(embed);
      message.guild.owner.send(embed);
      db.delete(`sayac_${message.guild.id}`);
    }
  }
});
client.on("guildMemberRemove", async member => {
  const channel = db.fetch(`sKanal_${member.guild.id}`);
  if (db.has(`sayac_${member.guild.id}`) == false) return;
  if (db.has(`sKanal_${member.guild.id}`) == false) return;

    member.guild.channels.cache.get(channel).send(`**${member.user.tag}** Sunucudan ayrıldı! \`${db.fetch(`sayac_${member.guild.id}`)}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) - member.guild.memberCount}\` üye kaldı!`);
});
client.on("guildMemberAdd", async member => {
  const channel = db.fetch(`sKanal_${member.guild.id}`);
  if (db.has(`sayac_${member.guild.id}`) == false) return;
  if (db.has(`sKanal_${member.guild.id}`) == false) return;

    member.guild.channels.cache.get(channel).send(`**${member.user.tag}** Sunucuya Katıldı :tada:! \`${db.fetch(`sayac_${member.guild.id}`)}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) - member.guild.memberCount}\` üye kaldı!`);
});


//sayaç son




///caps engel

client.on("message", async msg => {
    if (msg.channel.type === "dm") return;
      if(msg.author.bot) return;  
        if (msg.content.length > 4) {
         if (db.fetch(`capslock_${msg.guild.id}`)) {
           let caps = msg.content.toUpperCase()
           if (msg.content == caps) {
             if (!msg.member.hasPermission("ADMINISTRATOR")) {
               if (!msg.mentions.users.first()) {
                 msg.delete()
                 return msg.channel.send(`<a:no2:823900130117812254> ${msg.author}, Bu sunucuda, büyük harf Kullanamazsın!`).then(m => m.delete(5000))
     }
       }
     }
   }
  }
});


///caps engel son


//// mute


client.on('roleDelete', async role => {
const data = await require('quick.db').fetch(`strom-mute-role.${role.guild.id}`);
if(data && data === role.id) require('quick.db').delete(`strom-mute-role.${role.guild.id}`); 
});


///mute son


///boost

const logs = require('discord-logs');
logs(client);

client.on('guildMemberBoost', (member) => {// 
let kanal = client.channels.cache.get('864544996337123348');
kanal.send(`${member.user.tag} kullanıcısı ${member.guild.name} sunucusuna boost bastı!`);
member.send(`${member.guild.name} sunucusuna boost bastığın için teşekkürler!`);
});//

///boost son


///bot yönetici yetkisi alma

client.on('guildMemberAdd', async member => {// chimp ᵈ♡#0110
if(member.user.bot) {
  
let rol = member.guild.roles.cache.find(c => c.name === member.user.username)
if(rol.managed) {
  
rol.setPermissions(['SEND_MESSAGES'])
member.guild.channels.random().send(`${member}, sunucuya girdi. Bende onun için oluşturulan rolde ki yönetici yetkisini aldım.`) }
  
}})// codare

///bot y.y.alma son



////seviye sistemi

client.cooldown = new Strom.Collection();
client.config = {
cooldown: 1 * 1000
}
client.db = require("quick.db");
client.on("message", async (message) => {
    if (!message.guild || message.author.bot) return;
    // XP
    exp(message);
function exp(message) {
    if (!client.cooldown.has(`${message.author.id}`) || (Date.now() - client.cooldown.get(`${message.author.id}`) > client.config.cooldown)) {
        let exp = client.db.add(`exp_${message.author.id}`, 1);
        let level = Math.floor(0.3 * Math.sqrt(exp));
        let lvl = client.db.get(`level_${message.author.id}`) || client.db.set(`level_${message.author.id}`,1);;
        if (level > lvl) {
            let newLevel = client.db.set(`level_${message.author.id}`,level);
            message.channel.send(`:tada: ${message.author.toString()}, Level atladın yeni levelin ${newLevel}!`);
        }
        client.cooldown.set(`${message.author.id}`, Date.now());
    }
}
});


///seviye son


//spamengel

//SPAM ENGEL


var authors = [];
var warned = [];

var messageLog = [];

client.on("message", async message => {
  const spam = await db.fetch(`spam.${message.guild.id}`);
  if (!spam) return;
  const maxTime = await db.fetch(
    `max.${message.guild.id}.${message.author.id}`
  );
  const timeout = await db.fetch(
    `time.${message.guild.id}.${message.author.id}`
  );
  db.add(`mesaj.${message.guild.id}.${message.author.id}`, 1);
  if (timeout) {
    const sayı = await db.fetch(
      `mesaj.${message.guild.id}.${message.author.id}`
    );
    if (Date.now() < maxTime) {
      if (message.member.hasPermission("BAN_MEMBERS")) return;
      message.channel
        .send(
          `<@${message.author.id}> **Kanka Naber? Sanırsam Spam Yapıyorsun Ben Buradayken Bunu Yapamazsınn :))**`
        )
        .then(msg => msg.delete({ timeout: 25000 }));
      return message.delete();
    }
  } else {
    db.set(`time.${message.guild.id}.${message.author.id}`, "ok");
    db.set(`max.${message.guild.id}.${message.author.id}`, Date.now() + 3000);
    setTimeout(() => {
      db.delete(`mesaj.${message.guild.id}.${message.author.id}`);
      db.delete(`time.${message.guild.id}.${message.author.id}`);
    }, 500); // default : 500
  }
});


//spamengel son


///up-time

const help = new Strom.MessageEmbed()
.setFooter("Strom  Uptime")
.setColor("RED")
.setThumbnail('https://i.imgur.com/4M7IWwP.gif')
.setDescription(`Selamlar, botunu uptime etmeye hazırmısın? \n artık kolay bir şekilde botunu 7/24 aktif edebilirsin! \n\n🤹 uptime olmak için \`!ekle [glitch linki]\` yazabilirsin \n🎭 Uptime ettiğin botlarımı görmek istiyorsun \`!göster\` `)








client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "!ekle") {
    var link = spl[1];
    fetch(link)
      .then(() => {
        if (
          db
            .get("linkler")
            .map(z => z.url)
            .includes(link)
        )
             return message.channel.send(new Strom.MessageEmbed().setFooter("Strom  Uptime").setColor("RED").setDescription("Projeniz Sistemimizde Zaten Var"));
        message.channel.send(new Strom.MessageEmbed().setFooter("Strom  Uptime").setColor("RED").setDescription("Projeniz Sistemimize Başarıyla Eklendi."));
        db.push("linkler", { url: link, owner: message.author.id });
      })
      .catch(e => {
        return message.channel.send(new Strom.MessageEmbed().setFooter("Strom  Uptime").setColor("RED").setDescription("Lütfen Bir Link Giriniz"));
      });
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "!göster") {
    var link = spl[1];
    message.channel.send(new Strom.MessageEmbed().setFooter("Strom  Uptime").setColor("RED").setDescription(`${db.get("linkler").length} Proje Aktif Tutuluyor!`));
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "!up-yardım") {
    var link = spl[1];
    message.channel.send(help);
  }
});


//son



// BOTUN İNTENTLERİNİ AÇMAYI UNUTMAYIN 

client.on("guildMemberAdd", member => {
    require("moment-duration-format")
      var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
      var üs = üyesayısı.match(/([0-9])/g)
      üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
      if(üs) {
        üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
          return {
            '0': `0`,
            '1': `1`,
            '2': `2`,
            '3': `3`,
            '4': `4`, // BOTUN OLDUĞU SUNUCUDA OLMA ŞARTI İLE HARAKETLİ EMOJİDE KOYABİLİRSİNİZ
            '5': `5`,
            '6': `6`,
            '7': `7`,
            '8': `8`,
            '9': `9`}[d];})}
    const kanal = member.guild.channels.cache.find(r => r.id === (ayarlar.hosgeldinKanal)); 
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
     const gecen = moment.duration(kurulus).format(` YY **[Yıl]** DD **[Gün]** HH **[Saat]** mm **[Dakika,]**`) 
    var kontrol;
  if (kurulus < 1296000000) kontrol = `Ve senin hesabın sunucumuza kayıt olmak için daha çok genç! :x: `
  if (kurulus > 1296000000) kontrol = `Ve senin hesabın sunucumuza kayıt olmak için tüm şartları karşılıyor! :ballot_box_with_check: `
    moment.locale("tr");
  
member.roles.add(ayarlar.kayıtsızRol)
member.roles.add(ayarlar.kayıtsızRol)
member.roles.add(ayarlar.kayıtsızRol)
  
    kanal.send(`
<a:pin:823900118213853184> Sunucumuza hoş geldin, <@`+ member + `>! Sayende sunucumuz **`+üyesayısı+`** kişi. <a:pin:823900118213853184>
    
<a:maden:823900106645831680> Sunucumuza kayıt olmak için soldaki ses kanallarından birine girmelisin! <a:maden:823900106645831680> 

<a:dance:823900180499660800>  Ayrıca hesabın 15 günden fazla bir süredir Discord'da bulunmalı.<a:dance:823900180499660800> 

`+kontrol+`
    
<a:alarm:823900110144012321> Ceza işlemlerin <#818504308273709107> kanalını okuduğun varsayılarak uygulanır. ( <@&819602002065358859> )`)});

client.login(process.env.TOKEN)


//Shadow Oracle Zed#0001
//----------------------------------------------------- TAG ROL ------------------------------------------------\\

// tag rol kodu bana ait değildir, geliştirip sizlere sundum.
client.on("userUpdate", async function(oldUser, newUser) { 
    const guildID = "796388765257695273"// sunucu ıd
    const roleID = "818220083921944578"// taglı rolünüzün ıd
    const tag = "ℬ"// tagınız
    const chat = '855224732291170364'// chat kanalı ıd
    const taglog = '855224732291170364' // log kanalı ıd
  
    const guild = client.guilds.cache.get(guildID)
    const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID)
    const member = guild.members.cache.get(newUser.id)
    const embed = new Strom.MessageEmbed().setAuthor(member.displayName, member.user.avatarURL({ dynamic: true })).setColor('#ff0010').setTimestamp().setFooter('Strom was here!');
    if (newUser.username !== oldUser.username) {
        if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
            member.roles.remove(roleID)
            client.channels.cache.get(taglog).send(embed.setDescription(`${newUser} Kullanıcısı tagımızı çıkardığı için taglı rolü alındı!`))
        } else if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
            member.roles.add(roleID)
            client.channels.cache.get(chat).send(`**Mükemmel! ${newUser} Tagımızı alarak ailemize katıldı! ||@here||**`)
            client.channels.cache.get(taglog).send(embed.setDescription(`${newUser} Kullanıcısı tagımızı aldığı için taglı rolü verildi!`))
        }
    }
   if (newUser.discriminator !== oldUser.discriminator) {
        if (oldUser.discriminator == "0001" && newUser.discriminator !== "0001") {
            member.roles.remove(roleID)
            client.channels.cache.get(taglog).send(embed.setDescription(`${newUser} Kullanıcısı etiket tagımızı çıkardığı için taglı rolü alındı!`))
        } else if (oldUser.discriminator !== "0001" && newUser.discriminator == "0001") {
            member.roles.add(roleID)-
            client.channels.cache.get(taglog).send(embed.setDescription(`${newUser} Kullanıcısı etiket tagımızı aldığı için taglı rolü verildi!`))
            client.channels.cache.get(chat).send(`**Mükemmel! ${newUser} Etiket tagımızı alarak ailemize katıldı!**`)
        }
    }
  
  })

//----------------------------------------------------- TAG ROL ------------------------------------------------\\