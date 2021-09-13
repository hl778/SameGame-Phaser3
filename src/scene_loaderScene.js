import GAME from "./index";
import rexpixelationpipelineplugin from "./plugins/rexpixelationpipelineplugin.min.js";
import rexbbcodetextplugin from "./plugins/rexbbcodetextplugin.min.js";


/**
 * Loader
 * Author: hl778 https://github.com/hl778
 */
export default class MyLoader extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    preload() {
        let myself = this;
        let here_x = GAME.scale.gameSize.width*0.5;
        // remove preloader gif
        if(document.getElementById("preloader")) {
            document.getElementById("preloader").remove();
        }
        // bar
        this.progressBar = this.add.graphics();
        this.progressBox = this.add.graphics();
        this.progressBox.fillStyle(0x0C0C0C, 0.1);
        this.progressBox.fillRect(here_x/2,
            GAME.scale.gameSize.height*0.2+70,
            here_x, 5);
        this.progressBar.fillStyle(0xf6f5f5, 0.9);

        // progress track
        this.load.on('progress', function (value) {
            myself.progressBar.fillRect(here_x/2,
                (GAME.scale.gameSize.height*0.2+70)+1, here_x * value*0.6, 3);
        });
        this.load.on('fileprogress', function (file) {}); // console.log(file.src)
        this.load.on('complete', function () {}); // when complete

        this.load.path = "assets/"; // assets path
        // load global packed images
        this.load.multiatlas('pack_texture',"pack_texture.json");
        //physics tile star
        this.load.json("tileAndStarPhysics", "tileAndStarPhysics.json");
        // mosaic plugin
        this.load.plugin('rexpixelationpipelineplugin', rexpixelationpipelineplugin, true);
        // text decorate plugin
        this.load.plugin('rexbbcodetextplugin', rexbbcodetextplugin, true);
        // credit page image
        this.load.image('creditLogo', 'credit.png');
        // lab scene sounds
        this.load.audio('popSound', 'popSound.mp3');
        this.load.audio('popSound2', 'popSound2.mp3');
        // load global assets finished
    }

    init(){
        localStorage.clear(); // clear debug settings stored in storage
    }

    create() {
        this.cameras.main.setBackgroundColor('#000000');
        let myself = this;
        let progress_offset = 0.6;
        // fill remaining bar
        for(let i=0;i<10;i++) {
            progress_offset+=0.04;
            myself.progressBar.fillRect(GAME.scale.gameSize.width*0.5/2,
                (GAME.scale.gameSize.height*0.2+70)+1,
                GAME.scale.gameSize.width*0.5 *progress_offset, 3);
        }
        //fade out current scene
        this.tweens.add({
            targets: myself.progressBar,
            ease: 'Sine.easeOut',
            alpha: { start: 1, to: 0 },
            duration:500,
            onComplete:(tween, targets)=>{
                this.tweens.killTweensOf(targets);
            }
        });
        this.tweens.add({
            targets: myself.progressBox,
            ease: 'Sine.easeOut',
            alpha: { start: 1, to: 0 },
            duration:200,
            onComplete:(tween, targets)=>{
                this.tweens.killTweensOf(targets);
                myself.progressBar.destroy();
                myself.progressBox.destroy();
                // fadeout camera
                myself.cameras.main.fadeOut(500, 0, 0, 0);
                myself.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                    this.scene.stop('loaderScene');
                    this.scene.start("titleScene");
                    // this.scene.start('tileMapViewScene',{lastLvlScore:0,level:9999});
                });
            }
        });
    }
}