module.exports = function(server, db, colors){

    function getHighscore(req, res, next){
        console.log("Get High Score Called");
    }

    server.get('/getHighscore', getHighscore);

};