var player,
  playerStand,
  playerRunRight,
  playerRunLeft,
  ground,
  groundImg,
  invisibleGround,
  playerRoll,
  playerJump,
  playerDie,
  sun,
  sunImg,
  bird,
  birdFly,
  birdGroup,
  attackImg,
  fireball,
  fireballAttack,
  fireballGroup,
  backC,
  forwardC,
  health,
  coin,
  coinAnimation,
  coinGroup,
  reset,
  backgroundMusic,
  hurtSound,
  jumpSound,
  missile,
  missileImg,
  missileGroup,
  attackFireball,
  attackFireballImg,
  attackFireballGroup,
  scoreSound;
  var score = 0;
  //var health = 10;
  var reset = PLAY;
  var PLAY = 1;
  var END = 0;
  var gameState = PLAY;

//====================================================================================//

function preload() {
  playerRunRight = loadAnimation(
    "run1.jpg",
    "run1.jpg",
    "run2.jpg",
    "run3.jpg",
    "run4.jpg",
    "run5.jpg",
    "run6.jpg"
  );
  playerRunLeft = loadAnimation(
    "runleft.jpg",
    "runleft2.jpg",
    "runleft3.jpg",
    "runleft4.jpg",
    "runleft5.jpg",
    "runleft6.jpg"
  );
  birdFly = loadAnimation(
    "bird1.png",
    "bird2.png",
    "bird3.png",
    "bird4.png",
    "bird5.png",
    "bird6.png",
    "bird7.png",
    "bird8.png"
  );
  coinAnimation = loadAnimation(
    "coin1.jpg",
    "coin2.jpg",
    "coin3.jpg",
    "coin4.jpg",
    "coin5.jpg",
    "coin6.jpg"
    );

    playerRoll = loadAnimation("roll1.jpg", "roll2.jpg", "roll3.jpg");

    playerDie = loadImage("die4.jpg");

    fireballAttack = loadAnimation("fireball.png");

    attackImg = loadImage("attack.jpg");

    playerJump = loadImage("jump.jpg");

    sunImg = loadImage("sun.png");

    groundImg = loadImage("ground.png");

    playerStand = loadImage("player.jpg");

    missileImg = loadImage("missile.jpg");

    attackFireballImg = loadImage("fireballAttack.jpg");

    backgroundMusic = loadSound("backgroundSound.mp3");

    jumpSound = loadSound("jump.mp3");

    scoreSound = loadSound("score.mp3")
}

//====================================================================================//

function setup() {
  createCanvas(800, 400);

  backgroundMusic.loop();

  invisibleGround = createSprite(400, 390, 800, 9);

  ground = createSprite(400, 440, 800, 9);
  ground.addImage("ground", groundImg);

  backC = createSprite(0, 200, 1, 400);

  forwardC = createSprite(801, 200, 1, 400);

  sun = createSprite(750, 7, 10, 10);
  sun.addImage("sun", sunImg);
  sun.scale = 0.5;

  player = createSprite(100, 390, 10, 10);
  player.addAnimation("runRight", playerRunRight);
  player.addAnimation("runLeft", playerRunLeft);
  player.addAnimation("roll", playerRoll);
  player.addImage("stand", playerStand);
  player.addImage("jump", playerJump);
  player.addImage("attack", attackImg);
  player.addImage("die", playerDie);

  birdGroup = createGroup();
  coinGroup = createGroup();
  missileGroup = createGroup();
  fireballGroup = createGroup();
  attackFireballGroup = createGroup();
  invisibleGroundGroup = createGroup();
}

//====================================================================================//

function draw() {
  background(255);

  if (gameState === PLAY) {
    if (
      keyDown("D") ||
      keyDown("A") ||
      keyDown("SPACE") ||
      keyDown("E") ||
      keyDown("R") ||
      keyDown("N")
    ) {
      if (keyDown("D")) {
        player.changeAnimation("runRight", playerRunRight);
        player.x = player.x + 3;
      }
      if (keyDown("A")) {
        player.changeAnimation("runLeft", playerRunLeft);
        player.x = player.x - 3;
      }
      if (keyDown("SPACE") && player.y >= 300) {
        player.velocityY = player.velocityY - 3;
        player.changeImage("jump", playerJump);
        jumpSound.play();
      }
      if (keyDown("E")) {
        player.changeAnimation("attack", attackImg);
        spawnFireball();
      }
      if (keyDown("R")) {
        player.x = player.x + 6;
        player.setCollider("rectangle", 0, 0, 40, 40);
        player.changeAnimation("roll", playerRoll);
      }
    } else {
      player.changeImage("stand", playerStand);
      player.setCollider("rectangle", 0, 0, 40, 70);
    }
    player.velocityY = player.velocityY + 0.8;

    if(player.isTouching(missileGroup)){
      missileGroup.destroyEach();
      score -= 50;
    }

    if (player.isTouching(coinGroup)) {
      coinGroup.destroyEach();
      score = score + Math.round(random(50, 60));
      scoreSound.play();
    }

    if(attackFireballGroup.isTouching(player)){
      gameState = END;
    }

    spawnAttackFireball();
    spawnMissile();
    spawnCoins();
    spawnBird();
    drawSprites();
  }

  if(gameState ===END){

    
    if(score ===0){
      text("how... what?.. 0 even my iq is more than this...",400,200);
      textSize(30);
      stroke("red");
      player.changeImage("die", playerDie);
      birdGroup.setVelocityEach(0);
      attackFireballGroup.setVelocityEach(0);
      missileGroup.setVelocityEach(0);
      coinGroup.setVelocityEach(0);
      fireballGroup.setVelocityEach(0);
      birdGroup.setLifetimeEach(-1);
      attackFireballGroup.setLifetimeEach(-1);
      missileGroup.setLifetimeEach(-1);
      coinGroup.setLifetimeEach(-1);
      fireballGroup.setLifetimeEach(-1);
    }else if(score > 99){
      text("Fait amusant Savez-vous que j'ai ajouté un bug intentionnel dans ce jeu  - in French. ",400,200);
      textSize(30);
      stroke("red");
      player.changeImage("die", playerDie);
      birdGroup.setVelocityEach(0);
      attackFireballGroup.setVelocityEach(0);
      missileGroup.setVelocityEach(0);
      coinGroup.setVelocityEach(0);
      fireballGroup.setVelocityEach(0);
      birdGroup.setLifetimeEach(-1);
      attackFireballGroup.setLifetimeEach(-1);
      missileGroup.setLifetimeEach(-1);
      coinGroup.setLifetimeEach(-1);
      fireballGroup.setLifetimeEach(-1);
    }else if(score > 199){
      text("印象的",400,200);
      textSize(30);
      stroke("red");
      player.changeImage("die", playerDie);
      birdGroup.setVelocityEach(0);
      attackFireballGroup.setVelocityEach(0);
      missileGroup.setVelocityEach(0);
      coinGroup.setVelocityEach(0);
      fireballGroup.setVelocityEach(0);
      birdGroup.setLifetimeEach(-1);
      attackFireballGroup.setLifetimeEach(-1);
      missileGroup.setLifetimeEach(-1);
      coinGroup.setLifetimeEach(-1);
      fireballGroup.setLifetimeEach(-1);
    }else if(score > 299){
      text("how...  you are  doing.... that!!! are you hacking 	😨	😨 🤯		",400,200);
      textSize(30);
      stroke("red");
      player.changeImage("die", playerDie);
      birdGroup.setVelocityEach(0);
      attackFireballGroup.setVelocityEach(0);
      missileGroup.setVelocityEach(0);
      coinGroup.setVelocityEach(0);
      fireballGroup.setVelocityEach(0);
      birdGroup.setLifetimeEach(-1);
      attackFireballGroup.setLifetimeEach(-1);
      missileGroup.setLifetimeEach(-1);
      coinGroup.setLifetimeEach(-1);
      fireballGroup.setLifetimeEach(-1);
    }else if(score < 0){
      text(" is this rea...l 🤣		",400,200);
      textSize(30);
      stroke("red");
      player.changeImage("die", playerDie);
      birdGroup.setVelocityEach(0);
      attackFireballGroup.setVelocityEach(0);
      missileGroup.setVelocityEach(0);
      coinGroup.setVelocityEach(0);
      fireballGroup.setVelocityEach(0);
      birdGroup.setLifetimeEach(-1);
      attackFireballGroup.setLifetimeEach(-1);
      missileGroup.setLifetimeEach(-1);
      coinGroup.setLifetimeEach(-1);
      fireballGroup.setLifetimeEach(-1);
    }

  }

  player.collide(backC);

  player.collide(forwardC);

  player.collide(invisibleGround);

  invisibleGround.visible = false;

  ground.depth = player.depth;
  ground.depth = player.depth + 1;

  text("score: " + score, 500, 30);
}

//====================================================================================//

function spawnBird() {
  if (frameCount % 180 === 0) {
    bird = createSprite(800, 100, 40, 10);
    bird.y = Math.round(random(10, 90));
    bird.addAnimation("fly", birdFly);
    bird.scale = random(0.3, 0.1);
    bird.velocityX = -3;
    bird.lifetime = 300;
    birdGroup.add(bird);
  }
}

//====================================================================================//

function spawnFireball() {
  fireball = createSprite(400, 200, 10, 10);
  fireball.addAnimation("fire", fireballAttack);
  fireball.scale = random(0.5, 0.1);
  fireball.x = player.x + 50;
  fireball.y = player.y;
  fireball.velocityX = +5;
  fireball.lifetime = 300;
  fireballGroup.add(fireball);
}

//====================================================================================//

function reset() {
  gameState = PLAY;
  player.changeAnimation("stand", playerStand);
  birdGroup.destroyEach();
  fireballGroup.destroyEach();
  float1Group.destroyEach();
}

//====================================================================================//

function spawnCoins(){
  if(frameCount % 120 === 0){
  coin = createSprite(810,370,10,10);
  coin.scale = 0.2;
  coin.velocityX =  -3;
  coin.y = Math.round(random(200,370));
  coin.addAnimation("coin",coinAnimation);
  coin.lifeTime = 300;
  coinGroup.add(coin);
  }
}

//====================================================================================//

function spawnMissile() {
  if(frameCount % 120 === 0){
    missile = createSprite(810,370,10,10);
    missile.scale = 0.2;
    missile.velocityX = Math.round(random(-3,-5));
    missile.y = Math.round(random(200,370));
    missile.addImage("missile", missileImg);
    missile.lifeTime = 300;
    missileGroup.add(missile);
  }
}

//====================================================================================//

function spawnAttackFireball(){
  if(frameCount % 180 === 0){
    attackFireball = createSprite(810,370,10,10);
    attackFireball.lifeTime =300;
    attackFireball.addImage("attack",attackFireballImg);
    attackFireball.velocityX = Math.round(random(-3,-5));
    attackFireball.y = Math.round(random(200,370));
    attackFireballGroup.add(attackFireball);
  }
}