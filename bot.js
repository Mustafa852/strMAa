// CodeShare
const express = require('express');
const app = express();
const http = require('http');
    app.get("/", (request, response) => {
    console.log(`Bot Başarıyla Hostlandı.`);
    response.sendStatus(200);
    });
    app.listen(process.env.PORT);
    setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 280000);
// CodeShare 

const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const weather = require('weather-js')
const fs = require('fs');
const db = require('quick.db');
require('./util/eventLoader.js')(client);
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
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

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);
//////////////////////////////////////////////////////////////////////////////////

//-----------------------KOMUTLAR-----------------------\\

//-----------------TOPLAM ÜYE PANEL-----------------------\\

client.on("guildMemberAdd", message => {
  client.channels.get("722069370649575514").setName(`Toplam Üye • ${message.guild.memberCount}`);
});
client.on("guildMemberRemove", message => {
  client.channels.get("722069370649575514").setName(`Toplam Üye • ${message.guild.memberCount}`);
  
});

//---------------TOPLAM ÜYE PANEL SON---------------------\\

//-----------------------emojili kayıt--------------------\\
//-----------------------emojili kayıt--------------------\\
//-----------------------emojili kayıt--------------------\\

const events = {
	MESSAGE_REACTION_ADD: 'messageReactionAdd',
	MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};
client.on('raw', async event => {
	if (!events.hasOwnProperty(event.t)) return;
	const { d: data } = event;
	const anto = client.users.get(data.user_id);
	const channel = client.channels.get(data.channel_id) || await anto.createDM();
	if (channel.messages.has(data.message_id)) return;
	const message = await channel.fetchMessage(data.message_id);
	const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
	const reaction = message.reactions.get(emojiKey);
	client.emit(events[event.t], reaction, anto);
});
client.on('messageReactionAdd', (reaction, user) => {
  if (reaction.message.id == "728914948994105384") {//Geçerli olması istediğiniz mesajın ID'sini yazabilirsiniz.
    if (reaction.emoji.name == "jssi") {//Dilediğini emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).addRole(reaction.message.guild.roles.find('name', '👤・Kayıtlı Üye'))//Dilediğiniz rolün adını yazabilirsiniz.
	}
 
	if (reaction.emoji.name == "altyapisi") {//Dilediğiniz emojiyi koyabilirsiniz.
	  reaction.message.guild.members.get(user.id).addRole(reaction.message.guild.roles.find('id', '722069348902109256'))//Dilediğiniz rolün adını yazabilirsiniz.
	}
	if (reaction.emoji.name == "htmlsi") {//Dilediğiniz emojiyi koyabilirsiniz.
		reaction.message.guild.members.get(user.id).addRole(reaction.message.guild.roles.find('id', '722069349506220105'))//Dilediğiniz rolün adını yazabilirsiniz.
	  }
    	if (reaction.emoji.name == "jssi") {//Dilediğiniz emojiyi koyabilirsiniz.
		reaction.message.guild.members.get(user.id).addRole(reaction.message.guild.roles.find('id', '722069348109385838'))//Dilediğiniz rolün adını yazabilirsiniz.
	  }
    	if (reaction.emoji.name == "djs") {//Dilediğiniz emojiyi koyabilirsiniz.
		reaction.message.guild.members.get(user.id).addRole(reaction.message.guild.roles.find('id', '722069347413000193'))//Dilediğiniz rolün adını yazabilirsiniz.
	  }
   
  }
});
client.on('messageReactionRemove', (reaction, user) => {
	if (reaction.message.id == "mesaj id") {//Geçerli olması istediğiniz mesajın ID'sini yazabilirsiniz.
	  if (reaction.emoji.name == "emoji") {//Dilediğiniz emojiyi koyabilirsiniz.
		reaction.message.guild.members.get(user.id).removeRole(reaction.message.guild.roles.find('name', 'rol'))//Dilediğiniz rolün adını yazabilirsiniz.
	  }
	  if (reaction.emoji.name == "Emoji") {//Dilediğiniz emojiyi koyabilirsiniz.
		reaction.message.guild.members.get(user.id).removeRole(reaction.message.guild.roles.find('name', 'Rol'))//Dilediğiniz rolün adını yazabilirsiniz.
	  }
	  if (reaction.emoji.name == "Emoji") {//Dilediğiniz emojiyi koyabilirsiniz.
		  reaction.message.guild.members.get(user.id).removeRole(reaction.message.guild.roles.find('name', 'Rol'))//Dilediğiniz rolün adını yazabilirsiniz.
		}
     if (reaction.emoji.name == "Emoji") {//Dilediğiniz emojiyi koyabilirsiniz.
		  reaction.message.guild.members.get(user.id).removeRole(reaction.message.guild.roles.find('name', 'Rol'))//Dilediğiniz rolün adını yazabilirsiniz.
		}
	}
  });


//--------------------emojili kayıt son-------------------\\
//--------------------emojili kayıt son-------------------\\
//--------------------emojili kayıt son-------------------\\


//-----------------------Sayaç-----------------------\\
//-----------------------Sayaç-----------------------\\
//-----------------------Sayaç-----------------------\\

client.on("guildMemberAdd", async member => {
  let sayac = await db.fetch(`sayac_${member.guild.id}`);
  let skanal9 = await db.fetch(`sayacK_${member.guild.id}`);
  if (!skanal9) return;
  const skanal31 = member.guild.channels.find("name", skanal9);
  if (!skanal31) return;
  skanal31.send(`<a:Cyrus:710518349620314152> <a:ylans:710518316589907998> \`${ member.user.tag }\` Adlı Kullanıcı Sunucuya Katıldı. \`${sayac}\` Kullanıcı Olmaya \`${sayac - member.guild.members.size}\` Kullanıcı Kaldı ! <a:no:710518885320884366>  ` );
});

client.on("guildMemberRemove", async member => {
  let sayac = await db.fetch(`sayac_${member.guild.id}`);
  let skanal9 = await db.fetch(`sayacK_${member.guild.id}`);
  if (!skanal9) return;
  const skanal31 = member.guild.channels.find("name", skanal9);
  if (!skanal31) return;
  skanal31.send(`<a:Cyrus:710518349620314152> <a:ylans:710518316589907998> \`${  member.user.tag }\`Adlı Kullanıcı Sunucudan Ayrıldı. \`${sayac}\` Kullanıcı Olmaya \`${sayac - member.guild.members.size}\` Kullanıcı Kaldı ! <a:hyr:710518899526860870> `);
});

//-----------------------Sayaç Son-----------------------\\
//-----------------------Sayaç Son-----------------------\\
//-----------------------Sayaç Son-----------------------\\


//-----------------------Sa-As-----------------------\\
//-----------------------Sa-As-----------------------\\
//-----------------------Sa-As-----------------------\\
//-----------------------Sa-As-----------------------\\

client.on('message', async (msg, member, guild) => {
  let i = await  db.fetch(`saas_${msg.guild.id}`)
      if(i === 'açık') {
        if (msg.content.toLowerCase() === 'sa'){
          
        msg.reply('Aleyküm Selam, Hoşgeldin ');    
      }
      }
    });

client.on('message', async (msg, member, guild) => {
  let i = await  db.fetch(`saas_${msg.guild.id}`)
      if(i === 'açık') {
        if (msg.content.toLowerCase() === 'hi'){
          
        msg.reply('Hi welcome ');    
      }
      }
    });

//-----------------------Sa-As Son-----------------------\\
//-----------------------Sa-As Son-----------------------\\
//-----------------------Sa-As Son-----------------------\\
//-----------------------Sa-As Son-----------------------\\

//-----------------------Büyük Harf-----------------------\\
//-----------------------Büyük Harf-----------------------\\
//-----------------------Büyük Harf-----------------------\\
//-----------------------Büyük Harf-----------------------\\

   client.on("message", async msg => {
  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;
  if (msg.content.length > 4) {
    if (db.fetch(`capslock_${msg.guild.id}`)) {
      let caps = msg.content.toUpperCase();
      if (msg.content == caps) {
        if (!msg.member.hasPermission("ADMINISTRATOR")) {
          if (!msg.mentions.users.first()) {
            msg.delete();
            return msg.channel
              .send(`Bu sunucuda Caps Lock Engelleme sistemi kullanılıyor.Bu yüzden mesajını sildim!`)
              .then(m => m.delete(5000));
          }
        }
      }
    }
  }
});

//-----------------------Büyük Harf Son-----------------------\\
//-----------------------Büyük Harf Son-----------------------\\
//-----------------------Büyük Harf Son-----------------------\\
//-----------------------Büyük Harf Son-----------------------\\

//-----------------------Eklendim-Atıldım-----------------------\\
//-----------------------Eklendim-Atıldım-----------------------\\
//-----------------------Eklendim-Atıldım-----------------------\\
//-----------------------Eklendim-Atıldım-----------------------\\

//Bot Eklenme Mesaj Kodu
client.on('guildCreate', guild => {

let rrrsembed = new Discord.RichEmbed()

.setColor("GREEN")
.setTitle(`${guild.name} Sunucusuna Katıldım! :inbox_tray:`)
.addField('Katıldığım Sunucunun Sahibi', ` \`\`\`${guild.owner.user.username}\`\`\` `)
.addField('Sunucudaki Kişi Sayısı', ` \`\`\`${guild.memberCount}\`\`\` `)
.setThumbnail(`${guild.iconURL} `)

   client.channels.get('690670667531812919').send(rrrsembed);
 });

//Bot Atılma Mesaj Kodu
client.on('guildDelete', guild => {

let rrrsembed = new Discord.RichEmbed()

.setColor("RED")
.setTitle(`${guild.name} Sunucusundan Atıldım! :outbox_tray:`)
.addField('Atıldığım Sunucunun Sahibi', ` \`\`\`${guild.owner.user.username}\`\`\` `)
.addField('Sunucudaki Kişi Sayısı', ` \`\`\`${guild.memberCount}\`\`\` `)
.setThumbnail(`${guild.iconURL} `)

   client.channels.get('690670667531812919').send(rrrsembed);
 
});

//-----------------------Eklendim-Atıldım Son-----------------------\\
//-----------------------Eklendim-Atıldım Son-----------------------\\
//-----------------------Eklendim-Atıldım Son-----------------------\\
//-----------------------Eklendim-Atıldım Son-----------------------\\

//-----------------------Küfür Engel Link Engel-----------------------\\
//-----------------------Küfür Engel Link Engel-----------------------\\
//-----------------------Küfür Engel Link Engel-----------------------\\
//-----------------------Küfür Engel Link Engel-----------------------\\

client.on("message", async msg => {
    if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;
        
    let i = await db.fetch(`reklamFiltre_${msg.guild.id}`) 
          if (i == 'acik') {
              const reklam = ["discord.app", "discord.gg", "invite","discordapp","discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az",];
              if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
                try {
                  if (!msg.member.hasPermission("ADMINISTRATOR")) {
                    msg.delete();                   
                    let embed = new Discord.RichEmbed()
                    .setColor(0xffa300)
                    .setFooter('Reklam engellendi.', client.user.avatarURL)
                    .setAuthor(msg.guild.owner.user.username, msg.guild.owner.user.avatarURL)
                    .setDescription("Reklam sistemi, " + `***${msg.guild.name}***` + " adlı sunucunuzda reklam yakaladım.")
                    .addField('Reklamı yapan kişi', 'Kullanıcı: '+ msg.author.tag +'\nID: '+ msg.author.id, true)
                    .addField('Engellenen mesaj', msg.content, true)
                    .setTimestamp()                   
                    msg.guild.owner.user.send(embed)                       
                    return msg.channel.send(`${msg.author.tag}, Reklam Yapmak Yasak Bunu Biliyorsun.`).then(msg => msg.delete(25000));
                  }             
                } catch(err) {
                  console.log(err);
                }
              }
          }
          if (!i) return;
  });

client.on("message", async msg => {
    if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;
        
    let i = await db.fetch(`küfürFiltre_${msg.guild.id}`)  
          if (i == 'acik') {
              const küfür = ["amcık","sik","am", "yarrak", "orospu","piç", "sikerim", "sikik", "amına", "pezevenk", "yavşak", "ananı", "anandır", "orospu", "evladı", "göt", "pipi", "sokuk", "yarak", "bacını", "karını",];
              if (küfür.some(word => msg.content.toLowerCase().includes(word))) {
                try {
                  if (!msg.member.hasPermission("MANAGE_WEBHOOKS")) {
                    msg.delete();                    
                    let embed = new Discord.RichEmbed()
                    .setColor(0xffa300)
                    .setFooter('Küfür Sistemi', client.user.avatarURL)
                    .setAuthor(msg.guild.owner.user.username, msg.guild.owner.user.avatarURL)
                    .setDescription("Bot, " + `***${msg.guild.name}***` + " adlı sunucunuzda küfür yakaladım.")
                    .addField('Küfür Eden Kişi', 'Kullanıcı: '+ msg.author.tag +'\nID: '+ msg.author.id, true)
                    .addField('Engellenen mesaj', msg.content, true)
                    .setTimestamp()                   
                    msg.guild.owner.user.send(embed)                       
                    return msg.channel.send(`${msg.author}, Küfür Etmek Yasak! Senin Mesajını Özelden Kurucumuza Gönderdim.`).then(msg => msg.delete(25000));
                  }              
                } catch(err) {
                  console.log(err);
                }
              }
          }
          if (!i) return;
          });   


//-----------------------Küfür Engel Link Engel Son-----------------------\\
//-----------------------Küfür Engel Link Engel Son-----------------------\\
//-----------------------Küfür Engel Link Engel Son-----------------------\\
//-----------------------Küfür Engel Link Engel Son-----------------------\\


//-----------------------Modlog-----------------------\\
//-----------------------Modlog-----------------------\\
//-----------------------Modlog-----------------------\\
//-----------------------Modlog-----------------------\\
client.on('channelCreate', async channel => {
  const c = channel.guild.channels.get(db.fetch(`codeminglog_${channel.guild.id}`));
  if (!c) return;
    var embed = new Discord.RichEmbed()
                    .addField(`Kanal oluşturuldu`, ` İsmi: \`${channel.name}\`\n Türü: **${channel.type}**\n► ID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)
    c.send(embed)
});

client.on('channelDelete', async channel => {
  const c = channel.guild.channels.get(db.fetch(`codeminglog_${channel.guild.id}`));
  if (!c) return;
    let embed = new Discord.RichEmbed()
                    .addField(`Kanal silindi`, ` İsmi: \`${channel.name}\`\n Türü: **${channel.type}**\n��� ID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)

    c.send(embed)
});

   client.on('channelNameUpdate', async channel => {
  const c = channel.guild.channels.get(db.fetch(`codeminglog_${channel.guild.id}`));
  if (!c) return;
    var embed = new Discord.RichEmbed()
                    .addField(`Kanal İsmi değiştirildi`, ` Yeni İsmi: \`${channel.name}\`\n► ID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)
    c.send(embed)
});




client.on('emojiCreate', emoji => {
  const c = emoji.guild.channels.get(db.fetch(`codeminglog_${emoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.RichEmbed()
                    .addField(`Emoji oluşturuldu`, ` İsmi: \`${emoji.name}\`\n GIF?: **${emoji.animated}**\n► ID: ${emoji.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL)

    c.send(embed)
    });
client.on('emojiDelete', emoji => {
  const c = emoji.guild.channels.get(db.fetch(`codeminglog_${emoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.RichEmbed()
                    .addField(`Emoji silindi`, ` İsmi: \`${emoji.name}\`\n GIF? : **${emoji.animated}**\n► ID: ${emoji.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL)

    c.send(embed)
    });
client.on('emojiUpdate', (oldEmoji, newEmoji) => {
  const c = newEmoji.guild.channels.get(db.fetch(`codeminglog_${newEmoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.RichEmbed()
                    .addField(`Emoji güncellendi`, ` Eski ismi: \`${oldEmoji.name}\`\n Yeni ismi: \`${newEmoji.name}\`\n► ID: ${oldEmoji.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${newEmoji.client.user.username}#${newEmoji.client.user.discriminator}`, newEmoji.client.user.avatarURL)

    c.send(embed)
    });

client.on('messageDelete', async message => {    
  if(message.author.bot) return

    const channel = message.guild.channels.get(db.fetch(`codeminglog_${message.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.RichEmbed()
                    .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
                    .setTitle("Mesaj silindi")                
                    .addField(`Silinen mesaj : ${message.content}`,`Kanal: ${message.channel.name}`)
                  //  .addField(`Kanal:`,`${message.channel.name}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${message.client.user.username}#${message.client.user.discriminator}`, message.client.user.avatarURL)

    channel.send(embed)
});

client.on('messageUpdate', async(oldMessage, newMessage) => {
    if(oldMessage.author.bot) return;
    if(oldMessage.content == newMessage.content) return;

    const channel = oldMessage.guild.channels.get(db.fetch(`codeminglog_${oldMessage.guild.id}`));
    if(!channel) return;

    let embed = new Discord.RichEmbed()
    .setTitle("Mesaj güncellendi!")
    .addField("Eski mesaj : ",`${oldMessage.content}`)
    .addField("Yeni mesaj : ",`${newMessage.content}`)
    .addField("Kanal : ",`${oldMessage.channel.name}`)
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(`${oldMessage.client.user.username}#${oldMessage.client.user.discriminator}`,`${oldMessage.client.user.avatarURL}`)

    channel.send(embed)
});

client.on('roleCreate', async (role) => {    

    const channel = role.guild.channels.get(db.fetch(`codeminglog_${role.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.RichEmbed()
.addField(`Rol oluşturuldu`, ` ismi: \`${role.name}\`\n ID: ${role.id}`)                    
.setTimestamp()
.setColor("RANDOM")
.addField("Rol renk kodu : ",`${role.hexColor}`)
.setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL)

    channel.send(embed)
});

client.on('roleDelete', async (role) => {    

    const channel = role.guild.channels.get(db.fetch(`codeminglog_${role.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.RichEmbed()
.addField(`Rol silindi`, ` ismi: \`${role.name}\`\n ID: ${role.id}`)                    
.setTimestamp()
.setColor("RANDOM")
    .addField("Rol renk kodu : ",`${role.hexColor}`)
.setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL)

    channel.send(embed)
})
client.on('voiceStateUpdate', (oldMember, newMember) => {
  
 // if (!logA[oldMember.guild.id]) return;
  
  if (db.has(`codeminglog_${oldMember.guild.id}`) === false) return;
  
  var kanal = oldMember.guild.channels.get(db.fetch(`codeminglog_${oldMember.guild.id}`).replace("<#", "").replace(">", ""))
  if (!kanal) return;
  
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel

  if(oldUserChannel === undefined && newUserChannel !== undefined) {

    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`${newMember.user.tag} adlı kullanıcı \`${newUserChannel.name}\` isimli sesli kanala giriş yaptı!`)
    kanal.send(embed);
    
  } else if(newUserChannel === undefined){

    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`${newMember.user.tag} adlı kullanıcı sesli kanaldan çıkış yaptı!`)
    kanal.send(embed);
    
  }
});

//-----------------------Modlog Son-----------------------\\
//-----------------------Modlog Son-----------------------\\
//-----------------------Modlog Son-----------------------\\
//-----------------------Modlog Son-----------------------\\

//--------------------ROL KORUMA

client.on("roleDelete", async (role) => {
  let guild = role.guild;
  if(!guild.me.hasPermission("MANAGE_ROLES")) return;
  let koruma = db.fetch(`korumaacik_${role.guild.id}`)
  if(koruma == null) return; 
  let e = await guild.fetchAuditLogs({type: 'ROLE_DELETE'});
  let member = guild.members.get(e.entries.first().executor.id);
  if(!member) return;
  if(member.hasPermission("ADMINISTRATOR")) return;
  let mention = role.mentionable;
  let hoist = role.hoist;
  let color = role.hexColor;
  let name = role.name;
  let perms = role.permissions;
  let position = role.position
  role.guild.createRole({
    name: name,
    color: color,
    hoist: hoist,
    position: position,
    permissions: perms,
    mentionable: mention
  }).then(rol => {
    if(!db.has(`korumalog_${guild.id}`)) return;
    let logs = guild.channels.find(ch => ch.id === db.fetch(`korumalog_${guild.id}`));
    if(!logs) return db.delete(`korumalog_${guild.id}`); else {
      const embed = new Discord.RichEmbed()
      .setDescription(`Silinen Rol: <@&${rol.id}> (Yeniden oluşturuldu!)\nSilen Kişi: ${member.user}`)
      .setColor('RED')
      .setAuthor(member.user.tag, member.user.displayAvatarURL)
      logs.send(embed);
    }
})
  
  
  
})
client.on("channelDelete", async channel => {
  if(!channel.guild.me.hasPermission("MANAGE_CHANNELS")) return;
  let guild = channel.guild;
  const logs = await channel.guild.fetchAuditLogs({ type: 'CHANNEL_DELETE' })
  let member = guild.members.get(logs.entries.first().executor.id);
  if(!member) return;
  if(member.hasPermission("ADMINISTRATOR")) return;
  channel.clone(channel.name, true, true, "Kanal silme koruması sistemi").then(async klon => {
    if(!db.has(`korumalog_${guild.id}`)) return;
    let logs = guild.channels.find(ch => ch.id === db.fetch(`korumalog_${guild.id}`));
    if(!logs) return db.delete(`korumalog_${guild.id}`); else {
      const embed = new Discord.RichEmbed()
      .setDescription(`Silinen Kanal: <#${klon.id}> (Yeniden oluşturuldu!)\nSilen Kişi: ${member.user}`)
      .setColor('RED')
      .setAuthor(member.user.tag, member.user.displayAvatarURL)
      logs.send(embed);
    }
    await klon.setParent(channel.parent);
    await klon.setPosition(channel.position);
  })
})


//--------------------ROL KORUMA SON-----------------\\


//------------------OTOROL ---------------------------\\

client.on("guildMemberAdd", async member => {
  
 let kanal = db.fetch(`judgekanal_${member.guild.id}`)   
 let rol = db.fetch(`judgerol_${member.guild.id}`)
let mesaj = db.fetch(`judgemesaj_${member.guild.id}`)
  
if(!kanal) return
member.addRole(rol)
  if(!mesaj) {
  client.channels.get(kanal).send(':loudspeaker: :inbox_tray: Otomatik Rol Verildi Seninle Beraber **`'+member.guild.memberCount+'`** Kişiyiz! <:evetyav:710511879834828853> Hoşgeldin! **`'+member.user.username+'`**')
} else {
  
      var mesajs = mesaj.replace("-uye-", `${member.author.tag}`).replace("-uyetag-", `${member.author.username}`) .replace("-server-", `${member.guild.name}`).replace("-rol-", member.guild.roles.get(db.fetch(`judgerol_${member.guild.id}`)).name).replace("-onlineuyesayısı-", member.guild.members.filter(s => s.presenceStatus === "online").size).replace("-botsayisi-", member.guild.members.filter(s => s.bot).size) .replace('-kanalsayisi-' ,member.guild.channels.size ).replace("-uyesayisi-", member.guild.memberCount).replace("-bolge-", member.guild.region)
  
  client.channels.get(kanal).send(mesajs)
}


});
//-------------OTOROL SON------------------\\


//-------------SEVİYE SİSTEMİ-------------\\

client.on("message", async message => {
  let prefix = ayarlar.prefix;

  var id = message.author.id;
  var gid = message.guild.id;

  let hm = await db.fetch(`seviyeacik_${gid}`);
  let kanal = await db.fetch(`svlog_${gid}`);
  let xps = await db.fetch(`verilecekxp_${gid}`);
  let seviyerol = await db.fetch(`svrol_${gid}`);
  let rollvl = await db.fetch(`rollevel_${gid}`);

  if (!hm) return;
  if (message.content.startsWith(prefix)) return;
  if (message.author.bot) return;

  var xp = await db.fetch(`xp_${id}_${gid}`);
  var lvl = await db.fetch(`lvl_${id}_${gid}`);
  var xpToLvl = await db.fetch(`xpToLvl_${id}_${gid}`);

  if (!lvl) {
    
    if (xps) {
      db.set(`xp_${id}_${gid}`, xps);
    }
    db.set(`xp_${id}_${gid}`, 4);
    db.set(`lvl_${id}_${gid}`, 1);
    db.set(`xpToLvl_${id}_${gid}`, 100);
  } else {
    if (xps) {
      db.add(`xp_${id}_${gid}`, xps);
    }
    db.add(`xp_${id}_${gid}`, 4);

    if (xp > xpToLvl) {
      db.add(`lvl_${id}_${gid}`, 1);
      db.add(
        `xpToLvl_${id}_${gid}`,
        (await db.fetch(`lvl_${id}_${gid}`)) * 100
      );
      if (kanal) {
        client.channels
          .get(kanal.id)
          .send(
            message.member.user.username +
              "** Seviye Atladı! Yeni seviyesi; `" +
              lvl +
              "` Tebrikler! :tada: **"
          );

        
      }
   
    }

    if (seviyerol) {
      if (lvl >= rollvl) {
        message.guild.member(message.author.id).addRole(seviyerol);
        if (kanal) {
          client.channels
            .get(kanal.id)
            .send(
              message.member.user.username +
                "** Yeni Seviyesi **" +
                rollvl +
                "**  seviyeye ulaştı ve " +
                seviyerol +
                " Rolünü kazandı! :tada: **"
            );
        }
      }
    }
  }

  
});

//------------SEVİYE SİSTEMİ SON--------------\\

//-----------SUNUCU PANEL-----------\\

client.on("guildMemberAdd", async member => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`);
  if (sunucupaneli) {
    let toplamuye = member.guild.channels.find(x =>
      x.name.startsWith("Toplam Üye •")
    );
    let toplamaktif = member.guild.channels.find(x =>
      x.name.startsWith("Aktif Üye •")
    );
    let botlar = member.guild.channels.find(x => x.name.startsWith("Botlar •"));
    let rekoraktif = member.guild.channels.find(x =>
      x.name.startsWith("Rekor Aktiflik •")
    );

    if (
      member.guild.members.filter(off => off.presence.status !== "offline")
        .size > sunucupaneli
    ) {
      await db.set(
        `sunucupanel_${member.guild.id}`,
        member.guild.members.filter(off => off.presence.status !== "offline")
          .size
      );
    }
    try {
      if (toplamuye) {
        toplamuye.setName(`Toplam Üye • ${member.guild.memberCount}`);
      }
      if (toplamaktif) {
        toplamaktif.setName(
          `Aktif Üye • ${
            member.guild.members.filter(
              off => off.presence.status !== "offline"
            ).size
          }`
        );
      }
      if (botlar) {
        botlar.setName(
          `Botlar • ${member.guild.members.filter(m => m.user.bot).size}`
        );
      }
      if (rekoraktif) {
        rekoraktif.setName(`Rekor Aktiflik • ${sunucupaneli}`);
      }
    } catch (e) {}
  }
});
//Yashinu (Akame Owner)
client.on("guildMemberRemove", async member => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`);
  if (sunucupaneli) {
    let toplamuye = member.guild.channels.find(x =>
      x.name.startsWith("Toplam Üye •")
    );
    let toplamaktif = member.guild.channels.find(x =>
      x.name.startsWith("Aktif Üye •")
    );
    let botlar = member.guild.channels.find(x => x.name.startsWith("Botlar •"));
    let rekoraktif = member.guild.channels.find(x =>
      x.name.startsWith("Rekor Aktiflik •")
    );

    if (
      member.guild.members.filter(off => off.presence.status !== "offline")
        .size > sunucupaneli
    ) {
      await db.set(
        `sunucupanel_${member.guild.id}`,
        member.guild.members.filter(off => off.presence.status !== "offline")
          .size
      );
    }
    try {
      if (toplamuye) {
        toplamuye.setName(`Toplam Üye • ${member.guild.memberCount}`);
      }
      if (toplamaktif) {
        toplamaktif.setName(
          `Aktif Üye • ${
            member.guild.members.filter(
              off => off.presence.status !== "offline"
            ).size
          }`
        );
      }
      if (botlar) {
        botlar.setName(
          `Botlar • ${member.guild.members.filter(m => m.user.bot).size}`
        );
      }
      if (rekoraktif) {
        rekoraktif.setName(`Rekor Aktiflik • ${sunucupaneli}`);
      }
    } catch (e) {}
  }
});

//-------SUNUCU PANEL SON-----------\\

//Bot Otorol

client.on('guildMemberAdd', member => { 
if(member.user.bot === false) return

member.addRole('722069353721364492') //Bota verilecek otorol id
});

//BOT OTOROL SON

//GİRİŞ DETAY

client.on("guildMemberAdd", (member, message) => {
  if (member.guild.id !== "707632395397890058") return; //SUNUCU İD
  let aylartoplam = {
    "01": "Ocak",
    "02": "Şubat",
    "03": "Mart",
    "04": "Nisan",
    "05": "Mayıs",
    "06": "Haziran",
    "07": "Temmuz",
    "08": "Ağustos",
    "09": "Eylül",
    "10": "Ekim",
    "11": "Kasım",
    "12": "Aralık"
  };
  let aylar = aylartoplam;
  let user = client.users.get(member.id);
  require("moment-duration-format");
  let eskiNick = member.user.username;
  const id = "722069389561823302"; // MESAJIN GİDECEĞİ KANAL İD
  const channel = member.guild.channels.get(id);
  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const gün = moment.duration(kurulus).format("D");
  var kontrol;
  if (gün < 7) kontrol = "Şüpheli";
  if (gün > 7) kontrol = "Güvenilir";
  const embed = new Discord.RichEmbed()
  .setColor("BLUE")
  .setDescription(`${member} Adlı Kullanıcı Aramıza Katıldı!\n\nBu Kullanıcıyla Birlikte **${member.guild.memberCount}** Kişi Olduk!\n\nKullanıcı İD **${member.user.id}**\n\nKullanıcının Hesap Kuruluş Tarihi **${moment(user.createdAt).format("DD")} ${aylar[moment(user.createdAt).format("MM")]}  ${moment(user.createdAt).format("YYYY HH:mm:ss")}**\n\nBu Kullanıcının Hesabı **${kontrol}**`)
  channel.send(embed)
});

client.on("guildMemberRemove", (member, message) => {
  if (member.guild.id !== "707632395397890058") return; //SUNUCU İD
  let aylartoplam = {
    "01": "Ocak",
    "02": "Şubat",
    "03": "Mart",
    "04": "Nisan",
    "05": "Mayıs",
    "06": "Haziran",
    "07": "Temmuz",
    "08": "Ağustos",
    "09": "Eylül",
    "10": "Ekim",
    "11": "Kasım",
    "12": "Aralık"
  };
  let aylar = aylartoplam;
  let user = client.users.get(member.id);
  require("moment-duration-format");
  let eskiNick = member.user.username;
  const id = "722069389561823302"; // MESAJIN GİDECEĞİ KANAL İD
  const channel = member.guild.channels.get(id);
  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const gün = moment.duration(kurulus).format("D");
  var kontrol;
  if (gün < 7) kontrol = "Şüpheli";
  if (gün > 7) kontrol = "Güvenilir";
  const embed = new Discord.RichEmbed()
  .setColor("BLUE")
  .setDescription(`${member} Adlı Kullanıcı Aramızdan Ayrıldı!\n\nBu Kullanıcının Çıkmasıyla **${member.guild.memberCount}** Kişiye Düştük!\n\nKullanıcı İD **${member.user.id}**\n\nKullanıcının Hesap Kuruluş Tarihi **${moment(user.createdAt).format("DD")} ${aylar[moment(user.createdAt).format("MM")]}  ${moment(user.createdAt).format("YYYY HH:mm:ss")}**\n\nBu Kullanıcının Hesabı **${kontrol}**`)
  channel.send(embed)
});

//GİRİŞ DETAY SON

//İNVİTE SİSTEMİ

const invites = {};
  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });


client.on("guildMemberAdd", async member => {
  member.guild.fetchInvites().then(async guildInvites => {
    let veri = await db.fetch(`rol1_${member.guild.id}`);
    let veri12 = await db.fetch(`roldavet1_${member.guild.id}`);
    let veri21 = await db.fetch(`roldavet2_${member.guild.id}`);
    let veri2 = await db.fetch(`rol2_${member.guild.id}`);
    let kanal = await db.fetch(`davetkanal_${member.guild.id}`);
    if (!kanal) return;
    const ei = invites[member.guild.id];
    invites[member.guild.id] = guildInvites;
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const sasad = member.guild.members.get(invite.inviter.id);
    const davetçi = client.users.get(invite.inviter.id);
    db.add(`davet_${invite.inviter.id}_${member.guild.id}`, +1);
    db.set(`bunudavet_${member.id}`, invite.inviter.id);
    let sayı = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);
    let sayı2;
    if (!sayı) {
      sayı2 = 0;
    } else {
      sayı2 = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);
    }
    const aa = new Discord.RichEmbed()
      .setColor("BLACK")
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(`**${member}** Sunucuya katıldı, Seni Davet Eden: **${davetçi.tag}**, Toplam **${sayı2}** Davete Ulaştı!`);
    if (!veri) return;
    if (!sasad.roles.has(veri)) {
      if (sayı2 => veri12) { sasad.addRole(veri);
        return;
      }
    } else { 
      if (!veri2) return;
      if (sayı2 => veri21) { sasad.addRole(veri2);
        return;
      }
    }
  });
});


client.on("guildMemberRemove", async member => {
  let kanal = await db.fetch(`davetkanal_${member.guild.id}`);
  if (!kanal) return;
  let veri = await db.fetch(`rol1_${member.guild.id}`);
  let veri12 = await db.fetch(`roldavet1_${member.guild.id}`);
  let veri21 = await db.fetch(`roldavet2_${member.guild.id}`);
  let veri2 = await db.fetch(`rol2_${member.guild.id}`);
  let d = await db.fetch(`bunudavet_${member.id}`);
  const sa = client.users.get(d);
  const sasad = member.guild.members.get(d);
  let sayı2 = await db.fetch(`davet_${d}_${member.guild.id}`);
  let eksii = db.add(`davet_${d}_${member.guild.id}`, -1);
  if (!d) {
    const aa = new Discord.RichEmbed()
      .setColor("BLACK")
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(`**${member}** Sunucudan Ayrıldı, Davet Eden: **Bulunamadı!**`);
    return;
  } else {
    const aa = new Discord.RichEmbed()
      .setColor("BLACK")
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(`**${member}** Sunucudan Ayrıldı, Kişiyi Davet Eden: **${sa.tag}**, Daveti **${eksii}** Olarak Güncellendi!`);
    if (!veri) return;
    if (sasad.roles.has(veri)) {
      if (sayı2 <= veri12) { sasad.removeRole(veri);
        return;
      }
    }
    if (sasad.roles.has(veri2)) {
      if (!veri2) return;
      if (sayı2 <= veri21) { sasad.removeRole(veri2);
        return;
      }
    }
  }
});


//İNVİTE SİSTEMİ SON

//DESTEK TALEBİ

client.on('message', msg => {
  if (msg.content.toLowerCase().startsWith(prefix + `talep`)) {
  if (msg.channel.name== '🏆・talep-oluştur') { //talep komutunun kullanılacağı kanalın adını girin!
    const cwbotlist = new Discord.RichEmbed()
    .addField(" Hata ", `Bu Sunucuda \`⚡ | Yönetim\` Adında Bir Rol Yok!`)
    .setColor("RANDOM")
   
    if (!msg.guild.roles.exists("name", "⚡ | Yönetim")) return msg.author.send(cwbotlist) + msg.guild.owner.send(`${msg.guild.name} Adlı Sunucunda, \`⚡ | Yönetim\` Böyle Bir Rol Olmadığı İçin, Destek Talebi Açılamıyor!`);
    if(msg.guild.channels.find('name', 'Talep')) { //destek hangi kategoride açılcaksa o kategorinin adını girin!
      msg.guild.createChannel(`🔨・talep-${msg.member.user.username}`, "text").then(c => {
      const category = msg.guild.channels.find('name', 'Talep') //destek hangi kategoride açılcaksa o kategorinin adını girin!
      c.setParent(category.id)
      let role = msg.guild.roles.find("name", "⚡ | Yönetim"); //destek yetkilisinin rolünün adını girin!
      let role2 = msg.guild.roles.find("name", "@everyone"); //kurcalamayın burayı!
      c.overwritePermissions(role, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });
      c.overwritePermissions(role2, {
          SEND_MESSAGES: false,
          READ_MESSAGES: false
      });
      c.overwritePermissions(msg.author, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });

      const codework = new Discord.RichEmbed()
      .setColor("RANDOM")
      .addField(`Merhaba ${msg.author.username}!`, `Destek Ekibimiz En Kısa Sürede Seninle İlgilenecektir. \nDestek Talebini Sonlandırmak İçin \`${prefix}sonlandır\` yazabilirsin.`)
      .addField(`Talep Oluşturan Kullanıcı;`, `<@${msg.author.id}>`, true)
      .setFooter(`${client.user.username} | Destek Sistemi`)
      .setTimestamp()
      c.send({ embed: codework });
      c.send(`Yeni Bir Destek Talebi Oluşturuldu, Lütfen İlgileniniz. @here`)
      msg.delete()
      }).catch(console.error);
      }
    }
   }
});

client.on("message", message => {
if (message.content.toLowerCase().startsWith(prefix + `sonlandır`)) { //Sonlandırma komutu
    if (!message.channel.name.startsWith(`🔨・talep-`)) return message.channel.send(`Bu komut sadece Destek Talebi kanallarında kullanılabilir!`);

    var codework2 = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Destek Talebi Kapatma İşlemi`)
    .setDescription(`Destek talebini kapatmayı onaylamak için, \n10 saniye içinde \`evet\` yazınız.`)
    .setFooter(`${client.user.username} | Destek Sistemi`)
    message.channel.send(codework2)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === 'evet', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit('Destek Talebi kapatma isteğin zaman aşımına uğradı!').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });
}
});

//DESTEK TALEP SON

const events2 = {
	MESSAGE_REACTION_ADD: 'messageReactionAdd',
	MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};
client.on('raw', async event => {
	if (!events.hasOwnProperty(event.t)) return;
	const { d: data } = event;
	const anto = client.users.get(data.user_id);
	const channel = client.channels.get(data.channel_id) || await anto.createDM();
	if (channel.messages.has(data.message_id)) return;
	const message = await channel.fetchMessage(data.message_id);
	const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
	const reaction = message.reactions.get(emojiKey);
	client.emit(events[event.t], reaction, anto);
});
client.on('messageReactionAdd', (reaction, user) => {
  if (reaction.message.id == "722751280006692905") {//Geçerli olması istediğiniz mesajın ID'sini yazabilirsiniz.
    if (reaction.emoji.name == "okeyyav") {//Dilediğini emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).addRole(reaction.message.guild.roles.find('name', '🎄・discord.js'))//Dilediğiniz rolün adını yazabilirsiniz.
	}
 
	if (reaction.emoji.name == "altyapi") {//Dilediğiniz emojiyi koyabilirsiniz.
	  reaction.message.guild.members.get(user.id).addRole(reaction.message.guild.roles.find('name', '</>・Altyapı'))//Dilediğiniz rolün adını yazabilirsiniz.
	}
	if (reaction.emoji.name == "html") {//Dilediğiniz emojiyi koyabilirsiniz.
		reaction.message.guild.members.get(user.id).addRole(reaction.message.guild.roles.find('name', '</>・Html'))//Dilediğiniz rolün adını yazabilirsiniz.
	  }
    	if (reaction.emoji.name == "ortak") {//Dilediğiniz emojiyi koyabilirsiniz.
		reaction.message.guild.members.get(user.id).addRole(reaction.message.guild.roles.find('name', 'rol'))//Dilediğiniz rolün adını yazabilirsiniz.
	  }
   
  }
});
client.on('messageReactionRemove', (reaction, user) => {
	if (reaction.message.id == "mesaj id") {//Geçerli olması istediğiniz mesajın ID'sini yazabilirsiniz.
	  if (reaction.emoji.name == "emoji") {//Dilediğiniz emojiyi koyabilirsiniz.
		reaction.message.guild.members.get(user.id).removeRole(reaction.message.guild.roles.find('name', 'rol'))//Dilediğiniz rolün adını yazabilirsiniz.
	  }
	  if (reaction.emoji.name == "Emoji") {//Dilediğiniz emojiyi koyabilirsiniz.
		reaction.message.guild.members.get(user.id).removeRole(reaction.message.guild.roles.find('name', 'Rol'))//Dilediğiniz rolün adını yazabilirsiniz.
	  }
	  if (reaction.emoji.name == "Emoji") {//Dilediğiniz emojiyi koyabilirsiniz.
		  reaction.message.guild.members.get(user.id).removeRole(reaction.message.guild.roles.find('name', 'Rol'))//Dilediğiniz rolün adını yazabilirsiniz.
		}
     if (reaction.emoji.name == "Emoji") {//Dilediğiniz emojiyi koyabilirsiniz.
		  reaction.message.guild.members.get(user.id).removeRole(reaction.message.guild.roles.find('name', 'Rol'))//Dilediğiniz rolün adını yazabilirsiniz.
		}
	}
  });

//SON ÜYE

client.on("guildMemberAdd", async member => { let codework = client.channels.get("726844771813031966"); codework.setName(`Son Üye • ${member.user.username}`) });

//SON ÜYE SON

//REKOR AKTİFLİK

client.on("guildMemberAdd", async member => { let codework2 = client.channels.get("722069370007846992"); codework2.setName(`Aktif Üye • ${member.guild.members.filter(off => off.presence.status !== 'offline').size}`) })

//REKOR AKTİFLİK SON
