module.exports = function(server, db, logger){

    var Sequelize = require('sequelize');

    function addFact(req, res, next){
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

        console.log(req.body);

        Fact.sync().then(function(){
            return Fact.create({
                title: req.body.title,
                description: req.body.description
            });
        });
    }

    server.post('/addFact', addFact);

};