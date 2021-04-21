class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/select_bloop.wav');
        this.load.audio('sfx_twinkle1', './assets/twinkle1.wav');
        this.load.audio('sfx_twinkle2', './assets/twinkle2.wav');
        this.load.audio('sfx_twinkle3', './assets/twinkle3.wav');
        this.load.audio('sfx_twinkle4', './assets/twinkle4.wav');
        this.load.audio('sfx_beelaunch', './assets/plink.wav');
        // load title screen
        this.load.image('title', 'assets/Rocket Petal Title Screen.png');
    }

    create() {

        //display title screen
        this.title = this.add.tileSprite(0, 0 , 640, 480,'title').setOrigin(0,0);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000   
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
      }
}