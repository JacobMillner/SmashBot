function CalcElo(rating1, rating2, constantK, winner) {

}

// calculate probabitliy between two ratings
function Probability(rating1, rating2){
    //P(A) = 1/(1+10^m) where m is the rating difference (rating(B)-rating(A)) divided by 400
    //https://en.wikipedia.org/wiki/Elo_rating_system#Mathematical_details
    const prob = 1.0 * 1.0 / (1 + 1.0 * (Math.pow(10, 1.0 * (rating1 - rating2) / 400)));
    return prob;
}