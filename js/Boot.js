var onionman = onionman || {};

onionman.Boot = function() {};

onionman.Boot.prototype = {
	preload: function() {
		this.load.image('logo', 'assets/images/favicon.png');
		this.load.image('preloadbar', 'assets/images/preloader-bar.png');
	},

	create: function() {
		this.scale.pageAlignHorizontally = true;

		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.state.start('Preload');
	}
};