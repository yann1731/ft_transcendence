
import Phaser from "phaser";

class PowerUp extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
      super(scene, x, y, "power");
      this.setScale(0.1, 0.1);
      scene.add.existing(this);
      scene.physics.add.existing(this);
    }
  }


export class game extends Phaser.Scene{

	ball!: Phaser.Physics.Arcade.Sprite;
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
    
    power!: PowerUp;
    
    paddlespeed: number = 450;
    modifier1: number = 1;
    modifier2: number = 1;
    XVelocityMin1: number = 350;
    XVelocityMax1: number = 400;
    XVelocityMin2: number = -350;
    XVelocityMax2: number = -400;
    YvelocityMin: number = 125;
    YvelocityMax: number = 225;

    wall: boolean = false;
    yarn: boolean = false;

    constructor() {
        super('pong');
    }

	preload() {
        this.load.image("ball", String(require('../../../images/anhebert.png')));
        this.load.image("bigball", String(require('../../../images/jrossign.png')))
        this.load.image("paddle1", String(require('../../../images/lmoreno.png')));
        this.load.image("paddle2", String(require('../../../images/bperron.png')));
        this.load.image("wall", "https://cdn.intra.42.fr/users/795abdc885871d07fa86ceee9218d673/tguiter2.jpg");
        this.load.image("power", "https://cdn.intra.42.fr/users/3c08dbaf4b23e2af86168c9147631ace/malord.jpg");
        this.load.image("background", "https://cdn.intra.42.fr/users/02bd0e2e6838f9e0f6d36bd7968465d6/yst-laur.jpg");
        this.cursors = this.input.keyboard?.createCursorKeys();
    }

    map_init() {
        const map: number = Phaser.Math.RND.between(0, 60);
        if (map >= 20 && map < 40){
            this.wall = true;
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
       else if (map >= 40){
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
       else{
            this.yarn = true;
            const background = this.add.sprite(0, 0, "background");
            background.setOrigin(0, 0);
            background.setScale(this.scale.width / background.width, this.scale.height / background.height);
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

        if (this.wall1){
            this.physics.add.collider(this.ball, this.wall1);
            this.physics.add.collider(this.ball, this.wall2);
            this.physics.add.collider(this.ball, this.wall3);
        }

    }

    paddle_init() {
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

        if (this.yarn === true)
            this.score.setTint(0x000000)
        this.score.setOrigin(0.5);
    }

    create() {
        this.map_init();
        this.ball_init();
        this.paddle_init();
        this.text_init();

        this.keys.w  = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keys.s  = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S);        
        
        this.power = new PowerUp(this, Phaser.Math.RND.between(this.ball.width * 0.2 + 10, this.physics.world.bounds.width - this.ball.width * 0.2 - 10), Phaser.Math.RND.between(this.physics.world.bounds.height * 0.1, this.physics.world.bounds.height - this.physics.world.bounds.height * 0.1));
        this.physics.add.overlap(this.ball, this.power, this.power_up, undefined, this);


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
        if (this.wall === true){
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
                this.points2++;
                this.score.setText(`${this.points2}          ${this.points1}`);
                if (this.points2 === this.win)
                    this.end(2);
                else
                    this.new_point(1);
            }
        
        if (this.ball.body && this.paddle1.body)
            if (this.ball.body?.x === 0) {
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
        if (this.ball.body)
            if(this.ball.body.velocity.x === 750){
                console.log("allo");
                this.ball.setDrag(1);
            }
        this.ball.angle++;
    }

    power_up() {

        this.power.disableBody(true, true);
        if (this.ball.body)
            switch(Phaser.Math.RND.between(1, 4)){
                case 1:
                    if (this.ball.body)
                        this.ball.setVelocityX(this.ball.body.velocity.x * 2);
                    break;
                case 2:
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
                    this.ball.setTexture("bigball")
                    this.ball.setScale(1, 1);
                    this.time.delayedCall(5000, () => {
                                this.ball.setScale(0.2);
                        this.ball.setTexture("ball")
                    }, [], this);
                    break;
            }

        this.time.delayedCall(Phaser.Math.RND.between(2000, 7000), () => {
            this.power.enableBody(true, this.power.x, this.power.y, true, true);
        }, [], this);

        this.power.setPosition(Phaser.Math.RND.between(this.ball.width * 0.2 + 10, this.physics.world.bounds.width - this.ball.width * 0.2 - 10), Phaser.Math.RND.between(this.physics.world.bounds.height * 0.1, this.physics.world.bounds.height - this.physics.world.bounds.height * 0.1))
    }
}
