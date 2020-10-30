var PLAY=1;
var END=0;
var gameState=1;
var monkey , monkey_running,ground;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score,spawnBananas,spawnObstacles,survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
   //creating canvas
   createCanvas(500,400);
   //creating sprite for monkey
   monkey = createSprite(100,345,100,100);
   monkey.addAnimation("monk",monkey_running);
   monkey.scale=0.1;
   // monkey.collide(ground);
   //creating sprite for ground
   ground = createSprite(200,380,700,10);
   obstaclesGroup = new Group();
   bananaGroup = new Group();
  
}


function draw() {
   //background colour
   background("lightblue");
   //to show gameState
   console.log("this is "+gameState);
   monkey.setCollider("circle",0,0,290);
   //colliding monkey with the ground
   monkey.collide(ground);
   //for the boundaries of the Sprites
   monkey.debug=true;
   obstaclesGroup.debug=true;
   //gameState
   if (gameState===1)
   {
       if (keyDown("space")&&monkey.y>250)
       {
          monkey.velocityY=-9;
       
       }
       //adding gravity
       monkey.velocityY=monkey.velocityY+1;
       if (frameCount%100===0)
       {
           spawnObstacles(); 
       } 
       if (frameCount%100===0)
       {
           spawnBananas();
       }
       if (obstaclesGroup.isTouching(monkey))
       {   
           gameState=0;
           monkey.velocityX=0;
          
       }
       //gamestate = END
   else if (gameState===0)
   {
            monkey.collide(ground);
            bananaGroup.setLifetimeEach(-1);
            obstaclesGroup.setLifetimeEach(-1);
     
   }
                    
                   
   } 
  //drwing sprites
  drawSprites();
  //to show text
  stroke("white");
  fill("white");
  stroke("black");
  fill("black");
  textSize(20);
  //survival time
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time=" +survivalTime,170,70);
  
}
//bananas
function spawnBananas(){
   banana = createSprite(510,280,20,20);
   banana.addImage("banana",bananaImage);
   banana.scale=0.1;
   banana.velocityX=-8;
   banana.lifetime=530;
   bananaGroup.add(banana);
}
//obstacles
function spawnObstacles(){
   obstacle = createSprite(510,337,100,100);
   obstacle.addImage("image",obstacleImage);
   obstacle.scale=0.2;
   obstacle.velocityX=-6;
   obstacle.lifetime=530;
   obstaclesGroup.add(obstacle);
   
}




