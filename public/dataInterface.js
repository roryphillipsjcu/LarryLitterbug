var address = "http://ec2-52-64-109-225.ap-southeast-2.compute.amazonaws.com";
var retrievedRandomFact = "";

function retrieveRandomFactString(){
	return retrievedRandomFact;
}

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

    request.open('GET', address + '/getHighscore', true);
    request.send(null);
}

function getRandomFact(){
    var facts = [];
    
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if (request.readyState === 4){
            if (request.status === 200){
                document.body.className = 'ok';
                facts = JSON.parse(request.responseText);
                console.log(facts);
		var len = facts.length;
                var index = Math.floor((Math.random() * len));

		console.log(facts[index]);
                retrievedRandomFact = facts[index].description;
            } else {
                document.body.className = 'error';
            }
        }
    };

    request.open('GET', address + '/getFact', true);
    request.send(null);
}

function postHighscore(name){
    var gamescore = score;

    var data = {
        name: name,
        score: gamescore
    };

    var jsonString = JSON.stringify(data);

    var request = new XMLHttpRequest();

    request.onreadystatechange = function(){
        if (request.readyState === 4){
            if (request.status === 200){
                document.body.className = 'ok';
                getAllHighscores();
            } else {
                document.body.className = 'error';
            }
        }
    };
    if (gameOver){
        request.open('POST', address + '/addHighscore', true);
        request.setRequestHeader('Content-type', 'application/json');
        request.send(jsonString);
    }

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

    request.open('POST', address + '/addFact', true);
    request.setRequestHeader('Content-type', 'application/json');
    request.send(jsonString);
}

function getFact(){

}
