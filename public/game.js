var numberOfFish = 5;
var lifeCount = 5;

var numberOfBags = 0;
var score;
var scoreText;

var canvasArea;
var canvasBounds;

var canvasHeight = 800;

var fish = [];
var bags = [];
var bagsremoved = [];
var removedFish = [];

var pauseButton;
var menuButton;
var scoreTextArea;

var paused = true;
var gameOver = false;

window.onload = function() {
    canvasArea = new createjs.Stage('displayCanvas');
    canvasArea.enableMouseOver(50);
    createjs.Ticker.setFPS(30);

    createjs.Ticker.addEventListener("tick", tick);
    drawHome();

};

function clear(){
    canvasArea.removeAllChildren();
}

function drawHome(){
    clear();

    var playButton = new createjs.Bitmap("res/buttons/playButton.png");
    playButton.scaleX = 0.8;
    playButton.scaleY = 0.8;
    playButton.x = 200;
    playButton.y = 200;
    canvasArea.addChild(playButton);
    playButton.on("click", function(){
        startGame();
    });
    playButton.on("mouseover", function(){
        playButton.image.src = "res/buttons/playButton_Hovered.png";
        playButton.x = 180;
        canvasArea.update();
    });
    playButton.on("mouseout", function(){
       playButton.image.src = "res/buttons/playButton.png";
        playButton.x = 200;
        canvasArea.update();
    });

    var instructionsButton = new createjs.Bitmap("res/buttons/InstructionsButton.png");
    instructionsButton.scaleX = 0.8;
    instructionsButton.scaleY = 0.8;
    instructionsButton.x = 200;
    instructionsButton.y = 400;
    canvasArea.addChild(instructionsButton);
    instructionsButton.on("click", function(){
        showInstructions();
    });
    instructionsButton.on("mouseover", function(){
        instructionsButton.image.src = "res/buttons/InstructionsButton_Hovered.png";
        instructionsButton.x = 180;
        canvasArea.update();
    });
    instructionsButton.on("mouseout", function(){
        instructionsButton.image.src = "res/buttons/InstructionsButton.png";
        instructionsButton.x = 200;
        canvasArea.update();
    });


    canvasArea.update();
}

function showInstructions() {
    clear();

    var instructionsTitleText = new createjs.Text("Instructions", "50px Arial", "ff7700");
    instructionsTitleText.x = 220;
    instructionsTitleText.y = 80;
    canvasArea.addChild(instructionsTitleText);

    var instructionsText = new createjs.Text(
        "Earn points by removing litter from the ocean\n" +
        "But don't let the litter touch the fish\n" +
        "or else they'll die\n\n" +
        "You have 3 lives",
        "25px Arial",
        "#ff7700");
    instructionsText.x = 70;
    instructionsText.y = 200;

    canvasArea.addChild(instructionsText);

    var backButton = new createjs.Bitmap("res/buttons/BackButton.png");
    backButton.x = 10;
    backButton.y = 10;
    backButton.scaleX = 0.5;
    backButton.scaleY = 0.5;

    canvasArea.addChild(backButton);

    backButton.on("click", function(){
        drawHome();
    });
    backButton.on("mouseover", function(){
        backButton.image.src = "res/buttons/BackButton_Hovered.png";
        canvasArea.update();
    });
    backButton.on("mouseout", function(){
        backButton.image.src = "res/buttons/BackButton.png";
        canvasArea.update();
    });

    canvasArea.update();
}

function startGame(){
    score = 0;
    paused = false;
    gameOver = false;
    updateScoreText();

    clear();

    scoreTextArea = new createjs.Text(scoreText, "30px Arial", "#ff7700");
    scoreTextArea.x = 420;
    scoreTextArea.y = 0;

    canvasArea.addChild(scoreTextArea);

    pauseButton = new createjs.Bitmap("res/buttons/PauseButton.png");
    pauseButton.x = 0;
    pauseButton.y = 0;
    pauseButton.scaleX = 0.4;
    pauseButton.scaleY = 0.4;

    canvasArea.addChild(pauseButton);
    pauseButton.on("click", function(){
        pauseGame();
    });
    pauseButton.on("mouseover", function(){
        if (paused == true){
            pauseButton.image.src = "res/buttons/PlayButton_Hovered.png";
            menuButton.x = 150;
        } else {
            pauseButton.image.src = "res/buttons/PauseButton_Hovered.png";
        }
        canvasArea.update();
    });
    pauseButton.on("mouseout", function(){
        if (paused == true){
            pauseButton.image.src = "res/buttons/PlayButton.png";
            menuButton.x = 130;
        } else {
            pauseButton.image.src = "res/buttons/PauseButton.png";
        }
        canvasArea.update();
    });

    drawFish(numberOfFish);
    drawBags(5);

    canvasArea.update();
}

function updateScoreText(){
    scoreText = "Score: " + score;
}

function pauseGame(){
    if (paused){
        paused = false;
    } else {
        paused = true;
    }

    menuButton = new createjs.Bitmap("res/buttons/MenuButton.png");
    menuButton.x = 130;
    menuButton.y = 0;
    menuButton.scaleX = 0.4;
    menuButton.scaleY = 0.4;

    if (paused == true){
        pauseButton.image.src = "res/buttons/PlayButton.png";
        canvasArea.addChild(menuButton);
    } else {
        pauseButton.image.src = "res/buttons/PauseButton.png";
        canvasArea.removeChild(menuButton);
    }

    menuButton.on("click", function(){
        drawHome();
    });
    menuButton.on("mouseover", function(){
        menuButton.image.src = "res/buttons/MenuButton_Hovered.png";
        canvasArea.update();
    });
    menuButton.on("mouseout", function(){
        menuButton.image.src = "res/buttons/MenuButton.png";
        canvasArea.update();
    });
}

function drawFish(numberOfFish){
    fish = [];

    for (var i = 0; i < numberOfFish; i++){
        fish[i] = new createjs.Bitmap("res/game/Fish_100.png");
        fish[i].x = Math.floor(Math.random() * 550) + 50;
        fish[i].y = canvasHeight - (Math.floor(Math.random() * 160) + 60);
        fish[i].scaleY = 0.7;

        var directionX = Math.floor(Math.random() * 2);
        var directionY = Math.floor(Math.random() * 2);

        if (directionX == 1){
            fish[i].scaleX = 0.7;
            fish[i].movementTypeX = 'left';
        } else {
            fish[i].scaleX = -0.7;
            fish[i].movementTypeX = 'right';
        }

        if (directionY == 1){
            fish[i].movementTypeY = 'up';
        } else {
            fish[i].movementTypeY = 'down';
        }

        canvasArea.addChild(fish[i]);
    }
}

function drawBags(bagNum){

    numberOfBags = bagNum;
    bags = [];

    for (var i = 0; i < numberOfBags; i++){
        bags[i] = new createjs.Bitmap("res/game/plasticBag_100.png");
        bags[i].x = Math.floor(Math.random() * 500) + 20;
        bags[i].y = 120;
        bags[i].scaleX = 0.3;
        bags[i].scaleY = 0.3;
        bags[i].gameObjectActive = true;
        bags[i].index = i;

        var directionX = Math.floor(Math.random() * 2);
        if (directionX == 1){
            bags[i].movementTypeX = 'left';
        } else {
            bags[i].movementTypeX = 'right';
        }

        canvasArea.addChild(bags[i]);
        bags[i].on("click", function(event){
            removeBag(event);
        });

        if (bags[i].y <= 50) {
            bags[i].y -= 3;
            bags[i].x += 5;
        }

        bagsremoved[i] = false;

    }
}

function addBag(){
    numberOfBags++;

    var addBagIndex = bags.length;
    bags[addBagIndex] = new createjs.Bitmap("res/game/plasticBag_100.png");
    bags[addBagIndex].x = Math.floor(Math.random() * 500) + 20;
    bags[addBagIndex].y = Math.floor(Math.random() * 200) + 120;
    bags[addBagIndex].scaleX = 0.3;
    bags[addBagIndex].scaleY = 0.3;

    bags[addBagIndex].index = addBagIndex;
    bags[addBagIndex].gameObjectActive = true;

    var directionX = Math.floor(Math.random() * 2);
    if (directionX == 1){
        bags[addBagIndex].movementTypeX = 'left';
    } else {
        bags[addBagIndex].movementTypeX = 'right';
    }

    canvasArea.addChild(bags[addBagIndex]);
    bags[addBagIndex].on("click", function(event){
        removeBag(event);
    });

    if (bags[addBagIndex].y <= 50) {
        bags[addBagIndex].y -= 3;
        bags[addBagIndex].x += 5;
    }

    bagsremoved[addBagIndex] = false;
}

function moveBag(){
    for (var i = 0; i < bags.length; i++){
        if (bags[i].gameObjectActive == true){
            if (bags[i].x >= 530){
                bags[i].movementTypeX = 'left';
            }
            if (bags[i].x <= 20){
                bags[i].movementTypeX = 'right';
            }

            if (bags[i].movementTypeX == 'right'){
                bags[i].x += (Math.random()) + 2;
            } else {
                bags[i].x -= (Math.random()) + 2;
            }

            bags[i].y += (Math.random() * 0.1) + 0.4;

            if (bags[i].y >= (canvasHeight - 50)){
                numberOfBags -= 1;
                if (bagsremoved[i] == false){
                    lifeCount--;
                    bagsremoved[i] = true;
                    bags[i].gameObjectActive = false;
                    addBag();
                    if (Math.floor(Math.random() * 5) == 1){
                        addBag();
                    }
                }
                checkGameOver();
                canvasArea.removeChild(bags[i]);
            }
        }
    }
}

function moveFish(){
    for (var i = 0; i < numberOfFish; i++){
        if (fish[i].x >= 550){
            fish[i].movementTypeX = 'left';
            fish[i].scaleX = 0.7;
        }
        if (fish[i].x < 50){
            fish[i].movementTypeX = 'right';
            fish[i].scaleX = -0.7;
        }

        if (fish[i].movementTypeX == 'right'){
            fish[i].x += 1;
        } else {
            fish[i].x -= 1;
        }

        if (fish[i].y >= 680){
            fish[i].movementTypeY = 'up';
        }
        if (fish[i].y <= 600){
            fish[i].movementTypeY = 'down';
        }

        if (fish[i].movementTypeY == 'down'){
            fish[i].y += 1;
        } else {
            fish[i].y -= 1;
        }

    }
}

function checkFishCollision(){
    for (var i = 0; i < numberOfFish; i++){
        for (var k = 0; k < numberOfBags; k++){
            var collision = ndgmr.checkPixelCollision(fish[i], bags[k]);
            if (collision != false){
                canvasArea.removeChild(fish[i]);
                canvasArea.removeChild(bags[i]);
                lifeCount--;
                checkGameOver();
            }
        }
    }
}

function removeBag(event){
    canvasArea.removeChild(event.target);
    bags[event.target.index].gameObjectActive = false;
    numberOfBags -= 1;
    score++;
    addBag();
    if (Math.floor(Math.random() * 5) == 1){
        addBag();
    }
}

function checkGameOver(){
    if (lifeCount <= 0){
        gameOver = true;
        showEndScreen();
    }
}

function showEndScreen(){
    var playAgainButton = new createjs.Bitmap("res/buttons/PlayAgainButton.png");
    playAgainButton.x = 0;
    playAgainButton.y = 0;
}

function tick(){
    if (!paused && !gameOver){
        moveFish();
        moveBag();
        checkFishCollision();
        updateScoreText();
        scoreTextArea.text = scoreText;
    }
    canvasArea.update();
}