let towerAngle;
let yView;
let topColor;
let seaPhase;
let starsPos = [];
let starsBright = [];

let dy = 0;
let dAngle = 0;

const tiles = 26;
const tileHeight = 30;
const towerRadius = 200;
const towerHeight = 15;
const seaDepth = 50;
const numStars = 600;

function setup() {
  createCanvas(800, 600);
  towerAngle = 0;
  seaPhase = 0;
  topColor = 0;
  yView = 2 * tileHeight * towerHeight + seaDepth - height;

  // Create stars
  for (let i = 0; i < numStars; i++) {
    starsPos.push(createVector(random(2 * width), random(-height, 2 * tileHeight * towerHeight)));
    starsBright.push(random(100, 255));
  }
}

function draw() {
  background(0);

  push();
  translate(0, -yView);

  // Draw the stars
  let xOffset = map(towerAngle % TWO_PI, -TWO_PI, 0, 0, 2 * width);
  for (let i = 0; i < numStars; i++) {
    stroke(starsBright[i]);
    point((starsPos[i].x + xOffset) % (2 * width), starsPos[i].y)
  }

  // Draw the glowing top
  colorMode(HSB);
  noStroke();
  for (let i = 10; i > 0; i--) {
    fill((topColor + i * 5) % 360, 255, 100);
    ellipse(0.5 * width, 0, 2 * towerRadius * i / 11);
  }

  // Draw the tower
  colorMode(RGB);
  fill(0, 200, 0);
  stroke(0);
  strokeWeight(2);

  for (let i = 0; i < tiles; i++) {
    let angle0 = i * TWO_PI / tiles + towerAngle;
    let angle1 = (i + 1) * TWO_PI / tiles + towerAngle;
    drawTiles(angle0, angle1, 0);
    drawTiles(angle0 + PI / tiles, angle1 + PI / tiles, tileHeight);
  }

  // Draw the water
  fill(100, 100, 255);
  rect(0, 2 * tileHeight * (towerHeight - 1) + sin(seaPhase) * 0.5 * tileHeight, width, seaDepth + 3 * tileHeight);
  pop();

  yView = constrain(yView + dy, -0.5 * height, 2 * tileHeight * towerHeight + seaDepth - height);
  towerAngle += dAngle;

  topColor += 2;
  seaPhase += 0.01;
}

function drawTiles(angle0, angle1, yOffset) {
  let z0 = sin(angle0);
  let z1 = sin(angle1);
  if (z0 < 0 && z1 < 0) {
    return(undefined);
  }
  let x0 = towerRadius * cos(angle0);
  let x1 = towerRadius * cos(angle1);
  if (z0 < 0) {
    x0 = towerRadius * Math.sign(x0)
  }
  if (z1 < 0) {
    x1 = towerRadius * Math.sign(x1)
  }
  for (let i = 0; i < towerHeight; i++) {
    rect(min(x0, x1) + width * 0.5, i * tileHeight * 2 + yOffset, abs(x1 - x0), tileHeight);
  }
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    dy = -1;
  }
  if (keyCode == DOWN_ARROW) {
    dy = 1;
  }
  if (keyCode == LEFT_ARROW) {
    dAngle = 0.005;
  }
  if (keyCode == RIGHT_ARROW) {
    dAngle = -0.005;
  }
}

function keyReleased() {
  if (keyCode != LEFT_ARROW & keyCode != RIGHT_ARROW) {
    dy = 0;
  }
  if (keyCode != UP_ARROW & keyCode != DOWN_ARROW) {
    dAngle = 0;
  }
}
