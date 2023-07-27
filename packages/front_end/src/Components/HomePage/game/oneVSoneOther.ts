
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

    keys: any = {};

    socket!: any;
    name!: string;

    points1: number = 0;
    points2: number = 0;
    win: number = 5;
    rotation: number = 1;

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
    
    paddlespeed: number = 450;
    modifier: number = 1;
    
    oldPosition!: number;

    face: boolean = false;
    random: boolean = false
    wall: boolean = false;
    multi: boolean = false;
    start: boolean = true;

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
            this.textures.addBase64('ball', String(require("../../../images/ball.png")));
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

        this.paddle1.setImmovable(true);
        this.paddle1.setOrigin(0.5);
        this.paddle1.setScale(0.15, 0.25);
        
        this.paddle2.setImmovable(true);
        this.paddle2.setOrigin(0.5);
        this.paddle2.setScale(0.15, 0.25);
        this.paddle2.setCollideWorldBounds(true)
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
            'Return to Menu',
            {
                fontFamily: 'pong',
                fontSize: '50px',
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
            if (this.paddle1.body)
                this.paddle1.setY(newPos + this.paddle1.body.height / 2);
        })

        this.socket.on("update", (data: any) => {
            if (this.ball.body){
                this.ball.setX(data.x + this.ball.body.width / 2)
                this.ball.setY(data.y + this.ball.body.height / 2)
            }
        })

        this.socket.on("random", (data: any) => {
            if (data.generate === true){
                if (data.which === 1){
                    this.wall1 = this.physics.add.sprite(data.x, data.y, "wall")
                    this.wall1.setScale(data.scaleX, data.scaleY);
                }
                else if (data.which === 2){
                    this.wall2 = this.physics.add.sprite(data.x, data.y, "wall")
                    this.wall2.setScale(data.scaleX, data.scaleY);
                }
                else {
                    this.wall3 = this.physics.add.sprite(data.x, data.y, "wall")
                    this.wall3.setScale(data.scaleX, data.scaleY);
                }
            }
            else {
                if (data.which === 1){
                    this.wall1.setPosition(data.x, data.y)
                    this.wall1.setScale(data.scaleX, data.scaleY);
                }
                else if (data.which === 2){
                    this.wall2.setPosition(data.x, data.y)
                    this.wall2.setScale(data.scaleX, data.scaleY);
                }
                else {
                    this.wall3.setPosition(data.x, data.y)
                    this.wall3.setScale(data.scaleX, data.scaleY);
                }
            }
        })

        this.socket.on("newPower", (data: any) => {
            if (this.start === true){
                this.power = this.physics.add.sprite(data.x, data.y, "power");
                this.power.setScale(0.1, 0.1);
                this.start = false;
            }
            else {
                this.power.setPosition(data.x, data.y);
                this.power.setVisible(true);
            }
        })

        this.socket.on("multi", (data: any) => {
            if (this.multiball.body){
                this.multiball.setX(data.x + this.multiball.body.width / 2)
                this.multiball.setY(data.y + this.multiball.body.height / 2)
            }
        })

        this.socket.on("power", (data: any) => {
            this.power.setVisible(false);
            switch (data.which){
                case 1:
                    this.smash.setVisible(true);
                    this.time.delayedCall(1000, () => {
                        this.smash.setVisible(false)
                    }, [], this);
                    break;
                case 2:
                    this.bigPaddle.setVisible(true);
                    this.time.delayedCall(1000, () => {
                        this.bigPaddle.setVisible(false)
                    }, [], this);
                    if (data.player === 1){
                        this.paddle1.setScale(0.5, 0.90);
                        this.time.delayedCall(7500, () => {
                            this.paddle1.setScale(0.15, 0.25);
                        }, [], this);
                    }
                    else {
                        this.paddle2.setScale(0.5, 0.90);
                        this.time.delayedCall(7500, () => {
                            this.paddle2.setScale(0.15, 0.25);
                        }, [], this);
                    }
                    break;
                case 3: 
                    this.inverse.setVisible(true);
                    this.time.delayedCall(1000, () => {
                        this.inverse.setVisible(false)
                    }, [], this);
                    this.modifier = -1;
                    this.time.delayedCall(5000, () => {
                        this.modifier = 1;
                    }, [], this);
                    break;
                case 4:
                    this.bigBall.setVisible(true);
                    this.time.delayedCall(1000, () => {
                        this.bigBall.setVisible(false)
                    }, [], this);
                    this.ball.setTexture("bigBall")
                    this.ball.setScale(1, 1);
                    this.time.delayedCall(5000, () => {
                        console.log("fuck")
                        this.ball.setTexture("ball")
                        this.ball.setScale(0.2);
                    }, [], this);
                    break;
                case 5:
                    this.multiBall.setVisible(true);
                    this.time.delayedCall(1000, () => {
                        this.multiBall.setVisible(false)
                    }, [], this);
                    this.multiball = this.physics.add.sprite(
                        this.physics.world.bounds.width / 2,
			            this.physics.world.bounds.height / 2,
                        "ball"
                    )
                    this.multiball.setScale(0.2);
                    this.multi = true;
            }
        })

        this.socket.on("point", (which: number) => {
            let end = false;

            this.smash.setVisible(false);
            this.bigBall.setVisible(false);
            this.bigPaddle.setVisible(false);
            this.inverse.setVisible(false);
            this.multiBall.setVisible(false);
            if (this.power)
                this.power.setVisible(false);
            if (this.random === true || this.wall === true){
                this.wall1.setVisible(false);
                this.wall2.setVisible(false);
                this.wall3.setVisible(false);
            }
            this.paddle2.disableBody();
            if (which === 1)
            this.points2++;
            else
            this.points1++;
            this.score.setText(`${this.points2}          ${this.points1}`);
            if (this.points2 === this.win){
                this.player1VictoryText.setVisible(true);
                this.menu.setVisible(true);
                this.ball.disableBody(true);
                end = true;
            }
            else if (this.points1 === this.win){
                this.player2VictoryText.setVisible(true);
                this.menu.setVisible(true);
                this.ball.disableBody(true);
                end = true;
            }
            else if (which === 1)
                this.player1Score.setVisible(true);
            else
                this.player2Score.setVisible(true);
            this.rotation = 0;
            if (end !== true){
            this.time.delayedCall(1500, () => {
                if (this.multi === true)
                        this.multiball.destroy();
                this.rotation = 1;
                this.player1Score.setVisible(false);
                this.player2Score.setVisible(false);
                this.paddle2.enableBody();
                this.ball.setX(this.physics.world.bounds.width / 2);
                this.ball.setY(this.physics.world.bounds.height / 2);
                this.paddle2.setY(this.physics.world.bounds.height / 2);
                if (this.multi === true)
                    this.multiball.destroy(true);
                this.multi = false;
                this.paddlespeed = 400;
                this.modifier = 1;
                this.paddle1.setScale(0.15, 0.25);
                this.paddle2.setScale(0.15, 0.25);
                this.ball.setTexture("ball")
                this.ball.setScale(0.2);
                if (this.random === true || this.wall === true){
                    this.wall1.setVisible(true);
                    this.wall2.setVisible(true);
                    this.wall3.setVisible(true);
                }
            }, [], this);
        }
        })

        this.socket.on("disconnected", () => {
            alert("fuck yes")
            this.menu.setVisible(true);
            this.disconnect.setVisible(true);
            this.scene.pause();
        })


        this.keys.w  = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keys.s  = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S);        
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

        this.player1VictoryText.destroy()
        this.player1Score.destroy()
        this.player2VictoryText.destroy()
        this.player2Score.destroy()
        this.score.destroy()
        this.bigPaddle.destroy()
        this.bigBall.destroy()
        this.smash.destroy()
        this.inverse.destroy()
        this.multiBall.destroy()
        this.menu.destroy()
        this.disconnect.destroy()
        this.paddle1.destroy()
        this.paddle2.destroy()
        this.ball.destroy()

        if (this.multi === true)
            this.multiball.destroy();

        if (this.wall === true || this.random === true){
            this.wall1.destroy()
            this.wall2.destroy()
            this.wall3.destroy()
        }

        this.points1 = 0;
        this.points2 = 0;
        this.paddlespeed = 450;

        this.scene.sleep();
        this.scene.run("menu", { name: this.name, socket: this.socket });
    }
}
