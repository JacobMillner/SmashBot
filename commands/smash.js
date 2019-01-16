const Discord = require('discord.js');

exports.run = (client, message, args) => {
    const file = new Discord.Attachment('./public/img/smash.gif');
    const exampleEmbed = {
        image: {
            url: 'attachment://discordjs.png',
        },
    };
    message.channel.send({ files: [file]});
}