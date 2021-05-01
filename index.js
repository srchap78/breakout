let grid = document.querySelector(".grid");


//values from css of .block
let blockWidth = 100
let blockHeight = 25

//User positions
let userStartPosition = [510,20]
let userCurrentPosition = userStartPosition

//Ball positions
let ballStartPosition = [553, 150]
let ballCurrentPosition = ballStartPosition

//Class to build and position blocks in the grid. Uses the bottom left as an anchor.
class Block {
    constructor(xAxis, yAxis){
this.bottomLeft = [xAxis, yAxis]
this.bottomRight = [xAxis + blockWidth, yAxis]
this.topLeft = [xAxis, yAxis + blockHeight]
this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

//Array to hold a 10X5 grid of blocks
let blocks = [
     new Block(15,460),
     new Block(125,460),
     new Block(235,460),
     new Block(345,460),
     new Block(455,460),
     new Block(565,460),
     new Block(675,460),
     new Block(785,460),
     new Block(895,460),
     new Block(1005,460),
     
     new Block(15,430),
     new Block(125,430),
     new Block(235,430),
     new Block(345,430),
     new Block(455,430),
     new Block(565,430),
     new Block(675,430),
     new Block(785,430),
     new Block(895,430),
     new Block(1005,430),

     new Block(15,400),
     new Block(125,400),
     new Block(235,400),
     new Block(345,400),
     new Block(455,400),
     new Block(565,400),
     new Block(675,400),
     new Block(785,400),
     new Block(895,400),
     new Block(1005,400),

     new Block(15,370),
     new Block(125,370),
     new Block(235,370),
     new Block(345,370),
     new Block(455,370),
     new Block(565,370),
     new Block(675,370),
     new Block(785,370),
     new Block(895,370),
     new Block(1005,370),

     new Block(15,340),
     new Block(125,340),
     new Block(235,340),
     new Block(345,340),
     new Block(455,340),
     new Block(565,340),
     new Block(675,340),
     new Block(785,340),
     new Block(895,340),
     new Block(1005,340),
]

//creates blocks using Block class
function addBlock() {
  for (let i = 0; i < blocks.length; i++) {
    let block = document.createElement("div");
    block.classList.add("block");
    block.style.left = blocks[i].bottomLeft[0] + 'px'
    block.style.bottom = blocks[i].bottomLeft[1] + 'px'
    grid.appendChild(block);
      
  }
}
addBlock()

//User block
let user = document.createElement('div')
user.classList.add('user')
user.style.left = userCurrentPosition[0] + 'px'
user.style.bottom = userCurrentPosition[1] + 'px'
grid.appendChild(user)

//Ball
let ball = document.createElement('div')
ball.classList.add('ball')
ball.style.left= ballCurrentPosition[0] + 'px'
ball.style.bottom= ballCurrentPosition[1] + 'px'
grid.appendChild(ball)