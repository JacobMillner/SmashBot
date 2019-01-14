const UsersModel = require('../models/users');
exports.run = (client, message, args) => {
    var users = UsersModel.ShowUser(null, (err, users) => {
        if (err) {
            //todo handle error
        }
        else {
            var userList = '';

            for (var x in users) {
                userList += `${users[x].UserName}\n`;
            }
            message.channel.send(userList).catch(console.error);
        }
    });
}