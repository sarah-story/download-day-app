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
          this.game.load.image("logo", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/game-logo.png");
          this.game.load.image("instructions", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/instructions.png");
          this.game.load.image("game-over", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/game-over.png");
          this.game.load.image("startbtn", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/start-btn.png");
          this.game.load.image("playbtn", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/play-btn.png");
          this.game.load.image("restartBtn", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/restart-btn.png");
          this.game.load.image("exitBtn", "data:image/jpeg;base64,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");
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

          this.score = this.game.add.text(this.game.world.width/2 - 100, 180, 'Score: ' + Math.floor(gameScore), { font: "42px Arial", fill: "white" });
          this.score.alpha = 0;
          this.game.add.tween(this.score).to({alpha: 1}, 600, Phaser.Easing.Linear.None, true, 600);

          this.restartBtn = this.game.add.button(this.game.world.width/2 - 183.5, 260, 'restartBtn', this.restartClicked);
          this.restartBtn.alpha = 0;
          this.game.add.tween(this.restartBtn).to({alpha: 1}, 600, Phaser.Easing.Linear.None, true, 1000);

          this.exitBtn = this.game.add.button(this.game.world.width/2 - 183.5, 380, 'exitBtn', this.exitClicked);
          this.exitBtn.alpha = 0;
          this.game.add.tween(this.exitBtn).to({alpha: 1}, 600, Phaser.Easing.Linear.None, true, 1000);
        },

        restartClicked: function(){
          this.game.state.start("play");
        },

        exitClicked: function(){
          console.log("exit button clicked");
              if (confirm("Exit Steve on the Run?")) {
                history.back();
              };
        },


      }

    };

    SteveGame.init();
      
  };


  game();
});

 