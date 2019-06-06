var gameConfig = {
    type: Phaser.AUTO,
    width: 1334,
    height: 500,
    scene: playGame,
    backgroundColor: "#58afd0",

    // physics settings
    physics: {
        default: "arcade"
    }
}

window.focus();
    resize();
    window.addEventListener("resize", resize, false);

game = new Phaser.Game(gameConfig)

class PlayGame extends Phaser.scene{
    constructor(){
    }

    preload() {
        this.load.image("paddle1", "paddle.png");
        this.load.image("paddle2", "glasspaddle2.png");
        this.load.image("ball", "ball.png");
    }
    
    create() {
        this.physics.world.setBoundsCollision(false, false, true, true);
    
        this.ball = this.physics.add.image(400, 500, 'assets', 'ball').setCollideWorldBounds(true).setBounce(1);
        this.ball.setData('onPaddle', true);

    }
    
    update() {
    
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