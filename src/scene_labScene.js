import _my_settings from "./_globalSettings";
import generate_tile from "./helper_generateTilesMap";
import AssetsBuilder from './assets_builder';
import AssetsAnimator from "./assets_animator";

/**
 * lab scene
 * Author: hl778 https://github.com/hl778
 */
export default class Scene_Lab extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    preload() {
        // retrieve json
        this.tileAndStarPhysics = this.cache.json.get('tileAndStarPhysics');
        // tile map arrangement
        this.blueprint = generate_tile(10, 10, 8);
    }

    init(data) {
        this.energy = 30; // velocity
        this.level = data.level; // set level
        // current score
        this.currentScore = Math.max(data.lastLvlScore, 0);
        this.previousStepScore = this.currentScore;
        this.scoreTween = null;
        this.tween_scoreImpactEnlarge = null;
        // goal
        this.currentGoal = _my_settings.levelStartGoal + data.level * _my_settings.levelStepGoal;
    }

    create() {
        // assets builder
        this.builder = new AssetsBuilder(this);
        // tween animator for assets
        this.assets_animator = new AssetsAnimator(this);
        this.popSound = this.sound.add('popSound');
        this.popSound2 = this.sound.add('popSound2');
        this.blueprint.then((result)=>{
            this.blueprint = result;
            //initialise other assets
            this.initialiseOthers();
            //initialise walls
            this.initialiseWalls();
            //initialise physics arcade and tile parameters
            this.initialiseMatterPhysics();
            this.generateDropTiles();
            // tile click events
            this.addTileClickEvent();
        });
    }

    update() {
        if(Array.isArray(this.blueprint)) {
            this.current_txt.setText(this.scoreTween.getValue() | 0); // score rolling text in int
        }
        let pointer = this.input.activePointer;
        if (pointer.isDown) {
            this.energy+=3.5;
            this.energy=Math.min(this.energy,120);
        }
    }


    //----------------------------------helpers------------------------------------

    calculateStepScore(totalNeighb) {
        /**
         * calculate score based on tiles eliminated per step
         * @type {number}
         */
        let first = _my_settings.singleTileScore;
        let last = _my_settings.singleTileScore + _my_settings.tileScoreStepScore * totalNeighb;
        return parseInt((first + last) * (totalNeighb + 1) / 2, 10);
    }

    calculatePenalty(remainSize) {
        /**
         * calculate penalty based on remaining tiles
         * @type {number}
         */
        let first = _my_settings.tileScorePenaltyInit;
        let last = _my_settings.tileScorePenaltyInit + _my_settings.tileScorePenaltyStep * remainSize;
        return parseInt((first + last) * remainSize / 2, 10);
    }

    initialiseOthers() {
        // background
        const html1 = this.builder.buildHTML1();

        // side
        const html2 = this.builder.buildHTML2();
        this.assets_animator.dispatchEnterScene(html2)();

        // blackboard frame
        const inner2 = this.builder.buildInner2();

        // goal texts
        let target_txt = this.builder.buildTargetTxt();
        //anim enter
        this.assets_animator.dispatchEnterScene(target_txt)();

        // score texts
        this.current_txt = this.builder.buildCurrentTxt(target_txt.y + target_txt.width * 0.25,"#dc8cf6");
        this.assets_animator.dispatchEnterScene(this.current_txt)();//anim enter
        // initial score rolling text
        this.scoreTween = this.tweens.addCounter({
            from: this.previousStepScore,
            to: this.currentScore,
            duration: _my_settings.rollingTxtDuration,
        });
        this.tween_scoreImpactEnlarge = this.tweens.add({targets: this.current_txt});

        let content = [
            "Test scroll text.",
            "KIRK,SPOCK,McCOY ARE FREED. THEY COME TO LEARN SYBOK'S",
            "REAL MISSION,AND DICIDE TO",
            "TRAVEL TO THE CREATION",
            "PLANET.",
            "",
        ];
        let graphics = this.make.graphics();
        graphics.fillRect(0, 20, this.game.scale.gameSize.width, this.game.scale.gameSize.height * 0.25);
        let mask = new Phaser.Display.Masks.GeometryMask(this, graphics);
        let text = this.add.text(0, 30, content, {
            color: '#afbda9',
            wordWrap: {width: this.game.scale.gameSize.width-5}
        }).setOrigin(0);
        text.style.fontFamily = "advanced_pixel";
        text.setFontSize(this.game.scale.gameSize.width*0.09);
        text.setMask(mask);
        //  The rectangle they can 'drag' within
        let zone = this.add.zone(0, 30, this.game.scale.gameSize.width, this.game.scale.gameSize.height * 0.25).setOrigin(0).setInteractive();
        zone.on('pointermove', function (pointer) {
            if (pointer.isDown) {
                text.y += (pointer.velocity.y / 20);
                text.y = Phaser.Math.Clamp(text.y, -50, 40);
            }
        });

        // pause button
        this.pauseBtn = this.builder.buildPauseBtn();
    }

    initialiseWalls() {
        let tileAndStarPhysics = this.cache.json.get('tileAndStarPhysics');
        //bottom invisible platform
        this.platform = this.matter.add.sprite(this.game.scale.gameSize.width * 0.5,
            this.game.scale.gameSize.height * 0.97, 'pack_texture',
            'platform.png', {shape: tileAndStarPhysics.platform});
        this.platform.setScale(this.game._scaleRatio); // retina display scale down
        // width height platform
        this.platform.displayWidth = this.game.scale.gameSize.width;
        this.platform.allowGravity = false;
        this.platform.displayHeight = 30;
        // align centre platform
        this.matter.alignBody(this.platform, this.game.scale.gameSize.width * 0.5,
            this.game.scale.gameSize.height * 0.99, Phaser.Display.Align.BOTTOM_CENTER);
        // further static
        this.platform.setStatic(true);

        // left wall
        this.wallLeft = this.matter.add.sprite(0, this.game.scale.gameSize.height * 0.65,
            'pack_texture', 'wallLeft.png', {shape: tileAndStarPhysics.wallLeft});
        this.wallLeft.setScale(this.game._scaleRatio); // retina display scale down
        this.wallLeft.displayWidth = this.game.scale.gameSize.width * 0.066; // max width
        this.wallLeft.displayHeight = this.game.scale.gameSize.height * 0.7; // max height
        this.wallLeft.allowGravity = false;
        this.wallLeft.setStatic(true);// no move
        // wallRight.alpha = 0;

        // right wall
        this.wallRight = this.matter.add.sprite(this.game.scale.gameSize.width, this.game.scale.gameSize.height * 0.65,
            'pack_texture', 'wallRight.png', {shape: tileAndStarPhysics.wallRight});
        // wallRight.setStatic(true);// no move
        this.wallRight.setScale(this.game._scaleRatio); // retina display scale down
        this.wallRight.displayWidth = this.game.scale.gameSize.width * 0.066; // max width
        this.wallRight.displayHeight = this.game.scale.gameSize.height * 0.7; // max height
        this.wallRight.allowGravity = false;
        this.wallRight.setStatic(true);// no move
        // wallRight.alpha = 0;

        // mid wall
        this.wallMid = this.matter.add.sprite(this.game.scale.gameSize.width * 0.5, this.game.scale.gameSize.height * 0.65,
            'pack_texture', 'wallRight.png', {shape: tileAndStarPhysics.wallRight});
        // wallRight.setStatic(true);// no move
        this.wallMid.setScale(this.game._scaleRatio); // retina display scale down
        this.wallMid.displayWidth = this.game.scale.gameSize.width * 0.066; // max width
        this.wallMid.displayHeight = this.game.scale.gameSize.height * 0.7; // max height
        this.wallMid.allowGravity = false;
        this.wallMid.setStatic(true);// no move
        // wallRight.alpha = 0;
    }

    initialiseMatterPhysics() {
        this.matter.world.setBounds(0, 0, this.game.scale.gameSize.width, this.game.scale.gameSize.height);

        // per tile width
        this.tileWidth = ((((this.wallRight.x - this.wallRight.displayWidth / 2) - (this.wallLeft.x + this.wallLeft.displayWidth / 2))) / _my_settings.colTiles);
        //arcade set not clash
        // wall and tiles in different groups
        this.colli_wallsGroup = this.add.group();
        this.colli_tileGroup = this.add.group();
        this.colli_wallsGroup.add(this.platform);
        this.colli_wallsGroup.add(this.wallLeft);
        this.colli_wallsGroup.add(this.wallRight);
        this.colli_wallsGroup.add(this.wallMid);
    }

    /**
     * click on pause
     */
    clickPause() {
        this.scene.switch("pausedLabScene");
    }

    /**
     * add event listener for each tile on click
     */
    addTileClickEvent() {
        let myself = this;
        let allDroppedCheck = setInterval(() => {
            if (myself.colli_tileGroup.children.entries.length === _my_settings.rowTiles * _my_settings.colTiles) {
                clearInterval(allDroppedCheck);
                myself.pauseBtn.visible = true;
                // event listener click on each tile
                for (let i = 0; i < myself.colli_tileGroup.children.entries.length; i++) {
                    myself.colli_tileGroup.children.entries[i].on('pointerup', function () {
                        myself.popSound.play();
                        // update current text
                        myself.previousStepScore = myself.currentScore;
                        myself.currentScore += Math.floor( Math.random() * 30 ) + 2; // test purpose
                        myself.scoreTween.stop(); // kill previous same tween
                        myself.scoreTween = myself.tweens.addCounter({
                            from: myself.previousStepScore,
                            to: myself.currentScore,
                            duration: _my_settings.rollingTxtDuration,
                        });
                        for (let k = 0; k < myself.colli_tileGroup.children.entries.length; k++) {
                            if(Math.abs(myself.colli_tileGroup.children.entries[k].x-this.x)<=10) {
                                myself.colli_tileGroup.children.entries[k].setVelocity(Math.random() -1, -myself.energy);
                                myself.popSound2.play();
                            }
                        }
                        myself.energy = 30;
                    });
                }
            }
        }, 130);
    }

    generateDropTiles() {
        let myself = this;
        let tileAndStarPhysics = this.cache.json.get('tileAndStarPhysics');
        //gear1
        let gear1 = this.matter.add.sprite((myself.wallMid.x - myself.wallLeft.x)/2,
            myself.game.scale.gameSize.height * 0.32, 'pack_texture', "lab1.png",
            {shape: tileAndStarPhysics["lab1"]});
        gear1.displayWidth = myself.game.scale.gameSize.width*0.12;
        gear1.scaleY = gear1.scaleX;
        gear1.setStatic(true);
        this.tweens.add({
            targets: gear1,
            ease: 'Linear',
            rotation:"+=6.28",
            repeat:-1,
            yoyo:false,
            duration: 2000,
        });
        //gear2
        let gear2 = this.matter.add.image((myself.wallMid.x + myself.wallRight.x)/2,
            myself.game.scale.gameSize.height * 0.45, 'pack_texture', "lab2.png",
            {shape: tileAndStarPhysics["lab2"],});
        gear2.displayWidth = myself.game.scale.gameSize.width*0.4;
        gear2.scaleY = gear2.scaleX;
        gear2.setStatic(true);
        this.tweens.add({
            targets: gear2,
            ease: 'Linear',
            rotation:"-=6.28",
            repeat:-1,
            yoyo:false,
            duration: 2000,
        });
        //gear3
        let gear3 = this.matter.add.sprite((myself.wallMid.x - myself.wallLeft.x)/2,
            myself.game.scale.gameSize.height * 0.38, 'pack_texture', "lab3.png",
            {shape: tileAndStarPhysics["lab3"]});
        gear3.displayWidth = myself.game.scale.gameSize.width*0.17;
        gear3.scaleY = gear3.scaleX;
        gear3.setStatic(true);
        this.tweens.add({
            targets: gear3,
            ease: 'Linear',
            rotation:"-=6.28",
            repeat:-1,
            yoyo:false,
            duration: 1000,
        });
        //gear4
        let gear4 = this.matter.add.sprite((myself.wallMid.x - myself.wallLeft.x),
            myself.game.scale.gameSize.height * 0.9, 'pack_texture', "lab1.png",
            {shape: tileAndStarPhysics["lab1"]
            });
        gear4.displayWidth = myself.game.scale.gameSize.width*0.6;
        gear4.scaleY = gear4.scaleX;
        gear4.setStatic(true);
        this.tweens.add({
            targets: gear4,
            ease: 'Linear',
            rotation:"-=6.28",
            repeat:-1,
            yoyo:false,
            duration: 2000,
        });
        this.tweens.add({
            targets: gear4,
            ease: 'Linear',
            repeat:-1,
            yoyo:true,
            x:{start:gear4.x-myself.game.scale.gameSize.width*0.2,to:gear4.x+myself.game.scale.gameSize.width*0.2},
            duration: 2000,
        });
        // tiles
        for (let i = myself.blueprint.length - 1; i >= 0; i--) {
            setTimeout(() => {
                for (let j = 0; j < myself.blueprint[0].length; j++) {
                    setTimeout(() => {
                        let cur_cell = myself.blueprint[i][j];
                        let temp_name = "star_tile" + cur_cell + ".png";
                        let temp_name_matterPhysic = "star_tile" + cur_cell;
                        // generate each cell col-wise
                        let tile = this.matter.add.sprite((myself.wallLeft.displayWidth / 2) + myself.tileWidth / 2 + (j * myself.tileWidth),
                            myself.game.scale.gameSize._height * 0.2, 'pack_texture', temp_name,
                            {shape: tileAndStarPhysics[temp_name_matterPhysic]}).setInteractive();
                        tile.displayWidth = myself.tileWidth * 0.65;
                        tile.scaleY = tile.scaleX; // keep the ratio
                        myself.colli_tileGroup.add(tile);
                    },j * 150);
                }
            }, (myself.blueprint.length - i - 1) * 150);
        }

    }

    // checkIfFilled(allEntries) {
    //     let leftpart = 0;
    //     let rightpart = 0;
    //     for (let i = 0; i < allEntries.length; i++) {
    //         let tile = allEntries[i];
    //         if (tile.x < this.wallMid.x) {
    //             leftpart += 1;
    //         } else {
    //             rightpart += 1;
    //         }
    //     }
    //     let ratio = leftpart / rightpart;
    //     if (ratio > 1.8) {
    //
    //     } else if (rightpart / leftpart > 1.8) {
    //
    //     }
    //     return true;
    // }

}