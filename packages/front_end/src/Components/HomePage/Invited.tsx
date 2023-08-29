
import Phaser from "phaser";
import { Socket } from "socket.io-client";
import '../../App.css';

interface gameData {
	socket: Socket
	invited: boolean
}

class PowerUp extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
      super(scene, x, y, "power");
      this.setScale(0.1, 0.1);
      scene.add.existing(this);
      scene.physics.add.existing(this);
    }
}

export default class invited extends Phaser.Scene{
	ball!: Phaser.Physics.Arcade.Sprite;
    paddle1!: Phaser.Physics.Arcade.Sprite;
    paddle2!: Phaser.Physics.Arcade.Sprite;
    player1VictoryText!: Phaser.GameObjects.Text;
    player1Score!: Phaser.GameObjects.Text;
    player2VictoryText!: Phaser.GameObjects.Text;
    player2Score!: Phaser.GameObjects.Text;
    score!: Phaser.GameObjects.Text;
    disconnect!: Phaser.GameObjects.Text;
    menu!: Phaser.GameObjects.Text;

	starting!: Phaser.GameObjects.Text;
	position!: Phaser.GameObjects.Text;

	invited!: boolean;
	end2: boolean = false;
	start: boolean = false;

	ballX!: number;
    ballY!: number;
	points1: number = 0;
    points2: number = 0;
    win: number = 5;
    paddlespeed: number = 450;
    oldPosition!: number;
	oldVelocityX!: number;
	newOldVelocityX: number = 0;
	XVelocityMin1: number = 350;
    XVelocityMax1: number = 400;
    XVelocityMin2: number = -350;
    XVelocityMax2: number = -400;
    YvelocityMin: number = 125;
    YvelocityMax: number = 225;
	name!: string;
	socket!: Socket; 
	event1!: any;
	event2!: any;
	event3!: any;
    keys: any = {};
	


	constructor() {
        super('invited');
    }

	init(data: gameData) {
		this.socket = data.socket;
		this.invited = data.invited
	}
	
	preload() {
		this.load.bitmapFont('pong', '../../fonts/pong.ttf');
		this.textures.addBase64('ball', String(require("../../images/ball.png")));
		this.textures.addBase64('bigBall', String(require("../../images/bigBall.png")));
		this.textures.addBase64('paddle', String(require("../../images/paddle.png")));
		this.textures.addBase64('sidePaddle', String(require("../../images/sidePaddle.png")));
		this.textures.addBase64('wall', String(require("../../images/wall.png")));
		this.load.image("power", String(require("../../images/power.png")));
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
		this.menu.setVisible(false);
		this.menu.setInteractive();
		this.menu.setOrigin(0.5);

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
	}
				
	create() {
		
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
		this.score.setOrigin(0.5);

		this.socket.on("disconnected", () => {
			this.menu.setVisible(true);
			this.disconnect.setVisible(true);
			this.event1.remove(false)
			this.event2.remove(false)
			this.event3.remove(false)
			this.starting.destroy()
			this.position.destroy()
		})

		

		this.starting = this.add.text(this.physics.world.bounds.width / 2, this.physics.world.bounds.height / 2, 'game starting in 3', {
			fontFamily: 'pong',
			fontSize: '50px',
			color: '#ffffff',
			backgroundColor: '#000000',
			padding: {
				x: 10,
				y: 6
			}
		});
		this.starting.setOrigin(0.5);

		this.position = this.add.text(this.physics.world.bounds.width / 2, this.physics.world.bounds.height / 2 + this.physics.world.bounds.height / 8, 'You are positionned left', {
			fontFamily: 'pong',
			fontSize: '25px',
			color: '#ffffff',
			backgroundColor: '#000000',
			padding: {
				x: 10,
				y: 6
			}
		});
		this.position.setOrigin(0.5);

		if (this.invited === true)
			this.position.setText("You are positionned right")

		this.event1 = this.time.delayedCall(1000, () => {
			this.starting.setText('game starting in 2');
		}, [], this);
		this.event2 = this.time.delayedCall(2000, () => {
			this.starting.setText('game starting in 1');
		}, [], this);
		this.event3 = this.time.delayedCall(2950, () => {
			this.starting.destroy()
			this.position.destroy()
			this.start = true;

			if (this.invited === false){
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
		
				this.socket.on("point", (which: number) => {
					
					this.paddle2.disableBody();
					if (which === 1)
						this.points2++;
					else
						this.points1++;
					this.score.setText(`${this.points2}          ${this.points1}`);
					if (this.points2 === this.win){
						this.player1VictoryText.setVisible(true);
						this.menu.setVisible(true);
						this.ball.destroy(true);
						this.paddle1.destroy(true);
						this.paddle2.destroy(true);
						
						this.socket.off("movement");
						this.socket.off("update");
						this.socket.off("random");
						this.socket.off("newPower");
						this.socket.off("multi");
						this.socket.off("power");
						this.socket.off("point");
						this.end2 = true;
					}
					else if (this.points1 === this.win){
						this.player2VictoryText.setVisible(true);
						this.menu.setVisible(true);
						this.ball.destroy(true);
						this.paddle1.destroy(true);
						this.paddle2.destroy(true);
						this.socket.off("movement");
						this.socket.off("update");
						this.socket.off("random");
						this.socket.off("newPower");
						this.socket.off("multi");
						this.socket.off("power");
						this.socket.off("point");
						this.end2 = true;
					}
					else if (which === 1)
						this.player1Score.setVisible(true);
					else
						this.player2Score.setVisible(true);
					if (this.end2 !== true){
						this.time.delayedCall(1500, () => {
						
			
							this.player1Score.setVisible(false);
							this.player2Score.setVisible(false);
							this.paddle2.enableBody();
							this.ball.setX(this.physics.world.bounds.width / 2);
							this.ball.setY(this.physics.world.bounds.height / 2);
							this.paddle2.setY(this.physics.world.bounds.height / 2);
							
							this.paddlespeed = 400;
							
							this.paddle1.setScale(0.15, 0.25);
							this.paddle2.setScale(0.15, 0.25);
							this.ball.setTexture("ball")
							this.ball.setScale(0.2);
							
						}, [], this);
					}
				})
	
				this.ball = this.physics.add.sprite(
					this.physics.world.bounds.width / 2,
					this.physics.world.bounds.height / 2,
					"ball"
				   )
				this.ball.setScale(0.2);
	
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
				
		
				this.keys.w  = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W);
				this.keys.s  = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S);
			}
			else{
				this.socket.on("movement", (newPos: number) => {
					if (this.paddle2.body)
						this.paddle2.setY(newPos + this.paddle2.body.height / 2);
				})
	
				this.ball = this.physics.add.sprite(
					this.physics.world.bounds.width / 2,
					this.physics.world.bounds.height / 2,
					"ball"
				)
				
				if (Math.floor(Math.random() * 2) === 0){
					this.ballX = Math.random() * (this.XVelocityMax1 - this.XVelocityMin1) + this.XVelocityMin1;
					this.ballY = Math.random() * (this.YvelocityMax - this.YvelocityMin) + this.YvelocityMin;
					if (Math.floor(Math.random() * 2) === 0)
						this.ballY *= -1;            
				} else{
					this.ballX = Math.random() * (this.XVelocityMax2 - this.XVelocityMin2) + this.XVelocityMin2;
					this.ballY = Math.random() * (this.YvelocityMax - this.YvelocityMin) + this.YvelocityMin;
					if (Math.floor(Math.random() * 2) === 0)
						this.ballY *= -1;
				}

				this.ball.setVelocityX(this.ballX);
				this.ball.setVelocityY(this.ballY);
				this.ball.setDamping(true);
				this.ball.setScale(0.2);
				this.ball.setCollideWorldBounds(true);
				this.ball.setBounce(1, 1);
				this.ball.setDrag(1.05);
			
	
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
	
				
	
				this.keys.w  = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W);
				this.keys.s  = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S);   
			}
		}, [], this);
	}

	update() {
		if (this.start === true){
			if (this.invited === false){

				if (this.paddle2.body)
					this.paddle2.setVelocityY(0);
			
        		if (this.keys.w.isDown)
        		    this.paddle2.setVelocityY(-this.paddlespeed);
        		if (this.keys.s.isDown)
        		    this.paddle2.setVelocityY(this.paddlespeed);
				
        		if (this.paddle2.body){
        		    if (this.paddle2.body.y !== this.oldPosition)
        		        this.socket.emit("movement", this.paddle2.body.y)
        		    this.oldPosition = this.paddle2.body.y
        		}
			
        		if (this.paddlespeed < 625)
        		    this.paddlespeed += 0.5;
			}
			else{
				if (this.ball.body)
					if (this.ball.body?.x + this.ball.body.width === this.physics.world.bounds.width) {
						this.ball.body.x = this.physics.world.bounds.width - 1 - this.ball.body.width;
						this.socket.emit("point", 1);
						this.points2++;
						this.score.setText(`${this.points2}          ${this.points1}`);
						if (this.points2 === this.win)
							this.end(2);
						else
							this.new_point(1);
					}
				
				if (this.ball.body)
					if (this.ball.body?.x === 0) {
						this.ball.body.x = 1;
						this.socket.emit("point", 0);
						this.points1++;
						this.score.setText(`${this.points2}          ${this.points1}`);
						if (this.points1 === this.win)
						this.end(1);
						else
						this.new_point(2);
					}
				
				if (this.paddle1.body)
					this.paddle1.setVelocityY(0);
				
				if (this.keys.w.isDown)
					this.paddle1.setVelocityY(-this.paddlespeed);
				if (this.keys.s.isDown)
					this.paddle1.setVelocityY(this.paddlespeed);
				
				if (this.paddle1.body){
					if (this.paddle1.body.y !== this.oldPosition)
						this.socket.emit("movement", this.paddle1.body.y)
					this.oldPosition = this.paddle1.body.y
				}
			
				if (this.paddlespeed < 625)
					this.paddlespeed += 0.5;
			
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
			
				this.socket.emit("update", {x: this.ball.body?.x, y: this.ball.body?.y});
		}
		}
	}

	new_point(player: number) {

        this.paddle1.disableBody();
        this.paddle2.disableBody();

        this.ball.disableBody();

        if (player === 1)
            this.player1Score.setVisible(true);
        else
            this.player2Score.setVisible(true);

        this.time.delayedCall(1500, () => {
            this.player1Score.setVisible(false);
            this.player2Score.setVisible(false);
            this.paddle1.enableBody();
            this.paddle2.enableBody();
            this.ball.enableBody();
            this.ball.setX(this.physics.world.bounds.width / 2);
            this.ball.setY(this.physics.world.bounds.height / 2);
            this.paddle1.setY(this.physics.world.bounds.height / 2);
        	this.paddle2.setY(this.physics.world.bounds.height / 2);
            if (player === 1)
                this.ball.setVelocityX(Math.random() * (this.XVelocityMax1 - this.XVelocityMin1) + this.XVelocityMin1);
            else
                this.ball.setVelocityX(Math.random() * (this.XVelocityMax2 - this.XVelocityMin2) + this.XVelocityMin2);
            let y: number = Math.random() * (this.YvelocityMax - this.YvelocityMin) + this.YvelocityMin;
            if (Math.floor(Math.random() * 2) === 0)
                y *= -1;
            this.ball.setVelocityY(y);
            this.paddlespeed = 400;
            this.paddle1.setScale(0.15, 0.25);
            this.paddle2.setScale(0.15, 0.25);
            this.ball.setTexture("ball")
            this.ball.setScale(0.2);
        }, [], this);
    }

    end(player: number) {
		this.socket.off("movement");

        this.socket.emit("end", {which: 1, name: this.name, player: player, score1: this.points1, score2: this.points2 })
		this.socket.emit("invite end")

        if (player === 1)
            this.player2VictoryText.setVisible(true);
        else
            this.player1VictoryText.setVisible(true);
        this.paddle1.destroy();
        this.paddle2.destroy();
        this.ball.destroy()
        this.menu.setVisible(true);
    }

	shutdown(){
		this.disconnect.destroy()
		this.menu.destroy()
		this.player1VictoryText.destroy()
		this.player2VictoryText.destroy()
		this.player1Score.destroy()
		this.player2Score.destroy()
		this.score.destroy()

		this.scene.stop()
		this.socket.emit("finished")
	}
}
