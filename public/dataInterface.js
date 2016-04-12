function getAllHighscores(){
    var highscores = {};

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "/getHighscore", true);
    xmlHttp.send(null);

    highscores = xmlHttp.responseText;
}