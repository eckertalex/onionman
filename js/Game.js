var onionman = onionman || {};

onionman.Game = function() {};

onionman.Game.prototype = {
	create: function() {
		this.game.world.setBounds(0, 0, 800, 600);

	    this.map = this.add.tilemap('level');
        this.map.addTilesetImage('tiles', 'tileset');
        this.backgroundLayer = this.map.createLayer('backgroundLayer');
        this.platforms = this.map.createLayer('blockedLayer');
        this.map.setCollisionBetween(1, 2006, true, 'blockedLayer');
        this.deadly = this.map.createLayer('deadlyLayer');
        this.map.setCollisionBetween(1, 2006, true, 'deadlyLayer');
        this.finish = this.map.createLayer('finishLayer');
        this.map.setCollisionBetween(1, 2006, true, 'finishLayer');

        // Uncomment this on to see the collision tiles
        // this.platforms.debug = true;

        this.backgroundLayer.resizeWorld();
        this.game.physics.arcade.gravity.y = 250;

        var startPos = this.findObjectsByType('playerStart', this.map, 'objectsLayer');
        this.player = this.game.add.sprite(startPos[0].x, startPos[0].y, 'dude');
        this.game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 350;
        this.player.body.collideWorldBounds = true;
        this.player.body.setSize(20, 32, 5, 16);
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);
        this.game.camera.follow(this.player);

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

	update: function() {
        this.playerHitPlatform = this.game.physics.arcade.collide(this.player, this.platforms);
        this.playerAtFinish = this.game.physics.arcade.collide(this.player, this.finish);

        if(this.game.physics.arcade.collide(this.player, this.deadly)) {
            this.game.state.start('GameOver');
        }

        this.player.body.velocity.x = 0;
        if(this.cursors.left.isDown) {
            this.player.body.velocity.x = -150;
            this.player.animations.play('left');
        }
        else if(this.cursors.right.isDown) {
            this.player.body.velocity.x = 150;
            this.player.animations.play('right');
        }
        else {
            this.player.animations.stop();
            this.player.frame = 4;
        }

        if(this.jumpButton.isDown && this.player.body.onFloor() && this.playerHitPlatform) {
            this.sound.play('jump');
            this.player.body.velocity.y = -350;
        }

        if(this.gameWon()) {
            this.game.state.start('GameWon');
        }

        var self = this;
        window.onkeydown = function(event) {
            if (event.keyCode == 80){
                self.game.paused = !self.game.paused;
            }
        }
    },
    
    gameWon: function() {
        if(this.playerAtFinish) {
            return true;
        }
        else {
            return false;
        }
    },

    findObjectsByType: function(type, map, layer) {
        var result = new Array();
        map.objects[layer].forEach(function(element){
            if(element.properties.type === type) {
                element.y -= map.tileHeight;
                result.push(element);
            }      
        });
        return result;
    },
};