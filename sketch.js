var dog,sadDog,happyDog, database,foodS,foodStockRef;
var frameCountNow = 0;
var fedTime,lastFed,foodObj,currentTime;
var milk,input,name;
var gameState="hungery";
var gameStateRef;

var foodS,foodStock;
var addFood,feed;
var input,button;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  createCanvas(1000,400);

  database=firebase.database();
 
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
feed=createButton("feed the dog")
feed.position(700,95)
feed.mousePressed(feedDog)
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display()
 fedTime=database.ref('FeedTime')
  fedTime.on("value",function(data){lastFed=data.val()})
  fill("red")
  textSize(15)
  if (lastFed>=12){
    text("last feed :"+lastFed%12+"pm",350,30)
  }else if(lastFed==0){
    text("last feed :12 am",350,30)
  }
  else{text("last feed :"+lastFed+"am",350,30)}
 

 
  drawSprites();
}


function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  var foodstockvalue=foodObj.getFoodStock()
  if(foodstockvalue<=0){
    foodObj.updateFoodStock(foodstockvalue*0)
  }
else{
  foodObj.updateFoodStock(foodstockvalue-1)
}
  //write code here to update food stock and last fed time
database.ref('/').update({Food:foodObj.getFoodStock(),FeedTime:hour()})
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
