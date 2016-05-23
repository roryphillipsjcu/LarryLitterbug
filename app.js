/* Larry Litterbug backend */

//Importing required libraries
var conf = require('./config.js');

var fs = require('fs');
var bodyParser = require('body-parser');
var express = require('express');
var logger = require('./logger.js');

var dbFile = conf.database;
var exists = fs.existsSync(dbFile);

var Sequelize = require('sequelize');
var sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: 'llTestDB.sqlite'
});

var db = sequelize;

logger.serverInfo(conf.name, conf.version, conf.environment);

var server = express();
server.use(
    function crossOrigin(req, res, next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        return next();
    }
);
server.use(bodyParser.json());

server.use(express.static("./public"));

var routes = "./routes/";
fs.readdirSync(routes).forEach(function (file){
    require(routes + file)(server, db, logger);
    logger.routeLoad(file);
});

server.listen(80, function(){
    logger.serverListen(config.port);
});

//Manually write the includes, there are only three
