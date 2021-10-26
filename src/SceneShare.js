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
        this.builder.buildHTML1();

        // main image
        this.inner_share_img = this.builder.buildInnerShareImg();

        // side
        const html2 = this.builder.buildHTML2();
        this.assets_animator.dispatchEnterScene(html2)(); //anim enter

        // bottom img
        this.builder.buildHTML6();

        // score texts
        this.score_txt = this.builder.buildShareScoreTxt();
        this.assets_animator.dispatchEnterScene(this.score_txt)(); //anim enter
        // initial score rolling text
        this.scoreTween = this.tweens.addCounter({
            from: 0,
            to: this.score,
            duration: 2000,
        });

        // btn again
        this.builder.buildHTML11();
    }


    /**
     * play again button click event
     */
    clickAgain(entry) {
        entry.off('pointerdown');
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.stop("shareScene");
            this.scene.start("titleScene");
        });
    }

}