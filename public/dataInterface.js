function getAllHighscores(){
    var highscores = {};
    var table = document.getElementById('scoreTable');
    table.innerHTML = "";

    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if (request.readyState === 4){
            if (request.status === 200){
                document.body.className = 'ok';
                highscores = JSON.parse(request.responseText);

                highscores.forEach(function (highscore){
                    var row = table.insertRow(0);

                    var name = row.insertCell(0);
                    var score = row.insertCell(1);

                    name.innerHTML = highscore.name;
                    score.innerHTML = highscore.score;
                });

            } else {
                document.body.className = 'error';
            }
        }
    };

    request.open('GET', 'http://localhost:3001/getHighscore', true);
    request.send(null);
}

function getAllFacts(){
    var facts = [];
    var table = document.getElementById('factTable');
    table.innerHTML = "";

    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if (request.readyState === 4){
            if (request.status === 200){
                document.body.className = 'ok';
                facts = JSON.parse(request.responseText);
                console.log(facts);
                facts.forEach(function (fact){
                    var row = table.insertRow(0);

                    var title = row.insertCell(0);
                    var description = row.insertCell(1);

                    title.innerHTML = fact.title;
                    description.innerHTML = fact.description;
                });
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