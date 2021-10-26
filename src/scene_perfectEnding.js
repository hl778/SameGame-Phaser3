import _my_settings from "./_globalSettings";

/**
 * Perfect ending scene
 * Author: hl778 https://github.com/hl778
 */
export default class Scene_PerfectEnding extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    preload() {
    }

    init(data) {
        this.score = data.score;
        _my_settings.tileMapMaxSteps = _my_settings.tileMapMaxSteps_store;
        _my_settings.tileMapMinSteps = _my_settings.tileMapMinSteps_store;
    }

    create() {
        this.cameras.main.setBackgroundColor('#000000');
        // ending text
        this.main_txt = this.add.text(this.game.scale.gameSize.width*0.1, this.game.scale.gameSize.height*0.2,
            '',{ fontFamily: 'advanced_pixel' }).setWordWrapWidth(this.game.scale.gameSize.width*0.8);
        this.main_txt.setFontSize(this.game.scale.gameSize.width*0.09);
        this.main_txt.style.setFill("#ffffff");
        this.main_txt.setOrigin (0,0); // anchor
        let txt_content = "KIRK, SPOCK, McCOY ARE FREED.\n\nTHEY COME TO LEARN SYBOK'S REAL MISSION,\n\nAND DECIDE TO" +
            "\n\nTRAVEL TO THE\n\nCREATION\n\nPLANET\n\n. . .";
        this.typewriterWithWrapped(txt_content,this.main_txt);
    }

    //----------------------------------helpers------------------------------------

    /**
     * type write text
     * @param text
     * @param target
     */
    typewriterWithWrapped(text, target) {
        // wrap text
        const lines = target.getWrappedText(text);
        const wrappedText = lines.join('\n');
        // do type writer
        const length = wrappedText.length
        let i = 0;
        this.time.addEvent({
            callback: () => {
                target.text += wrappedText[i];
                i+=1;
                if(i===length - 1) {
                    this.shiftNextScene();
                }
            },
            repeat: length - 1,
            delay: 30,
        });
    }

    /**
     * shift to next scene
     */
    shiftNextScene() {
        this.cameras.main.fadeOut(2500, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.stop("perfectEndingScene");
            this.scene.start("endingTileScene", {score: this.score});
        });
    }

}