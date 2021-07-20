const { stripIndents } = require('common-tags');
let oyndurum = new Set();
const db = require("quick.db")
const ayarlar = require("../ayarlar.json")

exports.run = async(yashinu, message, args) => {
 
  
  message.delete()
  let prefix = ayarlar.prefix
  let saniye = 10;
  if(db.get(`${message.author.id}.cooldown.${message.content.split(" ")[0].replace(prefix,"")}`) > Date.now()) {
    return message.reply(`Bu komudu kullanmak için ${Math.floor(((db.get(`${message.author.id}.cooldown.${message.content.split(" ")[0].replace(prefix,"")}`)-Date.now())*100)/10)/10000} saniye beklemelisin!`).then(s => s.delete({ timeout: 10000 }));
  }
  db.set(`${message.author.id}.cooldown.${message.content.split(" ")[0].replace(prefix,"")}`, Date.now()+(saniye*1000))
  let kelime= [
  "elma",
  "armut",
  "mahmut",
  "eşya",
  "sunucu",
  "ismail",
  "eşek",
  "para",
  "internet",
  "eğlence",
  "sigara",
  "sevgi",
  "Strom",
  "dünya",
  "korona",
  "nitro",
  "kral",
  "misket",
  "limonata",
  "kurabiye",
  "discord",
  "portakal",
  "aşure",
  "yaşam",
  "zehir",
  "hamsi",
  "balık",
  "nektari",
  "şeftali",
  "kanalizasyon",
  "yadigar",
  "koyun",
  "halı",
  "kilim",
  "paspas",
  "kamera",
  "telefon",
  "çorap",
  "şarj",
  "slikon",
  "kumanda",
  "demir",
  "kablo",
  "resim",
  "bira",
  "site",
  "zaman",
  "ses",
  "pervane",
  "klima",
  "mouse",
  "kapıKolu",
  "havalandırma",
  "imleç",
  "steam",
  "twitch",
  "arnavud",
  "ankara",
  "İstanbul",
  "sazan",
  "olta",
  "kitap",
  "tuş",
  "lavabo",
  "hatıra",
  "inek",
  "tokmak",
  "tabut",
  "sinyal",
  "yaprak"  
]
 
        if (oyndurum.has(message.channel.id)) return message.reply('Kanal başına sadece bir adam asmaca oyunu meydana gelebilir.');

        try {
            const cevap = kelime[Math.floor(Math.random() * kelime.length)].toLowerCase();
            let point = 0;
            let displayText = null;
            let tahmin = false;
            const confirmation = [];
            const yanlış = [];
            const display = new Array(cevap.length).fill('_');
            while (cevap.length !== confirmation.length && point < 6) {
                await message.channel.send(stripIndents`
                    ${displayText === null ? '**Adam Asmaca**!' : displayText ? '**Çok iyisin!**' : '**Yanlış Harf!**'}
                         **Kelime:**    \`${display.join(' ')}\`
                    **Yanlış Harfler:** ${yanlış.join(', ') || 'Yok'}
                    \`\`\`
                      _________
                    |    |
                    |    ${point > 0 ? '😃' : ''}
                    |   ${point > 2 ? '┌' : ' '}${point > 1 ? '()' : ''}${point > 3 ? '┐' : ''}
                    |    ${point > 4 ? '/' : ''} ${point > 0 ? '' : ''}
                    |
                    \`\`\`
                `);
              
              //hocam sen tüm kelimelerin harflerini oto belirledin kelimelere göre yaptın ama tüm kelimleler 7 harf değil o yüzden ayağı çizilmiyor
              
              
              
                const filter = res => {
                    const choice = res.content.toLowerCase();
                    return res.author.id === message.author.id && !confirmation.includes(choice) && !yanlış.includes(choice);
                };
                const guess = await message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 300000
                });
                if (!guess.size) {
                    await message.channel.send('Zamanın doldu!').then(s => s.delete({ timeout: 50000 }));
                    break;
                }
                const choice = guess.first().content.toLowerCase();
                if (choice === 'end') break;
                if (choice.length > 1 && choice === cevap) {
                    tahmin = true;
                    break;
                } else if (cevap.includes(choice)) {
                    displayText = true;
                    for (let i = 0; i < cevap.length; i++) {
                        if (cevap.charAt(i) !== choice) continue;
                        confirmation.push(cevap.charAt(i));
                        display[i] = cevap.charAt(i);
                    }
                } else {
                    displayText = false;
                    if (choice.length === 1) yanlış.push(choice);
                    point++;
                }
            }
            oyndurum.delete(message.channel.id);
            if (cevap.length === confirmation.length || tahmin) {
              message.channel.send(`**Tebrikler kelimeyi buldun! 💸 Hesabına 20000 para eklendi! **${cevap}!`).then(s => s.delete({ timeout: 50000 }));
              db.add(`para_${message.author.id}`, +20000)
              return;
            }
            return message.channel.send(`Maalesef bilemedin kelime bu: **${cevap}**`).then(s => s.delete({ timeout: 50000 }));
        } catch (err) {
            oyndurum.delete(message.channel.id);
            return message.reply(`Olamaz! Bir Hata Verdi: \`${err.message}\``);
        }
    

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['e-adamasmaca' ,'adam'],
  permlevel: 0
};

exports.help = {
  name: 'e-adamasmaca',
  description: 'Adam asmaca oynarsınız.',
  usage: 'adamasmaca'
};
//for brothers