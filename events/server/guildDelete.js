/*
This event runs whenever this bot leaves a server. It just sends a message to
the pre-defined log channel saying that it left a server. Its configuration
data remains.
*/

const fs = require("fs");
const discord = require("discord.js");
const botConfigFile = JSON.parse(fs.readFileSync("./config/bot/settings.json", 'utf8'));
const { red_dark } = require("../../config/bot/colors.json");

module.exports = async (bot, guild) => {

  // Send a message to the console.
  console.log(`Left ${guild.name} (ID: ${guild.id})...`);

  // Try to send the "left a server" message to the log channel.
  const embed = new discord.MessageEmbed()
      .setColor(red_dark)
      .setTitle(`Left a Server...`)
      .addField("Name:", `**${guild.name}**`, true)
      .addField("ID:", guild.id, true)
      .addField("Member Count:", guild.memberCount)
      .setThumbnail(guild.iconURL())
      embed.setFooter(`${bot.user.username}`, bot.user.displayAvatarURL());

  try { bot.channels.cache.get(botConfigFile.channels.log).send({embed}); }
  catch (e) { console.log("Couldn't send the 'left server' message to the log channel!\n", e); }
}
