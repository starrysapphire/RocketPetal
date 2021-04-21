class OrangeFlower extends Phaser.GameObjects.Sprite { 
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); //add to existing scene
        this.points = pointValue; //store point value
        this.moveSpeed = 5; //lets the orange flower be faster than the other flowers
    }

    update() {
        this.x -= this.moveSpeed;

        if (this.x < -this.width) {
            this.x = game.config.width;
        }
    }

    reset() {
        this.x = game.config.width + 50;
        this.alpha = 1;
    }
}