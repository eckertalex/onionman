var onionman = onionman || {};

onionman.GameWon = function() {};

onionman.GameWon.prototype = {
	create: function() {
		this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
		this.background.fixedToCamera = true;

		var text = "You beat the Game!";
		var style = { font: "36px Arial", fill: "#fff", align: "center" };
		var t = this.game.add.text(this.game.width/2, this.game.height/2-100, text, style);
		t.anchor.set(0.5);
		
		text = "Press Spacebar";
		style = { font: "20px Arial", fill: "#fff", align: "center" };
		t = this.game.add.text(this.game.width/2, this.game.height/2-60, text, style);
		t.anchor.set(0.5);
		
		this.play = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},

	update: function() {
		if(this.game.input.activePointer.justPressed() || this.play.isDown) {
			this.sound.play('jump');
			this.game.state.start('MainMenu');
		}
	}
};