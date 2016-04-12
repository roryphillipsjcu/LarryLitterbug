module.exports = function(server, db, colors){

    function addHighscore(req, res, next){
        console.log("Add High Score Called");
    }

    server.post('/addHighscore', addHighscore);

};