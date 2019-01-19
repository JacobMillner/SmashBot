const Elo = require('../util/elo');
exports.run = (client, message, args) => {
    //todo validate
    if (args == null || args.length != 3)
    {
        err = message.channel.send('Incorrect parameters.').catch(console.error);
        return;
    }
    //find users
    var firstUser;
    var secondUser;

    //test vars
    var p1Rating = parseInt(args[0], 10);
    var p2Rating = parseInt(args[1], 10);
    var constantK = 30; //TODO, get this from config?
    var winner = Boolean(Number(args[2]));

    var matchElo = Elo.CalcElo(p1Rating, p2Rating, constantK, winner, (err, p1NewRating, p2NewRating) => {
        if (err) {
            //log and send error
            message.channel.send(err).catch(console.error);
        }
        else {
            var usersNewElo = '```css\n';
            usersNewElo += `p1 ${~~p1NewRating}, p2 ${~~p2NewRating}`;
            usersNewElo += '```';
            message.channel.send(usersNewElo).catch(console.error);
        }
    });
}
