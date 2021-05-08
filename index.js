//the div with class grid
let grid = document.querySelector(".grid");

//starting score
let scoreDisplay = document.querySelector("#score");
let score = 0;
let livesDisplay = document.querySelector("#lives");
let lives = 3;
let instructionsDisplay = document.querySelector(".instructions");

//values from css of .block
let boardWidth = 1110;
let boardHeight = 500;
let ballDiameter = 15;
let playerWidth = 200;
let playerHeight = 25;
let playerXAxis = 460;
let playerYAxis = 30;
let blockWidth = 100;
let blockHeight = 25;

//function to restart after loss of life
//resets ball position and sets a new interval
//after ball his bottom of grid, it is invoked by keyup of spacebar
function restart(e) {
  if (e.key === " ") {
    console.log("you pressed the spacebar");
    ballCurrentPosition = ballStartPosition;
    timer = setInterval(moveBall, 25);
  }
}

//Blocks
//class to build blocks and get their 4 points
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

//array to hold the 10X3 grid of blocks
let blocks = [
  new Block(10, 450),
  new Block(120, 450),
  new Block(230, 450),
  new Block(340, 450),
  new Block(450, 450),
  new Block(560, 450),
  new Block(670, 450),
  new Block(780, 450),
  new Block(890, 450),
  new Block(1000, 450),

  new Block(10, 390),
  new Block(120, 390),
  new Block(230, 390),
  new Block(340, 390),
  new Block(450, 390),
  new Block(560, 390),
  new Block(670, 390),
  new Block(780, 390),
  new Block(890, 390),
  new Block(1000, 390),

  new Block(10, 330),
  new Block(120, 330),
  new Block(230, 330),
  new Block(340, 330),
  new Block(450, 330),
  new Block(560, 330),
  new Block(670, 330),
  new Block(780, 330),
  new Block(890, 330),
  new Block(1000, 330),
];

function drawBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    let block = document.createElement("div");
    block.classList.add("block");
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    grid.appendChild(block);
  }
}

drawBlocks();

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
let xDirection = -3;
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

//The setInterval() method calls a function or evaluates an expression at specified intervals (in milliseconds).The setInterval() method will continue calling the function until clearInterval() is called, or the window is closed. The return value of setInterval() is an ID number that can be passed to clearInterval() to stop the periodically executed function from running another time.
let timer = setInterval(moveBall, 25);
//
//Collision checks
//! some collisions are wrong and need fixed
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

  //check for if the ball hits the bottom of the grid.
  //! this needs fixed
  if (ballCurrentPosition[1] <= 0) {
    if (lives > 0) {
      //stop the interval
      clearInterval(timer);
      instructionsDisplay.innerHTML =
        "You missed! Hit the spacebar to continue. You have " +
        lives +
        " lives left.";
      //Once pressbar is pressed and released a new interval is started
      document.addEventListener("keyup", (e) => {
        if (e.key == " ") {
          console.log("you hit space");
          //! this needs fixed
          ballCurrentPosition = ballStartPosition; 
          timer = setInterval(moveBall, 25);
        }
      });
    } else if (lives === 0) {
      clearInterval(timer);
      instructionsDisplay.innerHTML = "You Lose!!";
    }
    console.log(lives);
    livesDisplay.innerHTML = lives;
    //lives--
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
  //Check for hitting blocks
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
      ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
      ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      ballCurrentPosition[1] + ballDiameter < blocks[i].topLeft[1]
    ) {
      let allBlocks = Array.from(document.querySelectorAll(".block"));
      allBlocks[i].classList.remove("block");
      blocks.splice(i, 1);
      changeDirection();
      score++;
      scoreDisplay.innerHTML = score + " of " + blocks.length + " blocks hit";
    }
  }
}

//change the ball's direction depending on which way it is currently moving
function changeDirection() {
  // x axis= 3px moving to the right, -3 to the left
  // y axis= 3px moving up, -3 moving down
  //moving to the right and up
  if (xDirection === 3 && yDirection === 3) {
    yDirection = -3;
    return;
  }
  //moving to the right and down
  if (xDirection === 3 && yDirection === -3) {
    yDirection = 3;
    return;
  }
  //moving to the left and down
  if (xDirection === -3 && yDirection === -3) {
    xDirection = 3;
    return;
  }
  //moving to the left and up
  if (xDirection === -3 && yDirection === 3) {
    yDirection = -3;
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

//restart after hitting bottom
