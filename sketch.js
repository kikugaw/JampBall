let song;
let eSize=50;//敵の大きさ
let eSpeed=2;//敵のスピード
let ex=0;//敵のx座標
let ey=200;//敵のy座標
let px=500;//自機のx座標
let py=200;//自機のy座標
let pSize=50;//自機の大きさ
let jumpFlag=0;//ジャンプのフラグ。oは地上1が上昇2が下降。
let endFlag = 0;

function preload(){
    song = loadSound('./assets/music/bgm.mp3');
}

function setup() {
    let distance = dist(px,py,ex,ey);//distはpx,pyからex,eyの距離
    createCanvas(600, 400);
    // background(255, 0, 0);
    song.loop();
}

function draw(){
    background(255);
    gameDisplay();
    if(endFlag==0){
        enemyDisplay();//敵の描写
        playerDisplay();//自分の描写
        hit();//当たり判定
      }else{
        gameOver();//ゲームオーバー
      }
    if(jumpFlag>0){
        jump();
      }
}

function gameDisplay(){
    fill(0);
    rect(0, 200, 600, 200);
    textSize(25);
    text("score",500,25);
      }

function enemyDisplay(){
    ex=ex+eSpeed;//敵を移動させる
    fill(0);
    ellipse(ex,ey-eSize/2,eSize,eSize);//敵を表示
    if(ex>width){//円が右端より大きかったら
        ex=0;//x軸を0にする
      }
      }

      function playerDisplay(){
        ellipse(px,py-pSize/2,pSize,pSize);
      }

      function hit(){
        let distance = dist(px,py,ex,ey);
        if(distance<pSize/2+eSize/2){//敵と自機が当たった
          endFlag=1;
        }
      }
      
      function gameOver(){
        textSize(30);
        text("GAME OVER",200,100);
        song.stop();
      }


      function jump(){
        if((jumpFlag==1)&&(py>125)){//ジャンプ上昇でy軸が125より大きかったら
          py=py-1;
        }else{
          jumpFlag=2;//円を下降させる
        }
        if((jumpFlag==2)&&(py<200)){//円が下降でy軸が200より小さかったら
          py=py+1;
        }else if(jumpFlag==2){
          jumpFlag=0;//ジャンプフラグをリセット
        }
      }

      function keyPressed() {
        if (keyCode == 32) {
          if (jumpFlag == 0) {
            jumpFlag = 1;
          }
        }
      }

// function eCreate() {
//     eSize = random(40, 70);
//     eSpeed = random(1, 3);
//       }


// function mousePressed() {
//     if (song.isPlaying()) {
//         // .isPlaying()はブール値を返す
//         song.stop();
//         background(255, 0, 0);
//     }
//     else {
//         song.play();
//         background(0, 255, 0);
//     }
// }