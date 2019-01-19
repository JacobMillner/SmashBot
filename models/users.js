const SQLite = require("better-sqlite3");
const sql = new SQLite('./SmashBot.sqlite');

module.exports.ShowUsers = function (args, callback) {
    var sqlstatement = 'SELECT * FROM Users';
    if (args != undefined && args.length != 0) {
        sqlstatement += ` WHERE UserName = \'${args[0]}\'`;
    }
    const users = sql.prepare(sqlstatement).all();

    var err = null;
    if (users == undefined || users.length == 0) {
        err = 'No users found.';
        if (args != undefined && args.length != 0) {
            err += ` User id: ${args[0]}`;
        }
    }

    callback(err, users);
}

module.exports.CreateUser = function (discordName, nick, friendCode, callback) {
    var err = null;
    var msg = null;

    var isValid = validateCreateUser(discordName);
    if (isValid) {
        const users = sql.prepare(`INSERT INTO Users (UserName, DiscordName, Elo, FriendCode) VALUES ('${nick}', '${discordName}', 1200, '${friendCode}')`).run();
        msg = `User for ${discordName} created!`;
    }
    else {
        msg = `User for ${discordName} already exists! Please Contact an admin if this is a mistake.`;
    }
    callback(err, msg);
}

module.exports.DeleteUser = function (callback) {
    // should we even have this function?
    // TODO 
    const rankings = sql.prepare("SELECT * FROM Users").get();

    // TODO return users
}

module.exports.FindUserByDiscordName = function (discordName, callback) {
    var sqlstatement = `SELECT * FROM Users WHERE DiscordName = ${discordName}`;
    const user = sql.prepare(sqlstatement).all(); 

    var err = null;
    if (user == undefined || user.length == 0) {
        err = 'No user found.';
        if (args != undefined && args.length != 0) {
            err += ` User ID: ${discordName}`;
        }
    }

    callback(err, users);

}
function validateShowUser(args) {
    // todo
}

function validateCreateUser(discordName) {
    const userCheck = sql.prepare(`SELECT * FROM Users WHERE DiscordName = '${discordName}'`).get();
    if (userCheck == null) {
        return true;
    } else {
        return false;
    }
}
