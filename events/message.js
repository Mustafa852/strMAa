const Discord = require('discord.js');
const db = require('quick.db');

module.exports = async message => {
  let prefix = '!'// sizin prefixiniz ne ise onu yazın
  let client = message.client;
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;

  const prefixler = await db.fetch(`prefixes.${message.guild.id}`);
  if(prefixler && prefixler.length >= 1) {
  prefixler.some(c => {
  if(message.content.startsWith(c)) prefix = c;
  });
  };

  if (message.content.startsWith(prefix)) {
 
if (db.get(`user_${message.author.id}.şartlar`) != 'kabul edilmiş') {
      const warningEmbed = new Discord.MessageEmbed()
      .setColor('RED')
      .setDescription(`**Ops! Bu botu kullanabilmek için şartları onaylamanız gerekmektedir.**\n\n**📘** butonuna basarak botun kullanım şartlarına bakabilirsin.`)

      const termsOfService = new Discord.MessageEmbed()
      .setColor('RED')
      .setDescription(`**
      1) BOT KAPALI İSE BOT SAHİBİNE, BOTU AÇ, BOT KAPALI GİBİ KONULAR İLE RAHATSIZ ETMEYİN!
      2) Botun dm sine "up-time" harici mesaj yazmayın bazılarınız spam atıyor! 
      3) Yukardaki kurallara uymanız yeterlidi. Seviliyorsunuz.
      4) Kurallara uymazsanız karaliste'ye alınırsınız.
      **`)
      .setTitle(`${client.user.username} | Kullanım Şartları`);

      return message.channel.send(warningEmbed).then(async rifleman => {
        await rifleman.react('📘');
        await rifleman.awaitReactions((youth, anasia) => youth.emoji.name == '📘' && anasia.id == message.author.id, { max: 1 })
        .then(async () => {
          await rifleman.reactions.removeAll();
          await rifleman.edit(termsOfService).then(async leavemealone => {
            await leavemealone.react('✅');
            await leavemealone.awaitReactions((youth, anasia) => youth.emoji.name == '✅' && anasia.id == message.author.id, { max: 1 })
            .then(async () => {
              await leavemealone.reactions.removeAll();
              await rifleman.edit(termsOfService.setDescription('**Kullanım şartlarını kabul ettiniz. Artık botu kullanabilirsiniz!**'));
              await db.set(`user_${message.author.id}.şartlar`, 'kabul edilmiş');
            });
          });
        });
      })
    };    
    
var command;
  var params;
  if(prefix.includes(' ')) {
  command = message.content.split(' ')[1];
  params = message.content.split(' ').slice(2);
  } else {
  command = message.content.split(' ')[0].slice(prefix.length);
  params = message.content.split(' ').slice(1);
  }
  
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
else {
    const laura = [];
    client.commands.forEach(dropinnem => {
      laura.push(dropinnem.help.name);
      dropinnem.conf.aliases.forEach(abcdef => laura.push(abcdef));
    });

    const rifleman = require('string-similarity').findBestMatch(command, laura);
    message.channel.send(`bunu mu demek istediniz? **!${rifleman.bestMatch.target}**`)
  };

  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    if (db.fetch(`cokaradalistere_${message.author.id}`)) return message.channel.send("karalistesinde bulunuyorsun! bu botu kullanamazsın.")
    cmd.run(client, message, params, perms);
  }
  }

};
