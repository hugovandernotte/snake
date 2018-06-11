var s;
var scl = 30;

var fruits = [];
var food;
var time = 4;


function setup() {
  createCanvas(1110, 540);
  s = new Snake();
  frameRate(10);
  pickLocation();
  setInterval(function() {
    time--;
  }, 1000);
  grass = loadImage("images/grass.png");
  snake = loadImage("images/snake.png");
  cherry = loadImage("images/cherry.png");
  orange = loadImage("images/orange.png");
  banana = loadImage("images/banana.png");
  raspberry = loadImage("images/raspberry.png");
  fruits = [banana, orange, cherry, raspberry];
  fruit = cherry;
}

function draw() {
  background(grass);

  fill (255);
  noStroke();
  rect(width - scl, 0, scl, height);
  rect(0, 0, scl, height);
  rect(0, height - scl, width, scl);
  rect(0, 0, width, scl);

  if (s.eat(food) || time === 0) {
    fruit = pickLocation();
  }

  s.death();
  s.update();
  s.show();
  image(fruit, food.x, food.y, scl, scl);
}

function pickLocation() {
  var cols = floor(width/scl - 1);
  var rows = floor(height/scl - 1);
  food = createVector(floor(random(rows)), floor(random(rows)));
  food.mult(scl);
  while (!(s.foodNotOnSnake(food))) {
    food = createVector(floor(random(rows)), floor(random(rows)));
    food.mult(scl);
  }
  time = 4;
  return fruits[Math.floor(Math.random()*fruits.length)];
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  }
}

function outBorder() {
  if (s.x === width - scl && s.xspeed === 1) return "right";
  if (s.x === 0 && s.xspeed === -1) return "left";
  if (s.y === 0 && s.yspeed === -1) return "top";
  if (s.y === height - scl && s.yspeed === 1) return "bottom";
  return null
}