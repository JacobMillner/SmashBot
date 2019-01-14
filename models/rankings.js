const SQLite = require("better-sqlite3");
const sql = new SQLite('./SmashBot.sqlite');

module.exports.GetCurrentRankings = function (err, callback) {
    //TODO 
    const rankings = sql.prepare("SELECT * FROM Rankings").get();
    
    //TODO return rankings
}