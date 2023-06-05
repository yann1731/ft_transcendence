
import Phaser from "phaser";

class PowerUp extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
      super(scene, x, y, "power");
      this.setScale(0.1, 0.1);
      scene.add.existing(this);
      scene.physics.add.existing(this);
    }
}

interface gameData {
    power: boolean;
    scaleRate: number;
}

export default class oneVSthree extends Phaser.Scene{

	ball!: Phaser.Physics.Arcade.Sprite;
    multiball!: Phaser.Physics.Arcade.Sprite;
    paddle1!: Phaser.Physics.Arcade.Sprite;
    paddle2!: Phaser.Physics.Arcade.Sprite;
	paddle3!: Phaser.Physics.Arcade.Sprite;
	paddle4!: Phaser.Physics.Arcade.Sprite;

    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    keys: any = {};

    points1: number = 0;
    points2: number = 0;
    win: number = 5;

    player1VictoryText!: Phaser.GameObjects.Text;
    player1Score!: Phaser.GameObjects.Text;
    player2VictoryText!: Phaser.GameObjects.Text;
    player2Score!: Phaser.GameObjects.Text;
    score!: Phaser.GameObjects.Text;
    
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
	rate!: number;
	paddleScale: number = 1.5;
    power!: PowerUp;
    
    powerup: boolean = false;
    multi: boolean = false;
    reduce: boolean = true;

    bigPaddle!: Phaser.GameObjects.Text;
    bigBall!: Phaser.GameObjects.Text;
    smash!: Phaser.GameObjects.Text;
    inverse!: Phaser.GameObjects.Text;
    multiBall!: Phaser.GameObjects.Text;


    constructor() {
        super('threeVSone');
    }

    init (data: gameData) {
        this.powerup = data.power;
		this.rate = data.scaleRate;
    }

	preload() {
        this.textures.addBase64('ball', String(require("../../../images/ball.png")));
        this.textures.addBase64('bigBall', String(require("../../../images/bigBall.png")));
        this.textures.addBase64('paddle', String(require("../../../images/paddle.png")));
        this.textures.addBase64('sidePaddle', String(require("../../../images/sidePaddle.png")));
        this.textures.addBase64('wall', String(require("../../../images/wall.png")));
        this.load.image("power", String(require("../../../images/power.png")));
        this.cursors = this.input.keyboard?.createCursorKeys();
    }

    ball_init() {
        this.ball = this.physics.add.sprite(
			this.physics.world.bounds.width / 2,
			this.physics.world.bounds.height / 2,
			"ball"
        )

        if (Math.floor(Math.random() * 2) === 0){
            this.ball.setVelocityX(Math.random() * (this.XVelocityMax1 - this.XVelocityMin1) + this.XVelocityMin1);
            let y: number = Math.random() * (this.YvelocityMax - this.YvelocityMin) + this.YvelocityMin;
            if (Math.floor(Math.random() * 2) === 0)
                y *= -1;            
            this.ball.setVelocityY(y);
        } else{
            this.ball.setVelocityX(Math.random() * (this.XVelocityMax2 - this.XVelocityMin2) + this.XVelocityMin2);
            let y: number = Math.random() * (this.YvelocityMax - this.YvelocityMin) + this.YvelocityMin;
            if (Math.floor(Math.random() * 2) === 0)
                y *= -1;
            this.ball.setVelocityY(y);
        }
        
        this.ball.setDamping(true);
        this.ball.setScale(0.2);
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1, 1);
        this.ball.setDrag(1.05);
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
        this.paddle3 = this.physics.add.sprite(
            this.physics.world.bounds.width / 2,
            (this.ball.width * 0.2) / 2 + 1,
            "sidePaddle"
        )
        this.paddle4 = this.physics.add.sprite(
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height - (this.ball.width * 0.2) / 2 - 1 ,
            "sidePaddle"
        )
        
        this.paddle1.setImmovable(true);
        this.paddle1.setOrigin(0.5);
        this.paddle1.setScale(0.15, 0.25);
        this.paddle1.setCollideWorldBounds(true);
        this.physics.add.collider(this.ball, this.paddle1);
        
		this.paddle2.setImmovable(true);
        this.paddle2.setOrigin(0.5);
        this.paddle2.setScale(0.15, 0.25);
        this.paddle2.setCollideWorldBounds(true)
        this.physics.add.collider(this.ball, this.paddle2);

		this.paddle3.setImmovable(true);
        this.paddle3.setOrigin(0.5);
        this.paddle3.setScale(0.35, 0.15);
        this.paddle3.setCollideWorldBounds(true);
        this.physics.add.collider(this.paddle3, [this.paddle1, this.paddle2, this.ball]);

		this.paddle4.setImmovable(true);
        this.paddle4.setOrigin(0.5);
        this.paddle4.setScale(this.paddleScale, 0.15);
        this.paddle4.setCollideWorldBounds(true);
        this.physics.add.collider(this.paddle4, [this.paddle1, this.paddle2, this.ball]);
    }

    text_init() {
        this.player1VictoryText = this.add.text(
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height / 2,
            'team 1 wins!',
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
            'team 1 scored!',
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
            'team 2 wins!',
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
            'team 2 scored!',
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
        this.text_init();
        this.ball_init();
        this.paddle_init();

        this.keys.w  = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keys.s  = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S);  
        this.keys.a  = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.A);  
        this.keys.d  = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.D);  
        
        if (this.powerup){
            this.power = new PowerUp(this, Phaser.Math.RND.between(this.ball.width * 0.2 + 10, this.physics.world.bounds.width - this.ball.width * 0.2 - 10), Phaser.Math.RND.between(this.physics.world.bounds.height * 0.1, this.physics.world.bounds.height - this.physics.world.bounds.height * 0.1));
            this.physics.add.overlap(this.ball, this.power, this.power_up, undefined, this);
        }


    }

    new_point(player: number) {
        this.paddle1.disableBody();
        this.paddle2.disableBody();
        this.paddle3.disableBody();
        this.paddle4.disableBody();
        this.ball.disableBody();
        if (this.multi === true)
            this.multiball.disableBody();
        if (player === 1)
            this.player1Score.setVisible(true);
        else
            this.player2Score.setVisible(true);
        this.rotation = 0;
        this.time.delayedCall(1500, () => {
            this.paddleScale = 1.5;
            this.rotation = 1;
            this.reduce = true;
            this.player1Score.setVisible(false);
            this.player2Score.setVisible(false);
            this.paddle1.enableBody();
            this.paddle2.enableBody();
            this.paddle3.enableBody();
            this.paddle4.enableBody();
            this.ball.enableBody();
            this.ball.setX(this.physics.world.bounds.width / 2);
            this.ball.setY(this.physics.world.bounds.height / 2);
            this.paddle1.setY(this.physics.world.bounds.height / 2);
            this.paddle2.setY(this.physics.world.bounds.height / 2);
            this.paddle3.setX(this.physics.world.bounds.width / 2);
            this.paddle4.setX(this.physics.world.bounds.width / 2);
            if (this.multi === true)
                this.multiball.destroy(true);
            this.multi = false;
            if (player === 1)
                this.ball.setVelocityX(Math.random() * (this.XVelocityMax1 - this.XVelocityMin1) + this.XVelocityMin1);
            else
                this.ball.setVelocityX(Math.random() * (this.XVelocityMax2 - this.XVelocityMin2) + this.XVelocityMin2);
            let y: number = Math.random() * (this.YvelocityMax - this.YvelocityMin) + this.YvelocityMin;
            if (Math.floor(Math.random() * 2) === 0)
                y *= -1;
            this.ball.setVelocityY(y);
            this.paddlespeed = 400;
            this.modifier1 = 1;
            this.modifier2 = 1;
            this.paddle1.setScale(0.15, 0.25);
            this.paddle2.setScale(0.15, 0.25);
			this.paddle3.setScale(0.35, 0.15);
			this.paddle4.setScale(1.5, 0.15);
            this.ball.setTexture("ball")
            this.ball.setScale(0.2);
            if (this.powerup === true){
                this.power.setPosition(Phaser.Math.RND.between(this.ball.width * 0.2 + 10, this.physics.world.bounds.width - this.ball.width * 0.2 - 10), Phaser.Math.RND.between(this.physics.world.bounds.height * 0.1, this.physics.world.bounds.height - this.physics.world.bounds.height * 0.1))
                this.power.enableBody(true, this.power.x, this.power.y, true, true);
            }
        }, [], this);
    }

    end(player: number) {
        if (player === 1)
            this.player2VictoryText.setVisible(true);
        else
            this.player1VictoryText.setVisible(true);
        this.paddle1.disableBody();
        this.paddle2.disableBody();
        this.paddle3.disableBody();
        this.paddle4.disableBody();
        this.scene.pause();
        return;
    }

    update() {
    	if (this.ball.body)
           if (this.ball.body?.x + this.ball.body.width === this.physics.world.bounds.width || this.ball.body.x === 0 ||
			this.ball.body.y === 0) {
				if (this.ball.body?.x + this.ball.body.width === this.physics.world.bounds.width)
                	this.ball.body.x = this.physics.world.bounds.width - 1;
				else if (this.ball.body.x === 0)
					this.ball.body.x = 1;
				else
					this.ball.body.y = 1;
                if (this.multi === true)
                    this.multiball.disableBody();
                this.smash.setVisible(false);
                this.bigBall.setVisible(false);
                this.bigPaddle.setVisible(false);
                this.inverse.setVisible(false);
                this.multiBall.setVisible(false);
                this.points2++;
                this.score.setText(`${this.points2}          ${this.points1}`);
                if (this.points2 === this.win)
                    this.end(2);
                else
                    this.new_point(1);
            }

        if (this.multi)
            if (this.multiball.body)
				if (this.multiball.body?.x + this.multiball.body.width === this.physics.world.bounds.width || this.multiball.body.x === 0 ||
					this.multiball.body.y === 0) {
					if (this.multiball.body?.x + this.multiball.body.width === this.physics.world.bounds.width)
                    	this.multiball.body.x = this.physics.world.bounds.width - 1;
					else if (this.multiball.body.x === 0)
						this.multiball.body.x = 1;
					else
						this.multiball.body.y = 1;
                    this.multiball.disableBody();
                    this.smash.setVisible(false);
                    this.bigBall.setVisible(false);
                    this.bigPaddle.setVisible(false);
                    this.inverse.setVisible(false);
                    this.multiBall.setVisible(false);
                    this.points2++;
                    this.score.setText(`${this.points2}          ${this.points1}`);
                    if (this.points2 === this.win)
                        this.end(2);
                    else
                        this.new_point(1);
                }

        if (this.ball.body)
            if (this.ball.body?.y + this.ball.body.height === this.physics.world.bounds.height) {
                this.ball.body.y = this.physics.world.bounds.height - 1;
                this.smash.setVisible(false);
                this.bigBall.setVisible(false);
                this.bigPaddle.setVisible(false);
                this.inverse.setVisible(false);
                this.multiBall.setVisible(false);
                this.points1++;
                if (this.multi === true)
                    this.multiball.disableBody();
                this.score.setText(`${this.points2}          ${this.points1}`);
                if (this.points1 === this.win)
                    this.end(1);
                else
                    this.new_point(2);
            }

        if (this.multi)
            if (this.multiball.body)
				if (this.multiball.body?.y + this.multiball.body.height === this.physics.world.bounds.height) {
                	this.multiball.body.y = this.physics.world.bounds.height - 1;
                    this.smash.setVisible(false);
                    this.bigBall.setVisible(false);
                    this.bigPaddle.setVisible(false);
                    this.inverse.setVisible(false);
                    this.multiBall.setVisible(false);
                    this.points1++;
                    this.multiball.disableBody();
                    this.score.setText(`${this.points2}          ${this.points1}`);
                    if (this.points1 === this.win)
                        this.end(1);
                    else
                        this.new_point(2);
                } 
        
        this.paddle1.setVelocityY(0);
        this.paddle2.setVelocityY(0);
        this.paddle3.setVelocityX(0);
        this.paddle4.setVelocityX(0);
        
		if (this.keys.w.isDown)
            if (this.paddle1.body && this.paddle3.body)
                if (this.paddle1.body.y - this.paddle1.body.height * 0.1 > this.paddle3.body.y + this.paddle3.body.height)
		            this.paddle1.setVelocityY(-this.paddlespeed * this.modifier1);
		if (this.keys.s.isDown)
            if (this.paddle1.body && this.paddle4.body)
                if (this.paddle1.body.y + this.paddle1.body.height + this.paddle1.body.height * 0.1 < this.paddle4.body.y)
		            this.paddle1.setVelocityY(this.paddlespeed * this.modifier1);

        if (this.cursors?.up.isDown)
            if (this.paddle2.body && this.paddle3.body)
                if (this.paddle2.body.y - this.paddle2.body.height * 0.1 > this.paddle3.body.y + this.paddle3.body.height)
        	        this.paddle2.setVelocityY(-this.paddlespeed * this.modifier1);
        if (this.cursors?.down.isDown)
            if (this.paddle2.body && this.paddle4.body)
                if (this.paddle2.body.y + this.paddle2.body.height + this.paddle2.body.height * 0.1 < this.paddle4.body.y)
        	        this.paddle2.setVelocityY(this.paddlespeed * this.modifier1);
        
		if (this.keys.a.isDown)
			this.paddle3.setVelocityX(-this.paddlespeed * this.modifier1)
		if (this.keys.d.isDown)
			this.paddle3.setVelocityX(this.paddlespeed * this.modifier1)

		if (this.cursors?.right.isDown)
        	this.paddle4.setVelocityX(this.paddlespeed * this.modifier2);
        if (this.cursors?.left.isDown)
        	this.paddle4.setVelocityX(-this.paddlespeed * this.modifier2);

        this.ball.angle += this.rotation;
        if (this.ball.body){
            if (this.newOldVelocityX !== 0)
                if (this.ball.body.velocity.x !== this.newOldVelocityX){
                    this.ball.body.velocity.x = this.oldVelocityX;
                    this.oldVelocityX = 0;
                    this.newOldVelocityX = 0;
                    this.ball.setDrag(1.05)
                }
            if(this.ball.body.velocity.x >= 1000)
                this.ball.setDrag(1);
        }
        
        if (this.paddlespeed < 700)
            this.paddlespeed += 0.5;
		this.paddleScale -= this.rate;
        if (this.reduce === true){
		    this.paddle4.setScale(this.paddleScale, 0.15)
		    if (this.paddleScale <= 0.35){
                this.reduce = false;
		    	this.smash.setVisible(false);
                this.bigBall.setVisible(false);
                this.bigPaddle.setVisible(false);
                this.inverse.setVisible(false);
                this.multiBall.setVisible(false);
                this.points2++;
                this.score.setText(`${this.points2}          ${this.points1}`);
                if (this.points2 === this.win)
                    this.end(2);
                else
                    this.new_point(1);
		    }
        }
    }

    power_up() { 
        this.power.disableBody(true, true);
        if (this.ball.body)
            switch(this.multi ? Phaser.Math.RND.between(1, 4) : Phaser.Math.RND.between(1, 5)){
                case 1:
                    this.smash.setVisible(true);
                    this.time.delayedCall(1000, () => {
                        this.smash.setVisible(false)
                    }, [], this);
                    if (this.ball.body){
                        this.oldVelocityX = this.ball.body.velocity.x;
                        this.ball.setDrag(1);
                        this.ball.setVelocityX(this.ball.body.velocity.x * 2);
                        this.newOldVelocityX = this.ball.body.velocity.x;
                    }
                    break;
                case 2:
                    this.bigPaddle.setVisible(true);
                    this.time.delayedCall(1000, () => {
                        this.bigPaddle.setVisible(false)
                    }, [], this);
					switch (Phaser.Math.RND.between(1, 3)){
						case 1:
							this.paddle1.setScale(0.5, 0.90);
                        	this.time.delayedCall(7500, () => {
                            	this.paddle1.setScale(0.15, 0.25);
                        	}, [], this);
							break;
						case 2:
							this.paddle2.setScale(0.5, 0.90);
                        	this.time.delayedCall(7500, () => {
                            	this.paddle2.setScale(0.15, 0.25);
                        	}, [], this);
							break;
						case 3:
							this.paddle3.setScale(0.9, 0.5);
                        	this.time.delayedCall(7500, () => {
                            	this.paddle3.setScale(0.25, 0.15);
                        	}, [], this);
							break;
					}
					break;
                case 3:
                    this.inverse.setVisible(true);
                    this.time.delayedCall(1000, () => {
                        this.inverse.setVisible(false)
                    }, [], this);
					if (Phaser.Math.RND.frac() === 1)
                    	this.modifier1 = -1;
					else
						this.modifier2 = -1;
                    this.time.delayedCall(5000, () => {
                            this.modifier1 = 1;
                            this.modifier2 = 1;
                    }, [], this);
                    break;
                case 4:
                    this.bigBall.setVisible(true);
                    this.time.delayedCall(1000, () => {
                        this.bigBall.setVisible(false)
                    }, [], this);
                    this.ball.setTexture("bigball")
                    this.ball.setScale(1, 1);
                    this.time.delayedCall(5000, () => {
                        this.ball.setTexture("ball")
                        this.ball.setScale(0.2);
                    }, [], this);
                    break;
                case 5:
                    if (this.ball.body){
                        this.multiBall.setVisible(true);
                        this.time.delayedCall(1000, () => {
                            this.multiBall.setVisible(false)
                        }, [], this);
                        this.multiball = this.physics.add.sprite(
                            this.physics.world.bounds.width / 2,
			                this.physics.world.bounds.height / 2,
                            "ball"
                        )

                        if (this.ball.body.velocity.x < 0){
                            this.multiball.setVelocityX(Math.random() * (this.XVelocityMax1 - this.XVelocityMin1) + this.XVelocityMin1);
                            let y: number = Math.random() * (this.YvelocityMax - this.YvelocityMin) + this.YvelocityMin;
                            if (Math.floor(Math.random() * 2) === 0)
                                y *= -1;            
                            this.multiball.setVelocityY(y);
                        } else{
                            this.multiball.setVelocityX(Math.random() * (this.XVelocityMax2 - this.XVelocityMin2) + this.XVelocityMin2);
                            let y: number = Math.random() * (this.YvelocityMax - this.YvelocityMin) + this.YvelocityMin;
                            if (Math.floor(Math.random() * 2) === 0)
                                y *= -1;
                            this.multiball.setVelocityY(y);
                        }

                        this.multiball.setDamping(true);
                        this.multiball.setScale(0.2);
                        this.multiball.setCollideWorldBounds(true);
                        this.multiball.setBounce(1, 1);
                        this.multiball.setDrag(1.05);
                        this.physics.add.collider(this.multiball, this.paddle1);
                        this.physics.add.collider(this.multiball, this.paddle2);
                        this.physics.add.collider(this.multiball, this.paddle3);
                        this.physics.add.collider(this.multiball, this.paddle4);
                        this.physics.add.overlap(this.multiball, this.power, this.power_up, undefined, this);
                        this.multi = true;
                    }
                    break;
            }

        this.time.delayedCall(Phaser.Math.RND.between(2000, 7000), () => {
            this.power.enableBody(true, this.power.x, this.power.y, true, true);
        }, [], this);

        this.power.setPosition(Phaser.Math.RND.between(this.ball.width * 0.2 + 10, this.physics.world.bounds.width - this.ball.width * 0.2 - 10), Phaser.Math.RND.between(this.physics.world.bounds.height * 0.1, this.physics.world.bounds.height - this.physics.world.bounds.height * 0.1))
    }
}
