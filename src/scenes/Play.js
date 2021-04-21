class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload () {
        this.load.audio('my wifes poggers music', './assets/11 Softly Dreaming (2018).wav');
        this.load.image('grassy background', 'assets/Scrolling Background.png');
        this.load.image('red flower', 'assets/red_flower.png');
        this.load.image('bee', 'assets/bee_sprite.png');
        this.load.image('orange flower', 'assets/orange_flower.png');
        // load spritesheets
        this.load.spritesheet('orange flower explosion', 'assets/orange flower explosion.png', {frameWidth: 48, frameHeight: 24, startFrame: 0, endFrame: 9});
        this.load.spritesheet('red flower explosion', 'assets/Red Flower Animation.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create () {
        //background music
        if (!this.backgroundMusic) {
            this.backgroundMusic = this.sound.add('my wifes poggers music', {
                loop: true
            })
        }
        //plays track once game starts
        this.backgroundMusic.play();

        this.grassybackground = this.add.tileSprite(
            0,0, 640,480, 'grassy background'
        ).setOrigin(0,0);

        //add bee (p1, since originally multiplayer game)
        this.p1Rocket = new Rocket(
            this, 
            game.config.width/2,
            game.config.height - borderUISize - borderPadding,
            'bee'
        );

        //add spaceships

        this.ship1 = new Ship (this, 
            game.config.width + borderUISize*6, 
            borderUISize*4, 
            'red flower', 
            0, 
            30).setOrigin(0, 0);

        this.ship2 = new Ship (this, 
            game.config.width + borderUISize*3, 
            borderUISize*5 + borderPadding*2, 
            'red flower',
             0, 
             20).setOrigin(0, 0);

        this.ship3 = new Ship (this, 
            game.config.width,
            borderUISize*6 + borderPadding * 4, 
            'red flower', 
            0, 
            10).setOrigin(0, 0);

        this.ship4 = new OrangeFlower (this, //new flower (spaceship) type that's smaller and worth more points
            game.config.width,
            borderUISize*3,
            'orange flower',
            0,
            100).setOrigin(0, 0);
        
        // //green UI background
        // this.add.rectangle (
        //     0,
        //     borderUISize + borderPadding,
        //     game.config.width,
        //     borderUISize*2,
        //     0x00FF00,
        //     ).setOrigin (0,0);


        //white borders
        // this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        // this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        // this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        // this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        
          // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
            key: 'red explode',
            frames: this.anims.generateFrameNumbers('red flower explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        //orange flower animation config
        this.anims.create({ 
            key: 'orange explode',
            frames: this.anims.generateFrameNumbers('orange flower explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        
        // initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#C8D98B',
            color: '#224029',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
    
        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press R to Restart or ← for Menu',  
            scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        },  null, this);
    }

    update() {
          // check key input for restart
         if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        
        this.grassybackground.tilePositionX -= 2;

        if (!this.gameOver) {               
            this.p1Rocket.update();         // update bee sprite
            this.ship1.update();           // updates flowers (x4)
            this.ship2.update();
            this.ship3.update();
            this.ship4.update();
        } 

      // check collisions
        if (this.checkCollision(this.p1Rocket, this.ship3)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship3);
        }

        if (this.checkCollision(this.p1Rocket, this.ship2)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship2);
        }

        if (this.checkCollision(this.p1Rocket, this.ship1)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship1);
        }

        if (this.checkCollision(this.p1Rocket, this.ship4)) {
            this.p1Rocket.reset();
            this.OrangeFlowerExplode(this.ship4);
        }
    }

   checkCollision(rocket, ship) {
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height && 
            rocket.height + rocket.y > ship.y) {
                return true;
            } else {

                return false;

            }
    }

    shipExplode(ship) { //collison for red flower
        //temporarily hide ship
        ship.alpha = 0;
        //create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'red flower explosion').setOrigin(0,0);
        boom.anims.play('red explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                         // reset ship position
            ship.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        // Chooses 1 of 4 twinkle sfx and randomizes which one plays on impact
        let value = Phaser.Math.Between(1, 4);
        if (value == 1) {
            this.sound.play('sfx_twinkle1');
        }
        else if(value == 2) {
            this.sound.play('sfx_twinkle2');
        }
        else if (value == 3) {
            this.sound.play('sfx_twinkle3');
        }
        else if (value == 4) {
            this.sound.play('sfx_twinkle4');
        }
    }

    OrangeFlowerExplode(ship) { //collison for orange flower
        //temporarily hide ship
        ship.alpha = 0;
        //create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'orange flower explosion').setOrigin(0,0);
        boom.anims.play('orange explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                         // reset ship position
            ship.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        // Chooses 1 of 4 twinkle sfx and randomizes which one plays on impact
        let value = Phaser.Math.Between(1, 4);
        if (value == 1) {
            this.sound.play('sfx_twinkle1');
        }
        else if (value == 2) {
            this.sound.play('sfx_twinkle2');
        }
        else if (value == 3) {
            this.sound.play('sfx_twinkle3');
        }
        else if (value == 4) {
            this.sound.play('sfx_twinkle4');
        }
    }
}