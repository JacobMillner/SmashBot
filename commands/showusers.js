const UsersModel = require('../models/users');
exports.run = (client, message, args) => {
    var users = UsersModel.ShowUsers(args, (err, users) => {
        if (err) {
            //log and send error
            message.channel.send(err).catch(console.error);
        }
        else {
            var userList = '```css\n';
            //loop through each user and construct a message to send to channel 
            for (var user in users) {
                var currentUser = users[user];
                userList += `${currentUser.UserName} - Discord: ${currentUser.DiscordName} - Friend Code: ${currentUser.FriendCode}\n`;
            }
            userList += '```';
            message.channel.send(userList).catch(console.error);
        }
    });
}