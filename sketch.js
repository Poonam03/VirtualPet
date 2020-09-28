//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogImg, happyDogImg;
function preload()
{
  //load images here
  dogImg=loadImage("Dog.png");

  happyDog=loadImage("happydog.png");
}

function setup() {
  createCanvas(500, 500);
  database=firebase.database();
  dog=createSprite(250,400,20,20);
  dog.addImage(dogImg);
  dog.scale=0.2;
  
  foodStock=database.ref("Food");
  foodStock.on("value",readStock)
}


function draw() {  
  background(46,139,87);
  strokeWeight(10)
  stroke("green");
  fill("white");
  textSize(20)
  text("Note:Press UP_ARROW key to feed Drago milk",50,50)
  fill("white");
  textSize(20)
  text("Food Remaining :"+foodS,180,300)
  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  drawSprites();
  //add styles here

}
function readStock(data)
{
  foodS=data.val();

}

function writeStock(x)
{
  if(x<=0)
  {
    x=0;
  }
  else
  {
    x=x-1;
  }
  database.ref('/').update(
    {
      Food:x
    }
  )

}

