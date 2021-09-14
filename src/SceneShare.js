import AssetsBuilder from "./assets_builder";
import AssetsAnimator from "./assets_animator";

/**
 * Share scene
 * Author: hl778 https://github.com/hl778
 */
export default class SceneShare extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    init(data) {
        this.score = data.score;
        this.tooLong = false;
        if (this.score.toString().length > 4) {
            this.tooLong = true;
            this.score = parseInt(this.score.toString().substr(0, this.score.toString().length - 4));
        }
    }

    create() {
        // assets builder
        this.builder = new AssetsBuilder(this);
        // tween animator for assets
        this.assets_animator = new AssetsAnimator(this);
        this.cameras.main.setBackgroundColor('#000000');
        //initialise other assets
        this.initialiseOthers();
    }

    update() {
        if (this.tooLong) {
            this.score_txt.setText("CONGRATULATIONS, YOU'VE COLLECTED " + (this.scoreTween.getValue() | 0) + "K ENERGY."); // score rolling text in int
        } else {
            this.score_txt.setText("CONGRATULATIONS, YOU'VE COLLECTED " + (this.scoreTween.getValue() | 0) + " ENERGY."); // score rolling text in int
        }
    }

    //----------------------------------helpers------------------------------------

    /**
     * create assets with no physical effects
     */
    initialiseOthers() {
        // background
        this.builder.buildPackTextureAssets({
            x:0,y:0,
            filename:"html1.png", anchor:[0,0],widthPercentage:1,
            heightPercentage:1,name:"html1",
            canClick:false,isVisible:true
        });

        // main image
        this.inner_share_img = this.builder.buildPackTextureAssets({
            x:this.game.scale.gameSize.width*0.5,y:this.game.scale.gameSize.height*0.05,
            filename:'inner_share_img.png', anchor:[0.5,0],widthPercentage:0.8,name:"inner_share_img",canClick:false,
            isVisible:true
        });

        // side
        const html2 = this.builder.buildPackTextureAssets({
            x:0,y:-25,
            filename:"html2.png", anchor:[0,0],widthPercentage:1,name:"html2",canClick:false,isVisible:true
        });
        this.assets_animator.dispatchEnterScene(html2); //anim enter

        // bottom img
        this.builder.buildPackTextureAssets({
            x:this.game.scale.gameSize.width+10,y:this.game.scale.gameSize.height-30,
            filename:'html6.png', anchor:[1,1],widthPercentage:0.5,name:"html6",canClick:false,
            isVisible:true
        });

        // score texts
        this.score_txt = this.builder.buildText({
            x:this.game.scale.gameSize.width * 0.5,y:this.inner_share_img.y+this.inner_share_img.displayHeight+this.game.scale.gameSize.width*0.1,
            wrapWidth:this.inner_share_img.displayWidth,fontSize:Math.min(this.game.scale.gameSize.width * 0.09, 100),
            fill:"#ffffff",anchor:[0.5,0],text:"",isVisible:true,name:'share_score_txt'
        });
        this.assets_animator.dispatchEnterScene(this.score_txt); //anim enter
        // initial score rolling text
        this.scoreTween = this.tweens.addCounter({
            from: 0,
            to: this.score,
            duration: 2000,
        });
        // btn again
        const html11 = this.builder.buildPackTextureAssets({
            x:this.game.scale.gameSize.width*0.5,y:this.game.scale.gameSize.height*0.8,
            filename:'html11.png', anchor:[0.5,0],widthPercentage:0.5,name:"html11",canClick:true,
            isVisible:true
        });
        html11.on('pointerdown', () => this.clickAgain(html11));
    }


    /**
     * play again button click event
     */
    clickAgain(entry) {
        entry.off('pointerdown');
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            this.scene.stop("shareScene");
            this.scene.start("titleScene");
        });
    }

}