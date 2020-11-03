var trex,trex_run,ground,ground_image,invisible_ground,cloud,cloud_image,obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,cloudGroup,obstacleGroup,gameState = "play",gameOver,gameOver_image,restart,restart_image,trex_collided,checkpoint,die,jump;
      var count = 0
function preload(){
  trex_run=loadAnimation("trex1.png","trex3.png","trex4.png")
  trex_collided=loadAnimation("trex_collided.png")
  ground_image=loadImage("ground2.png")
  cloud_image=loadImage("cloud.png")
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")
  gameOver_image=loadImage("gameOver.png")
  restart_image=loadImage("restart.png")
  checkpoint=loadSound("checkPoint.mp3")
  die=loadSound("die.mp3")
  jump=loadSound("jump.mp3")
}
function setup() {
  createCanvas(600, 200);
  trex=createSprite(30,180,10,10);
  trex.addAnimation("running",trex_run);
  trex.addAnimation("collided",trex_collided);
  trex.scale=0.5;
  ground=createSprite(300,190,600,20);
  ground.addImage("ground",ground_image);
  ground.velocityX=-5;
  invisible_ground=createSprite(300,200,600,20);
  invisible_ground.visible=false;
  cloudGroup=new Group();
  obstacleGroup=new Group();
  gameOver=createSprite(300,50,10,10);
  gameOver.addImage(gameOver_image);
  gameOver.scale=0.5;
  gameOver.visible=false;
  restart=createSprite(300,100,10,10);
  restart.addImage(restart_image)
  restart.scale=0.5
  restart.visible=false;
  
}

function draw() {
  background(180);
  text("Score: "+ count, 500,30);
  if(gameState === "play"){
    ground.velocityX=-10;
     count = count+Math.round(World.frameRate/60);
    if(ground.x < 0){
       ground.x=ground.width/2;
    }
    if (count > 0 && count % 100 === 0) {
      checkpoint.play();
    }
    if(keyDown("space")&& trex.y > 166){
     trex.velocityY=-12;
     jump.play(); 
  }
    trex.velocityY=trex.velocityY+0.8;
    spawnClouds();
    spawnObstacles();
    if(obstacleGroup.isTouching(trex)){
       gameState="end";
      die.play();
  }
  }
  else if(gameState === "end"){
    ground.velocityX=0;
    trex.velocityY=0;
    gameOver.visible=true;
    restart.visible=true;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityEach(0);
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    trex.changeAnimation("collided",trex_collided);
    if(mousePressedOver(restart)){
       reset();
  }
  }
  trex.collide(invisible_ground);
  drawSprites();
}
function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,0,0);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloud_image);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.lifetime = 200;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudGroup.add(cloud);
}
}
function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(9 + 5*count/100);
    var rand = Math.round(random(1,6));
    switch(rand) {
    case 1: obstacle.addImage(obstacle1); break;
    case 2: obstacle.addImage(obstacle2); break;
    case 3: obstacle.addImage(obstacle3); break;
    case 4: obstacle.addImage(obstacle4); break;
    case 5: obstacle.addImage(obstacle5); break;
    case 6: obstacle.addImage(obstacle6); break;
    default:break;
    }
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
  }
}
function reset(){
    gameOver.visible = false;
    restart.visible = false;
    gameState = "play";
    obstacleGroup.destroyEach();
    cloudGroup.destroyEach();
    trex.changeAnimation("running",trex_run);
    count = 0;
}