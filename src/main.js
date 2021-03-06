/*
GENERAL INFO:
Name: Stevie Rodriguez
Project Title: Rocket Petal (the Rocket Patrol mod)
Date: April 17, 2021
How long it took to complete the project: About 12 hours

..............................................................................................................

POINTS BREAKDOWN:
Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60)
Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
 - Due to redesign, this is a flower, not a spaceship
Implement parallax scrolling (10)
Create 4 new explosion SFX and randomize which one plays on impact (10)
 - "Explosion" is more of a twinkle sound since I wanted it to be gentler

 (Total: 100 points)
...............................................................................................................

CREDITS:
Base rocket patrol code provided by Adam Smith and Nathan Altice.
All artwork and UI changes by me.
Background music by Strawberry Moondae (Autumn Moulios). Check out the background track on her soundcloud here! https://soundcloud.com/strawberry-moondae/softly-dreaming
Select, twinkle, and bee launch sfx made by me using Leshy SFMaker (https://www.leshylabs.com/apps/sfMaker/).
*/

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyLEFT, keyRIGHT, keyF, keyR;