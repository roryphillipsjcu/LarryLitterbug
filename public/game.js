var numberOfFish = 5;
var lifeCount = 3;

var numberOfBags = 5;
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

var gameTime = 0;

var bagSpawnX = 300;
var bagSpawnY = 40;

var bagSpeed = 0.2;

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

    var playButton = new createjs.Bitmap("res/buttons/PlayButton.png");
    playButton.scaleX = 0.8;
    playButton.scaleY = 0.8;
    playButton.x = 200;
    playButton.y = 200;
    canvasArea.addChild(playButton);
    playButton.on("click", function(){
        startGame();
    });
    playButton.on("mouseover", function(){
        playButton.image.src = "res/buttons/PlayButton_Hovered.png";
        playButton.x = 180;
        canvasArea.update();
    });
    playButton.on("mouseout", function(){
       playButton.image.src = "res/buttons/PlayButton.png";
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
	lifeCount = 3;
    score = 0;
	bagSpeed = 0.2;
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
    drawBags(numberOfBags);

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
        bags[i] = new createjs.Bitmap("res/game/PlasticBag_100.png");
        bags[i].x = bagSpawnX;
        bags[i].y = bagSpawnY;
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

        bagsremoved[i] = false;

    }
}

function addBag(){
    numberOfBags++;

    var addBagIndex = bags.length;
    bags[addBagIndex] = new createjs.Bitmap("res/game/PlasticBag_100.png");
    bags[addBagIndex].x = bagSpawnX;
    bags[addBagIndex].y = bagSpawnY;
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

    bagsremoved[addBagIndex] = false;
}

function moveBag(){
    for (var i = 0; i < bags.length; i++){
        if (bags[i].gameObjectActive == true){
			
			if (bags[i].y <= 60) {
         	   bags[i].y += 1;
			   continue;
		    }
						
			if (((gameTime % 70) == 0) & (gameTime != 0)) {
				var randomNum = Math.floor(Math.random() * (2 + 1));
				
				switch (randomNum) {
					case 0:
						bags[i].movementTypeX = 'left';
						break;
					case 1:
						bags[i].movementTypeX = 'right';
						break;
					case 2:
						bags[i].movementTypeX = 'straight';
						break; 
				}
			}
			
			
            if (bags[i].x >= 530){
                bags[i].movementTypeX = 'left';
            }
            if (bags[i].x <= 20){
                bags[i].movementTypeX = 'right';
            }

            if (bags[i].movementTypeX == 'right'){
                bags[i].x += (Math.random()) + 2;
            } else if (bags[i].movementTypeX == 'left'){
                bags[i].x -= (Math.random()) + 2;
            } else {
				//Down Straight
			}
			

            bags[i].y += bagSpeed;

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
			
	for (var i = 0; i < fish.length; i++){
    	for (var k = 0; k < bags.length; k++){
			
			if (bagsremoved[k])
				continue;
			
            var collision = ndgmr.checkPixelCollision(fish[i], bags[k]);
			
			if (collision){
                canvasArea.removeChild(fish[i]);
                canvasArea.removeChild(bags[k]);
				bagsremoved[k] = true;
                lifeCount--;
                checkGameOver();
            }
        }
    }
}

function removeBag(event){
    canvasArea.removeChild(event.target);
    bags[event.target.index].gameObjectActive = false;
	bagsremoved[event.target.index] = true;
    numberOfBags -= 1;
    score++;
    addBag();
    if (Math.floor(Math.random() * 5) == 1){
        addBag();
    }
}

function checkGameOver(){
    if (lifeCount == 0){
        gameOver = true;
        showEndScreen();
    }
}

function showEndScreen(){
	clear();
	
	var gameOverText = new createjs.Text("Game Over");
	gameOverText.x = 300;
    gameOverText.y = 30;

	canvasArea.addChild(gameOverText);
	
	var person = prompt("Please enter name", "");
	if (person != null){
		postHighscore(person);			
	}
	
	getRandomFact();
	var informationFactString = retrieveRandomFact();
	console.log(informationFactString);
	
	var informationFact = new createjs.Text(informationFactString, "50px Arial; text-align: center", "#ff7700");
	informationFact.x = (300 - (informationFact.getMeasuredWidth() * 0.5));
    	informationFact.y = 80;
	
	canvasArea.addChild(informationFact);
	
	
	var playAgainButton = new createjs.Bitmap("res/buttons/PlayAgainButton.png");
    playAgainButton.x = 180;
    playAgainButton.y = 180;
	
	canvasArea.addChild(playAgainButton);
	
	playAgainButton.on("click", function(){
        startGame();
    });
    playAgainButton.on("mouseover", function(){
        playAgainButton.image.src = "res/buttons/PlayAgainButton_Hovered.png";
        playAgainButton.x = 180;
    });
    playAgainButton.on("mouseout", function(){
		playAgainButton.image.src = "res/buttons/PlayAgainButton.png";
        playAgainButton.x = 200;
    });
	
	
	var continueButton = new createjs.Bitmap("res/buttons/ContinueButton.png");
    continueButton.x = 200;
    continueButton.y = 500;
	
	canvasArea.addChild(continueButton);
	
	continueButton.on("click", function(){
        showSummary();
    });
    continueButton.on("mouseover", function(){
        continueButton.image.src = "res/buttons/ContinueButton_Hovered.png";
        continueButton.x = 180;
    });
    continueButton.on("mouseout", function(){
		continueButton.image.src = "res/buttons/ContinueButton.png";
        continueButton.x = 200;
    });
	
}

function showSummary() {
	
	clear();
	
	scoreString = "Score: " + score;
	
	var scoreText = new createjs.Text(scoreString, "50px Arial", "#ff7700");
	scoreText.x = 300;
    scoreText.y = 30;

	canvasArea.addChild(scoreText);
	
	var menuButton = new createjs.Bitmap("res/buttons/MenuButton.png");
    menuButton.x = 200;
    menuButton.y = 500;
	
	canvasArea.addChild(menuButton);
	
	menuButton.on("click", function(){
        drawHome();
    });
    menuButton.on("mouseover", function(){
        menuButton.image.src = "res/buttons/MenuButton_Hovered.png";
        menuButton.x = 180;
    });
    menuButton.on("mouseout", function(){
		menuButton.image.src = "res/buttons/MenuButton.png";
        menuButton.x = 200;
    });
	
	//Show Score
	//Show 	
	
}

function updateBagSpeed() {

	bagSpeed += 0.001;
	
}

function tick(){
	
	gameTime += 1;
	
    if (!paused && !gameOver){
        moveFish();
        moveBag();
        checkFishCollision();
        updateScoreText();
        scoreTextArea.text = scoreText;
    	
		updateBagSpeed();
	}
	
	
    canvasArea.update();
}
