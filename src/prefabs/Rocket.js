class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this); //adds to existing, displayList, updateList
        this.isFiring = false; //tracks rocket's firing status
        this.movementSpeed = 2; //pixels per frame
    }

    update() {
        if (this.isFiring) {
            this.y -= this.movementSpeed;
            if (this.y < borderUISize*3) {
                this.reset();
            }

        } else {
            if (keyLEFT.isDown) {
                this.x -= this.movementSpeed;
            }

            if (keyRIGHT.isDown) {
                this.x += this.movementSpeed;
            }

            if (Phaser.Input.Keyboard.JustDown(keyF)) {
                this.isFiring = true;
            }

            this.x = Phaser.Math.Clamp(this.x, 
                borderUISize+borderPadding, 
                game.config.width-borderUISize-borderPadding);
            }
    }

    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}