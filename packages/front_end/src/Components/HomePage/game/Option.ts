
import Phaser from "phaser";
import { Socket } from "socket.io-client";
import '../../../App.css';

interface gameData {
	name: string;
	socket: Socket
}

export default class option extends Phaser.Scene{

	wall: boolean = false;
	random: boolean = false;
	powerUp: boolean = false;
	faces: boolean = false;
	single: boolean = true;
	two: boolean = false;
	multiple: boolean = false;
	socket!: any; 
	name!: string;
	player!: number;

	rateSpeed: number = 0.0006;

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

	event1!: any;
	event2!: any;
	event3!: any;

	constructor() {
        super('menu');
    }

	init(data: gameData) {
		this.name = data.name;
		this.socket = data.socket;

		this.load.bitmapFont('pong', '../../fonts/pong.ttf');

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
		this.start.setOrigin(0.5);
		this.one.setOrigin(0.5);
		this.mode.setOrigin(0.5)
		this.powerButton.setOrigin(0.5);
		this.twoButton.setOrigin(0.5);
		this.three.setOrigin(0.5);
		this.wallText.setOrigin(0.5)
		this.wallButton.setOrigin(0.5);
		this.randomButton.setOrigin(0.5);
		this.settingOneButton.setOrigin(0.5);
		this.rate.setOrigin(0.5)
		this.rate.setVisible(false);
		this.fast.setOrigin(0.5);
		this.fast.setVisible(false);
		this.medium.setOrigin(0.5);
		this.medium.setVisible(false);
		this.slow.setOrigin(0.5);
		this.slow.setVisible(false);
		this.settingThreeButton.setOrigin(0.5);
		this.settingThreeButton.setVisible(false);
	}

	preload() {
		
	}
 
	all() {
		this.join.setInteractive();
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


			/* this.title.destroy();
			this.start.destroy()
			this.join.destroy()
			this.powerButton.destroy()
			this.settingOneButton.destroy()
			this.settingThreeButton.destroy()
			this.wallButton.destroy()
			this.randomButton.destroy()
			this.mode.destroy()
			this.wallText.destroy()
			this.rate.destroy()
			this.fast.destroy()
			this.medium.destroy()
			this.slow.destroy() */


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

			if (this.single === true)
				this.socket.emit("1v1", {start: false});
			else if (this.two === true)
				this.socket.emit("2v2", {start: false});
			else
				this.socket.emit("3v1", {start: false})
			this.socket.on("start", (data: any) => {
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
						this.scene.start('oneVSoneOther', {wall: data.wall, faces: data.faces, random: data.random, socket: this.socket, name: this.name})
					else if (this.multiple === true)
						this.scene.start('threeVSoneOther', {power: data.powerUp, scaleRate: data.scale, socket: this.socket, player: this.player, name: this.name})
					else
						this.scene.start('twoVStwoOther', {wall: data.wall, faces: data.faces, random: data.random, socket: this.socket, player: this.player, name: this.name});
				}, [], this);
			});
		})
		

		this.start.setInteractive();
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

			if (this.single === true)
				this.socket.emit("1v1", {wall: this.wall, random: this.random, power: this.powerUp, faces: this.faces, name: this.name, start: true});
			if (this.multiple)
				this.socket.emit("3v1", {scale: this.rateSpeed, power: this.powerUp, name: this.name, start: true});
			else 
				this.socket.emit("2v2", {wall: this.wall, random: this.random, power: this.powerUp, faces: this.faces, name: this.name, start: true});
			
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
						this.scene.start('oneVSoneHost', {wall: this.wall, random: this.random, power: this.powerUp, faces: this.faces, socket: this.socket, ballX: data.ballX, ballY: data.ballY, name: this.name});
					else if (this.multiple === true)
						this.scene.start('threeVSoneHost', {power: this.powerUp, scaleRate: this.rateSpeed, socket: this.socket, ballX: data.ballX, ballY: data.ballY, name: this.name})
					else
						this.scene.start('twoVStwoHost', {wall: this.wall, random: this.random, power: this.powerUp, faces: this.faces, socket: this.socket, ballX: data.ballX, ballY: data.ballY, name: this.name});
				}, [], this);
			});
		})


		this.one.setInteractive();
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
	
		
		this.twoButton.setInteractive();
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

		
		this.three.setInteractive();
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
	
		
		this.powerButton.setInteractive();
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
		this.wallButton.setInteractive();
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
		
		
		this.randomButton.setInteractive();
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
		
		
		this.settingOneButton.setInteractive();
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
						this.scene.start('oneVSoneHost', {wall: this.wall, random: this.random, power: this.powerUp, faces: this.faces, socket: this.socket, ballX: data.ballX, ballY: data.ballY, name: this.name});
					else
						this.scene.start('twoVStwoHost', {wall: this.wall, random: this.random, power: this.powerUp, face: this.faces, socket: this.socket, ballX: data.ballX, ballY: data.ballY, name: this.name});
				}, [], this);
			});
		});
	}
			
	onevsthree() {
		this.fast.setInteractive();
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
		
		
		this.medium.setInteractive();
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
		
		
		this.slow.setInteractive();
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
		
		
		this.settingThreeButton.setInteractive();
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
					this.scene.start('threeVSone', {power: this.powerUp, scaleRate: this.rateSpeed, socket: this.socket, ballX: data.ballX, ballY: data.ballY, name: this.name})
				}, [], this);
			});
		})
	}
				
	create() {
		this.load.on('complete', this.all, this);
					
		this.wall = false;
		this.random = false;
		this.powerUp = false;
		this.faces = false;
		this.single = true;
		this.two = false;
		this.multiple = false;
		this.rateSpeed = 0.0006;

		this.all();
		this.onevsthree();
		this.onevsone();

		this.socket.on("player", (player: number) => {this.player = player;})

		this.socket.on("disconnected", () => {
			this.event1.remove(false)
			this.event2.remove(false)
			this.event3.remove(false)
			this.starting.destroy()
			this.position.destroy()

			
			const disconnect = this.add.text(this.physics.world.bounds.width / 2, this.physics.world.bounds.height / 2, "A player has disconnected", {
				fontFamily: 'pong',
				fontSize: '25px',
				color: '#ffffff',
				backgroundColor: '#000000',
				padding: {
					x: 10,
					y: 6
				}
			})
			disconnect.setOrigin(0.5);
			this.time.delayedCall(3000, () => {
				disconnect.destroy();
				this.title.setVisible(true);
				this.join.setVisible(true);
				this.start.setVisible(true);
				this.powerButton.setVisible(true);
				this.settingOneButton.setVisible(true);
				this.mode.setVisible(true);
				this.wallText.setVisible(true);
				this.wallButton.setVisible(true);
				this.randomButton.setVisible(true);
			})
		})
	}

	update() {}
}