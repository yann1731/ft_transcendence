
import Phaser from "phaser";
import { scene } from "./scene";


const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'game-content',
	backgroundColor: '#000000',
	scale: {
		mode: Phaser.Scale.ScaleModes.RESIZE,
		width: window.innerWidth,
		height: window.innerHeight,
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
		},
	},
	scene: [scene]
}

let game = new Phaser.Game(config);
export default game;