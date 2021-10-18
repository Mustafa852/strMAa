const Strom = require('discord.js');
const db = require('quick.db')
const kasalar = require('.././kasalar');
const talkedRecently = new Set();
exports.run = async (client, message, args) => {
 if (talkedRecently.has(message.author.id)) {
           return message.reply("`10` Saniye de Bir Kullanabilirsin ");
    } else {

           // the user can type the command ... your command code goes here :)

        // Adds the user to the set so that they can't talk for a minute
        talkedRecently.add(message.author.id);
        setTimeout(() => {
        message.delete();
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        }, 10000);// Şuan 5 Saniyedir Değiştirebilirsini..
    }
const filter = m => m.content.includes('discord');
const collector = message.channel.createMessageCollector(filter, { time: 10000 });
  const kasaid = args[0];
  const bakiye = await db.fetch(`bakiyeasreaper-${message.author.id}`);
  const hesapdurumu = await db.fetch(`hesapdurumasreaper-${message.author.id}`);
  const kasasayisi = kasalar.length
  if(!hesapdurumu) return message.reply(`İlk olarak hesap oluştur7malısın. ${client.ekoayarlar.botunuzunprefixi}hesap-oluştur <Hesap İsmi>`)
  const kasaidembeds = new Strom.MessageEmbed()
  .setTitle(`Bir kasa İD si girmelisin!`)
  .setFooter(`Kasa listesine bakmak için: ${client.ekoayarlar.botunuzunprefixi}kasalar`)
  .setColor(client.ekoayarlar.renk)
  if(!kasaid) return message.channel.send(kasaidembeds)
  if(kasaid > kasasayisi) return message.channel.send(kasaidembeds)
  if(isNaN(kasaid)) return message.channel.send(kasaidembeds)
  const kasafiyat = kasalar.filter(x => x.kasaid == kasaid).map(x => x.fiyat)
  if(bakiye < kasafiyat) return message.channel.send(`:warning: Paranız Yetersiz!`)
  message.channel.send(`Kasayı açmak istediğinize emin misiniz?\n Şu anda \`${bakiye} ${client.ekoayarlar.parabirimi}\` paran var kasayı açtıktan sonra \`${bakiye - kasafiyat}\` paran kalacak. \n\`Eğer açmak istiyorsan evet(e) istemiyorsan hayır(h) yazabilirsin.\``)
  

  let uwu = false;
  while (!uwu) {
    const response = await message.channel.awaitMessages(neblm => neblm.author.id === message.author.id, { max: 1, time: 30000 });
    const choice = response.first().content
    if (choice == 'hayır' || choice == 'h') return message.channel.send('🚀 İşlem iptal edildi.')
    if (choice !== 'evet' && choice !== 'e') {
      message.channel.send('❓ Lütfen sadece **evet (e)** veya **hayır (h)** ile cevap verin.')
    }
    if (choice == 'evet' || choice == 'e') uwu = true
  }
  // `m` is a message object that will be passed through the filter function

collector.on('collect', m => {
	console.log(`Collected ${m.content}`);
});

collector.on('end', collected => {
	console.log(`Collected ${collected.size} items`);
});
  if (uwu) {
    try {
      db.add(`bakiyeasreaper-${message.author.id}`, -kasafiyat)
      message.channel.send("Kasa Açılıyor.").then(async msg => {
        const icindekiler = require(`.././kasa${kasaid}`)
        setTimeout(() => {
          msg.edit("Kasa Açılıyor..");
        }, 1000);
        setTimeout(() => {
          msg.edit("Kasa Açılıyor...");
        }, 2000);
        setTimeout(() => {
          msg.edit("Kasa Açılıyor..");
        }, 3000);
        setTimeout(() => {
          msg.edit("Kasa Açılıyor.");
        }, 4000);
        setTimeout(() => {
          msg.edit("Kasa Açıldı!");
          msg.delete()
        }, 5000);
        setTimeout(() => {
          const icindeki = icindekiler[Math.floor(Math.random() * icindekiler.length)];
          message.reply(`Kasadan \`${icindeki}\` ${client.ekoayarlar.parabirimi} kazandın!`) 
          db.add(`bakiyeasreaper-${message.author.id}`, icindeki)
        }, 7800)
      })
      //const activity = activitys[Math.floor(Math.random() * activitys.length)];
      } catch(e) {
        message.channel.send(':warning: Bir hata var!')
      }
  }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kasaaç'],
    permLevel: 0,
    katagori: "Ekonomi"
}

exports.help = {
    name: 'kasa-aç',
    description: 'Strom',
    usage: 'Strom'
}