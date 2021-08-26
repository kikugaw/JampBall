let score = 0;
let ex = 0;
let ey = 200;
let e2x = 700;
let e2Size = 35;
let eSize;
let eSpeed;
let px = 400;
let py = 200;
let pSize = 50;
let jValue = 0;
let hValue = 0;
let sValue = 1;
let pPosition = 0;
let red = 0;
let green = 0;
let blue = 0;
let bvalue = 0;
let img;
let song;

function preload(){
  //マシュマロ王国
  song = loadSound('./assets/music/bgm.mp3');
  song2 = loadSound('./assets/music/jump.mp3');
}

function setup() {
  // put setup code here
  createCanvas(600, 400);
  song.loop();
  eCreate();
}

function draw() {
  // put drawing code here
  background(255);
  ///背景画像挿入
  // image(img, 0, -50, 450, 200);
  gameDisplay();
  if (hValue == 0) {
    if (bvalue == 0) {
      eBall();
    } else {
      eball2();
    }
    pBall();
    if (jValue > 0) {
      jump();
    }
    hit();
    hit2();
  } else {
    gameOver();
  }
}

function gameDisplay() {
  fill(0);
  fill(red, 255 - green, 255 - blue);
  rect(0, 200, 600, 200);
  fill(0);
  textSize(32);
  text("Score" + score, 425, 25);
}

function jump() {
  if (jValue == 1 && py > 125) {
    py = py - 1;
  } else {
    jValue = 2;
  }
  if (jValue == 2 && py < 200) {
    py = py + 1;
  } else if (jValue == 2) {
    jValue = 0;
  }
}

function eBall() {
  if (score < 4) {
    ex = ex + eSpeed;
    fill(225, green, blue);
    ellipse(ex, ey - eSize / 2, eSize, eSize);
    fill(0, 0, 0);
    // fill(225 - red, 225 - green, 225 - blue);
  } else if(score <8){
    
    ex = ex + eSpeed * 1.5;
    fill(225, green, blue);
    ellipse(ex, ey - eSize / 2, eSize, eSize);
    fill(0);
  }else{
    ex = ex + eSpeed + eSpeed;
    fill(225, green, blue);
    ellipse(ex, ey - eSize / 2, eSize, eSize);
    fill(0);
  }
  if (ex > width) {
    ex = random(-200, -100);
    eCreate();
    back();
    px = 400;
    pCreate();
    score = score + 1;
  
    bvalue = 0;
    for (let i = 1; i < 100; i++) {
      if (score == 3 * i) {
        bvalue = 1;
      }
    }
  }
}

function eball2() {
  eSpeed = 4;
  e2x = e2x - eSpeed;
  ellipse(e2x, ey - e2Size / 2, e2Size, e2Size);
  if (e2x < 0) {
    e2x = random(700, 750);
    eCreate();
    px = 400;
    pCreate();
    back();
    score = score + 1;
    bvalue = 0;
  }
}

function pBall() {
  if (score > 3) {
    if (ex > 0) {
      px = px - pPosition;
    }
  }
  ellipse(px, py - pSize / 2, pSize, pSize);
}

function hit() {
  let distance = dist(px, py, ex, ey); //距離を測る
  if (distance < 25 + eSize / 2) {
    hValue = 1;
  }
}

function hit2() {
  let distance2 = dist(px, py, e2x, ey); //距離を測る
  if (distance2 < 25 + e2Size / 2) {
    hValue = 1;
  }
}

// function gameStart() {
//   textSize(30);
//   fill(128 + sin(frameCount * 0.1) * 128);
//   text("GAME Start", 200, 120);
// }

function gameOver() {
  textSize(30);
  fill(128 + sin(frameCount * 0.1) * 128);
  text("GAME OVER", 200, 120);
  song.stop();
}

function eCreate() {
  eSize = random(40, 70);
  eSpeed = random(1, 3);
  red = random(0, 255);
  green = random(0, 255);
  blue = random(0, 255);
}

function pCreate() {
  pPosition = random(0, 1);
}

function reset() {
  document.location.reload();
}

function jumping() {
  if (jValue == 0) {
    jValue = 1;
  }
}

function keyPressed() {
  if (keyCode == 32) {
    if (jValue == 0) {
      jValue = 1;
      song2.play();
    }
  }
}
// function mousePressed() {
// //   noLoop();
// }
// function mouseReleased() {
//   loop();
// }


function back() {
  bvalue = random(0, 1);
}

function togglePlay(){
  if (song.isPlaying()) {
    // .isPlaying()はブール値を返す
    song.stop();
}
else {
    song.play();
}
}
function touchStarted() {
  if (!isUserStarted) {
      // touchStarted()を1回だけ呼び出されるようにする
      print('touch');
      userStartAudio();
      isUserStarted = true;
  }
}