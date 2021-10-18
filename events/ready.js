 const Strom = require('discord.js');
const ayarlar = require('../ayarlar.json');

module.exports = async client => {
  var oyun = ["🔥EN İYİ HİZMET İÇİN BAKIMDAYIZ!🔥"];

  setInterval(async () => {
    var random = Math.floor(Math.random() * (oyun.length - 0 + 1) + 0);

    client.user.setActivity(oyun[random], { type: "WATCHING" });
  }, 13000);
  client.user.setStatus("dnd");

}