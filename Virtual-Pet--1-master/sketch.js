var dog, database, foodS, foodStock;
var dogImg, happyDogImg;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happydogImg = loadImage("images/dogImg1.png");
  
}

function setup() {

  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250,250,30,30);
  dog.addImage(dogImg);
  dog.scale = 0.1;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  
}


function draw() {  

  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }
  drawSprites();
  //add styles here
  textSize(20);
  stroke("black");
  fill("white");
  text("NOTE : Press the 'UP' Arrow key to feed Sniffy milk!", 30,70);
}

function readStock(data){
foodS = data.val();
}

function writeStock(m){

  if(m<=0){
    m =0 ;
  }
  else{
    m = m-1;
  }

  database.ref('/').update({
    Food : m
  })
}