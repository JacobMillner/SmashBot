const SQLite = require("better-sqlite3");
const sql = new SQLite('../SmashBot.sqlite');

module.exports.GetAllUsers = function () {
    //TODO 
    const rankings = sql.prepare("SELECT * FROM Users").get();
    
    //TODO return rankings
}