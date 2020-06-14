/*
This event runs whenever one of the servers the bot is on becomes unavailable.
It sends a message to the log channel saying which server went offline.
*/

const fs = require("fs");
const discord = require("discord.js");
const { purple_dark } = require("../../config/bot/colors.json");
const logChannel = JSON.parse(fs.readFileSync("./config/bot/settings.json", 'utf8')).channels.log;

module.exports = async (bot, guild) => {

  // Send a message to the console.
  console.log(`${guild.name} (ID: ${guild.id}) is currently unavailable.`);

  // Try to send the "Server Unavailable" message to the log channel.
  const embed = new discord.MessageEmbed()
      .setColor(purple_dark)
      .setTitle(`Server Unavailable`)
      .addField("Name:", `**${guild.name}**`, true)
      .addField("ID:", guild.id, true)
      .addField("Member Count:", guild.memberCount)
      .setThumbnail(guild.iconURL())
      .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL());

  try { bot.channels.cache.get(logChannel).send({embed}); }
  catch (e) { console.log("Couldn't send the 'server unavailable' message to the log channel!\n", e); }
}
