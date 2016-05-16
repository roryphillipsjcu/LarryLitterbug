module.exports = function(server, db, logger){

    function getHighscoreAdjacent(req, res, next){
        console.log("Get High Score Called");
        console.log("Returning 10 highscores adjacent to " + req.params.id);
    }

    server.get('/getHighscore:id', getHighscoreAdjacent);

};