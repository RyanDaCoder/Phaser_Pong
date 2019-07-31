var game;
var keyA;
var keyD;
var arrowLeft;
var arrowRight;
var zone1;
var zone2;
var vel = 0;
var score1 = 0;
var score2 = 0;
var text1;
var text2;

window.onload = function() {

    var gameConfig = {
        type: Phaser.AUTO,
        width: 1000,
        height: 1000,
        scene: playGame,
        backgroundColor: "blue",

    // physics settings
        physics: {
            default: "arcade",
            arcade: {

                debug: false
            }
            
        }
    } 

    game = new Phaser.Game(gameConfig);
    window.focus();
    resize();
    window.addEventListener("resize", resize, false);

}

const newLocal = 500;
class playGame extends Phaser.Scene{
    constructor(){
        super("PlayGame");
    }
    preload() {
        this.load.image("paddle1", "paddle.png");
        this.load.image("paddle2", "glasspaddle2.png");
        this.load.image("ball", "ball.png");
        this.load.image("background", "background.jpg");
        this.load.image("blank1", "Blank.png");
        this.load.image("blank2", "Blank.png");
        this.load.image("blank3", "Blank.png");
        this.load.image("rocket", "rocket.png");
        // this.load.image("circle1", "circle.png");
        // this.load.image("circle2", "circle.png");
        // this.load.image("square", "triangle.png");
    }
    
    create() {
        let canvas = document.querySelector("canvas");

        this.background = this.physics.add.image(0,0, 'background');
        this.background.setScale(1.5,2.1);

        text1 = this.add.text(15,15, 'Score: ' + score1, {fontFamily: 'ChineseDragon', fontSize: 50, color: '#00ff00'});
        text2 = this.add.text(15,950, 'Score: ' + score2, {fontFamily: 'ChineseDragon', fontSize: 50, color: '#00ff00'})

        

        //this.physics.world.setFPS(144);
        this.physics.world.setBoundsCollision(true, true, false, false);
    //ball
        this.ball = this.physics.add.image(400, 500, 'ball').setCollideWorldBounds(true).setBounce(1);
        this.ball.setData('onPaddle', true);
        this.ball.setVelocityX(500);
        this.ball.setVelocityY(250);
        this.ball.setBounce(1);
    //missiles
        this.rocket = this.physics.add.image(-10, 500, 'rocket');
        
        //this.rocket.setCollideWorldBounds(true);
        this.rocket.setScale(.25);
        this.rocket.setBounce(1);
        this.rocket.setImmovable(true);
    //blanks
        this.blank1 = this.physics.add.image(500,0, 'blank1');
        this.blank1.setScale(1.3,0.01);
        this.blank1.setImmovable(true);

        this.blank2 = this.physics.add.image(500,1000, 'blank2');
        this.blank2.setScale(1.3,0.01);
        this.blank2.setImmovable(true);

        this.blank3 = this.physics.add.image(1400,500, 'blank3');
        this.blank3.setImmovable(true);

/*
    //triangle 
         this.triangle = this.physics.add.image(100,500).setDepth(5);
         this.triangle.setImmovable(true);
         this.triangle.setRotation(Math.PI/2);
         this.triangle.setScale(5);
*/
    //paddles
        this.paddle1 = this.physics.add.image(500, 950, 'paddle1');
        this.paddle1.setImmovable(true);
        this.paddle2 = this.physics.add.image(500, 50, 'paddle2');
        this.paddle2.setImmovable(true);
    //ball vs collider
        this.physics.add.collider(this.ball, this.paddle1, null, null, this);
        this.physics.add.collider(this.ball, this.paddle2, null, null, this);
        this.physics.add.collider(this.ball, this.circle1, null, null, this);
        this.physics.add.collider(this.ball, this.circle2, null, null, this);
//score
        //this.scoreText = this.add.text(x,y, "score: ", {fontSize: '32px', fill: '#000'});

         keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
         keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
         arrowLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
         arrowRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

         this.physics.add.overlap(this.ball,this.blank1);
         this.physics.add.overlap(this.ball,this.blank2);

        //zone1.body.debugBodyColor = 0xff3a00;
        //zone2.body.debugBodyColor = 0xff3a00;
        this.physics.add.collider(this.ball, this.blank2,this.blankF,null,this);
        this.physics.add.collider(this.ball, this.blank1,this.blankF1,null,this);
        //this.physics.add.collider(this.ball, this.rocket,null,null,this);
        this.physics.add.collider(this.ball, this.rocket,this.missleHit,null,this);
    }
    
    update() {
        //paddle movement
        this.paddle1.setVelocityX(0);
        this.paddle2.setVelocityX(0);
        this.rocket.setVelocityX(700);

        if (keyA.isDown){
            this.paddle1.setVelocityX(-500);
        }

        if (keyD.isDown) {
            this.paddle1.setVelocityX(500);
        }

        if (arrowLeft.isDown) {
            this.paddle2.setVelocityX(-500);
        }

        if (arrowRight.isDown) {
            this.paddle2.setVelocityX(500);
        }

        if (arrowRight.isDown && arrowLeft.isDown) {
            this.paddle1.setVelocityX(0);
            this.paddle2.setVelocityX(0);
        }

        if (keyA.isDown && keyD.isDown) {
            this.paddle1.setVelocityX(0);
            this.paddle2.setVelocityX(0);
        }

        if (this.paddle1.x > 875){
            this.paddle1.x = 875;
        }

        if (this.paddle1.x < 125){
            this.paddle1.x = 125;
        }

        if (this.paddle2.x < 125){
            this.paddle2.x = 125;
        }

        if (this.paddle2.x > 875){
            this.paddle2.x = 875;
        }

        if (this.rocket.x > 1050) {
            this.rocket.x *= -1;
        }
        vel = this.ball.body.velocity.x;
    }

    blankF1 (ball, blank2) {
        ball.x = 500;
        ball.y = 500;
        ball.setVelocityX(500);
        ball.setVelocityY(250);
        score2++;
        text2.setText ( "Score: " + score2);
        console.log("touching2")
    }

    blankF (ball, blank1) {
        ball.x = 500;
        ball.y = 500;
        ball.setVelocityX(500);
        ball.setVelocityY(-250);
        score1++;
        text1.setText( "Score: " + score1);
        console.log("touching1")
    }

    missleHit (rocket, ball) {
        this.rocket.x = -1050;
        this.ball.setVelocityX(this.ball.body.velocity.x*1);
        
    }

    
    
}









function resize(){
    let canvas = document.querySelector("canvas");
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let windowRatio = windowWidth / windowHeight;
    let gameRatio = game.config.width / game.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}

//   to push do :    git push
