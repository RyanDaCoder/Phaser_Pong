var game;
var keyA;
var keyD;
var arrowLeft;
var arrowRight;

window.onload = function() {

    var gameConfig = {
        type: Phaser.AUTO,
        width: 1000,
        height: 1000,
        scene: playGame,
        backgroundColor: "blue",

    // physics settings
        physics: {
            default: "arcade"
        }
    } 

    game = new Phaser.Game(gameConfig);
    window.focus();
    resize();
    window.addEventListener("resize", resize, false);

}

class playGame extends Phaser.Scene{
    constructor(){
        super("PlayGame");
    }
    preload() {
        this.load.image("paddle1", "paddle.png");
        this.load.image("paddle2", "glasspaddle2.png");
        this.load.image("ball", "ball.png");
    }
    
    create() {

        this.physics.world.setFPS(144);
        this.physics.world.setBoundsCollision(false, false, true, true);
    
        this.ball = this.physics.add.image(400, 500, 'ball').setCollideWorldBounds(true).setBounce(1);
        this.ball.setData('onPaddle', true);

        this.paddle1 = this.physics.add.image(500, 950, 'paddle1');
        this.paddle2 = this.physics.add.image(500, 50, 'paddle2')


         keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
         keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
         arrowLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
         arrowRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    
    update() {
        this.paddle1.setVelocityX(0);
        this.paddle2.setVelocityX(0);
        if (keyA.isDown){
            this.paddle1.setVelocityX(-250);
        }

        if (keyD.isDown) {
            this.paddle1.setVelocityX(250);
        }

        if (arrowLeft.isDown) {
            this.paddle2.setVelocityX(-250);
        }

        if (arrowRight.isDown) {
            this.paddle2.setVelocityX(250);
        }

        if (arrowRight.isDown && arrowLeft.isDown) {
            this.paddle1.setVelocityX(0);
            this.paddle2.setVelocityX(0);
        }

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

