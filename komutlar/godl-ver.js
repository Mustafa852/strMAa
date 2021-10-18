const Strom = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
const client = new Strom.Client();
exports.run = async (client, message, args) => {
    const krm = client.emojis.cache.get("703842141620666409")
    const dk = client.emojis.cache.get("703842141113417808")
  
  let goldPlayer = args[0]
  if (!goldPlayer) return message.channel.send(krm+ " Bir ID Girmelisin")
  db.set(`gold_${goldPlayer}`, 'gold')
  message.channel.send(` **\`\`${goldPlayer}\`\`** ID'sine Sahip <@${goldPlayer}> Artık Gold Üye!`)
 message.react('703842141113417808')
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["gold-yap"],
  permLevel: 4,
kategori : 'sahip'
};
exports.help = {
  name: 'gold-ver',
  description: 'Gold Üye He ? :D',
  usage: 'gold-yap'
};