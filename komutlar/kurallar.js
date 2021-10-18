const Discord = require('discord.js');

exports.run = async(client, message) => {

    const rules = new Discord.MessageEmbed()
    
    .setColor('RED')
      .addField(`Kurallar`, [`
      
      - Küfür, argo ve reklam kesinlikle **yasaktır**!
      - Spam ve flood **yasaktır**!
      - Din, ırk ve siyaset konuşmak **yasaktır**!
      - Herkes birbirine saygılı olmalıdır!
      - Herkesin görüşü kendinedir bu yüzden tartışmak **yasaktır**!
      - Üstünlük göstermek/taslamak **yasaktır**!
      - Caps ve emoji kullanımı **yasaktır**! (Aşırı Olmadıkça)
      - Oynuyor kısmına reklam, küfür koymak **yasaktır**!
      - Yetkililere karşı gelmek **yasaktır**!
      - Bot basmak/j4j yapmak **yasaktır**!
      - Rahatsızlık vermek **yasaktır**!
      - 8Yetkililere Argo Kelime Kullanmak Ve Emir Verici Sözler Söylemek **yasaktır**.
      - Ses Kanallarında İnsanlara Küfür Etmek,Trollemek Ve Rahatsız Etmek **yasaktır**.
      - +18 İsim Ve Profil Fotoğrafı Ve Gif Koymak **yasaktır**.\n\n
      - SUNUCUYA GİRDİĞİNİZ ANDA OKUMUŞ SAYILACAKSINIZ!

      `])

       message.delete();
      //message.react("?");

    return message.channel.send(rules).then(keleS => keleS.react("?"));

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['rules'],
    permLevel: 0
}

exports.help = {
    name : 'kurallar',
    description: 'Hazır kuralları kanalınıza atar.',
    usage: 'kurallar/rules'
}