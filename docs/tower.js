let towerAngle;
const tiles = 26;
const tileHeight = 30;
const towerRadius = 200;

function setup() {
  createCanvas(800, 600);
  towerAngle = 0;
}

function draw() {
  background(0);

  fill(0, 0, 200);
  stroke(0);
  strokeWeight(2);

  for (let i = 0; i < tiles; i++) {
    let angle0 = i * TWO_PI / tiles + towerAngle;
    let angle1 = (i + 1) * TWO_PI / tiles + towerAngle;
    let z0 = sin(angle0);
    let z1 = sin(angle1);
    if (z0 < 0 && z1 < 0) {
      continue;
    }
    let x0 = towerRadius * cos(angle0);
    let x1 = towerRadius * cos(angle1);
    if (z0 < 0) {
      x0 = towerRadius * Math.sign(x0)
    }
    if (z1 < 0) {
      x1 = towerRadius * Math.sign(x1)
    }
    rect(min(x0, x1) + width * 0.5, 100, abs(x1 - x0), tileHeight);
  }

  towerAngle += 0.005;
}
