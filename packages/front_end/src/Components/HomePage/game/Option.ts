
import Phaser from "phaser";

export class option extends Phaser.Scene{

	constructor() {
        super('menu');
    }

	preload() {

	}

	create() {
		const button = this.add.text(10, 10, 'Start', {
		  fontFamily: 'Arial',
		  fontSize: '24px',
		  color: '#ffffff',
		  backgroundColor: '#000000',
		  padding: {
		    x: 10,
		    y: 6
		  }
		});

		button.setInteractive();

		button.on('pointerover', () => {
		  button.setStyle({ backgroundColor: '#ff0000' });
		});

		button.on('pointerout', () => {
		  button.setStyle({ backgroundColor: '#000000' });
		});

		button.on('pointerdown', () => {
		  this.scene.start('pong');
		});
	}

	update() {

	}
}