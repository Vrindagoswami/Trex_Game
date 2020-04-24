var trex, treximage;
var ground, groundimage;
var invisibleGround;
var cloud, cloudimage;
var obstacle;
var obstacle1image;
var obstacle2image;
var obstacle3image;
var obstacle4image;
var obstacle5image;
var obstacle6image;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameover, gameoverimage;
var restart, restartimage;
var ObstaclesGroup;
var CloudsGroup;
var score = 0;

function preload() {
  treximage = loadAnimation("trex1.png", "trex3.png", "trex4.png");

  groundimage = loadImage("ground2.png");

  cloudimage = loadImage("cloud.png");

  obstacle1image = loadImage("obstacle1.png");

  obstacle2image = loadImage("obstacle2.png");

  obstacle3image = loadImage("obstacle3.png");

  obstacle4image = loadImage("obstacle4.png");

  obstacle5image = loadImage("obstacle5.png");

  obstacle6image = loadImage("obstacle6.png");

  gameoverimage = loadImage("gameOver.png");

  restartimage = loadImage("restart.png");
  
  collideimage = loadAnimation("trex_collided.png");
  
  jumpsound = loadSound("jump.mp3");
  
  diesound = loadSound("die.mp3");
  
  checkpointsound = loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(30, 180, 10, 10);
  trex.addAnimation("trex", treximage);
  trex.scale = 0.5;
  trex.addAnimation("collided", collideimage);
  trex.setCollider("rectangle",0,0,300,trex.height);
  ground = createSprite(300, 185, 600, 10);
  ground.addImage("ground", groundimage);
  ground.x = ground.width / 2;
  invisibleGround = createSprite(300, 190, 600, 5);
  invisibleGround.visible = false;
  gameover = createSprite(300, 100, 10, 10);
  gameover.addImage("gameOver", gameoverimage);
  gameover.scale = 0.5
  gameover.visible = false;
  restart = createSprite(300, 140, 10, 10);
  restart.addImage("restart", restartimage);
  restart.scale = 0.5;
  restart.visible = false;
  ObstaclesGroup = new Group();
  CloudsGroup = new Group();

}

function draw() {
  background(255);
  text(mouseX + ',' + mouseY, 10, 15);

  //console.log(trex.y);
  text("Score:" + score,500,20);
  trex.debug = true;
  console.log

  if (gameState === PLAY) {
    ground.velocityX = -9;
    ground.velocityX = -(6+ 2*score/100);
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (keyDown("space") && trex.y >= 163) {
      trex.velocityY = -12;
      jumpsound.play();
    }

    trex.velocityY = trex.velocityY + 0.8;

    trex.collide(invisibleGround);
    
    score = score + Math.round(getFrameRate()/60);
    if(score%100 === 0){
      checkpointsound.play();
    }
    
     spawnClouds();
    spawnObstacles();
    if (ObstaclesGroup.isTouching(trex)) {
      //gameState = END;
      //diesound.play();
      trex.velocityY = -12;
    }

    console.log(gameState);

   

  } else if (gameState === END) {
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    gameover.visible = true;
    restart.visible = true;
    trex.changeAnimation("collided", collideimage);
  
  }
  
  if(mousePressedOver(restart)){
    reset();
  }


  drawSprites();
}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    cloud = createSprite(600, 100, 10, 10);
    cloud.y = Math.round(random(80, 120));
    cloud.velocityX = -5;
    cloud.addImage("cloud", cloudimage);
    cloud.lifetime = 120;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    CloudsGroup.add(cloud);
  }
  

}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    obstacle = createSprite(600, 165, 10, 10);
    obstacle.velocityX = -(6 + 3*score/100);
    var rand = Math.floor(random(1, 6));
    switch (rand) {
      case 1:
        obstacle.addImage("ob1", obstacle1image);
        break;

      case 2:
        obstacle.addImage("ob2", obstacle2image);
        break;

      case 3:
        obstacle.addImage("ob3", obstacle3image);
        break;

      case 4:
        obstacle.addImage("ob4", obstacle4image);
        break;

      case 5:
        obstacle.addImage("ob5", obstacle5image);
        break;

      case 6:
        obstacle.addImage("ob6", obstacle6image);
        break;

      default:
        break;
    }
    obstacle.lifetime = 100;
    obstacle.scale = 0.5;
    ObstaclesGroup.add(obstacle);

  }

}

function reset() {
  gameState = PLAY;
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  trex.addAnimation("trex", treximage);
  gameover.visible = false;
  restart.visible = false;
  trex.changeAnimation("trex", treximage);
  
}