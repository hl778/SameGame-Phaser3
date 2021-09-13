import _my_settings from "./_globalSettings";
import generate_tile from "./helper_generateTilesMap";
import rexpixelationpipelineplugin from "./plugins/rexpixelationpipelineplugin.min";
import AssetsBuilder from './assets_builder';
import AssetsAnimator from "./assets_animator";

/**
 * the scene after the happy ending, that drops all non-clickable tiles
 * Author: hl778 https://github.com/hl778
 */
export default class Scene_EndingTile extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    preload() {
        // tile map arrangement
        this.blueprint = generate_tile(_my_settings.rowTiles, _my_settings.colTiles, _my_settings.totalChoices);
    }

    init(data) {
        // current score
        this.score = Math.max(data.score, 0);
        this.pipelinePixelFilters = [];
    }

    create() {
        // assets builder
        this.builder = new AssetsBuilder(this);
        // tween animator for assets
        this.assets_animator = new AssetsAnimator(this);
        this.cameras.main.setBackgroundColor('#000000');
        this.blueprint.then((result)=>{ // ensure blueprint generated first
            this.blueprint = result;
            //initialise other assets
            this.initialiseOthers();
            //initialise walls
            this.initialiseWalls();
            //initialise physics arcade and tile parameters
            this.initialiseArcadePhysics();
            //generate and drop tiles
            setTimeout(() => {
                let promise_dropped = this.generateDropTiles();
                promise_dropped.then(() => {
                    this.afterDropTiles();
                });
            }, 700);
        });
    }

    //----------------------------------helpers------------------------------------

    /**
     * create all assets have no physical effects
     */
    initialiseOthers() {
        // background
        this.builder.buildHTML1();

        // side
        const html2 = this.builder.buildHTML2();
        this.assets_animator.dispatchEnterScene(html2)();

        // blackboard frame
        this.builder.buildInner2();

        //txt
        this.end_txt = this.builder.buildEndTxt();
        let txt_content = "Tapir:\"I am Tapir.\nThe Camelia Desert is\nfilled with sad aliens.\"";
        setTimeout(() => {
            this.typewriterWithWrapped(txt_content, this.end_txt, 2);
        }, 1200);
    }

    /**
     * create boundary walls of tiles
     */
    initialiseWalls() {
        //bottom invisible platform
        this.platform = this.builder.buildPlatform();

        // left wall
        this.wallLeft = this.builder.buildLeftWall();

        // right wall
        this.wallRight = this.builder.buildRightWall();
    }

    /**
     * initialse physical effects using Arcade
     */
    initialiseArcadePhysics() {
        //arcade bound
        this.physics.world.setBounds(0, 0, this.game.scale.gameSize.width, this.game.scale.gameSize.height);

        // per tile width
        this.tileWidth = ((((this.wallRight.x - this.wallRight.displayWidth / 2) - (this.wallLeft.x + this.wallLeft.displayWidth / 2))) / _my_settings.colTiles);
        //arcade set not clash
        this.physics.world.checkCollision.up = false;
        // wall and tiles in different groups
        this.colli_wallsGroup = this.add.group();
        this.colli_tileGroup = this.add.group({
            maxSize: this.blueprint.length * this.blueprint[0].length
        });
        this.colli_wallsGroup.add(this.platform);
        this.colli_wallsGroup.add(this.wallLeft);
        this.colli_wallsGroup.add(this.wallRight);

        // custom collider on y-axis among tiles
        this.physics.add.collider(this.colli_tileGroup, this.colli_tileGroup, function (s1, s2) {
            let b1 = s1.body;
            let b2 = s2.body;

            if (b1.y > b2.y) {
                b2.y += (b1.top - b2.bottom);
                b2.stop();
            } else {
                b1.y += (b2.top - b1.bottom);
                b1.stop();
            }
        });

        // custom collider on y among walls and tiles, useful for the bottom platform
        this.physics.add.collider(this.colli_wallsGroup, this.colli_tileGroup, function (s1, s2) {
            let b1 = s1.body;
            let b2 = s2.body;

            if (b1.y > b2.y) {
                b2.y += (b1.top - b2.bottom);
                b2.stop();
            } else {
                b1.y += (b2.top - b1.bottom);
                b1.stop();
            }
        });
    }

    /**
     * create tiles and animations of dropping
     */
    generateDropTiles() {
        let myself = this;
        let init_tileY = myself.platform.y - myself.platform.displayHeight / 2 - (myself.tileWidth - 0.000001) / 2;
        // from bottom row of blueprint upwards, generate tiles and drop animations
        return new Promise((resolve, reject) => {
            for (let i = 0; i < myself.blueprint.length; i++) {
                setTimeout(() => {
                    // each row
                    for (let j = 0; j < myself.blueprint[0].length; j++) {
                        let cur_cell = myself.blueprint[i][j];
                        let temp_name = "tile" + cur_cell + ".png";
                        // generate each cell col-wise
                        let tile = myself.physics.add.sprite((myself.wallLeft.displayWidth / 2) + myself.tileWidth / 2 + (j * myself.tileWidth),
                            init_tileY - i * (myself.tileWidth - 0.000001), 'pack_texture', temp_name).setInteractive();
                        tile.setCollideWorldBounds(true);
                        tile.displayWidth = myself.tileWidth - 0.000001;
                        tile.scaleY = tile.scaleX; // keep the ratio
                        tile.setBounce(0);
                        tile.setFriction(1);
                        tile.setVelocity(0, 400);
                        tile.setMass(10.1);
                        // tile.body.gravity.x = 110;
                        // prevent go through Y
                        tile.body.customSeparateY = true;
                        myself.colli_tileGroup.add(tile);
                        // in case generate more tiles than expected
                        if (myself.colli_tileGroup.isFull()) {
                            resolve("initial tiles generated");
                        }
                    }
                }, i * 250);
            }
        });
    }

    /**
     * freeze tiles and create animations of ending scene
     */
    afterDropTiles() {
        let postFxPlugin = this.plugins.get('rexpixelationpipelineplugin');
        let myself = this;
        myself.tweens.addCounter({
            from: 1,
            to: 0.4,
            duration: 2000,
            delay: 100,
            onUpdate: (tintTween) => {
                const value1 = tintTween.getValue();
                myself.colli_tileGroup.setTint(Phaser.Display.Color.GetColor(255 * value1 * value1, 255 * value1 * value1, 255 * value1));
            },
            onComplete: () => {
                myself.input.on('pointerdown', function () {
                    myself.input.off('pointerdown');
                    myself.pipelinePixelFilter = postFxPlugin.add(myself.cameras.main);
                    myself.tweens.addCounter({
                        from: 1,
                        to: _my_settings.endingMosaic,
                        duration: 1100,
                        delay: 0,
                        onStart: () => {
                            myself.cameras.main.fadeOut(2000, 0, 0, 0);
                            myself.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                                myself.scene.stop('endingTileScene');
                                myself.scene.start('shareScene', {score: myself.score});
                            });
                        },
                        onUpdate: (pixelTween) => {
                            myself.pipelinePixelFilter.pixelWidth = pixelTween.getValue();
                            myself.pipelinePixelFilter.pixelHeight = pixelTween.getValue();
                        },
                    });
                });
            },
        });
    }

    /**
     * type write text
     * @param text
     * @param target
     * @param step
     */
    typewriterWithWrapped(text, target, step = 1) {
        // wrap text
        const lines = target.getWrappedText(text);
        const wrappedText = lines.join('\n');
        // do type writer
        const length = wrappedText.length
        let i = 0;
        this.time.addEvent({
            callback: () => {
                let temp_step = Math.min(step, length - i);
                target.text += wrappedText.slice(i, i + temp_step);
                i += temp_step;
            },
            repeat: Math.floor((length - 1) / step),
            delay: 60,
        });
    }
}