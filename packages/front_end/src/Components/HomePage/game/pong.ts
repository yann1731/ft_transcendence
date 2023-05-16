
import Phaser from "phaser";
import { scene } from "./scene";

document.addEventListener("DOMContentLoaded", function () {
const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'PONG',
	backgroundColor: '#000000',
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		min: {
			width: 480,
			height: 480
		}
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
	return game;
})

/*export default game; */