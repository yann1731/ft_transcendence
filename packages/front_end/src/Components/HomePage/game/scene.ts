
import Phaser from "phaser";

export class scene extends Phaser.Scene{

	ball!: Phaser.Physics.Arcade.Sprite;
    paddle1!: Phaser.Physics.Arcade.Sprite;
    paddle2!: Phaser.Physics.Arcade.Sprite;
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    cat!: Phaser.Sound.BaseSound;
    keys: any = {};
    points1: number = 0;
    points2: number = 0;
    player1VictoryText: any;
    player2VictoryText: any;
    score: any;

    XVelocityMin1: number = 300;
    XVelocityMax1: number = 350;
    XVelocityMin2: number = -300;
    XVelocityMax2: number = -350;
    YvelocityMin: number = 100;
    YvelocityMax: number = 250;

    win: number = 5;


	preload() {
        const anto = require('../../../images/anhebert.png');
        const paddle = require('../../../images/paddle.png');

        this.load.image("ball", String(anto) );
        this.load.image("paddle", String(paddle));
        this.cursors = this.input.keyboard?.createCursorKeys();
    }

    create() {

		this.ball = this.physics.add.sprite(
			this.physics.world.bounds.width / 2,
			this.physics.world.bounds.height / 2,
			"ball"		
        )
        this.paddle1 = this.physics.add.sprite(
            (this.ball.width * 0.1) / 2 + 10,
            this.physics.world.bounds.height / 2,
            "paddle"	
        )
        this.paddle2 = this.physics.add.sprite(
            this.physics.world.bounds.width - (this.ball.width * 0.1) / 2 - 1,
            this.physics.world.bounds.height / 2,
            "paddle"	
        )

        this.keys.w  = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keys.s  = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        
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
        
        this.ball.setScale(0.2, 0.2);
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1, 1);

        this.paddle1.setImmovable(true);
        this.paddle1.setScale(0.5, 0.5);
        this.paddle1.setCollideWorldBounds(true)
        this.physics.add.collider(this.ball, this.paddle1);
        
        this.paddle2.setImmovable(true);
        this.paddle2.setScale(0.5, 0.5);
        this.paddle2.setCollideWorldBounds(true)
        this.physics.add.collider(this.ball, this.paddle2);

        this.player1VictoryText = this.add.text(
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height / 2,
            'player 1 wins!',
            {
                fontFamily: 'Monaco, Courier, monospace',
                fontSize: '50px',
            }
        );
        this.player1VictoryText.setOrigin(0.5);
        this.player1VictoryText.setVisible(false);
    
        this.player2VictoryText = this.add.text(
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height / 2,
            'player 2 wins!',
            {
                fontFamily: 'Monaco, Courier, monospace',
                fontSize: '50px',
            }
        );

        this.player2VictoryText.setOrigin(0.5);
        this.player2VictoryText.setVisible(false);

        this.score = this.add.text(
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height / 10,
            `${this.points2}          ${this.points1}`,
            {
                fontFamily: 'Monaco, Courier, monospace',
                fontSize: '20px',
            }
        );
        this.score.setOrigin(0.5);
    }

    update() {
        this.ball.angle++;

        if (this.ball.body)
            if (this.ball.body?.x + this.ball.body.width === this.physics.world.bounds.width) {
                this.points2++;
                this.score.setText(`${this.points2}          ${this.points1}`);
                if (this.points2 === this.win){
                    this.ball.disableBody(true, true);
                    this.player2VictoryText.setVisible(true);
                    this.paddle1.disableBody();
                    this.paddle2.disableBody();
                    this.scene.pause();
                    return;
                } else{
                    this.ball.setX(this.physics.world.bounds.width / 2);
                    this.ball.setY(this.physics.world.bounds.height / 2);
                    this.ball.setVelocityX(Math.random() * (this.XVelocityMax1 - this.XVelocityMin1) + this.XVelocityMin1);
                    let y: number = Math.random() * (this.YvelocityMax - this.YvelocityMin) + this.YvelocityMin;
                    if (Math.floor(Math.random() * 2) === 0)
                        y *= -1;
                    this.ball.setVelocityY(y);
                }
            }

        if (this.ball.body && this.paddle1.body)
            if (this.ball.body?.x === 0) {
                this.points1++;
                this.score.setText(`${this.points2}          ${this.points1}`);
                if (this.points1 === this.win){
                    this.ball.disableBody(true, true);
                    this.player1VictoryText.setVisible(true);
                    this.paddle1.disableBody();
                    this.paddle2.disableBody();
                    this.scene.pause();
                    return;
                }else{
                    this.ball.setX(this.physics.world.bounds.width / 2);
                    this.ball.setY(this.physics.world.bounds.height / 2);
                    this.ball.setVelocityX(Math.random() * (this.XVelocityMax2 - this.XVelocityMin2) + this.XVelocityMin2);
                    let y: number = Math.random() * (this.YvelocityMax - this.YvelocityMin) + this.YvelocityMin;
                    if (Math.floor(Math.random() * 2) === 0)
                        y *= -1;
                    this.ball.setVelocityY(y);            
                }
            }


        this.paddle1.setVelocityY(0);
        this.paddle2.setVelocityY(0);

        if (this.cursors?.up.isDown)
            this.paddle2.setVelocityY(-400);
        if (this.cursors?.down.isDown)
            this.paddle2.setVelocityY(400);

        if (this.keys.w.isDown)
            this.paddle1.setVelocityY(-400);
        if (this.keys.s.isDown)
            this.paddle1.setVelocityY(400);
    }
}
