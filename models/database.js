const SQLite = require("better-sqlite3");
const sql = new SQLite('./SmashBot.sqlite');

module.exports.Housekeeping = function (callback) {
    // Check if the tables exist.
    const rankingTableCheck = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'Rankings';").get();
    const usersTableCheck = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'Users';").get();

    //setup a blank message for logging
    var log = '';
    if (!usersTableCheck['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        sql.prepare("CREATE TABLE Users (id TEXT PRIMARY KEY, UserName TEXT, DiscordName TEXT, Elo INTEGER, FriendCode TEXT, DateCreated DATETIME default current_timestamp);").run();
        // Ensure that the "id" row is always unique and indexed.
        sql.prepare("CREATE UNIQUE INDEX idx_Users_id ON Users (id);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");

        log += 'Table: Users not found! Creating Table now...';
    }

    if (!rankingTableCheck['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        sql.prepare("CREATE TABLE Rankings (id TEXT PRIMARY KEY, Winner_Id INTEGER, Loser_Id INTEGER, RankedMatchFlag INTEGER, DateCreated DATETIME default current_timestamp);").run();
        // Ensure that the "id" row is always unique and indexed.
        sql.prepare("CREATE UNIQUE INDEX idx_Rankings_id ON Rankings (id);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");

        log += '\nTable: Rankings not found! Creating Table now...';
    }

    log += '\nDatabase is ready!'

    //were done here, run callback
    callback(null, log);
}