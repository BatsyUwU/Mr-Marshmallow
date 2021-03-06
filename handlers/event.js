// This file loads all the events found in the /events directory into memory.

const { readdirSync } = require("fs");

module.exports = (bot) => {
  ["bot", "server"].forEach(dirs => {
    const events = readdirSync(`./events/${dirs}`).filter(d => d.endsWith('.js'));
    for (let file of events) {
        const evt = require(`../events/${dirs}/${file}`);
        let eName = file.split('.')[0];
        bot.on(eName, evt.bind(null, bot));
        delete require.cache[require.resolve(`../events/${dirs}/${file}`)];
    }
  });
}
