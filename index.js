let grid = document.querySelector(".grid");

//values from css of .block
let boardWidth = 1120;
let boardHeight = 500;
let ballDiameter = 15;

//Ball positions
let ballStartPosition = [553, 150];
let ballCurrentPosition = ballStartPosition;
let xDirection = 3;
let yDirection = 3;

//Ball
let ball = document.createElement("div");
ball.classList.add("ball");
grid.appendChild(ball);
drawBall();

//Animate the ball
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
}

function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  drawBall();
  checkForCollisions();
}

//The setInterval() method calls a function or evaluates an expression at specified intervals (in milliseconds).The setInterval() method will continue calling the function until clearInterval() is called, or the window is closed.
let timer = setInterval(moveBall, 25);

//Collision checks

function checkForCollisions() {
  
  //check for hitting walls
  if (
    ballCurrentPosition[0] >= boardWidth - ballDiameter ||
    ballCurrentPosition[1] >= boardHeight - ballDiameter ||
    ballCurrentPosition[0] <= 0 ||
    //bottom wall check in place just to keep the ball moving - change this to stop the ball moving to show loss
    ballCurrentPosition[1] <= 0
  ) {
    changeDirection();
  }
  //check for hitting user
  if (ballCurrentPosition[1] == (userCurrentPosition - ballDiameter)) {
    changeDirection();
  }
}

//change the ball's direction depending on which way it is currently moving
function changeDirection() {
  //if moving to the right and up
  if (xDirection === 3 && yDirection === 3) {
    yDirection = -3;
    return;
  }
  //if moving to the right and down
  if (xDirection === 3 && yDirection === -3) {
    xDirection = -3;
    return;
  }
  //if moving to the left and down
  if (xDirection === -3 && yDirection === -3) {
    yDirection = 3;
    return;
  }
  //if moving to the left and up
  if (xDirection === -3 && yDirection === 3) {
    xDirection = 3;
    return;
  }
}