
import Phaser from "phaser";

class PowerUp extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
      super(scene, x, y, "power");
      this.setScale(0.1, 0.1);
      scene.add.existing(this);
      scene.physics.add.existing(this);
    }
}

interface gameData {
    wall: boolean;
    random: boolean;
    power: boolean;
    face: boolean;
}

export class game extends Phaser.Scene{

	ball!: Phaser.Physics.Arcade.Sprite;
    paddle!: Phaser.Physics.Arcade.Sprite;
    paddle1!: Phaser.Physics.Arcade.Sprite;
    paddle2!: Phaser.Physics.Arcade.Sprite;

    wall1!: Phaser.Physics.Arcade.Sprite;
    wall2!: Phaser.Physics.Arcade.Sprite;
    wall3!: Phaser.Physics.Arcade.Sprite;

    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    keys: any = {};

    points1: number = 0;
    points2: number = 0;
    win: number = 5;

    player1VictoryText!: Phaser.GameObjects.Text;
    player2VictoryText!: Phaser.GameObjects.Text;
    score!: Phaser.GameObjects.Text;
    
    paddlespeed: number = 450;
    modifier1: number = 1;
    modifier2: number = 1;
    XVelocityMin1: number = 350;
    XVelocityMax1: number = 400;
    XVelocityMin2: number = -350;
    XVelocityMax2: number = -400;
    YvelocityMin: number = 125;
    YvelocityMax: number = 225;
    oldVelocityX!: number;
    newOldVelocityX: number = 0;
    power!: PowerUp;
    
    face: boolean = false;
    wall: boolean = false;
    random: boolean = false;
    powerup: boolean = false;

    bigPaddle!: Phaser.GameObjects.Text;
    bigBall!: Phaser.GameObjects.Text;
    smash!: Phaser.GameObjects.Text;
    inverse!: Phaser.GameObjects.Text;


    constructor() {
        super('pong');
    }

    init (data: gameData) {
        this.wall = data.wall;
        this.random = data.random;
        this.powerup = data.power;
        this.face = data.face; 
    }

	preload() {
        this.load.image("ball", String(require('../../../images/anhebert.png')));
        this.load.image("bigball", String(require('../../../images/jrossign.png')));
        //this.load.image("paddle", String(require('../../../images/paddle.png')));
        this.load.image("paddle1", String(require('../../../images/lmoreno.png')));
        this.load.image("paddle2", String(require('../../../images/bperron.png')));
        this.load.image("wall", "https://cdn.intra.42.fr/users/795abdc885871d07fa86ceee9218d673/tguiter2.jpg");
        this.load.image("power", "https://cdn.intra.42.fr/users/3c08dbaf4b23e2af86168c9147631ace/malord.jpg");
        this.load.image("background", "https://cdn.intra.42.fr/users/02bd0e2e6838f9e0f6d36bd7968465d6/yst-laur.jpg");
        this.cursors = this.input.keyboard?.createCursorKeys();
    }

    map_init() {
        if (this.face === true){
            console.log("allo")
            const background = this.add.sprite(0, 0, "background");
            background.setOrigin(0, 0);
            background.setScale(this.scale.width / background.width, this.scale.height / background.height);
       }
        if (this.random === true){
            this.wall1 = this.physics.add.sprite(
                Phaser.Math.RND.between(this.physics.world.bounds.width * 0.2, this.physics.world.bounds.width - this.physics.world.bounds.width * 0.2), 
                Phaser.Math.RND.between(this.physics.world.bounds.height * 0.2, this.physics.world.bounds.height - this.physics.world.bounds.height * 0.2),
                "wall"
            )
            this.wall2 = this.physics.add.sprite(
                Phaser.Math.RND.between(this.physics.world.bounds.width * 0.2, this.physics.world.bounds.width - this.physics.world.bounds.width * 0.2), 
                Phaser.Math.RND.between(this.physics.world.bounds.height * 0.2, this.physics.world.bounds.height - this.physics.world.bounds.height * 0.2),
                "wall"
            )
            this.wall3 = this.physics.add.sprite(
                Phaser.Math.RND.between(this.physics.world.bounds.width * 0.2, this.physics.world.bounds.width - this.physics.world.bounds.width * 0.2), 
                Phaser.Math.RND.between(this.physics.world.bounds.height * 0.2, this.physics.world.bounds.height - this.physics.world.bounds.height * 0.2),
                "wall"
            )
            this.wall1.setScale(Phaser.Math.RND.realInRange(0.2, 0.4), Phaser.Math.RND.realInRange(0.2, 0.4));
            this.wall2.setScale(Phaser.Math.RND.realInRange(0.2, 0.4), Phaser.Math.RND.realInRange(0.2, 0.4));
            this.wall3.setScale(Phaser.Math.RND.realInRange(0.2, 0.4), Phaser.Math.RND.realInRange(0.2, 0.4));
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
                this.physics.world.bounds.height * 0.15,
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
    }

    ball_init() {
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

        if (this.wall === true || this.random === true){
            this.physics.add.collider(this.ball, this.wall1);
            this.physics.add.collider(this.ball, this.wall2);
            this.physics.add.collider(this.ball, this.wall3);
        }

    }

    paddle_init() {
        if (this.face === true){
            this.paddle1 = this.physics.add.sprite(
                (this.ball.width * 0.2) / 2 + 10,
                this.physics.world.bounds.height / 2,
                "paddle1"
            )
            this.paddle2 = this.physics.add.sprite(
                this.physics.world.bounds.width - (this.ball.width * 0.2) / 2 - 1,
                this.physics.world.bounds.height / 2,
                "paddle2"
            )
        }
        else{
            this.paddle1 = this.physics.add.sprite(
                (this.ball.width * 0.2) / 2 + 10,
                this.physics.world.bounds.height / 2,
                "paddle1"
            )
            this.paddle2 = this.physics.add.sprite(
                this.physics.world.bounds.width - (this.ball.width * 0.2) / 2 - 1,
                this.physics.world.bounds.height / 2,
                "paddle1"
            )
        }
            

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
    }

    text_init() {
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

        this.score = this.add.text(
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height / 10,
            `${this.points2}          ${this.points1}`,
            {
                fontFamily: 'pong',
                fontSize: '20px',
            }
        );

        if (this.face === true)
            this.score.setTint(0x000000)
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
    }

    create() {
        this.map_init();
        this.text_init();
        this.ball_init();
        this.paddle_init();

        this.keys.w  = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keys.s  = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S);        
        
        if (this.powerup){
            this.power = new PowerUp(this, Phaser.Math.RND.between(this.ball.width * 0.2 + 10, this.physics.world.bounds.width - this.ball.width * 0.2 - 10), Phaser.Math.RND.between(this.physics.world.bounds.height * 0.1, this.physics.world.bounds.height - this.physics.world.bounds.height * 0.1));
            this.physics.add.overlap(this.ball, this.power, this.power_up, undefined, this);
        }


    }

    new_point(player: number) {
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
        this.modifier1 = 1;
        this.modifier2 = 1;
        this.paddle1.setScale(0.15, 0.25);
        this.paddle2.setScale(0.15, 0.25);
        this.ball.setTexture("ball")
        this.ball.setScale(0.2);
        if (this.random === true){
            this.wall1.setPosition(Phaser.Math.RND.between(this.ball.width, this.physics.world.bounds.width - this.ball.width), Phaser.Math.RND.between(this.physics.world.bounds.height * 0.2, this.physics.world.bounds.height - this.physics.world.bounds.height * 0.2));     
            this.wall2.setPosition(Phaser.Math.RND.between(this.ball.width, this.physics.world.bounds.width - this.ball.width), Phaser.Math.RND.between(this.physics.world.bounds.height * 0.2, this.physics.world.bounds.height - this.physics.world.bounds.height * 0.2));     
            this.wall3.setPosition(Phaser.Math.RND.between(this.ball.width, this.physics.world.bounds.width - this.ball.width), Phaser.Math.RND.between(this.physics.world.bounds.height * 0.2, this.physics.world.bounds.height - this.physics.world.bounds.height * 0.2));     
            this.wall1.setScale(Phaser.Math.RND.realInRange(0.2, 0.4), Phaser.Math.RND.realInRange(0.2, 0.4));
            this.wall2.setScale(Phaser.Math.RND.realInRange(0.2, 0.4), Phaser.Math.RND.realInRange(0.2, 0.4));
            this.wall3.setScale(Phaser.Math.RND.realInRange(0.2, 0.4), Phaser.Math.RND.realInRange(0.2, 0.4));
        }
    }

    end(player: number) {
        this.ball.disableBody(true, true);
        if (player === 1)
            this.player1VictoryText.setVisible(true);
        else
            this.player2VictoryText.setVisible(true);
        this.paddle1.disableBody();
        this.paddle2.disableBody();
        this.scene.pause();
        return;
    }

    update() {
        if (this.ball.body)
            if (this.ball.body?.x + this.ball.body.width === this.physics.world.bounds.width) {
                this.smash.setVisible(false);
                this.bigBall.setVisible(false);
                this.bigPaddle.setVisible(false);
                this.inverse.setVisible(false);
                this.points2++;
                this.score.setText(`${this.points2}          ${this.points1}`);
                if (this.points2 === this.win)
                    this.end(2);
                else
                    this.new_point(1);
            }
        
        if (this.ball.body && this.paddle1.body)
            if (this.ball.body?.x === 0) {
                this.smash.setVisible(false);
                this.bigBall.setVisible(false);
                this.bigPaddle.setVisible(false);
                this.inverse.setVisible(false);
                this.points1++;
                this.score.setText(`${this.points2}          ${this.points1}`);
                if (this.points1 === this.win)
                    this.end(1);
                else
                    this.new_point(2);
            }
        
        this.paddle1.setVelocityY(0);
        this.paddle2.setVelocityY(0);
        
        if (this.cursors?.up.isDown)
        this.paddle2.setVelocityY(-this.paddlespeed * this.modifier2);
        if (this.cursors?.down.isDown)
        this.paddle2.setVelocityY(this.paddlespeed * this.modifier2);
        
        if (this.keys.w.isDown)
        this.paddle1.setVelocityY(-this.paddlespeed * this.modifier1);
        if (this.keys.s.isDown)
        this.paddle1.setVelocityY(this.paddlespeed * this.modifier1);
        
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
            if(this.ball.body.velocity.x === 750)
                this.ball.setDrag(1);
        }
        this.ball.angle++;
    }

    power_up() { 
        this.power.disableBody(true, true);
        if (this.ball.body)
            switch(Phaser.Math.RND.between(1, 4)){
                case 1:
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
                    if (this.ball.body.velocity.x > 0){
                        this.paddle1.setScale(0.5, 0.90);
                        this.time.delayedCall(7500, () => {
                            this.paddle1.setScale(0.15, 0.25);
                        }, [], this);
                    } else{
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
                    if (this.ball.body.velocity.x > 0){
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
                    this.bigBall.setVisible(true);
                    this.time.delayedCall(1000, () => {
                        this.bigBall.setVisible(false)
                    }, [], this);
                    this.ball.setTexture("bigball")
                    this.ball.setScale(1, 1);
                    this.time.delayedCall(5000, () => {
                        this.ball.setTexture("ball")
                        this.ball.setScale(0.2);
                    }, [], this);
                    break;
            }

        this.time.delayedCall(Phaser.Math.RND.between(2000, 7000), () => {
            this.power.enableBody(true, this.power.x, this.power.y, true, true);
        }, [], this);

        this.power.setPosition(Phaser.Math.RND.between(this.ball.width * 0.2 + 10, this.physics.world.bounds.width - this.ball.width * 0.2 - 10), Phaser.Math.RND.between(this.physics.world.bounds.height * 0.1, this.physics.world.bounds.height - this.physics.world.bounds.height * 0.1))
    }
}
