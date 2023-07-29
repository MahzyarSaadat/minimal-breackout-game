const grid = document.querySelector(".grid");

const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 400;
let timerId;

// user specifications:
let userStartPosition = [230, 10];
const currentPosition = userStartPosition;

// ball specifications:
let ballStartPosition = [270, 40];
const ballCurrentPosition = ballStartPosition;
const ballDiameter = 20;
let xDirection = 2;
let yDirection = 2;

class Block {
  constructor(xAxis, yAxis) {
    this.bottmLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

const blocks = [
  new Block(10, 370),
  new Block(120, 370),
  new Block(230, 370),
  new Block(340, 370),
  new Block(450, 370),
  new Block(10, 340),
  new Block(120, 340),
  new Block(230, 340),
  new Block(340, 340),
  new Block(450, 340),
  new Block(10, 310),
  new Block(120, 310),
  new Block(230, 310),
  new Block(340, 310),
  new Block(450, 310),
  new Block(10, 280),
  new Block(120, 280),
  new Block(230, 280),
  new Block(340, 280),
  new Block(450, 280),
];

console.log(blocks[0]);

//add block
function addBlock() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = blocks[i].bottmLeft[0] + "px";
    block.style.bottom = blocks[i].bottmLeft[1] + "px";
    grid.appendChild(block);
  }
}

addBlock();

// user block
const user = document.createElement("div");
user.classList.add("user");
drawUser();
grid.appendChild(user);

//draw user

function drawUser() {
  user.style.left = currentPosition[0] + "px";
  user.style.bottom = currentPosition[1] + "px";
}

// draw ball
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
}

// move user
function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10;
        drawUser();
      }
      break;
    case "ArrowRight":
      if (currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] += 10;
        drawUser();
      }
      break;
  }
}

document.addEventListener("keydown", moveUser);

// add ball

const ball = document.createElement("div");
ball.classList.add("ball");
drawBall();
grid.appendChild(ball);

// move ball
function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  drawBall();
  checkForCollisions();
}

timerId = setInterval(moveBall, 30);

// check for collisions

function checkForCollisions() {
  //check for block collisions
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurrentPosition[0] > blocks[i].bottmLeft[0] &&
      ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
      ballCurrentPosition[1] + ballDiameter > blocks[i].bottomRight[1] &&
      ballCurrentPosition[1] < blocks[i].topLeft[1]
    ) {
      const allBlock = Array.from(document.querySelectorAll(".block"));
      allBlock[i].classList.remove("block");
      blocks.splice(i, 1);
      changeDirection();
    }
  }

  //check for user coliisions
  if (
    ballCurrentPosition[0] > currentPosition[0] &&
    ballCurrentPosition[0] < currentPosition[0] + blockWidth &&
    ballCurrentPosition[1] > currentPosition[1] &&
    ballCurrentPosition[1] < currentPosition[1] + blockHeight
  ) {
    changeDirection();
  }

  //check for wall collisions
  if (
    ballCurrentPosition[0] >= boardWidth - ballDiameter ||
    ballCurrentPosition[1] >= boardHeight - ballDiameter ||
    ballCurrentPosition[0] <= 0
  ) {
    changeDirection();
  }

  //check for game over
  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timerId);
    score.textContent = "game over";
  }
}

function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    xDirection = -2;
    return;
  }
  if (xDirection === -2 && yDirection === 2) {
    yDirection = -2;
    return;
  }
  if (xDirection === -2 && yDirection === -2) {
    xDirection = 2;
    return;
  }
  if (xDirection === 2 && yDirection === -2) {
    yDirection = 2;
    return;
  }
}
