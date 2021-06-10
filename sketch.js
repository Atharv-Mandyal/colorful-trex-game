var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex
var ground, invisibleGround, groundImage;


var obstaclesGroup, obstacle2, obstacle1,obstacle3;
var score=0,life=3;



var gameOver, restart;

localStorage["HighestScore"] = 0;

function preload(){
  mario_running = loadAnimation("trex.png");
  

  
  obstacle2 = loadImage("obstacle2.jpg");
  obstacle1 = loadImage("obstacle1.png");
   gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
 
  
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(50,150,20,50);
  trex.addAnimation("running", mario_running);
 trex.scale = 0.2;
  
  ground = createSprite(0,190,1200,10);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background("white");
  textSize(20);
  fill(255);
  text("Score: "+ score, 500,40);
text("life: "+ life , 500,60);
  drawSprites();
  if (gameState===PLAY){
  // score = score + Math.round(getFrameRate()/60);
    if(score >= 0){
      ground.velocityX = -6;
    }else{
      ground.velocityX = -(6 + 3*score/100);
    }
  
    if(keyDown("space") && trex.y >= 139) {
      trex.velocityY = -12;
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    trex.collide(ground);
    
    
    spawnObstacles();
  
   if(obstaclesGroup.isTouching(trex)){
    
        gameState = END;
    
    }
    
    
  }
  
  else if (gameState === END ) {
    gameOver.visible = true;
    restart.visible = true;
    
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);

    
    //change the trex animation

    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    
    
    if(mousePressedOver(restart)) {
      if(life>0){reset();
    }}
  }
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle2);                 
              break;
              
      case 2: obstacle.addImage(obstacle1)
              break;
              obstacle.scale=0.2
    }
        
    obstacle.velocityX = -(6 + 3*score/100);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
 
  trex.changeAnimation("running",mario_running);
  trex.scale =0.2;
  

  
  score = 0;
  
}