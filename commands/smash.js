const Discord = require('discord.js');

exports.run = (client, message, args) => {
    const file = new Discord.Attachment('./public/img/smash.gif');
    message.channel.send({ files: [file]});
}