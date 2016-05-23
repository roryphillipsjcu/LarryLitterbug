module.exports = function(server, db, logger){
    var Sequelize = require('sequelize');

    function populateDB(req, res, next){
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

        var names = ['Andrew', 'Bella', 'Chad', 'Daenerys', 'Ethan', 'Felicity', 'George', 'Harry', 'Isabella', 'Jaimie', 'Kirsten', 'Larry', 'Mary', 'Ned', 'Ophelia', 'Petyr', 'Qamra', 'Rob', 'Sarah', 'Tywin', 'Ursa', 'Vince', 'Wendy', 'Xander', 'Yvonne', 'Zayne'];

        for (var i = 0; i < 50; i++){
            Highscore.sync().then (function() {
                return Highscore.create({
                    name: names[Math.floor(Math.random() * 26)],
                    score: Math.floor(Math.random() * 300) + 1
                });
            });
        }

    }


    //Only uncomment if you are recreating the database.
    //Otherwise will be abused
    //server.get('/popdb', populateDB);
};