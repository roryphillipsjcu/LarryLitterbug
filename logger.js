var colors = require('colors');

module.exports = {

    serverInfo: function(name, version, mode){
        //[NAME] version [VERSION]
        //Starting in [MODE] mode
        console.log(colors.white("\n" + name + " version " + version));
        console.log(colors.white("Starting server in " + colors.cyan(mode) + " mode"));
    },
    routeLoad: function(name){
        //Loaded route: [NAME]
        console.log(colors.white("Route " + colors.cyan(name) + " Loaded"));
    },
    dbConnect: function(address){
        //Initalizing database connection to [ADDRESS]
        console.log(colors.white("Initializing connection to database at " + colors.yellow(address)));
    },
    dbSuccess: function(){
        //Database connection successful
        console.log(colors.white("Database connection " + colors.green("Successful")));
    },
    dbFailure: function(err){
        //Database connection failed
        //Error: [ERR]
        console.log(colors.white("Database connection " + colors.red("Failed")));
        console.log(colors.red(err));
    },
    serverListen: function(port){
        //Server is now listening at ::[PORT]
        console.log(colors.white("Server is now listening at " + colors.cyan("::" + port)));
        console.log(colors.grey("------------------------------------------------------"))
    },
    highscorePost: function(ip, username, score){
        //Highscore POST:[IP]\t[USERNAME]\t[SCORE]\t{DateTime}
        console.log("Request at " + Date() + ":");
        console.log(colors.magenta("     Highscore POST: " + "{IP: " + ip + "\t" + "Username: " + username + "\t" + "Score: " + score + "}\n"));
    },
    highscoreGet: function(ip){
        //Highscore GET:[IP]\t{DateTime}
        console.log("Request at " + Date() + ":");
        console.log(colors.magenta("     Highscore GET: " + "{IP:" + ip + "}\n"));

    },
    highscoreRelativeGet: function(ip, score){
        //Highscore GET (Relative):[IP]\t[SCORE]\t{DateTime}
        console.log("Request at " + Date() + ":");
        console.log(colors.magenta("     Highscore GET (Relative): " + "{IP:" + ip + "\t" + "Score: " + score + "}\n"));

    },
    factGet: function(ip){
        //Fact GET: [IP]\t{DateTime}
        console.log("Request at " + Date() + ":");
        console.log(colors.magenta("     Fact GET: " + "{IP:" + ip + "}\n"));

    }
};