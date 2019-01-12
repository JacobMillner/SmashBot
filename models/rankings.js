const sqlite3 = require("sqlite3").verbose();

module.exports.GetCurrentRankings = function () {
    const sql = new sqlite3.Database('../SmashBot.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the SmashBot database.');
    });
    //TODO 
    const rankings = sql.prepare("SELECT * FROM Rankings").get();

    sql.close();
    
    //TODO return rankings
}