/*
GENERAL INFO:
Name: Stevie Rodriguez
Project Title: Rocket Petal (the Rocket Patrol mod)
Date: April 17, 2021
How long it took to complete the project: CHANGE LATER (started at 10 pm on april 17)

..............................................................................................................

POINTS BREAKDOWN:
Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60)
Implement parallax scrolling (10)
Create 4 new explosion SFX and randomize which one plays on impact (10)
 - "Explosion" is more of a twinkle sound since I wanted it to be gentle
Create a new animated sprite for the Spaceship enemies (10)
 - Due to the redesigning, these ended up being flower targets
Display the time remaining (in seconds) on the screen (10)

...............................................................................................................

CREDITS:
Base rocket patrol code provided by Adam Smith and Nathan Altice.
All artwork and UI changes by me.
Background music and twinkle sound effects by Autumn Moulios. (Check out the background track on her soundcloud here! https://soundcloud.com/strawberry-moondae/softly-dreaming)
Bee buzzing sfx recorded by byjoshberry on Freesound. (https://freesound.org/people/byjoshberry/sounds/478315/)
Select and bee launch sfx made by me.
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