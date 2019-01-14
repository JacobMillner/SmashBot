const SQLite = require("better-sqlite3");
const sql = new SQLite('./SmashBot.sqlite');

module.exports.ShowUsers = function (args, callback) {
    var sqlStatement = 'SELECT * FROM Users';
    if (args != undefined && args.length != 0) {
        sqlStatement += ` WHERE UserName = \'${args[0]}\'`;
    }
    const users = sql.prepare(sqlStatement).all();

    var err = null;
    if (users == undefined || users.length == 0) {
        err = 'No Users found.';
        if (args != undefined && args.length != 0) {
            err += ` User ID: ${args[0]}`;
        }
    }

    // TODO return users
    callback(err, users);
}

module.exports.CreateUser = function (callback) {
    const users = sql.prepare('SELECT * FROM Users').all();
    callback(null, users);
}

module.exports.DeleteUser = function (callback) {
    // should we even have this function?
    // TODO 
    const rankings = sql.prepare("SELECT * FROM Users").get();

    // TODO return users
}

function validateShowUserArgs(args) {
    // todo
}
