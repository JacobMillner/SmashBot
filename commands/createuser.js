const UsersModel = require('../models/users');
exports.run = (client, message, args) => {
    var users = UsersModel.CreateUser((err, msg) => {
        if (err) {
            //todo handle error
        }
        else {
            message.channel.send(msg).catch(console.error);
        }
    });
}