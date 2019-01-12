const Discord = require('discord.js');
const config = require('./config.json');
const Database = require('./models/database.js');
const client = new Discord.Client();

client.on('ready', () => {
    Database.Housekeeping((err, log) => {
        console.log(log);
    });
    console.log(`Logged in as ${client.user.tag}!`);
    console.log('Becky, please.');
});

client.on('message', msg => {
    if (msg.content === 'want sum fuk?') {
        msg.reply('Becky, please.');
    }
});

client.login(process.env.BOT_TOKEN);