module.exports = function(server, db, logger){

    var Sequelize = require('sequelize');

    function addHighscore(req, res, next){
        var Highscore = db.define('highscore', {
            name: {
                type: Sequelize.STRING,
                field: 'name'
            },
            score: {
                type: Sequelize.INTEGER,
                field: 'score'
            }
        }, {
            freezeTableName: true
        });

        Highscore.sync().then( function() {
            return Highscore.create({
                name: req.body.name,
                score: req.body.score
            });
        });
    }

    server.post('/addHighscore', addHighscore);

};