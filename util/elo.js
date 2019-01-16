//winner flag 0 = p1Rating won, 1 = p2Rating won
module.exports.CalcElo = function (p1Rating, p2Rating, constantK, winner, callback) {
    var err = null; //todo check for errors here

    var player1WinProb = Probability(p1Rating, p2Rating);
    var player2WinProb = Probability(p2Rating, p1Rating);

    if (winner){
        //player 1 wins
        p1Rating = p1Rating + constantK * (1 - player2WinProb);
        p2Rating = p2Rating + constantK * (0 - player1WinProb);
    } else {
        //player 2 wins
        p1Rating = p1Rating + constantK * (0 - player2WinProb);
        p2Rating = p2Rating + constantK * (1 - player1WinProb);
    }

    callback(err, p1Rating, p2Rating);
}

// calculate probabitliy between two ratings
function Probability(p1Rating, p2Rating){
    //P(A) = 1/(1+10^m) where m is the rating difference (rating(B)-rating(A)) divided by 400
    //https://en.wikipedia.org/wiki/Elo_rating_system#Mathematical_details
    const prob = 1.0 * 1.0 / (1 + 1.0 * Math.pow(10, 1.0 * (p1Rating - p2Rating) / 400));
    return prob;
}