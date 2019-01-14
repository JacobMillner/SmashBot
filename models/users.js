const SQLite = require("better-sqlite3");
const sql = new SQLite('./SmashBot.sqlite');

module.exports.ShowUser = function (id, callback) {
    var sqlStatement = 'SELECT * FROM Users';
    if (id != null) {
        sqlStatement += ` WHERE UserName = ${id}`;
    }
    const users = sql.prepare(sqlStatement).all();

    var err = null;
    if (users == null) {
        err = 'No Users found.';
        if (id !== null) {
            err += ` User ID: ${id}`;
        }
    }

    //TODO return rankings
    callback(err, users);
}

module.exports.CreateUser = function (callback) {
    const users = sql.prepare('SELECT * FROM Users').all();
    callback(null, users);
}

module.exports.DeleteUser = function (callback) {
    //TODO 
    const rankings = sql.prepare("SELECT * FROM Users").get();

    //TODO return rankings
}
