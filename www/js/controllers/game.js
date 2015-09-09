app.controller('GameCtrl',function() {

  function game(){

    var width = window.innerWidth;
    var height = window.innerHeight;
    var gameScore = 0;
    var highScore = 0;

    var SteveGame = {

      init: function(){

        this.game = new Phaser.Game(width, height, Phaser.CANVAS, 'game');
        this.game.state.add("load", this.load);
        this.game.state.add("play", this.play);
        this.game.state.add("title", this.title);
        this.game.state.add("gameOver", this.gameOver);
        this.game.state.add("instructions", this.instructions);
        this.game.state.start("load");

      },

      load: {
        preload: function(){
          this.game.load.image('platform', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/ground.png');
          this.game.load.spritesheet('steve-running', 'http://s12.postimg.org/x2jislgft/steve.png', 52, 52);
          this.game.load.image('snow-bg', 'http://s11.postimg.org/c0e9d2q9f/space.png');
          this.game.load.image("logo", "http://s22.postimg.org/reg0xmfrl/game_title.png");
          this.game.load.image("instructions", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/instructions.png");
          this.game.load.image("game-over", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/game-over.png");
          this.game.load.image("startbtn", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/start-btn.png");
          this.game.load.image("playbtn", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/play-btn.png");
          this.game.load.image("restartBtn", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/restart-btn.png");
        },
        create: function(){
          this.game.state.start("title");
        }
      },


      // title screen

      title: {
        
        create: function(){
          this.bg = this.game.add.tileSprite(0, 0, width, height, 'snow-bg');
          this.logo = this.game.add.sprite(this.game.world.width/2 - 158, 20, 'logo');
          this.logo.alpha = 0;
          this.game.add.tween(this.logo).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 0);
          this.startBtn = this.game.add.button(this.game.world.width/2 - 159, this.game.world.height - 120, 'startbtn', this.startClicked);
          this.startBtn.alpha = 0;
          this.game.add.tween(this.startBtn).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 1000);
        },

        startClicked: function(){
          this.game.state.start("instructions");
        },

      },

    // instructions screen
      instructions: {
        
        create: function(){
          this.bg = this.game.add.tileSprite(0, 0, width, height, 'snow-bg');
          this.instructions = this.game.add.sprite(this.game.world.width/2 - 292, 30, 'instructions');
          this.instructions.alpha = 0;
          this.game.add.tween(this.instructions).to({alpha: 1}, 800, Phaser.Easing.Linear.None, true, 0);
          this.playBtn = this.game.add.button(this.game.world.width/2 - 159, this.game.world.height - 120, 'playbtn', this.playClicked);
          this.playBtn.alpha = 0;
          this.game.add.tween(this.playBtn).to({alpha: 1}, 800, Phaser.Easing.Linear.None, true, 800);
        },

        playClicked: function(){
          this.game.state.start("play");
        },
      },

      // playing
      play: {

          create: function(){
              highScore = gameScore > highScore ? Math.floor(gameScore) : highScore;
            gameScore = 0; 
            this.currentFrame = 0;
            this.particleInterval = 2 * 60;
            this.gameSpeed = 580;
            this.isGameOver = false;
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            this.bg = this.game.add.tileSprite(0, 0, width, height, 'snow-bg');
            this.bg.fixedToCamera = true;
            this.bg.autoScroll(-this.gameSpeed / 6, 0);

            this.emitter = this.game.add.emitter(this.game.world.centerX, -32, 50);

            this.platforms = this.game.add.group();
            this.platforms.enableBody = true;
            this.platforms.createMultiple(5, 'platform', 0, false);
            this.platforms.setAll('anchor.x', 0.5);
            this.platforms.setAll('anchor.y', 0.5);

            var plat;

            for(var i=0; i<5; i++){
              plat = this.platforms.getFirstExists(false);
              plat.reset(i * 192, this.game.world.height - 24);
              plat.width = 192;
              plat.height = 24;
              this.game.physics.arcade.enable(plat);
              plat.body.immovable = true;
              plat.body.bounce.set(0);
            }

            this.lastPlatform = plat;

            this.steve = this.game.add.sprite(100, this.game.world.height - 200, 'steve-running');
            this.steve.animations.add("run");
            this.steve.animations.play('run', 20, true);

            this.game.physics.arcade.enable(this.steve);

            this.steve.body.gravity.y = 1500;
            this.steve.body.collideWorldBounds = true;

            this.game.camera.follow(this.steve);
            this.cursors = this.game.input.keyboard.createCursorKeys();
            
            this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.emitter.start(false, 0, 0);
            this.score = this.game.add.text(20, 20, '', { font: "24px Arial", fill: "white", fontWeight: "bold" });
            
              if(highScore > 0){
                this.highScore = this.game.add.text(20, 45, 'Best: ' + highScore, { font: "18px Arial", fill: "white" });
              }
              
          },

          update: function(){
            var that = this;
            if(!this.isGameOver){
              gameScore += .5;
                this.gameSpeed += .03;
              this.score.text = 'Score: ' + Math.floor(gameScore);
                 
              this.currentFrame++;
              var moveAmount = this.gameSpeed / 100;
              this.game.physics.arcade.collide(this.steve, this.platforms);

              if(this.steve.body.bottom >= this.game.world.bounds.bottom){
                this.isGameOver = true;
                this.endGame();
                
              }

              if(this.cursors.up.isDown && this.steve.body.touching.down || this.spacebar.isDown && this.steve.body.touching.down || this.game.input.mousePointer.isDown && this.steve.body.touching.down || this.game.input.pointer1.isDown && this.steve.body.touching.down){
                this.steve.body.velocity.y = -500;
              }

              this.platforms.children.forEach(function(platform) {
                platform.body.position.x -= moveAmount;
                if(platform.body.right <= 0){
                  platform.kill();
                  var plat = that.platforms.getFirstExists(false);
                  plat.reset(that.lastPlatform.body.right + 192, that.game.world.height - (Math.floor(Math.random() * 50)) - 24);
                  plat.body.immovable = true;
                  that.lastPlatform = plat;
                }
              });

            }
            
          },


          endGame: function(){
            this.game.state.start("gameOver");
          }


      },
      gameOver: {

        create: function(){
          this.bg = this.game.add.tileSprite(0, 0, width, height, 'snow-bg');
          this.msg = this.game.add.sprite(this.game.world.width/2 - 280.5, 50, 'game-over');
          this.msg.alpha = 0;
          this.game.add.tween(this.msg).to({alpha: 1}, 600, Phaser.Easing.Linear.None, true, 0);

          this.score = this.game.add.text(this.game.world.width/2 - 100, 200, 'Score: ' + Math.floor(gameScore), { font: "42px Arial", fill: "white" });
          this.score.alpha = 0;
          this.game.add.tween(this.score).to({alpha: 1}, 600, Phaser.Easing.Linear.None, true, 600);

          this.restartBtn = this.game.add.button(this.game.world.width/2 - 183.5, 280, 'restartBtn', this.restartClicked);
          this.restartBtn.alpha = 0;
          this.game.add.tween(this.restartBtn).to({alpha: 1}, 600, Phaser.Easing.Linear.None, true, 1000);
        },

        restartClicked: function(){
          this.game.state.start("play");
        },
      }

    };

    SteveGame.init();
      
  };

  game();
});