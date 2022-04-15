var fish, fishImage
var shark,sharkImage
var net,netImage
var score = 0;
var PLAY=1;
var END=0;
var gameState=PLAY;
var ground,groundImage;
var invisibleGround
var obstacleGroup;
function preload(){
  fishImage = loadImage("fish.png");
  sharkImage = loadImage("shark.png");
  netImage = loadImage("Net.png");
  groundImage = loadImage("Ground.png");
  //gameOverImg=loadImage("gameOver.png");
  //restartImg=loadImage("restart.png");
}

function setup() {
  
  createCanvas(windowWidth,windowHeight);
  
 
  //create a ground sprite
  ground = createSprite(0,0);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
ground.scale=4
   //create a trex sprite
   fish = createSprite(50,height/2,20,50);
   fish.addImage(fishImage);
   fish.scale = 0.3;
   fish.debug= false;
   fish.setCollider("circle",0,0,40)
    //create invisible ground
    invisibleGround=createSprite(width/2,height-20,width,20);
    invisibleGround.visible=false;
  sharkGroup=new Group();
  obstacleGroup=new Group();
}

function draw() {

  //set background color
  background(180);
  if(gameState===PLAY){
    score=score+Math.round(getFrameRate()/60);
    if(score>0 &&  score%1000===0){
    }
    }
    ground.velocityX = -(4+3*score/100);
   
    if(keyDown("space")){
      fish.velocityY=-12;
    }
    fish.velocityY = fish.velocityY + 0.8
    
    if (ground.x < 300){
      ground.x = ground.width/2;
    }
    spawnSharks();
    spawnNet();

    if(sharkGroup.isTouching(fish)||obstacleGroup.isTouching(fish)){
      gameState=END;
      
      //trex.velocityY = -10;
      //jumpsound.play();
    }
 
  //stop trex from falling down
  

   fish.collide(invisibleGround);  
   drawSprites();
    if(gameState===END){
    ground.velocityX = 0;
    fish.velocityY=0
    sharkGroup.setVelocityXEach(0);
    sharkGroup.setLifetimeEach(-1)
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    text("If You Want To Play Again, Click The Refresh Button",width/2-100,height/2);
    
  }
   textSize(30);
   fill("black")
  text("Score: "+score,50,50);
 
}

function reset(){
  //gameState=PLAY;
  //gameOver.visible=false;
  //restart.visible=false;
  //SharkGroup.destroyEach();
  //trex.changeAnimation("running",trex_running)
  //score=0
}
function spawnSharks(){
  if(frameCount%200===0){
    shark=createSprite(width+100,height/2,40,10);
shark.velocityX=-(3+3*score/100)
shark.addImage(sharkImage);
shark.y=Math.round(random(height/4,height-30));
shark.scale=0.25;
shark.depth=fish.depth;
fish.depth+=1;
shark.lifetime=300;
sharkGroup.add(shark);

  }

}


function spawnNet(){
if(frameCount%60===0){
  obstacle=createSprite(width+100,height/2,20,30);
  obstacle.addImage(netImage);
  obstacle.velocityX= -(3+3*score/100)
  obstacle.y=Math.round(random(height/2,height-20))
  obstacle.lifetime=300;
  obstacleGroup.add(obstacle);
  obstacle.scale=0.3

  }
}
  
