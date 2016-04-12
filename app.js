/* Larry Litterbug backend */

//Importing required libraries
var conf = require('./config.js');

var fs = require('fs');
var bodyParser = require('body-parser');
var express = require('express');
var logger = require('./logger.js');

var dbFile = conf.database;
var exists = fs.existsSync(dbFile);

//var sqlite3 = require('sqlite3').verbose();
//var db = new sqlite3.Database(dbFile);
//db.serialize(function() {
//   if(!exists){
//       db.run("CREATE TABLE highscores(ID INT NOT NULL, USERNAME VARCHAR(20) NOT NULL, SCORE INT NOT NULL, PRIMARY KEY(ID))");
//   }
//
//    db.run("INSERT INTO highscores VALUES (10, 'balls', 100)");
//
//    console.log(db.run("SELECT * FROM highscores"));
//});

var db;

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

server.listen(config.port, function(){
    logger.serverListen(config.port);
});

//Manually write the includes, there are only three
