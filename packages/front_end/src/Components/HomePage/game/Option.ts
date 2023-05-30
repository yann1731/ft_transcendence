
import Phaser from "phaser";

export class option extends Phaser.Scene{

	wall: boolean = false;
	random: boolean = false;
	powerUp: boolean = false;
	faces: boolean = false;

	start!: Phaser.GameObjects.Text;
	powerButton!: Phaser.GameObjects.Text;
	wallButton!: Phaser.GameObjects.Text;
	randomButton!: Phaser.GameObjects.Text;
	settingButton!: Phaser.GameObjects.Text;


	constructor() {
        super('menu');
    }

	preload() {}

	create() {
		const title = this.add.text(this.physics.world.bounds.width / 2, 100, 'PONG', {
		  fontFamily: 'pong',
		  fontSize: '100px',
		  color: '#ffffff',
		  backgroundColor: '#000000',
		  padding: {
		    x: 10,
		    y: 6
		  }
		});
		title.setOrigin(0.5);
		

		const wall = this.add.text(this.physics.world.bounds.width / 2, this.physics.world.bounds.height * 0.5, 'walls:', {
		  fontFamily: 'pong',
		  fontSize: '24px',
		  color: '#ffffff',
		  backgroundColor: '#000000',
		  padding: {
			x: 10,
			y: 6
		  }
		});
		wall.setOrigin(0.5)
		
		
		this.powerButton = this.add.text(this.physics.world.bounds.width / 2, this.physics.world.bounds.height * 0.4, 'Power Ups', {
		  fontFamily: 'pong',
		  fontSize: '24px',
		  color: '#ffffff',
		  backgroundColor: '#000000',
		  padding: {
			x: 10,
			y: 6
		  }
		});
		this.powerButton.setOrigin(0.5);
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


		this.wallButton = this.add.text(this.physics.world.bounds.width * 0.4, this.physics.world.bounds.height * 0.6, 'static', {
		  fontFamily: 'pong',
		  fontSize: '24px',
		  color: '#ffffff',
		  backgroundColor: '#000000',
		  padding: {
		    x: 10,
		    y: 6
		  }
		});
		this.wallButton.setOrigin(0.5);
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
		

		this.randomButton = this.add.text(this.physics.world.bounds.width * 0.6, this.physics.world.bounds.height * 0.6, 'random', {
		  fontFamily: 'pong',
		  fontSize: '24px',
		  color: '#ffffff',
		  backgroundColor: '#000000',
		  padding: {
		    x: 10,
		    y: 6
		  }
		});
		this.randomButton.setOrigin(0.5);
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
	

		this.start = this.add.text(this.physics.world.bounds.width / 2, this.physics.world.bounds.height * 0.3, 'Start', {
			fontFamily: 'pong',
			fontSize: '24px',
			color: '#ffffff',
			backgroundColor: '#000000',
			padding: {
				x: 10,
				y: 6
			  }
		  });
		  this.start.setOrigin(0.5);
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
			const game = this.add.text(this.physics.world.bounds.width / 2, this.physics.world.bounds.height / 2, 'game starting in 3', {
				fontFamily: 'pong',
				fontSize: '50px',
				color: '#ffffff',
				backgroundColor: '#000000',
				padding: {
				  x: 10,
				  y: 6
				}
			  });
			  game.setOrigin(0.5);

			  title.setVisible(false);
			  this.start.setVisible(false);
			  this.powerButton.setVisible(false);
			  this.settingButton.setVisible(false);
			  this.wallButton.setVisible(false);
			  this.randomButton.setVisible(false);
			  
			this.time.delayedCall(1000, () => {
				game.setText('game starting in 2');
			}, [], this);
			this.time.delayedCall(2000, () => {
				game.setText('game starting in 1');
			}, [], this);
			this.time.delayedCall(3000, () => {
				this.scene.start('pong', {wall: this.wall, random: this.random, power: this.powerUp, faces: this.faces});
			}, [], this);
		  });


		this.settingButton = this.add.text(this.physics.world.bounds.width * 0.5, this.physics.world.bounds.height * 0.7, 'random settings', {
		  fontFamily: 'pong',
		  fontSize: '24px',
		  color: '#ffffff',
		  backgroundColor: '#000000',
		  padding: {
		    x: 10,
		    y: 6
		  }
		});
		this.settingButton.setOrigin(0.5);
		this.settingButton.setInteractive();
		this.settingButton.on('pointerover', () => {
			this.settingButton.setColor('#000000');
			this.settingButton.setStyle({ backgroundColor: '#ffffff' });
		});
		this.settingButton.on('pointerout', () => {
			this.settingButton.setColor('#ffffff');
			this.settingButton.setStyle({ backgroundColor: '#000000' });
		});
		this.settingButton.on('pointerdown', () => {
			const game = this.add.text(this.physics.world.bounds.width / 2, this.physics.world.bounds.height / 2, 'game starting in 3', {
				fontFamily: 'pong',
				fontSize: '50px',
				color: '#ffffff',
				backgroundColor: '#000000',
				padding: {
				  x: 10,
				  y: 6
				}
			  });
			  game.setOrigin(0.5);

			title.setVisible(false);
			this.start.setVisible(false);
			this.powerButton.setVisible(false);
			this.settingButton.setVisible(false);
			this.wallButton.setVisible(false);
			this.randomButton.setVisible(false);
			
			this.time.delayedCall(1000, () => {
				game.setText('game starting in 2');
			}, [], this);
			this.time.delayedCall(2000, () => {
				game.setText('game starting in 1');
			}, [], this);
			this.time.delayedCall(3000, () => {
				this.scene.start('pong', {wall: this.wall, random: this.random, power: this.powerUp, faces: this.faces});
			}, [], this);
		  });
	}

	update() {}
}