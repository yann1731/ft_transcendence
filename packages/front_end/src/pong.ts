
import Phaser from "phaser";
import { scene } from "./scene";


const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'game-content',
	backgroundColor: '#001828',
	width: 800,
    height: 640,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
		},
	},
	scene: [scene]
}

export default new Phaser.Game(config)