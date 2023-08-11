
import Phaser from "phaser";
import '../../../App.css';

class PowerUp extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
      super(scene, x, y, "power");
      this.setScale(0.1, 0.1);
      scene.add.existing(this);
      scene.physics.add.existing(this);
    }
}

interface gameData {
    wall: boolean;
    random: boolean;
    power: boolean;
    face: boolean;
    socket: any;
    ballX: number;
    ballY: number;
    name: string;
}

export default class oneVSoneHost extends Phaser.Scene{

	/* ball!: Phaser.Physics.Arcade.Sprite;
    multiball!: Phaser.Physics.Arcade.Sprite;
    paddle!: Phaser.Physics.Arcade.Sprite;
    paddle1!: Phaser.Physics.Arcade.Sprite;
    paddle2!: Phaser.Physics.Arcade.Sprite;
    wall1!: Phaser.Physics.Arcade.Sprite;
    wall2!: Phaser.Physics.Arcade.Sprite;
    wall3!: Phaser.Physics.Arcade.Sprite;
    player1VictoryText!: Phaser.GameObjects.Text;
    player1Score!: Phaser.GameObjects.Text;
    player2VictoryText!: Phaser.GameObjects.Text;
    player2Score!: Phaser.GameObjects.Text;
    score!: Phaser.GameObjects.Text;
    menu!: Phaser.GameObjects.Text;
    disconnect!: Phaser.GameObjects.Text;
    bigPaddle!: Phaser.GameObjects.Text;
    bigBall!: Phaser.GameObjects.Text;
    smash!: Phaser.GameObjects.Text;
    inverse!: Phaser.GameObjects.Text;
    multiBall!: Phaser.GameObjects.Text;
    power!: PowerUp;
    points1: number = 0;
    points2: number = 0;
    win: number = 1;
    paddlespeed: number = 450;
    modifier1: number = 1;
    modifier2: number = 1;
    XVelocityMin1: number = 350;
    XVelocityMax1: number = 400;
    XVelocityMin2: number = -350;
    XVelocityMax2: number = -400;
    YvelocityMin: number = 125;
    YvelocityMax: number = 225;
    oldVelocityX!: number;
    newOldVelocityX: number = 0;
    rotation: number = 1;
    
    oldPosition!: number;
    face: boolean = false;
    wall: boolean = false;
    random: boolean = false;
    powerup: boolean = false;
    multi: boolean = false;
    name!: string;
    keys: any = {};
    socket!: any;

    
    constructor() {
        super('oneVSoneHost');
    }

    init (data: gameData) {
        this.wall = data.wall;
        this.random = data.random;
        this.powerup = data.power;
        this.face = data.face; 
        this.socket = data.socket
        this.ballX = data.ballX;
        this.ballY = data.ballY;
        this.name = data.name;
    }

	preload() {
        if (this.face === true){
            this.load.image("ball", String(require('../../../images/anhebert.png')));
            this.load.image("bigBall", String(require('../../../images/jrossign.png')));
        }
        else{
            //this.textures.addBase64('ball', String(require("../../../images/ball.png")));
            this.load.image("ball", String(require('../../../images/anhebert.png')));
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

        if (this.face)
            this.load.image("background", "https://cdn.intra.42.fr/users/02bd0e2e6838f9e0f6d36bd7968465d6/yst-laur.jpg");
    }

   

    map_init() {
        if (this.face === true){
            const background = this.add.sprite(0, 0, "background");
            background.setOrigin(0, 0);
            background.setScale(this.scale.width / background.width, this.scale.height / background.height);
       }
        if (this.random === true){
            //this.generateRandom();
            this.wall1.setImmovable(true);
            this.wall2.setImmovable(true);
            this.wall3.setImmovable(true);
            this.wall1.setOrigin(0.5);
            this.wall2.setOrigin(0.5);
            this.wall3.setOrigin(0.5);
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

        this.ball.setVelocityX(this.ballX);
        this.ball.setVelocityY(this.ballY);
        this.ball.setDamping(true);
        this.ball.setScale(0.2);
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1, 1);
        this.ball.setDrag(1.05);

        if (this.wall === true || this.random === true){
            this.physics.add.collider(this.ball, this.wall1);
            this.physics.add.collider(this.ball, this.wall2);
            this.physics.add.collider(this.ball, this.wall3);
            if (this.wall === false){
                this.physics.add.overlap(this.ball, [this.wall1, this.wall2, this.wall3], this.regenerateRandom, undefined, this)
            }
        }
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

        this.paddle1.setImmovable(true);
        this.paddle1.setOrigin(0.5);
        this.paddle1.setScale(0.15, 0.25);
        this.paddle1.setCollideWorldBounds(true);
        this.physics.add.collider(this.ball, this.paddle1);
        
        this.paddle2.setImmovable(true);
        this.paddle2.setOrigin(0.5);
        this.paddle2.setScale(0.15, 0.25);
        this.physics.add.collider(this.ball, this.paddle2);
    }

    text_init() {
        this.menu = this.add.text(
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height / 2 + this.physics.world.bounds.height / 8,
            'Return to Menu',
            {
                fontFamily: 'pong',
                fontSize: '25px',
                color: '#ffffff',
                backgroundColor: '#000000',
                padding: {
                    x: 10,
                    y: 6
                }
            }    
        );
        this.menu.setOrigin(0.5);
        this.menu.setVisible(false);
        this.menu.setInteractive();
		this.menu.on('pointerover', () => {
			this.menu.setColor('#000000');
			this.menu.setStyle({ backgroundColor: '#ffffff' });
		});
		this.menu.on('pointerout', () => {
			this.menu.setColor('#ffffff');
			this.menu.setStyle({ backgroundColor: '#000000' });
		});
		this.menu.on('pointerdown', () => {
            this.shutdown();
		})

        this.disconnect = this.add.text(
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height / 2,
            'A player has disconnected',
            {
                fontFamily: 'pong',
                fontSize: '40px',
            }
        );
        this.disconnect.setOrigin(0.5);
        this.disconnect.setVisible(false);

        this.player1VictoryText = this.add.text(
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height / 2,
            'player 1 wins!',
            {
                fontFamily: 'pong',
                fontSize: '50px',
            }
        );
        this.player1VictoryText.setOrigin(0.5);
        this.player1VictoryText.setVisible(false);

        this.player1Score = this.add.text(
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height / 2,
            'player 1 scored!',
            {
                fontFamily: 'pong',
                fontSize: '50px',
            }
        );
        this.player1Score.setOrigin(0.5);
        this.player1Score.setVisible(false);
    
        this.player2VictoryText = this.add.text(
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height / 2,
            'player 2 wins!',
            {
                fontFamily: 'pong',
                fontSize: '50px',
            }
        );
        this.player2VictoryText.setOrigin(0.5);
        this.player2VictoryText.setVisible(false);

        this.player2Score = this.add.text(
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height / 2,
            'player 2 scored!',
            {
                fontFamily: 'pong',
                fontSize: '50px',
            }
        );
        this.player2Score.setOrigin(0.5);
        this.player2Score.setVisible(false);

        this.score = this.add.text(
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height / 8,
            `${this.points2}          ${this.points1}`,
            {
                fontFamily: 'pong',
                fontSize: '20px',
            }
        );

        if (this.face === true)
            this.score.setTint(0x000000)
        this.score.setOrigin(0.5);

        this.bigBall = this.add.text(
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height / 2,
            'Big Ball Activated!',
            {
                fontFamily: 'pong',
                fontSize: '25px',
            }
        );
        this.bigBall.setOrigin(0.5);
        this.bigBall.setVisible(false);

        this.bigPaddle = this.add.text(
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height / 2,
            'Big Paddle Activated!',
            {
                fontFamily: 'pong',
                fontSize: '25px',
            }
        );
        this.bigPaddle.setOrigin(0.5);
        this.bigPaddle.setVisible(false);

        this.smash = this.add.text(
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height / 2,
            'Smash Activated!',
            {
                fontFamily: 'pong',
                fontSize: '25px',
            }
        );
        this.smash.setOrigin(0.5);
        this.smash.setVisible(false);

        this.inverse = this.add.text(
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height / 2,
            'Inverted Control Activated!',
            {
                fontFamily: 'pong',
                fontSize: '25px',
            }
        );
        this.inverse.setOrigin(0.5);
        this.inverse.setVisible(false);

        this.multiBall = this.add.text(
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height / 2,
            'Multi Ball Activated!',
            {
                fontFamily: 'pong',
                fontSize: '25px',
            }
        );
        this.multiBall.setOrigin(0.5);
        this.multiBall.setVisible(false);
    }

    create() {
        this.map_init();
        this.text_init();
        this.ball_init();
        this.paddle_init();

        this.socket.on("movement", (newPos: number) => {
            if (this.paddle2.body)
                this.paddle2.setY(newPos + this.paddle2.body.height / 2);
        })
        
        this.socket.on("disconnected", () => {
            this.menu.setVisible(true);
            this.disconnect.setVisible(true);
        })

        this.keys.w  = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keys.s  = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S);   

        if (this.powerup){
            let x: number = Phaser.Math.RND.between(this.ball.width * 0.2 + 10, this.physics.world.bounds.width - this.ball.width * 0.2 - 10)
            let y: number = Phaser.Math.RND.between(this.physics.world.bounds.height * 0.1, this.physics.world.bounds.height - this.physics.world.bounds.height * 0.1);
            this.power = new PowerUp(this, x, y);
            this.socket.emit("newPower", {x: x, y: y});
            this.physics.add.overlap(this.ball, this.power, this.power_up, undefined, this);
            if (this.wall === true || this.random === true)
                this.physics.add.overlap(this.power, [this.wall1, this.wall2, this.wall3], () => {
                    let x: number = Phaser.Math.RND.between(this.ball.width * 0.2 + 10, this.physics.world.bounds.width - this.ball.width * 0.2 - 10)
                    let y: number = Phaser.Math.RND.between(this.physics.world.bounds.height * 0.1, this.physics.world.bounds.height - this.physics.world.bounds.height * 0.1);
                    this.power.setPosition(x, y)
                    this.socket.emit("newPower", {x: x, y: y});
                }, undefined, this)
        }
    }

   

    update() {
       
    }

    power_up() { 
       
    }

    shutdown() {
        this.socket.off("movement");
        this.socket.off("disconnected");

        this.socket.emit("new");
       // this.game.destroy(false, false);
    } */
}
