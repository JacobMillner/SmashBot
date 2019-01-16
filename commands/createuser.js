const UsersModel = require('../models/users');
exports.run = (client, message, args) => {
    //nvm, this will be used for ranking add
    //validate user - check for Admin/Mod or self
    // if (message.member.roles.find("name", "Admin") || message.member.roles.find("name", "Mod")){
    //     //is admin
    // }
    // else if (message.users) {

    // }
    //validate message
    if (args.length != 2) {
        message.reply('Invalid amount of arguments. You must format the message ```sp! createuser [NickName] [Switch Friendcode]```').catch(console.error);
    }
    else {
        const nick = args[0];
        const friendCode = args[1];
        var users = UsersModel.CreateUser(message.author.tag, nick, friendCode, (err, msg) => {
            if (err) {
                //todo handle error
            }
            else {
                message.channel.send(msg).catch(console.error);
            }
        });
    }
}