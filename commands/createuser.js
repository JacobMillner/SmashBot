const UsersModel = require('../models/users');
exports.run = (client, message, args) => {
    var users = UsersModel.CreateUser((err, msg) => {
        if (err) {
            //todo handle error
        }
        else {
            var userList = '';

            for (var x in msg) {
                console.log(msg[x]);
                userList += ` ${msg[x].UserName}`;
            }
            message.channel.send(userList).catch(console.error);
        }
    });
}