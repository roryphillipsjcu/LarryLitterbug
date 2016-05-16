module.exports = function(server, db, logger){

    var Sequelize = require('sequelize');

    function getFact(req, res, next){
        var Fact = db.define('fact', {
            title: {
                type: Sequelize.STRING,
                field: 'title'
            },
            description: {
                type: Sequelize.STRING,
                field: 'description'
            }
        }, {
            freezeTableName: true
        });

        var ret = [];

        Fact.findAll({}).then(function (results){
            results.forEach(function (result){
                var data = {
                    title: result.dataValues.title,
                    description: result.dataValues.description
                };
                ret[ret.length] = data;
            });
            res.send(JSON.stringify(ret));
        });
    }

    server.get('/getFact', getFact);

};