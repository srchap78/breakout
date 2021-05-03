//the div with class grid
let grid = document.querySelector(".grid");

//values from css of .block
let boardWidth = 1120;
let boardHeight = 500;
let ballDiameter = 15;
let playerWidth = 200;
let playerHeight = 25;
let playerXAxis = 460;
let playerYAxis = 30;

//Player block
let playerBlock = {
  bottomLeft: [playerXAxis, playerYAxis],
  bottomRight: [playerXAxis + playerWidth, playerYAxis],
  topLeft: [playerXAxis, playerYAxis + playerHeight],
  topRight: [playerXAxis + playerWidth, playerYAxis + playerHeight],
};

//Initial position so player block shows up in the middle of the grid
let playerStartPosition = [
  playerBlock.bottomLeft[0],
  playerBlock.bottomLeft[1],
];

//variable to hold players position on grid before and after movement
let playerCurrentPosition = playerStartPosition;

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
  // console.log('ballCurrentPosition:' + ballCurrentPosition)
  drawBall();
  checkForCollisions();
}

//The setInterval() method calls a function or evaluates an expression at specified intervals (in milliseconds).The setInterval() method will continue calling the function until clearInterval() is called, or the window is closed.
let timer = setInterval(moveBall, 25);

//Collision checks
function checkForCollisions() {
  //check for ball hitting walls
  if (
    //if ball xAxis hits the right side
    ballCurrentPosition[0] >= boardWidth - ballDiameter ||
    //if the ball yAxis hits the top
    ballCurrentPosition[1] >= boardHeight - ballDiameter ||
    //if the ball xAxis hits the left side
    ballCurrentPosition[0] <= 0
  ) {
    changeDirection();
  }
  //check for if the ball hits the bottom of the grid. Then game stops and player loses
  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timer);
  }
  //check for ball hitting player block
  if (
    //area between the two points on the player's x axis
    //ball x axis is greater than player x axis AND
    ballCurrentPosition[0] > playerCurrentPosition[0] &&
    //ball x axis is less than player x axis + player block width
    ballCurrentPosition[0] < playerCurrentPosition[0] + playerWidth &&
    //area between the two points on the player's y axis
    //finds the bottom y axis so if it hits the side of the player block it will bounch
    ballCurrentPosition[1] > playerCurrentPosition[1] &&
    //finds the top of the block
    ballCurrentPosition[1] < playerCurrentPosition[1] + playerHeight
  ) {
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

//player
let player = document.createElement("div");
player.classList.add("player");
drawPlayer();
grid.appendChild(player);

//draw player
function drawPlayer() {
  player.style.left = playerCurrentPosition[0] + "px";
  player.style.bottom = playerCurrentPosition[1] + "px";
}

//move player left and right within the grid with the "a" and "d" keys
//paramater e is for eventlistener
function movePlayer(e) {
  switch (e.key) {
    case "a":
      //If the bottom left of the player box = 0 it will stop moving to the left
      if (playerCurrentPosition[0] > 0) {
        //10 is subtracted from the xAxis when a is pressed
        playerCurrentPosition[0] -= 10;
        player.style.left = playerCurrentPosition[0] + "px";
        //draw the new position of the player
        drawPlayer();
        //break out of the switch and listen for more key presses
      }
      break;

    case "d":
      //if the bottom left + the player width is equal to the board width it will stop moving to the right
      if (playerCurrentPosition[0] < boardWidth - playerWidth) {
        //10 is added to the xAxis when d is pressed
        playerCurrentPosition[0] += 10;
        player.style.left = playerCurrentPosition[0] + "px";
        drawPlayer();
      }
      break;
  }
}
//listen for key presses to move player
document.addEventListener("keydown", movePlayer);

