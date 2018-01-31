var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

canvas.style.background = "gray";

var x = 30;
var y = 150;
var dx = 1.5;
var dy = -1.5;
var paddleHeight = 10;
var paddleWidth = 75;
paddleX = (canvas.width - paddleWidth)/2;
// paddleY = canvas.Height - paddleHeight;
// drawPaddle(paddleX);
var leftPressed = false;
var rightPressed = false;

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyUpHandler(e) {
    if(e.keyCode == 37){
      leftPressed = false;
      // console.log(e.keyCode + " leftReleased " + leftReleased);
    }
    else if(e.keyCode == 39){
      rightPressed = false;
      // console.log(e.keyCode + " rightReleased " + rightReleased);
    }
}

function keyDownHandler(e){
  if(e.keyCode == 37){
    leftPressed = true;
    // console.log(e.keyCode + " leftPressed " + leftPressed);
  }
  else if(e.keyCode == 39) {
    rightPressed = true;
    // console.log(e.keyCode + " rightPressed " + rightPressed);
  }
}

function drawMovingBall(){
  context.clearRect(0, 0, canvas.width, canvas.height);
  var cir = new circle(x, y, 10, 'black');
  drawPaddle();
  //console.log(x+" "+y);
  // var cir = new circle(x, y, 10, 'black');
  if(y + dy < 10){
    dy = -dy;
  }
  else if(y + dy > canvas.height-10){
    if(x > paddleX && x < paddleX + paddleWidth){
      dy = -dy;
    }
    else{
      alert("GameOver");
      document.location.reload();
    }
    // alert("Game Over");
    // document.location.reload();
  }
  if( x + dx > canvas.width-10 || x + dx < 10){
    dx = -dx;
  }

  if(leftPressed && paddleX > 0){
    paddleX -= 7;
    // console.log("left drawPaddle");
  }
  if(rightPressed && paddleX < canvas.width - paddleWidth){
    paddleX += 7;
    // console.log("right drawPaddle");
  }

  x += dx;
  y += dy;
}

function drawPaddle(){
  context.beginPath();
  context.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  context.fillStyle = "red";
  context.fill();
  context.closePath();
}

function circle(x, y, radius=10, color='red'){
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI*2);
  context.fillStyle = color;
  context.fill();
  context.closePath();
}

setInterval(drawMovingBall, 10);
