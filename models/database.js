const sqlite3 = require("sqlite3").verbose();

module.exports.Housekeeping = function (callback) {
    const sql = new sqlite3.Database('../SmashBot.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the SmashBot database.');
    });
    // Check if the tables exist.
    const rankingTableCheck = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'Rankings';").get();
    const usersTableCheck = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'Users';").get();

    //setup a blank message for logging
    var log = '';
    if (!usersTableCheck['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        sql.prepare("CREATE TABLE Users (id TEXT PRIMARY KEY, UserName TEXT, DateCreated DATETIME default current_timestamp);").run();
        // Ensure that the "id" row is always unique and indexed.
        sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON Users (id);").run();

        log += 'Table: Users not found! Creating Table now...';
    }

    if (!rankingTableCheck['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        sql.prepare("CREATE TABLE Rankings (id TEXT PRIMARY KEY, Winner_Id INTEGER, Loser_Id INTEGER, DateCreated DATETIME default current_timestamp);").run();
        // Ensure that the "id" row is always unique and indexed.
        sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON Rankings (id);").run();

        log += '\nTable: Rankings not found! Creating Table now...';
    }

    log += '\nDatabase is ready!'

    sql.close();

    //were done here, run callback
    callback(null, log);
}