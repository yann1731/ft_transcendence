
import Phaser from "phaser";
import '../../../App.css';


interface gameData {
    random: boolean;
    wall: boolean;
    face: boolean;
    socket: any;
    name: string;
}

export default class oneVSoneOther extends Phaser.Scene{

	ball!: Phaser.Physics.Arcade.Sprite;
    multiball!: Phaser.Physics.Arcade.Sprite;
    paddle1!: Phaser.Physics.Arcade.Sprite;
    paddle2!: Phaser.Physics.Arcade.Sprite;
    power!: Phaser.Physics.Arcade.Sprite;
    wall1!: Phaser.Physics.Arcade.Sprite;
    wall2!: Phaser.Physics.Arcade.Sprite;
    wall3!: Phaser.Physics.Arcade.Sprite;
    player1VictoryText!: Phaser.GameObjects.Text;
    player1Score!: Phaser.GameObjects.Text;
    player2VictoryText!: Phaser.GameObjects.Text;
    player2Score!: Phaser.GameObjects.Text;
    score!: Phaser.GameObjects.Text;
    bigPaddle!: Phaser.GameObjects.Text;
    bigBall!: Phaser.GameObjects.Text;
    smash!: Phaser.GameObjects.Text;
    inverse!: Phaser.GameObjects.Text;
    multiBall!: Phaser.GameObjects.Text;
    menu!: Phaser.GameObjects.Text;
    disconnect!: Phaser.GameObjects.Text;



    
    points1: number = 0;
    points2: number = 0;
    win: number = 1;
    rotation: number = 1;
    paddlespeed: number = 450;
    modifier: number = 1;
    oldPosition!: number;
    keys: any = {};


    face: boolean = false;
    random: boolean = false
    wall: boolean = false;
    multi: boolean = false;
    start: boolean = true;
    name!: string;
    socket!: any;

    
    constructor() {
        super('oneVSoneOther');
    }

    init (data: gameData) {
        this.random = data.random;
        this.wall = data.wall;
        this.face = data.face; 
        this.socket = data.socket
        this.name = data.name
    }

	preload() {
        if (this.face)
            this.load.image("background", "https://cdn.intra.42.fr/users/02bd0e2e6838f9e0f6d36bd7968465d6/yst-laur.jpg");
        if (this.face === true){
            this.load.image("ball", String(require('../../../images/anhebert.png')));
            this.load.image("bigBall", String(require('../../../images/jrossign.png')));
        }
        else{
            this.load.image("ball", String(require('../../../images/anhebert.png')));
            //this.textures.addBase64('ball', String(require("../../../images/ball.png")));
            this.textures.addBase64('bigBall', String(require("../../../images/bigBall.png")));
        }

        if (this.face === true)
            this.load.image("paddle1", String(require('../../../images/bperron.png')));
        else
            this.textures.addBase64('paddle', String(require("../../../images/paddle.png")));

        if (this.face)
            this.load.image("wall", "https://cdn.intra.42.fr/users/7750cd1f05cda86cbc74ad9c87965115/tgarriss.jpg");
        else
            this.textures.addBase64('wall', String(require("../../../images/wall.png")));

        if (this.face)
            this.load.image("power", "https://cdn.intra.42.fr/users/3c08dbaf4b23e2af86168c9147631ace/malord.jpg");
        else
            this.load.image("power", String(require("../../../images/power.png")));

    }

    map_init() {
        if (this.face === true){
            const background = this.add.sprite(0, 0, "background");
            background.setOrigin(0, 0);
            background.setScale(this.scale.width / background.width, this.scale.height / background.height);
       }
       else if (this.wall === true){
            this.wall1 = this.physics.add.sprite(
                this.physics.world.bounds.width * 0.5,
                this.physics.world.bounds.height * 0.175,
                "wall"
            )
            this.wall2 = this.physics.add.sprite(
                this.physics.world.bounds.width * 0.3,
                this.physics.world.bounds.height * 0.8,
                "wall"
            )
            this.wall3 = this.physics.add.sprite(
                this.physics.world.bounds.width * 0.7,
                this.physics.world.bounds.height * 0.5,
                "wall"
            )
            this.wall1.setScale(0.4, 0.05);
            this.wall2.setScale(0.05, 0.4);
            this.wall3.setScale(0.05, 0.6);
            this.wall1.setImmovable(true);
            this.wall2.setImmovable(true);
            this.wall3.setImmovable(true);
            this.wall1.setOrigin(0.5);
            this.wall2.setOrigin(0.5);
            this.wall3.setOrigin(0.5);
       }
    }

    ball_init() {
        this.ball = this.physics.add.sprite(
		    this.physics.world.bounds.width / 2,
		    this.physics.world.bounds.height / 2,
		    "ball"
        )

        this.ball.setScale(0.2);
    }

    paddle_init() {
        this.paddle1 = this.physics.add.sprite(
            (this.ball.width * 0.2) / 2 + 1,
            this.physics.world.bounds.height / 2,
            "paddle"
        )
        this.paddle2 = this.physics.add.sprite(
            this.physics.world.bounds.width - (this.ball.width * 0.2) / 2 - 1,
            this.physics.world.bounds.height / 2,
            "paddle"
        )
        this.oldPosition = this.physics.world.bounds.height / 2;

        this.paddle1.setOrigin(0.5);
        this.paddle1.setScale(0.15, 0.25);
        
        this.paddle2.setOrigin(0.5);
        this.paddle2.setScale(0.15, 0.25);
        this.paddle2.setCollideWorldBounds(true)  
    }

    create() {
        this.map_init();
        this.ball_init();
        this.paddle_init();

                
    }

    update() { 
        this.ball.angle += this.rotation
        this.paddle2.setVelocityY(0);
        
        if (this.keys.w.isDown)
            this.paddle2.setVelocityY(-this.paddlespeed * this.modifier);
        if (this.keys.s.isDown)
            this.paddle2.setVelocityY(this.paddlespeed * this.modifier);
            
        if (this.paddle2.body){
            if (this.paddle2.body.y !== this.oldPosition)
                this.socket.emit("movement", this.paddle2.body.y)
            this.oldPosition = this.paddle2.body.y
        }
        
        
        if (this.paddlespeed < 625)
            this.paddlespeed += 0.5;
    }

    shutdown() {
        this.socket.off("movement");
        this.socket.off("update");
        this.socket.off("random");
        this.socket.off("newPower");
        this.socket.off("multi");
        this.socket.off("power");
        this.socket.off("point");
        this.socket.off("disconnected");

       this.socket.emit("new");
      //  this.game.destroy(false, false);
    }
}

