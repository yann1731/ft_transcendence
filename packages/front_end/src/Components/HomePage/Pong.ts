
import Phaser from "phaser";
import { Socket } from "socket.io-client";
import '../../../App.css';

interface gameData {
	name: string;
	socket: Socket
}

class PowerUp extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
      super(scene, x, y, "power");
      this.setScale(0.1, 0.1);
      scene.add.existing(this);
      scene.physics.add.existing(this);
    }
}

export default class pong extends Phaser.Scene{
	ball!: Phaser.Physics.Arcade.Sprite;
    multiball!: Phaser.Physics.Arcade.Sprite;
    paddle1!: Phaser.Physics.Arcade.Sprite;
    paddle2!: Phaser.Physics.Arcade.Sprite;
    paddle3!: Phaser.Physics.Arcade.Sprite;
    paddle4!: Phaser.Physics.Arcade.Sprite;
    power!: Phaser.Physics.Arcade.Sprite;
    wall1!: Phaser.Physics.Arcade.Sprite;
    wall2!: Phaser.Physics.Arcade.Sprite;
    wall3!: Phaser.Physics.Arcade.Sprite;
    player1VictoryText!: Phaser.GameObjects.Text;
    player1Score!: Phaser.GameObjects.Text;
    player2VictoryText!: Phaser.GameObjects.Text;
    player2Score!: Phaser.GameObjects.Text;
    team1VictoryText!: Phaser.GameObjects.Text;
    team1Score!: Phaser.GameObjects.Text;
    team2VictoryText!: Phaser.GameObjects.Text;
    team2Score!: Phaser.GameObjects.Text;
    score!: Phaser.GameObjects.Text;
    bigPaddle!: Phaser.GameObjects.Text;
    bigBall!: Phaser.GameObjects.Text;
    smash!: Phaser.GameObjects.Text;
    inverse!: Phaser.GameObjects.Text;
    multiBall!: Phaser.GameObjects.Text;
    menu!: Phaser.GameObjects.Text;
    disconnect!: Phaser.GameObjects.Text;
	start!: Phaser.GameObjects.Text;
	join!: Phaser.GameObjects.Text;
	powerButton!: Phaser.GameObjects.Text;
	wallText!: Phaser.GameObjects.Text;
	wallButton!: Phaser.GameObjects.Text;
	settingOneButton!: Phaser.GameObjects.Text;
	settingThreeButton!: Phaser.GameObjects.Text;
	randomButton!: Phaser.GameObjects.Text;
	one!: Phaser.GameObjects.Text;
	twoButton!: Phaser.GameObjects.Text;
	three!: Phaser.GameObjects.Text;
	title!: Phaser.GameObjects.Text;
	rate!: Phaser.GameObjects.Text;
	fast!: Phaser.GameObjects.Text;
	medium!: Phaser.GameObjects.Text;
	slow!: Phaser.GameObjects.Text;
	mode!: Phaser.GameObjects.Text;
	starting!: Phaser.GameObjects.Text;
	position!: Phaser.GameObjects.Text;
	single: boolean = true;
	two: boolean = false;
	multiple: boolean = false;
	oneHost: boolean = false
	oneOther: boolean = false
	twoHost: boolean = false
	twoOther: boolean = false
	threeHost: boolean = false
	threeOther: boolean = false
	faces: boolean = false;
	powerUp: boolean = false;
	wall: boolean = false;
	random: boolean = false;
	first: boolean = true;
	first2: boolean = true;
	end2: boolean = false;
	multi: boolean = false;
	powerup: boolean = false;
	player!: number;
	ballX!: number;
    ballY!: number;
	reduce: boolean = true;
	paddleScale: number = 1.5;
	rateSpeed: number = 0.0006;
	points1: number = 0;
    points2: number = 0;
    win: number = 1;
    rotation: number = 1;
    paddlespeed: number = 450;
    modifier: number = 1;
	modifier1: number = 1;
    modifier2: number = 1;
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
	socket!: any; 
	event1!: any;
	event2!: any;
	event3!: any;
    keys: any = {};
	
	constructor() {
        super('pong');
    }

	init(data: gameData) {
		this.name = data.name;
		this.socket = data.socket;

		this.load.bitmapFont('pong', '../../fonts/pong.ttf');
	}

	preload() {
        this.textures.addBase64('ball', String(require("../../../images/ball.png")));
        this.textures.addBase64('bigBall', String(require("../../../images/bigBall.png")));
        this.textures.addBase64('paddle', String(require("../../../images/paddle.png")));
        this.textures.addBase64('sidePaddle', String(require("../../../images/sidePaddle.png")));
    	this.textures.addBase64('wall', String(require("../../../images/wall.png")));
        this.load.image("power", String(require("../../../images/power.png")));

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
 
	all() {
		this.join.on('pointerover', () => {
			this.join.setColor('#000000');
			this.join.setStyle({ backgroundColor: '#ffffff' });
		});	
		this.join.on('pointerout', () => {
			this.join.setColor('#ffffff');
			this.join.setStyle({ backgroundColor: '#000000' });
		});	
		this.join.on('pointerdown', () => {
			const waiting = this.add.text(this.physics.world.bounds.width / 2, this.physics.world.bounds.height / 2, "waiting for player", {
				fontFamily: 'pong',
				fontSize: '50px',
				color: '#ffffff',
				backgroundColor: '#000000',
				padding: {
					x: 10,
					y: 6
				}
			})
			waiting.setOrigin(0.5);

			this.start.destroy(true)
			this.join.destroy(true)
			this.powerButton.destroy(true)
			this.wallText.destroy(true)
			this.wallButton.destroy(true)
			this.settingOneButton.destroy(true)
			this.settingThreeButton.destroy(true)
			this.randomButton.destroy(true)
			this.one.destroy(true)
			this.twoButton.destroy(true)
			this.three.destroy(true)
			this.title.destroy(true)
			this.rate.destroy(true)
			this.fast.destroy(true)
			this.medium.destroy(true)
			this.slow.destroy(true)
			this.mode.destroy(true)

			if (this.single === true)
				this.socket.emit("1v1", {start: false});
			else if (this.two === true)
				this.socket.emit("2v2", {start: false});
			else
				this.socket.emit("3v1", {start: false})
			this.socket.on("start", (data: any) => {
				this.socket.off("start")
				waiting.destroy();
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

				this.position = this.add.text(this.physics.world.bounds.width / 2, this.physics.world.bounds.height / 2 + this.physics.world.bounds.height / 8, 'You are positionned right', {
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

				if (this.multiple === true){
					if (this.player === 2)
						this.position.setText("You are positionned right")
					if (this.player === 3)
						this.position.setText("You are positionned top")
					if (this.player === 4)
						this.position.setText("You are positionned left")
				}
				if (this.two === true){
					if (this.player === 2)
						this.position.setText("You are positionned top right")
					if (this.player === 3)
						this.position.setText("You are positionned bottom left")
					if (this.player === 4)
						this.position.setText("You are positionned bottom right")
				}

				this.event1 = this.time.delayedCall(1000, () => {
					this.starting.setText('game starting in 2');
				}, [], this);
				this.event2 = this.time.delayedCall(2000, () => {
					this.starting.setText('game starting in 1');
				}, [], this);
				this.event3 = this.time.delayedCall(2950, () => {
					this.starting.destroy()
					this.position.destroy()

					if (this.single === true)
						this.oneOther = true;
					else if (this.multiple === true)
						this.threeOther = true;
					else
						this.twoOther = true;
				}, [], this);
			});
		})
		

		this.start.on('pointerover', () => {
			this.start.setColor('#000000');
			this.start.setStyle({ backgroundColor: '#ffffff' });
		});
		this.start.on('pointerout', () => {
			this.start.setColor('#ffffff');
			this.start.setStyle({ backgroundColor: '#000000' });
		});
		this.start.on('pointerdown', () => {
			const waiting = this.add.text(this.physics.world.bounds.width / 2, this.physics.world.bounds.height / 2, "waiting for player", {
				fontFamily: 'pong',
				fontSize: '50px',
				color: '#ffffff',
				backgroundColor: '#000000',
				padding: {
					x: 10,
					y: 6
				}
			})
			waiting.setOrigin(0.5);

			this.start.destroy(true)
			this.join.destroy(true)
			this.powerButton.destroy(true)
			this.wallText.destroy(true)
			this.wallButton.destroy(true)
			this.settingOneButton.destroy(true)
			this.settingThreeButton.destroy(true)
			this.randomButton.destroy(true)
			this.one.destroy(true)
			this.twoButton.destroy(true)
			this.three.destroy(true)
			this.title.destroy(true)
			this.rate.destroy(true)
			this.fast.destroy(true)
			this.medium.destroy(true)
			this.slow.destroy(true)
			this.mode.destroy(true)
			
			

			if (this.single === true)
				this.socket.emit("1v1", {start: true, name: this.name});
			else if (this.two === true)
				this.socket.emit("2v2", {start: true, name: this.name});
			else
				this.socket.emit("3v1", {start: true, name: this.name})
			this.socket.on("start", (data: any) =>{
				this.socket.off("start")
				this.ballX = data.ballX
				this.ballY = data.ballY

				waiting.setVisible(false);
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

				if (this.multiple === true)
					this.position.setText("You are positionned bottom")
				else if (this.two === true)
					this.position.setText("You are positionned top left")

				this.event1 = this.time.delayedCall(1000, () => {
					this.starting.setText('game starting in 2');
				}, [], this);
				this.event2 = this.time.delayedCall(2000, () => {
					this.starting.setText('game starting in 1');
				}, [], this);
				this.event3 = this.time.delayedCall(3050, () => {
					this.starting.destroy()
					this.position.destroy()

					if (this.single === true)
						this.oneHost = true;
					else if (this.multiple === true)
						this.threeHost = true;
					else
						this.twoHost = true;
				}, [], this);
			});
		})


		this.one.on('pointerdown', () => {
			if (this.single === false){
				this.single = true;
				if (this.multiple === true){
					this.multiple = false;
					this.three.setColor('#ffffff');
					this.three.setStyle({ backgroundColor: '#000000' });
				}
				if (this.two === true){
					this.two = false;
					this.twoButton.setColor('#ffffff');
					this.twoButton.setStyle({ backgroundColor: '#000000' });
				}
				this.one.setColor('#000000');
				this.one.setStyle({ backgroundColor: '#ffffff' });

				this.wallButton.setInteractive(true)
				this.randomButton.setInteractive(true)
				this.settingOneButton.setInteractive(true)
				this.wallText.setVisible(true);
				this.wallButton.setVisible(true);
				this.randomButton.setVisible(true);
				this.settingOneButton.setVisible(true);
				this.settingThreeButton.setInteractive(false)
				this.slow.setInteractive(false);
				this.medium.setInteractive(false);
				this.fast.setInteractive(false);
				this.rate.setVisible(false);
				this.slow.setVisible(false);
				this.medium.setVisible(false);
				this.fast.setVisible(false);
				this.settingThreeButton.setVisible(false);
			}
		});
	

		this.twoButton.on('pointerdown', () => {
			if (this.two === false){
				this.two = true;
				if (this.multiple === true){
					this.multiple = false;
					this.three.setColor('#ffffff');
					this.three.setStyle({ backgroundColor: '#000000' });
				}
				if (this.single === true){
					this.single = false;
					this.one.setColor('#ffffff');
					this.one.setStyle({ backgroundColor: '#000000' });
				}
				this.twoButton.setColor('#000000');
				this.twoButton.setStyle({ backgroundColor: '#ffffff' });

				this.wallButton.setInteractive(true)
				this.randomButton.setInteractive(true)
				this.settingOneButton.setInteractive(true)
				this.wallText.setVisible(true);
				this.wallButton.setVisible(true);
				this.randomButton.setVisible(true);
				this.settingOneButton.setVisible(true);
				this.settingThreeButton.setInteractive(false)
				this.slow.setInteractive(false);
				this.medium.setInteractive(false);
				this.fast.setInteractive(false);
				this.rate.setVisible(false);
				this.slow.setVisible(false);
				this.medium.setVisible(false);
				this.fast.setVisible(false);
				this.settingThreeButton.setVisible(false);
			}
		});


		this.three.on('pointerdown', () => {
			if (this.multiple === false){
				this.multiple = true;
				if (this.single === true){
					this.single = false;
					this.one.setColor('#ffffff');
					this.one.setStyle({ backgroundColor: '#000000' });
				}
				if (this.two === true){
					this.two = false;
					this.twoButton.setColor('#ffffff');
					this.twoButton.setStyle({ backgroundColor: '#000000' });
				}
				this.three.setColor('#000000');
				this.three.setStyle({ backgroundColor: '#ffffff' });

				this.wallButton.setInteractive(false)
				this.randomButton.setInteractive(false)
				this.settingOneButton.setInteractive(false)
				this.wallText.setVisible(false);
				this.wallButton.setVisible(false);
				this.randomButton.setVisible(false);
				this.settingOneButton.setVisible(false);
				this.settingThreeButton.setInteractive(true);
				this.slow.setInteractive(true);
				this.medium.setInteractive(true);
				this.fast.setInteractive(true);
				this.rate.setVisible(true);
				this.slow.setVisible(true);
				this.medium.setVisible(true);
				this.fast.setVisible(true);
				this.settingThreeButton.setVisible(true);
			}
		});


		this.powerButton.on('pointerdown', () => {
			this.powerUp = !this.powerUp;
			if (this.powerUp === true){
				this.powerButton.setColor('#000000');
				this.powerButton.setStyle({ backgroundColor: '#ffffff' });
			}
			if (this.powerUp === false){
				this.powerButton.setColor('#ffffff');
				this.powerButton.setStyle({ backgroundColor: '#000000' });
			}
		});
	}

	onevsone() {
		this.wallButton.on('pointerdown', () => {
			this.wall = !this.wall;
			if (this.wall === true){
				if (this.random === true){
					this.random = false;
					this.randomButton.setColor('#ffffff');
					this.randomButton.setStyle({ backgroundColor: '#000000' });
				}
				this.wallButton.setColor('#000000');
				this.wallButton.setStyle({ backgroundColor: '#ffffff' });
			}
			if (this.wall === false){
				this.wallButton.setColor('#ffffff');
				this.wallButton.setStyle({ backgroundColor: '#000000' });
			}
		});
		
		
		this.randomButton.on('pointerdown', () => {
			this.random = !this.random;
			if (this.random === true){
				if (this.wall === true){
					this.wall = false;
					this.wallButton.setColor('#ffffff');
					this.wallButton.setStyle({ backgroundColor: '#000000' });
				}
				this.randomButton.setColor('#000000');
				this.randomButton.setStyle({ backgroundColor: '#ffffff' });
			}
			if (this.random === false){
				this.randomButton.setColor('#ffffff');
				this.randomButton.setStyle({ backgroundColor: '#000000' });
			}
		});
		
		
		this.settingOneButton.on('pointerover', () => {
			this.settingOneButton.setColor('#000000');
			this.settingOneButton.setStyle({ backgroundColor: '#ffffff' });
		});
		this.settingOneButton.on('pointerout', () => {
			this.settingOneButton.setColor('#ffffff');
			this.settingOneButton.setStyle({ backgroundColor: '#000000' });
		});
		this.settingOneButton.on('pointerdown', () => {
			const waiting = this.add.text(this.physics.world.bounds.width / 2, this.physics.world.bounds.height / 2, "waiting for player", {
				fontFamily: 'pong',
				fontSize: '50px',
				color: '#ffffff',
				backgroundColor: '#000000',
				padding: {
					x: 10,
					y: 6
				}
			})
			waiting.setOrigin(0.5);
			
			this.title.setVisible(false);
			this.join.setVisible(false);
			this.start.setVisible(false);
			this.powerButton.setVisible(false);
			this.settingOneButton.setVisible(false);
			this.settingThreeButton.setVisible(false);
			this.wallButton.setVisible(false);
			this.randomButton.setVisible(false);
			this.mode.setVisible(false);
			this.wallText.setVisible(false);
			this.rate.setVisible(false);
			this.fast.setVisible(false);
			this.medium.setVisible(false);
			this.slow.setVisible(false);
			this.join.setInteractive(false);
			this.start.setInteractive(false);
			this.powerButton.setInteractive(false);
			this.settingOneButton.setInteractive(false);
			this.settingThreeButton.setInteractive(false);
			this.wallButton.setInteractive(false);
			this.randomButton.setInteractive(false);
			this.fast.setInteractive(false);
			this.medium.setInteractive(false);
			this.slow.setInteractive(false);
			
			if (Phaser.Math.RND.between(1, 69) === 69)
				this.faces = true;
			
			this.powerUp = Phaser.Math.RND.frac() ? true : false;
			
			switch(Phaser.Math.RND.between(1, 3)){
				case 1:
					this.wall = true;
					this.random = false;
					break;
				case 2:
					this.random = true;
					this.wall = false;
					break;
			}
					
			if (this.single === true)
				this.socket.emit("1v1", {wall: this.wall, random: this.random, power: this.powerUp, faces: this.faces, start: true, name: this.name});
			else 
				this.socket.emit("2v2", {wall: this.wall, random: this.random, power: this.powerUp, faces: this.faces, start: true, name: this.name});
					
			this.socket.on("start", (data: any) =>{
				waiting.setVisible(false);
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
				
				if (this.two === true)
				this.position.setText("You are positionned top left")
				
				this.event1 = this.time.delayedCall(1000, () => {
					this.starting.setText('game starting in 2');
				}, [], this);
				this.event2 = this.time.delayedCall(2000, () => {
					this.starting.setText('game starting in 1');
				}, [], this);
				this.event3 = this.time.delayedCall(3050, () => {
					if (this.single === true)
						this.oneHost = true
					else
						this.twoHost = true
				}, [], this);
			});
		});
	}
			
	onevsthree() {
		this.fast.on('pointerdown', () => {
			if (this.rateSpeed !== 0.0009){
				if (this.rateSpeed === 0.0006){
					this.medium.setColor('#ffffff');
					this.medium.setStyle({ backgroundColor: '#000000' });
				}
				if (this.rateSpeed === 0.0003){
					this.slow.setColor('#ffffff');
					this.slow.setStyle({ backgroundColor: '#000000' });
				}
				this.rateSpeed = 0.0009;
				this.fast.setColor('#000000');
				this.fast.setStyle({ backgroundColor: '#ffffff' });
			}
		});
		
		
		this.medium.on('pointerdown', () => {
			if (this.rateSpeed !== 0.0006){
				if (this.rateSpeed === 0.0009){
					this.fast.setColor('#ffffff');
					this.fast.setStyle({ backgroundColor: '#000000' });
				}
				if (this.rateSpeed === 0.0003){
					this.slow.setColor('#ffffff');
					this.slow.setStyle({ backgroundColor: '#000000' });
				}
				this.rateSpeed = 0.0006;
				this.medium.setColor('#000000');
				this.medium.setStyle({ backgroundColor: '#ffffff' });
			}
		});
		

		this.slow.on('pointerdown', () => {
			if (this.rateSpeed !== 0.0003){
				if (this.rateSpeed === 0.0006){
					this.medium.setColor('#ffffff');
					this.medium.setStyle({ backgroundColor: '#000000' });
				}
				if (this.rateSpeed === 0.0009){
					this.fast.setColor('#ffffff');
					this.fast.setStyle({ backgroundColor: '#000000' });
				}
				this.rateSpeed = 0.0003;
				this.slow.setColor('#000000');
				this.slow.setStyle({ backgroundColor: '#ffffff' });
			}
		});
		
		
		this.settingThreeButton.on('pointerover', () => {
			this.settingThreeButton.setColor('#000000');
			this.settingThreeButton.setStyle({ backgroundColor: '#ffffff' });
		});
		this.settingThreeButton.on('pointerout', () => {
			this.settingThreeButton.setColor('#ffffff');
			this.settingThreeButton.setStyle({ backgroundColor: '#000000' });
		});
		this.settingThreeButton.on('pointerdown', () => {
			const waiting = this.add.text(this.physics.world.bounds.width / 2, this.physics.world.bounds.height / 2, "waiting for player", {
				fontFamily: 'pong',
				fontSize: '50px',
				color: '#ffffff',
				backgroundColor: '#000000',
				padding: {
					x: 10,
					y: 6
				}
			})
			waiting.setOrigin(0.5);
			this.title.setVisible(false);
			this.start.setVisible(false);
			this.join.setVisible(false);
			this.powerButton.setVisible(false);
			this.settingOneButton.setVisible(false);
			this.settingThreeButton.setVisible(false);
			this.wallButton.setVisible(false);
			this.randomButton.setVisible(false);
			this.mode.setVisible(false);
			this.wallText.setVisible(false);
			this.rate.setVisible(false);
			this.fast.setVisible(false);
			this.medium.setVisible(false);
			this.slow.setVisible(false);
			this.start.setInteractive(false);
			this.powerButton.setInteractive(false);
			this.settingOneButton.setInteractive(false);
			this.settingThreeButton.setInteractive(false);
			this.wallButton.setInteractive(false);
			this.randomButton.setInteractive(false);
			this.fast.setInteractive(false);
			this.medium.setInteractive(false);
			this.slow.setInteractive(false);
			this.join.setInteractive(false);
			
			
			
			this.powerUp = Phaser.Math.RND.frac() ? true : false;
			
			switch(Phaser.Math.RND.between(1, 3)){
				case 1:
					this.rateSpeed = 0.0003;
					break;
				case 2:
					this.rateSpeed = 0.0006;
					break;
				case 3:
					this.rateSpeed = 0.0009;
					break;
			}
			this.socket.emit("3v1", {scale: this.rateSpeed, power: this.powerUp, name: this.name, start: true});
			this.socket.on("start", (data: any) => {
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
				
				this.position = this.add.text(this.physics.world.bounds.width / 2, this.physics.world.bounds.height / 2 + this.physics.world.bounds.height / 8, 'You are positionned bottom', {
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
				
				this.event1 = this.time.delayedCall(1000, () => {
					this.starting.setText('game starting in 2');
				}, [], this);
				this.event2 = this.time.delayedCall(2000, () => {
					this.starting.setText('game starting in 1');
				}, [], this);
				this.event3 = this.time.delayedCall(3050, () => {
					this.threeHost = true;
				}, [], this);
			});
		})
	}
				
	create() {
		this.load.on('complete', this.all, this);
			
		this.shutdown()

		this.socket.on("player", (player: number) => {this.player = player;})

		this.socket.on("disconnected", () => {
			this.menu.setVisible(true);
			this.disconnect.setVisible(true);
			this.event1.remove(false)
			this.event2.remove(false)
			this.event3.remove(false)
			this.starting.destroy()
			this.position.destroy()
		})
	}

	update() {
		if ((this.oneHost === true || this.oneOther === true || this.twoHost === true || this.twoOther === true || this.threeHost === true || this.threeOther === true) && this.first === true){
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
	
			this.team1VictoryText = this.add.text(
				this.physics.world.bounds.width / 2,
				this.physics.world.bounds.height / 2,
				'team 1 wins!',
				{
					fontFamily: 'pong',
					fontSize: '50px',
				}
			);
			this.team1VictoryText.setOrigin(0.5);
			this.team1VictoryText.setVisible(false);
	
			this.team1Score = this.add.text(
				this.physics.world.bounds.width / 2,
				this.physics.world.bounds.height / 2,
				'team 1 scored!',
				{
					fontFamily: 'pong',
					fontSize: '50px',
				}
			);
			this.team1Score.setOrigin(0.5);
			this.team1Score.setVisible(false);
		
			this.team2VictoryText = this.add.text(
				this.physics.world.bounds.width / 2,
				this.physics.world.bounds.height / 2,
				'team 2 wins!',
				{
					fontFamily: 'pong',
					fontSize: '50px',
				}
			);
			this.team2VictoryText.setOrigin(0.5);
			this.team2VictoryText.setVisible(false);
	
			this.team2Score = this.add.text(
				this.physics.world.bounds.width / 2,
				this.physics.world.bounds.height / 2,
				'team 2 scored!',
				{
					fontFamily: 'pong',
					fontSize: '50px',
				}
			);
			this.team2Score.setOrigin(0.5);
			this.team2Score.setVisible(false);
	
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

		if (this.oneHost === true)
			this.oneHostGame()
		if (this.oneOther === true)
			this.oneOtherGame()

		if (this.twoHost === true)
			this.twoHostGame()
		if (this.twoOther === true)
			this.twoOtherGame()

		if (this.threeHost === true)
			this.threeHostGame()
		if (this.threeOther === true)
			this.threeOtherGame()
	}

	oneHostGame(){
		if (this.first){
				
				if (this.random === true){
					this.generateRandom();
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

				this.socket.on("movement", (newPos: number) => {
					if (this.paddle2.body)
						this.paddle2.setY(newPos + this.paddle2.body.height / 2);
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
				this.first = false
		}

		if (this.end2 !== true){
			if (this.ball.body)
				if (this.ball.body?.x + this.ball.body.width === this.physics.world.bounds.width) {
					this.ball.body.x = this.physics.world.bounds.width - 1 - this.ball.body.width;
					this.socket.emit("point", 1);
					this.smash.setVisible(false);
					this.bigBall.setVisible(false);
					this.bigPaddle.setVisible(false);
					this.inverse.setVisible(false);
					this.multiBall.setVisible(false);
					if (this.multi === true)
						this.multiball.disableBody();
					this.points2++;
					this.score.setText(`${this.points2}          ${this.points1}`);
					if (this.points2 === this.win)
						this.end(2);
					else
						this.new_point(1);
				}

			if (this.multi)
				if (this.multiball.body)
					if (this.multiball.body?.x + this.multiball.body.width === this.physics.world.bounds.width) {
						this.multiball.body.x = this.physics.world.bounds.width - 1 - this.multiball.body.width;;
						this.socket.emit("point", 1);
						this.smash.setVisible(false);
						this.bigBall.setVisible(false);
						this.bigPaddle.setVisible(false);
						this.inverse.setVisible(false);
						this.multiBall.setVisible(false);
						this.points2++;
						this.multiball.disableBody();
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
					this.smash.setVisible(false);
					this.bigBall.setVisible(false);
					this.bigPaddle.setVisible(false);
					this.inverse.setVisible(false);
					this.multiBall.setVisible(false);
					if (this.multi === true)
					this.multiball.disableBody();
					this.points1++;
					this.score.setText(`${this.points2}          ${this.points1}`);
					if (this.points1 === this.win)
					this.end(1);
					else
					this.new_point(2);
				}

			if (this.multi)
				if (this.multiball.body)
					if (this.multiball.body?.x === 0) {
						this.multiball.body.x = 1;
						this.socket.emit("point", 0);
						this.smash.setVisible(false);
						this.bigBall.setVisible(false);
						this.bigPaddle.setVisible(false);
						this.inverse.setVisible(false);
						this.multiBall.setVisible(false);
						this.multiball.disableBody();
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
				this.paddle1.setVelocityY(-this.paddlespeed * this.modifier1);
			if (this.keys.s.isDown)
				this.paddle1.setVelocityY(this.paddlespeed * this.modifier1);
				
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

			if (this.multi === true){
				this.socket.emit("multi", {x: this.multiball.body?.x, y: this.multiball.body?.y})
			}
		}
	}

	oneOtherGame(){
		if (this.first){
			
		   	if (this.wall === true){
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
			this.socket.on("movement", (newPos: number) => {
				if (this.paddle1.body)
					this.paddle1.setY(newPos + this.paddle1.body.height / 2);
			})
	
			this.socket.on("update", (data: any) => {
				console.log("also here");
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
				if (this.first2 === true){
					this.power = this.physics.add.sprite(data.x, data.y, "power");
					this.power.setScale(0.1, 0.1);
					this.first2 = false;
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
					this.ball.destroy(true);
					this.paddle1.destroy(true);
					this.paddle2.destroy(true);
					if (this.wall || this.random){
						this.wall1.destroy(true)
						this.wall2.destroy(true)
						this.wall3.destroy(true)
					}
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
					if (this.wall || this.random){
						this.wall1.destroy(true)
						this.wall2.destroy(true)
						this.wall3.destroy(true)
					}
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
				this.rotation = 0;
				if (this.end2 !== true){
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
	
			this.keys.w  = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W);
			this.keys.s  = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S);
			this.first = false;
		}

		if (this.end2 !== true){
			
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
	}

	twoHostGame(){
		if (this.first){
			
			if (this.random === true){
				this.generateRandom();
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

			this.paddle1 = this.physics.add.sprite(
				(this.ball.width * 0.2) / 2 + 1,
				this.physics.world.bounds.height / 4,
				"paddle"
			)
			this.paddle2 = this.physics.add.sprite(
				this.physics.world.bounds.width - (this.ball.width * 0.2) / 2 - 1,
				this.physics.world.bounds.height / 4,
				"paddle"
			)
			this.paddle3 = this.physics.add.sprite(
				(this.ball.width * 0.2) / 2 + 1,
				this.physics.world.bounds.height / 2 + this.physics.world.bounds.height / 4,
				"paddle"
			)
			this.paddle4 = this.physics.add.sprite(
				this.physics.world.bounds.width - (this.ball.width * 0.2) / 2 - 1,
				this.physics.world.bounds.height / 2 + this.physics.world.bounds.height / 4,
				"paddle"
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
			this.paddle3.setScale(0.15, 0.25);
			this.paddle3.setCollideWorldBounds(true)
			this.physics.add.collider(this.ball, this.paddle3);
	
			this.paddle4.setImmovable(true);
			this.paddle4.setOrigin(0.5);
			this.paddle4.setScale(0.15, 0.25);
			this.paddle4.setCollideWorldBounds(true)
			this.physics.add.collider(this.ball, this.paddle4);

			this.socket.on("movement", (newPos: number) => {
				if (this.paddle2.body)
					this.paddle2.setY(newPos + this.paddle2.body.height / 2);
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
			this.first = false
		}

		if (this.end2 !== true){
			if (this.ball.body)
           		if (this.ball.body?.x + this.ball.body.width === this.physics.world.bounds.width) {
                this.ball.body.x = this.physics.world.bounds.width - 1 - this.ball.body.width;
                this.socket.emit("point", 1);
                this.smash.setVisible(false);
                this.bigBall.setVisible(false);
                this.bigPaddle.setVisible(false);
                this.inverse.setVisible(false);
                this.multiBall.setVisible(false);
                if (this.multi === true)
                    this.multiball.disableBody();
                this.points2++;
                this.score.setText(`${this.points2}          ${this.points1}`);
                if (this.points2 === this.win)
                    this.end(2);
                else
                    this.new_point(1);
            	}

        	if (this.multi)
        	    if (this.multiball.body)
        	        if (this.multiball.body?.x + this.multiball.body.width === this.physics.world.bounds.width) {
        	            this.multiball.body.x = this.physics.world.bounds.width - 1 - this.multiball.body.width;;
        	            this.socket.emit("point", 1);
        	            this.smash.setVisible(false);
        	            this.bigBall.setVisible(false);
        	            this.bigPaddle.setVisible(false);
        	            this.inverse.setVisible(false);
        	            this.multiBall.setVisible(false);
        	            this.points2++;
        	            this.multiball.disableBody();
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
        	        this.smash.setVisible(false);
        	        this.bigBall.setVisible(false);
        	        this.bigPaddle.setVisible(false);
        	        this.inverse.setVisible(false);
        	        this.multiBall.setVisible(false);
        	        if (this.multi === true)
        	        this.multiball.disableBody();
        	        this.points1++;
        	        this.score.setText(`${this.points2}          ${this.points1}`);
        	        if (this.points1 === this.win)
        	        this.end(1);
        	        else
        	        this.new_point(2);
        	    }
			
        	if (this.multi)
        	    if (this.multiball.body)
        	        if (this.multiball.body?.x === 0) {
        	            this.multiball.body.x = 1;
        	            this.socket.emit("point", 0);
        	                this.smash.setVisible(false);
        	                this.bigBall.setVisible(false);
        	                this.bigPaddle.setVisible(false);
        	                this.inverse.setVisible(false);
        	                this.multiBall.setVisible(false);
        	                this.multiball.disableBody();
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
        	    this.paddle1.setVelocityY(-this.paddlespeed * this.modifier1);
        	if (this.keys.s.isDown)
        	    if (this.paddle1.body){
        	        if (this.paddle1.body.y + this.paddle1.body.height + this.paddle1.body.height * 0.1 < this.physics.world.bounds.height / 2)
        	            this.paddle1.setVelocityY(this.paddlespeed * this.modifier1);}
				
        	if (this.paddle1.body){
        	    if (this.paddle1.body.y !== this.oldPosition)
        	        this.socket.emit("movement2", {newPos: this.paddle1.body.y, which: 1})
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

        	if (this.multi === true){
        	    this.socket.emit("multi", {x: this.multiball.body?.x, y: this.multiball.body?.y})
        	}
		}
	}

	twoOtherGame(){
		if (this.first){
		   	if (this.wall === true){
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

			this.ball = this.physics.add.sprite(
		    	this.physics.world.bounds.width / 2,
		    	this.physics.world.bounds.height / 2,
		    	"ball"
       		)
        	this.ball.setScale(0.2);

			this.paddle1 = this.physics.add.sprite(
				(this.ball.width * 0.2) / 2 + 1,
				this.physics.world.bounds.height / 4,
				"paddle"
			)

			this.paddle2 = this.physics.add.sprite(
				this.physics.world.bounds.width - (this.ball.width * 0.2) / 2 - 1,
				this.physics.world.bounds.height / 4,
				"paddle"
			)

			this.paddle3 = this.physics.add.sprite(
				(this.ball.width * 0.2) / 2 + 1,
				this.physics.world.bounds.height / 2 + this.physics.world.bounds.height / 4,
				"paddle"
			)

			this.paddle4 = this.physics.add.sprite(
				this.physics.world.bounds.width - (this.ball.width * 0.2) / 2 - 1,
				this.physics.world.bounds.height / 2 + this.physics.world.bounds.height / 4,
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
				
			this.paddle3.setImmovable(true);
			this.paddle3.setOrigin(0.5);
			this.paddle3.setScale(0.15, 0.25);
			this.paddle3.setCollideWorldBounds(true)

			this.paddle4.setImmovable(true);
			this.paddle4.setOrigin(0.5);
			this.paddle4.setScale(0.15, 0.25);
			this.paddle4.setCollideWorldBounds(true)

			this.socket.on("movement2", (data: any) => {
				if (data.which === 1)
					if (this.paddle1.body)
						this.paddle1.setY(data.newPos + this.paddle1.body.height / 2);
				if (data.which === 2)
					if (this.paddle2.body)
						this.paddle2.setY(data.newPos + this.paddle2.body.height / 2);
				if (data.which === 3)
					if (this.paddle3.body)
						this.paddle3.setY(data.newPos + this.paddle3.body.height / 2);
				if (data.which === 4)
					if (this.paddle4.body)
						this.paddle4.setY(data.newPos + this.paddle4.body.height / 2);
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
				if (this.first2 === true){
					this.power = this.physics.add.sprite(data.x, data.y, "power");
					this.power.setScale(0.1, 0.1);
					this.first2 = false;
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
				this.paddle3.disableBody();
				this.paddle4.disableBody();
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
					this.paddle3.destroy(true);
					this.paddle4.destroy(true);
					if (this.wall || this.random){
						this.wall1.destroy(true)
						this.wall2.destroy(true)
						this.wall3.destroy(true)
					}
					this.socket.off("movement2");
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
					this.paddle3.destroy(true);
					this.paddle4.destroy(true);
					if (this.wall || this.random){
						this.wall1.destroy(true)
						this.wall2.destroy(true)
						this.wall3.destroy(true)
					}
					this.socket.off("movement2");
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
				this.rotation = 0;
				if (this.end2 !== true){
					this.time.delayedCall(1500, () => {
						if (this.multi === true)
								this.multiball.destroy();
						this.rotation = 1;
						this.player1Score.setVisible(false);
						this.player2Score.setVisible(false);
						this.paddle2.enableBody();
						this.ball.setX(this.physics.world.bounds.width / 2);
						this.ball.setY(this.physics.world.bounds.height / 2);
						this.paddle2.setY(this.physics.world.bounds.height / 4);
                    	this.paddle3.setY(this.physics.world.bounds.height / 2 + this.physics.world.bounds.height / 4);
                    	this.paddle4.setY(this.physics.world.bounds.height / 2 + this.physics.world.bounds.height / 4);
						if (this.multi === true)
							this.multiball.destroy(true);
						this.multi = false;
						this.paddlespeed = 400;
						this.modifier = 1;
						this.paddle1.setScale(0.15, 0.25);
						this.paddle2.setScale(0.15, 0.25);
						this.paddle3.setScale(0.15, 0.25);
						this.paddle4.setScale(0.15, 0.25);
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
	
			this.keys.w  = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W);
			this.keys.s  = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S);
			this.first = false;
		}

		if (this.end2 !== true){
			
        	if (this.player === 2){
				this.paddle2.setVelocityY(0);
 
				if (this.keys.w.isDown)
					this.paddle2.setVelocityY(-this.paddlespeed * this.modifier1);
				if (this.keys.s.isDown)
				 if(this.paddle2.body)
					 if (this.paddle2.body.y + this.paddle2.body.height + this.paddle2.body.height * 0.1 < this.physics.world.bounds.height / 2)
						 this.paddle2.setVelocityY(this.paddlespeed * this.modifier1);
	 
				if (this.paddle2.body){
					if (this.paddle2.body.y !== this.oldPosition)
						this.socket.emit("movement2", {newPos: this.paddle2.body.y, which: 2})
					this.oldPosition = this.paddle2.body.y
				}
		 	}
		 
		 	if (this.player === 3){
					this.paddle3.setVelocityY(0);
			
				 if (this.keys.w.isDown)
					 if(this.paddle3.body)
						 if (this.paddle3.body.y - this.paddle3.body.height * 0.1 > this.physics.world.bounds.height / 2)
							 this.paddle3.setVelocityY(-this.paddlespeed * this.modifier2);
				 if (this.keys.s.isDown)
				 this.paddle3.setVelocityY(this.paddlespeed * this.modifier2);

				 if (this.paddle3.body){
					 if (this.paddle3.body.y !== this.oldPosition)
					 this.socket.emit("movement2", {newPos: this.paddle3.body.y, which: 3})
					 this.oldPosition = this.paddle3.body.y
				 }
		 	}

		 	if (this.player === 4){
				 this.paddle2.setVelocityY(0);

					if (this.keys.w.isDown)
					 if(this.paddle4.body)
						 if (this.paddle4.body.y - this.paddle4.body.height * 0.1 > this.physics.world.bounds.height / 2)
								this.paddle4.setVelocityY(-this.paddlespeed * this.modifier2);
					if (this.keys.s.isDown)
						this.paddle4.setVelocityY(this.paddlespeed * this.modifier2);
			
					if (this.paddle4.body){
						if (this.paddle4.body.y !== this.oldPosition)
							this.socket.emit("movement2", {newPos: this.paddle4.body.y, which: 4})
						this.oldPosition = this.paddle4.body.y
					}
		 	}
		
        	if (this.paddlespeed < 625)
        	    this.paddlespeed += 0.5;
		}
	}

	threeHostGame(){
		if (this.first){
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

			this.paddle1 = this.physics.add.sprite(
				this.physics.world.bounds.width / 2,
				this.physics.world.bounds.height - (this.ball.width * 0.2) / 2 - 1 ,
				"sidePaddle"
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
				(this.ball.width * 0.2) / 2 + 1,
				this.physics.world.bounds.height / 2,
				"paddle"
			)
					
			this.paddle1.setImmovable(true);
			this.paddle1.setOrigin(0.5);
			this.paddle1.setScale(this.paddleScale, 0.15);
			this.paddle1.setCollideWorldBounds(true);
			this.physics.add.collider(this.paddle1, this.ball);
			
			this.paddle2.setImmovable(true);
			this.paddle2.setOrigin(0.5);
			this.paddle2.setScale(0.15, 0.25);
			this.physics.add.collider(this.ball, this.paddle2);
	
			this.paddle3.setImmovable(true);
			this.paddle3.setOrigin(0.5);
			this.paddle3.setScale(0.35, 0.15);
			this.physics.add.collider(this.paddle3, this.ball);
	
			this.paddle4.setImmovable(true);
			this.paddle4.setOrigin(0.5);
			this.paddle4.setScale(0.15, 0.25);
			this.physics.add.collider(this.ball, this.paddle4);

			this.socket.on("movement2", (data: any) => {
				if (data.which === 2)
					if (this.paddle2.body)
						this.paddle2.setY(data.newPos + this.paddle2.body.height / 2);
				if (data.which === 3)
					if (this.paddle3.body)
						this.paddle3.setX(data.newPos + this.paddle3.body.width / 2);
				if (data.which === 4)
					if (this.paddle4.body)
						this.paddle4.setY(data.newPos + this.paddle4.body.height / 2);
			})

		
			this.keys.a  = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.A);  
        	this.keys.d  = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.D);   
		
			if (this.powerup){
				this.power = new PowerUp(this, Phaser.Math.RND.between(this.ball.width * 0.2 + 10, this.physics.world.bounds.width - this.ball.width * 0.2 - 10), Phaser.Math.RND.between(this.physics.world.bounds.height * 0.1, this.physics.world.bounds.height - this.physics.world.bounds.height * 0.1));
				this.physics.add.overlap(this.ball, this.power, this.power_up, undefined, this);
				this.socket.emit("newPower", {x: this.power.x, y: this.power.y});
			}
			this.first = false
		}

		if (this.end2 !== true){
		/* if (this.ball.body)
        	   if (this.ball.body?.x + this.ball.body.width === this.physics.world.bounds.width || this.ball.body.x === 0 ||
				this.ball.body.y === 0) {
        	        this.socket.emit("point", 1);
					if (this.ball.body?.x + this.ball.body.width === this.physics.world.bounds.width)
        	        	this.ball.body.x = this.physics.world.bounds.width - 1 - this.ball.body.width;
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
        	        this.reduce = false;
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
        	            this.socket.emit("point", 1);
						if (this.multiball.body?.x + this.multiball.body.width === this.physics.world.bounds.width)
        	            	this.multiball.body.x = this.physics.world.bounds.width - 1 - this.multiball.body.width;
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
        	            this.reduce = false;
        	            this.score.setText(`${this.points2}          ${this.points1}`);
        	            if (this.points2 === this.win)
        	                this.end(2);
        	            else
        	                this.new_point(1);
        	        }

        	if (this.ball.body)
        	    if (this.ball.body?.y + this.ball.body.height === this.physics.world.bounds.height) {
        	        this.ball.body.y = this.physics.world.bounds.height - 1 - this.ball.body.y;
        	        this.socket.emit("point", 0);
        	        this.smash.setVisible(false);
        	        this.bigBall.setVisible(false);
        	        this.bigPaddle.setVisible(false);
        	        this.inverse.setVisible(false);
        	        this.multiBall.setVisible(false);
        	        this.points1++;
        	        this.reduce = false;
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
        	        	this.multiball.body.y = this.physics.world.bounds.height - 1 - this.multiball.body.y;
        	            this.socket.emit("point", 0);
        	            this.smash.setVisible(false);
        	            this.bigBall.setVisible(false);
        	            this.bigPaddle.setVisible(false);
        	            this.inverse.setVisible(false);
        	            this.multiBall.setVisible(false);
        	            this.points1++;
        	            this.reduce = false;
        	            this.multiball.disableBody();
        	            this.score.setText(`${this.points2}          ${this.points1}`);
        	            if (this.points1 === this.win)
        	                this.end(1);
        	            else
        	                this.new_point(2);
        	        }  */
        

       
			this.paddle1.setVelocityX(0);

			if (this.keys.d.isDown)
				this.paddle1.setVelocityX(this.paddlespeed * this.modifier2);
			if (this.keys.a.isDown)
				this.paddle1.setVelocityX(-this.paddlespeed * this.modifier2);
			
		   if (this.paddle1.body){
			   if (this.paddle1.body.x !== this.oldPosition)
				   this.socket.emit("movement2", {newPos: this.paddle1.body.x, which: 1})
			   this.oldPosition = this.paddle1.body.x
		   }
	
			if (this.ball.body){
				if (this.newOldVelocityX !== 0)
					if (this.ball.body.velocity.x !== this.newOldVelocityX){
						this.ball.body.velocity.x = this.oldVelocityX;
						this.oldVelocityX = 0;
						this.newOldVelocityX = 0;
						this.ball.setDrag(1.05)
					}
				if(this.ball.body.velocity.x >= 700)
					this.ball.setDrag(1);
			}
			
	
			if (this.paddlespeed < 700)
				this.paddlespeed += 0.5;

			if (this.reduce === true){
				this.paddleScale -= this.rateSpeed;
				this.paddle1.setScale(this.paddleScale, 0.15)
				if (this.paddleScale <= 0.35){
					this.socket.emit("point", 1)
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
	
			this.socket.emit("update", {x: this.ball.body?.x, y: this.ball.body?.y, scale: this.paddleScale})
			if (this.multi === true){
				this.socket.emit("multi", {x: this.multiball.body?.x, y: this.multiball.body?.y})
		}
	}
	}

	threeOtherGame(){
		if (this.first){
			this.ball = this.physics.add.sprite(
				this.physics.world.bounds.width / 2,
				this.physics.world.bounds.height / 2,
				"ball"
			)
			
			this.ball.setDamping(true);
			this.ball.setScale(0.2);
			this.ball.setCollideWorldBounds(true);
			this.ball.setBounce(1, 1);
			this.ball.setDrag(1.05);

			this.paddle1 = this.physics.add.sprite(
				this.physics.world.bounds.width / 2,
				this.physics.world.bounds.height - (this.ball.width * 0.2) / 2 - 1 ,
				"sidePaddle"
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
				(this.ball.width * 0.2) / 2 + 1,
				this.physics.world.bounds.height / 2,
				"paddle"
			)
			
			this.paddle1.setImmovable(true);
			this.paddle1.setOrigin(0.5);
			this.paddle1.setScale(this.paddleScale, 0.15);
	
			this.paddle2.setImmovable(true);
			this.paddle2.setOrigin(0.5);
			this.paddle2.setScale(0.15, 0.25);
			this.paddle2.setCollideWorldBounds(true);
			
			this.paddle3.setImmovable(true);
			this.paddle3.setOrigin(0.5);
			this.paddle3.setScale(0.35, 0.15);
			this.paddle3.setCollideWorldBounds(true);
			
			this.paddle4.setImmovable(true);
			this.paddle4.setOrigin(0.5);
			this.paddle4.setScale(0.15, 0.25);
			this.paddle4.setCollideWorldBounds(true);

			this.socket.on("movement2", (data: any) => {
				if (data.which === 1)
					if (this.paddle1.body)
						this.paddle1.setX(data.newPos + this.paddle1.body.width / 2);
				if (data.which === 2)
					if (this.paddle2.body)
						this.paddle2.setY(data.newPos + this.paddle2.body.height / 2);
				if (data.which === 3)
					if (this.paddle3.body)
						this.paddle3.setX(data.newPos + this.paddle3.body.width / 2);
				if (data.which === 4)
					if (this.paddle4.body)
						this.paddle4.setY(data.newPos + this.paddle4.body.height / 2);
			})
 
		this.socket.on("update", (data: any) => {
				if (this.ball.body){
					this.ball.setX(data.x + this.ball.body.width / 2)
					this.ball.setY(data.y + this.ball.body.height / 2)
				}
				console.log(data.scale);
				this.paddle1.setScale(data.scale, 0.15);
			})
 
		 this.socket.on("newPower", (data: any) => {
			 if (this.first2 === true){
				 this.power = this.physics.add.sprite(data.x, data.y, "power");
				 this.power.setScale(0.1, 0.1);
				 this.first2 = false;
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
			 this.paddle3.disableBody();
			 this.paddle4.disableBody();
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
				 this.paddle3.destroy(true);
				 this.paddle4.destroy(true);
				 if (this.wall || this.random){
					 this.wall1.destroy(true)
					 this.wall2.destroy(true)
					 this.wall3.destroy(true)
				 }
				 this.socket.off("movement2");
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
				 this.paddle3.destroy(true);
				 this.paddle4.destroy(true);
				 if (this.wall || this.random){
					 this.wall1.destroy(true)
					 this.wall2.destroy(true)
					 this.wall3.destroy(true)
				 }
				 this.socket.off("movement2");
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
			 this.rotation = 0;
			 if (this.end2 !== true){
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
                    this.paddle3.setX(this.physics.world.bounds.width / 2);
                    this.paddle4.setY(this.physics.world.bounds.height / 2);
					 if (this.multi === true)
						 this.multiball.destroy(true);
					 this.multi = false;
					 this.paddlespeed = 400;
					 this.modifier = 1;
					 this.paddle2.setScale(0.15, 0.25);
                    	this.paddle3.setScale(0.35, 0.15);
                    	this.paddle4.setScale(0.15, 0.25);
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
 
		 this.keys.w  = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keys.s  = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S);        
        this.keys.a  = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keys.d  = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.D);  
		 this.first = false;
	 }

	 if (this.end2 !== true){
		if (this.player === 2){
			this.paddle2.setVelocityY(0);

		if (this.keys.w.isDown)
		 if (this.paddle2.body && this.paddle3.body)
			 if (this.paddle2.body.y - this.paddle2.body.height * 0.1 > this.paddle3.body.y + this.paddle3.body.height)
				 this.paddle2.setVelocityY(-this.paddlespeed * this.modifier1);
	 if (this.keys.s.isDown)
		 if (this.paddle2.body && this.paddle1.body)
			 if (this.paddle2.body.y + this.paddle2.body.height + this.paddle2.body.height * 0.1 < this.paddle1.body.y)
				 this.paddle2.setVelocityY(this.paddlespeed * this.modifier1);
 
			if (this.paddle2.body){
				if (this.paddle2.body.y !== this.oldPosition)
					this.socket.emit("movement2", {newPos: this.paddle2.body.y, which: 2})
				this.oldPosition = this.paddle2.body.y
			}
	 }

	 if (this.player === 3){
			this.paddle3.setVelocityX(0);

		 if (this.keys.a.isDown)
			this.paddle3.setVelocityX(-this.paddlespeed * this.modifier1)
			if (this.keys.d.isDown)
			this.paddle3.setVelocityX(this.paddlespeed * this.modifier1)
		 
		 if (this.paddle3.body){
			 if (this.paddle3.body.x !== this.oldPosition)
			 this.socket.emit("movement2", {newPos: this.paddle3.body.x, which: 3})
			 this.oldPosition = this.paddle3.body.x
		 }
	 }
	 
	 if (this.player === 4){
		 this.paddle4.setVelocityY(0);
		 
		 if (this.keys.w.isDown)
			 if (this.paddle4.body && this.paddle3.body)
				 if (this.paddle4.body.y - this.paddle4.body.height * 0.1 > this.paddle3.body.y + this.paddle3.body.height)
					 this.paddle4.setVelocityY(-this.paddlespeed * this.modifier1);
		 if (this.keys.s.isDown)
			 if (this.paddle4.body && this.paddle1.body)
				 if (this.paddle4.body.y + this.paddle4.body.height + this.paddle4.body.height * 0.1 < this.paddle1.body.y)
					 this.paddle4.setVelocityY(this.paddlespeed * this.modifier1);

			if (this.paddle4.body){
				if (this.paddle4.body.y !== this.oldPosition)
					this.socket.emit("movement2", {newPos: this.paddle4.body.y, which: 4})
				this.oldPosition = this.paddle4.body.y
			}
	 }
	 
	 if (this.paddlespeed < 625)
		 this.paddlespeed += 0.5;
	 }
	}

	generateRandom(){
        let x: number;
        let y: number;
        let scaleX: number;
        let scaleY: number;


        x = Phaser.Math.RND.between(this.physics.world.bounds.width * 0.2, this.physics.world.bounds.width - this.physics.world.bounds.width * 0.2)
        y = Phaser.Math.RND.between(this.physics.world.bounds.height * 0.2, this.physics.world.bounds.height - this.physics.world.bounds.height * 0.2)
        scaleX = Phaser.Math.RND.realInRange(0.2, 0.4)
        scaleY = Phaser.Math.RND.realInRange(0.2, 0.4)
        this.wall1 = this.physics.add.sprite(x, y, "wall")
        this.wall1.setScale(scaleX, scaleY);
        this.socket.emit("random", {x: x, y: y, scaleX: scaleX, scaleY: scaleY, which: 1, generate: true})
        
        
        x = Phaser.Math.RND.between(this.physics.world.bounds.width * 0.2, this.physics.world.bounds.width - this.physics.world.bounds.width * 0.2)
        y = Phaser.Math.RND.between(this.physics.world.bounds.height * 0.2, this.physics.world.bounds.height - this.physics.world.bounds.height * 0.2)
        scaleX = Phaser.Math.RND.realInRange(0.2, 0.4)
        scaleY = Phaser.Math.RND.realInRange(0.2, 0.4)
        this.wall2 = this.physics.add.sprite(x, y, "wall")
        this.wall2.setScale(scaleX, scaleY);
        this.socket.emit("random", {x: x, y: y, scaleX: scaleX, scaleY: scaleY, which: 2, generate: true})
        
        
        x = Phaser.Math.RND.between(this.physics.world.bounds.width * 0.2, this.physics.world.bounds.width - this.physics.world.bounds.width * 0.2)
        y = Phaser.Math.RND.between(this.physics.world.bounds.height * 0.2, this.physics.world.bounds.height - this.physics.world.bounds.height * 0.2)
        scaleX = Phaser.Math.RND.realInRange(0.2, 0.4)
        scaleY = Phaser.Math.RND.realInRange(0.2, 0.4)
        this.wall3 = this.physics.add.sprite(x, y, "wall")
        this.wall3.setScale(scaleX, scaleY);
        this.socket.emit("random", {x: x, y: y, scaleX: scaleX, scaleY: scaleY, which: 3, generate: true})
    }

    regenerateRandom(){
        let x: number;
        let y: number;
        let scaleX: number;
        let scaleY: number;


        x = Phaser.Math.RND.between(this.physics.world.bounds.width * 0.2, this.physics.world.bounds.width - this.physics.world.bounds.width * 0.2)
        y = Phaser.Math.RND.between(this.physics.world.bounds.height * 0.2, this.physics.world.bounds.height - this.physics.world.bounds.height * 0.2)
        scaleX = Phaser.Math.RND.realInRange(0.2, 0.4)
        scaleY = Phaser.Math.RND.realInRange(0.2, 0.4)
        this.wall1.setPosition(x, y);
        this.wall1.setScale(scaleX, scaleY);
        this.socket.emit("random", {x: x, y: y, scaleX: scaleX, scaleY: scaleY, which: 1, generate: false})
        
        x = Phaser.Math.RND.between(this.physics.world.bounds.width * 0.2, this.physics.world.bounds.width - this.physics.world.bounds.width * 0.2)
        y = Phaser.Math.RND.between(this.physics.world.bounds.height * 0.2, this.physics.world.bounds.height - this.physics.world.bounds.height * 0.2)
        scaleX = Phaser.Math.RND.realInRange(0.2, 0.4)
        scaleY = Phaser.Math.RND.realInRange(0.2, 0.4)
        this.wall2.setPosition(x, y);
        this.wall2.setScale(scaleX, scaleY);
        this.socket.emit("random", {x: x, y: y, scaleX: scaleX, scaleY: scaleY, which: 2, generate: false})
        
        
        x = Phaser.Math.RND.between(this.physics.world.bounds.width * 0.2, this.physics.world.bounds.width - this.physics.world.bounds.width * 0.2)
        y = Phaser.Math.RND.between(this.physics.world.bounds.height * 0.2, this.physics.world.bounds.height - this.physics.world.bounds.height * 0.2)
        scaleX = Phaser.Math.RND.realInRange(0.2, 0.4)
        scaleY = Phaser.Math.RND.realInRange(0.2, 0.4)
        this.wall3.setPosition(x, y);
        this.wall3.setScale(scaleX, scaleY);
        this.socket.emit("random", {x: x, y: y, scaleX: scaleX, scaleY: scaleY, which: 3, generate: false})
    }

	power_up() { 
        this.power.disableBody(true, true);
        if (this.ball.body)
            switch(this.multi ? Phaser.Math.RND.between(1, 4) : Phaser.Math.RND.between(1, 5)){
                case 1:
                    this.socket.emit("power", {which: 1});
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
					if (this.one){
                    	if (this.ball.body.velocity.x > 0){
                        	this.socket.emit("power", {which: 2, player: 1});
                        	this.paddle1.setScale(0.5, 0.90);
                        	this.time.delayedCall(7500, () => {
                            	this.paddle1.setScale(0.15, 0.25);
                        	}, [], this);
                    	} else{
                        	this.socket.emit("power", {which: 2, player: 2});
                        	this.paddle2.setScale(0.5, 0.90);
                        	this.time.delayedCall(7500, () => {
                            	this.paddle2.setScale(0.15, 0.25);
                        	}, [], this);
                    	}
					} else if (this.multiple) {
						if (this.ball.body.velocity.x > 0){
							let which: number = Phaser.Math.RND.between(1, 3);
                    		if (which === 1){
                    		    this.socket.emit("power", {which: 2, player: 1});
                    			this.paddle1.setScale(0.5, 0.90);
                    		}
							else if (which === 2)
                    		{
                    		    this.socket.emit("power", {which: 2, player: 2});
                    			this.paddle2.setScale(0.5, 0.90);
                    		}
							else
                    		{
                    		    this.socket.emit("power", {which: 2, player: 3});
                    			this.paddle2.setScale(1, 0.5);
                    		}
							this.time.delayedCall(7500, () => {
                    		    this.paddle1.setScale(0.15, 0.25);
                    		    this.paddle2.setScale(0.15, 0.25);
                    		    this.paddle3.setScale(0.35, 0.15);
                    		}, [], this);
                    	} else{
							this.power_up()
                    	}
					} else{
						if (this.ball.body.velocity.x > 0){
							if (Phaser.Math.RND.frac() === 1){
								this.socket.emit("power", {which: 2, player: 1});
								this.paddle1.setScale(0.5, 0.90);
							}
							else
							{
								this.socket.emit("power", {which: 2, player: 3});
								this.paddle3.setScale(0.5, 0.90);
							}
							this.time.delayedCall(7500, () => {
								this.paddle1.setScale(0.15, 0.25);
								this.paddle3.setScale(0.15, 0.25);
							}, [], this);
						} else{
							if (Phaser.Math.RND.frac() === 1){
								this.paddle2.setScale(0.5, 0.90);
								this.socket.emit("power", {which: 2, player: 2});
							}
							else{
								this.paddle4.setScale(0.5, 0.90);
								this.socket.emit("power", {which: 2, player: 4});
							}
							this.time.delayedCall(7500, () => {
								this.paddle2.setScale(0.15, 0.25);
								this.paddle4.setScale(0.15, 0.25);
							}, [], this);
						}
					}
                    break;
                case 3:
                    this.inverse.setVisible(true);
                    this.time.delayedCall(1000, () => {
                        this.inverse.setVisible(false)
                    }, [], this);
                    if (this.ball.body.velocity.x > 0){
                        this.socket.emit("power", {which: 3});
                        this.modifier2 = -1;
                        this.time.delayedCall(5000, () => {
                            this.modifier2 = 1;
                        }, [], this);
                    } else{
                        this.modifier1 = -1;
                        this.time.delayedCall(5000, () => {
                            this.modifier1 = 1;
                        }, [], this);
                    }
                    break;
                case 4:
                    this.socket.emit("power", {which: 4});
                    this.bigBall.setVisible(true);
                    this.time.delayedCall(1000, () => {
                        this.bigBall.setVisible(false)
                    }, [], this);
                    this.ball.setTexture("bigBall")
                    this.ball.setScale(1, 1);
                    this.time.delayedCall(5000, () => {
                        this.ball.setTexture("ball")
                        this.ball.setScale(0.2);
                    }, [], this);
                    break;
                case 5:
                    if (this.ball.body){
                        this.socket.emit("power", {which: 5})
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
						if (this.two || this.multiple){
							this.physics.add.collider(this.multiball, this.paddle3);
							this.physics.add.collider(this.multiball, this.paddle4);
						}

                        if (this.wall === true || this.random === true){
                            this.physics.add.collider(this.multiball, this.wall1);
                            this.physics.add.collider(this.multiball, this.wall2);
                            this.physics.add.collider(this.multiball, this.wall3);
                            if (this.wall === false)
                                this.physics.add.overlap(this.ball, [this.wall1, this.wall2, this.wall3], this.regenerateRandom, undefined, this);
                        }
                        this.physics.add.overlap(this.multiball, this.power, this.power_up, undefined, this);
                        this.multi = true;
                    }
                    break;
            }

        this.time.delayedCall(Phaser.Math.RND.between(2000, 7000), () => {
            this.power.enableBody(true, this.power.x, this.power.y, true, true);
            this.socket.emit("newPower", {x: this.power.x, y: this.power.y})
        }, [], this);
        this.power.setPosition(Phaser.Math.RND.between(this.ball.width * 0.2 + 10, this.physics.world.bounds.width - this.ball.width * 0.2 - 10), Phaser.Math.RND.between(this.physics.world.bounds.height * 0.1, this.physics.world.bounds.height - this.physics.world.bounds.height * 0.1))
    }

	new_point(player: number) {
        if (this.random === true || this.wall === true){
            this.wall1.setVisible(false);
            this.wall2.setVisible(false);
            this.wall3.setVisible(false);
        }
        this.paddle1.disableBody();
        this.paddle2.disableBody();
		if (this.two || this.multiple){
			this.paddle3.disableBody();
			this.paddle4.disableBody();
		}
        this.ball.disableBody();
        if (this.power)
            this.power.setVisible(false);
        if (player === 1)
            this.player1Score.setVisible(true);
        else
            this.player2Score.setVisible(true);
        this.rotation = 0;
        this.time.delayedCall(1500, () => {
            if (this.multi === true)
                    this.multiball.destroy();
            this.rotation = 1;
            this.player1Score.setVisible(false);
            this.player2Score.setVisible(false);
            this.paddle1.enableBody();
            this.paddle2.enableBody();
			if (this.two || this.multiple){
				this.paddle3.enableBody();
				this.paddle4.enableBody();
			}
            this.ball.enableBody();
            this.ball.setX(this.physics.world.bounds.width / 2);
            this.ball.setY(this.physics.world.bounds.height / 2);
			if (this.one){
            	this.paddle1.setY(this.physics.world.bounds.height / 2);
            	this.paddle2.setY(this.physics.world.bounds.height / 2);
			}
			if (this.two){
				this.paddle1.setY(this.physics.world.bounds.height / 4);
            	this.paddle2.setY(this.physics.world.bounds.height / 4);
            	this.paddle3.setY(this.physics.world.bounds.height / 4 + this.physics.world.bounds.height / 2);
            	this.paddle4.setY(this.physics.world.bounds.height / 4 + this.physics.world.bounds.height / 2);
			}
			if (this.multiple){
				this.paddle1.setX(this.physics.world.bounds.width / 2);
            	this.paddle2.setY(this.physics.world.bounds.height / 2);
            	this.paddle3.setX(this.physics.world.bounds.width / 2);
            	this.paddle4.setY(this.physics.world.bounds.height / 2);
			}
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
			if (this.one || this.two){
            	this.paddle1.setScale(0.15, 0.25);
            	this.paddle2.setScale(0.15, 0.25);
				if (this.two){
					this.paddle3.setScale(0.15, 0.25);
					this.paddle4.setScale(0.15, 0.25);
				}
			}
			if (this.multiple){
				this.paddle1.setScale(1.5, 0.25);
            	this.paddle2.setScale(0.15, 0.25);
				this.paddle3.setScale(0.35, 0.15);
				this.paddle4.setScale(0.15, 0.25);
			}
            this.ball.setTexture("ball")
            this.ball.setScale(0.2);
            if (this.random === true || this.wall === true){
                this.wall1.setVisible(true);
                this.wall2.setVisible(true);
                this.wall3.setVisible(true);
            }
            if (this.powerup === true){
                this.power.setPosition(Phaser.Math.RND.between(this.ball.width * 0.2 + 10, this.physics.world.bounds.width - this.ball.width * 0.2 - 10), Phaser.Math.RND.between(this.physics.world.bounds.height * 0.1, this.physics.world.bounds.height - this.physics.world.bounds.height * 0.1))
                this.power.enableBody(true, this.power.x, this.power.y, true, true);
                this.socket.emit("newPower", {x: this.power.x, y: this.power.y});
            }
            if (this.random === true)
                this.regenerateRandom();
        }, [], this);
    }

    end(player: number) {
		this.end2 = true;
		this.socket.off("movement");
		this.socket.off("movement2");
        this.socket.emit("end", {which: 1, name: this.name, player: player})
        if (this.power)
            this.power.setVisible(false);
        if (this.random === true || this.wall === true){
            this.wall1.setVisible(false);
            this.wall2.setVisible(false);
            this.wall3.setVisible(false);
        }
        if (player === 1)
            this.player2VictoryText.setVisible(true);
        else
            this.player1VictoryText.setVisible(true);
        this.paddle1.destroy();
        this.paddle2.destroy();
		if (this.two || this.multiple){
			this.paddle3.destroy();
			this.paddle4.destroy();
		}
        this.ball.destroy()
        this.menu.setVisible(true);
    }

	shutdown(){
		this.disconnect.setVisible(false)
		this.menu.setVisible(false)

		this.oneHost = false
		this.oneOther = false
		this.twoHost = false
		this.twoOther = false
		this.threeHost = false
		this.threeOther = false
		this.first = true;
		this.first2 = true;
		
		this.title = this.add.text(this.physics.world.bounds.width / 2, 100, 'PONG', {
			fontFamily: 'pong',
			fontSize: '100px',
			color: '#ffffff',
			backgroundColor: '#000000',
			padding: {
			  x: 10,
			  y: 6
			}
		});

		this.join = this.add.text(this.physics.world.bounds.width * 0.4, this.physics.world.bounds.height * 0.3, 'Join', {
			fontFamily: 'pong',
			fontSize: '24px',
			color: '#ffffff',
			backgroundColor: '#000000',
			padding: {
				x: 10,
				y: 6
			  }
		});

		this.start = this.add.text(this.physics.world.bounds.width * 0.6, this.physics.world.bounds.height * 0.3, 'Start', {
			fontFamily: 'pong',
			fontSize: '24px',
			color: '#ffffff',
			backgroundColor: '#000000',
			padding: {
				x: 10,
				y: 6
			}
		});

		this.mode = this.add.text(this.physics.world.bounds.width / 2, this.physics.world.bounds.height * 0.4, 'mode:', {
			fontFamily: 'pong',
			fontSize: '24px',
			color: '#ffffff',
			backgroundColor: '#000000',
			padding: {
				x: 10,
				y: 6
			}
		});

		this.one = this.add.text(this.physics.world.bounds.width * 0.3, this.physics.world.bounds.height * 0.5, '1 v 1', {
			fontFamily: 'pong',
			fontSize: '24px',
			color: '#000000',
			backgroundColor: '#ffffff',
			padding: {
				x: 10,
				y: 6
			}
		});

		this.twoButton = this.add.text(this.physics.world.bounds.width * 0.5, this.physics.world.bounds.height * 0.5, '2 v 2', {
			fontFamily: 'pong',
			fontSize: '24px',
			color: '#ffffff',
			backgroundColor: '#000000',
			padding: {
				x: 10,
				y: 6
			}
		});

		this.three = this.add.text(this.physics.world.bounds.width * 0.7, this.physics.world.bounds.height * 0.5, '1 v 3', {
			fontFamily: 'pong',
			fontSize: '24px',
			color: '#ffffff',
			backgroundColor: '#000000',
			padding: {
				x: 10,
				y: 6
			}
		});

		this.powerButton = this.add.text(this.physics.world.bounds.width / 2, this.physics.world.bounds.height * 0.6, 'Power Ups', {
			fontFamily: 'pong',
			fontSize: '24px',
			color: '#ffffff',
			backgroundColor: '#000000',
			padding: {
				x: 10,
				y: 6
			}
		});

		this.wallText = this.add.text(this.physics.world.bounds.width / 2, this.physics.world.bounds.height * 0.7, 'walls:', {
			fontFamily: 'pong',
			fontSize: '24px',
			color: '#ffffff',
			backgroundColor: '#000000',
			padding: {
				x: 10,
				y: 6
			}
		});

		this.wallButton = this.add.text(this.physics.world.bounds.width * 0.4, this.physics.world.bounds.height * 0.8, 'static', {
			fontFamily: 'pong',
			fontSize: '24px',
			color: '#ffffff',
			backgroundColor: '#000000',
			padding: {
				x: 10,
				y: 6
			}
		});

		this.randomButton = this.add.text(this.physics.world.bounds.width * 0.6, this.physics.world.bounds.height * 0.8, 'random', {
			fontFamily: 'pong',
			fontSize: '24px',
			color: '#ffffff',
			backgroundColor: '#000000',
			padding: {
				x: 10,
				y: 6
			}
		});

		this.settingOneButton = this.add.text(this.physics.world.bounds.width * 0.5, this.physics.world.bounds.height * 0.9, 'Random Settings', {
			fontFamily: 'pong',
			fontSize: '24px',
			color: '#ffffff',
			backgroundColor: '#000000',
			padding: {
				x: 10,
				y: 6
			}
		});

		this.rate = this.add.text(this.physics.world.bounds.width / 2, this.physics.world.bounds.height * 0.7, 'reduction rate:', {
			fontFamily: 'pong',
			fontSize: '24px',
			color: '#ffffff',
			backgroundColor: '#000000',
			padding: {
				x: 10,
				y: 6
			}
		});

		this.fast = this.add.text(this.physics.world.bounds.width * 0.3, this.physics.world.bounds.height * 0.8, 'fast', {
			fontFamily: 'pong',
			fontSize: '24px',
			color: '#ffffff',
			backgroundColor: '#000000',
			padding: {
				x: 10,
		  		y: 6
			}
	    });

		this.medium = this.add.text(this.physics.world.bounds.width * 0.5, this.physics.world.bounds.height * 0.8, 'medium', {
			fontFamily: 'pong',
			fontSize: '24px',
			color: '#000000',
			backgroundColor: '#ffffff',
			padding: {
				x: 10,
				y: 6
			}
		});

		this.slow = this.add.text(this.physics.world.bounds.width * 0.7, this.physics.world.bounds.height * 0.8, 'slow', {
			fontFamily: 'pong',
			fontSize: '24px',
			color: '#ffffff',
			backgroundColor: '#000000',
			padding: {
				x: 10,
				y: 6
			}
		});

		this.settingThreeButton = this.add.text(this.physics.world.bounds.width * 0.5, this.physics.world.bounds.height * 0.9, 'Random Settings', {
			fontFamily: 'pong',
			fontSize: '24px',
			color: '#ffffff',
			backgroundColor: '#000000',
			padding: {
				x: 10,
				y: 6
			}
		});

		this.title.setOrigin(0.5);
		this.join.setOrigin(0.5);
		this.join.setInteractive();
		this.start.setOrigin(0.5);
		this.start.setInteractive();
		this.one.setOrigin(0.5);
		this.one.setInteractive();
		this.mode.setOrigin(0.5)
		this.powerButton.setOrigin(0.5);
		this.powerButton.setInteractive();
		this.twoButton.setOrigin(0.5);
		this.twoButton.setInteractive();
		this.three.setOrigin(0.5);
		this.three.setInteractive();
		this.wallText.setOrigin(0.5)
		this.wallButton.setOrigin(0.5);
		this.wallButton.setInteractive();
		this.randomButton.setOrigin(0.5);
		this.randomButton.setInteractive();
		this.settingOneButton.setOrigin(0.5);
		this.settingOneButton.setInteractive();
		this.rate.setOrigin(0.5)
		this.slow.setInteractive();
		this.rate.setVisible(false);
		this.fast.setOrigin(0.5);
		this.fast.setInteractive();
		this.fast.setVisible(false);
		this.medium.setOrigin(0.5);
		this.medium.setInteractive();
		this.medium.setVisible(false);
		this.slow.setOrigin(0.5);
		this.slow.setVisible(false);
		this.settingThreeButton.setOrigin(0.5);
		this.settingThreeButton.setInteractive();
		this.settingThreeButton.setVisible(false);

		this.wall = false;
		this.random = false;
		this.powerUp = false;
		this.faces = false;
		this.single = true;
		this.two = false;
		this.multiple = false;
		this.reduce = true;
		this.rateSpeed = 0.0006;
		this.paddleScale = 1.5
		this.points1 = 0
		this.points2 = 0

		if (this.end2 === true){
			this.score.destroy();
			this.player1VictoryText.destroy();
			this.player1Score.destroy();
			this.player2VictoryText.destroy();
			this.player2Score.destroy();
			this.team1VictoryText.destroy();
			this.team1Score.destroy();
			this.team2VictoryText.destroy();
			this.team2Score.destroy();
			this.bigBall.destroy();
			this.bigPaddle.destroy();
			this.smash.destroy();
			this.inverse.destroy();
			this.multiBall.destroy();
			this.end2 = false;
		}

		this.all();
		this.onevsthree();
		this.onevsone();
	}
}
