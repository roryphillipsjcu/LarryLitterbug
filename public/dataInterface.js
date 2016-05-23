function getAllHighscores(){
    var highscores = {};
    var list = document.getElementById('scoreList');
    list.innerHTML = "";

    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if (request.readyState === 4){
            if (request.status === 200){
                document.body.className = 'ok';
                highscores = JSON.parse(request.responseText);

                highscores.forEach(function (highscore){
                    var toPrint = "";
                    toPrint += (highscore.name + ": ");
                    toPrint += (highscore.score + " points\n");
                    list.innerHTML += toPrint;
                });

            } else {
                document.body.className = 'error';
            }
        }
    };

    request.open('GET', 'http://localhost:3001/getHighscore', true);
    request.send(null);
}

function getRandomFact(){
    var facts = [];
    var h3 = document.getElementById("factH3");
    h3.innerHTML = "";

    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if (request.readyState === 4){
            if (request.status === 200){
                document.body.className = 'ok';
                facts = JSON.parse(request.responseText);
                var len = facts.length;
                var index = (Math.random() * len) + 1;

                h3.innerHTML = facts[Math.floor(index)].description;
            } else {
                document.body.className = 'error';
            }
        }
    };

    request.open('GET', 'http://localhost:3001/getFact', true);
    request.send(null);
}

function postHighscore(){
    var name = document.getElementById("highscoreName").value;
    var score = document.getElementById("highscoreScore").value;

    var data = {
        name: name,
        score: score
    };

    var jsonString = JSON.stringify(data);

    var request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        if (request.readyState === 4){
            if (request.status === 200){
                document.body.className = 'ok';
            } else {
                document.body.className = 'error';
            }
        }
    };

    request.open('POST', 'http://localhost:3001/addHighscore', true);
    request.setRequestHeader('Content-type', 'application/json');
    request.send(jsonString);
}

function postFact(){
    var factTitle = document.getElementById('factTitle').value;
    var factDescription = document.getElementById('factDescription').value;

    var data = {
        title: factTitle,
        description: factDescription
    };

    var jsonString = JSON.stringify(data);

    var request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        if (request.readyState === 4){
            if (request.status === 200){
                document.body.className = 'ok';
            } else {
                document.body.className = 'error';
            }
        }
    };

    request.open('POST', 'http://localhost:3001/addFact', true);
    request.setRequestHeader('Content-type', 'application/json');
    request.send(jsonString);
}

function getFact(){

}