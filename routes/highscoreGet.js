module.exports = function(server, db, logger){

    var Sequelize = require('sequelize');

    function getHighscore(req, res, next){
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

        var ret = [];

        Highscore.findAll({
            order: [
                ['score', 'DESC']
            ]
        }).then(function (results){
            results.forEach(function (result){
                var data = {
                    name: result.dataValues.name,
                    score: result.dataValues.score
                };
                ret[ret.length] = data;
            });
            console.log(ret);

            res.send(JSON.stringify(ret));
        });
    }

    server.get('/getHighscore', getHighscore);

};