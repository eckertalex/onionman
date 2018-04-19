var onionman = onionman || {};

onionman.game = new Phaser.Game(512, 384, Phaser.AUTO, 'onionman');

onionman.game.state.add('Boot', onionman.Boot);
onionman.game.state.add('Preload', onionman.Preload);
onionman.game.state.add('MainMenu', onionman.MainMenu)
onionman.game.state.add('Game', onionman.Game);
onionman.game.state.add('GameOver', onionman.GameOver);
onionman.game.state.add('GameWon', onionman.GameWon);

onionman.game.state.start('Boot');