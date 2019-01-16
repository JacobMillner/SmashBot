const SQLite = require("better-sqlite3");
const sql = new SQLite('./SmashBot.sqlite');

module.exports.GetCurrentRankings = function (err, callback) {
    const rankings = sql.prepare("SELECT * FROM Users ORDER BY Elo").all();
    return rankings;
}