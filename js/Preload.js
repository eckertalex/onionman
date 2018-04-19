var onionman = onionman || {};

onionman.Preload = function() {};

onionman.Preload.prototype = {
	preload: function() {
		this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
		this.splash.anchor.setTo(0.5);

		this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
		this.preloadBar.anchor.setTo(0.5);

		this.load.setPreloadSprite(this.preloadBar);

        this.load.image('background',   'assets/images/background.png');
        this.load.tilemap('level',      'assets/levels/level.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tileset', 		'assets/levels/beastlands.png');
		this.load.spritesheet('dude',   'assets/sprites/dude.png', 32, 48);
		this.load.audio('theme',        'assets/sounds/theme.mp3');
		this.load.audio('jump',         'assets/sounds/jump.wav');
	},

	create: function() {
		music = this.game.add.audio('theme');
    	music.loop = true;
		music.play();
		
		this.state.start('MainMenu');
	}
};