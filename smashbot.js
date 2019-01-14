const Discord = require('discord.js');
const fs = require('fs');
const Enmap = require('enmap');
const client = new Discord.Client();

const Database = require('./models/database.js');
const config = require('./config.json');
const botlog = require('./botlog.js');
// attach to the client
client.config = config;
client.botlog = botlog;

client.on('ready', () => {
    Database.Housekeeping((err, log) => {
        botlog.log(log);
    });
    botlog.log(`Logged in as ${client.user.tag}!`);
    botlog.log('Becky, please.');
});

// This loop reads the /events/ folder and attaches each event file to the appropriate event
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        // We only care about .js files.
        if (file.endsWith(".js")) {
            // Load the event file itself
            const event = require(`./events/${file}`);
            // Get just the event name from the file name
            let eventName = file.split(".")[0];
            client.on(eventName, event.bind(null, client));
            delete require.cache[require.resolve(`./events/${file}`)];
        }
    });
});

client.commands = new Enmap();
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (file.endsWith(".js")) {
            // Load the command file itself
            let props = require(`./commands/${file}`);
            // Get just the command name from the file name
            let commandName = file.split(".")[0];
            botlog.log(`Attempting to load command ${commandName}`);
            // Here we simply store the whole thing in the command Enmap. We're not running it right now
            client.commands.set(commandName, props);
        }
    });
});

client.login(process.env.BOT_TOKEN);