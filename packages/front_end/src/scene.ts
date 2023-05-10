import Phaser from "phaser";

export class scene extends Phaser.Scene{
	constructor() {
		super('scene');
	}

	init() {

    }

	preload() {
        this.load.image("ball", '../../public/ball.png');
    }

    create() {
		this.physics.add.sprite(
			this.physics.world.bounds.width / 2,
			this.physics.world.bounds.height / 2,
			'ball'
		)
    }


    update() {
        
    }

    private createNewGame() 
    {
        this.scene.launch('game');
    }
}