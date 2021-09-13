/**
 * paused scene
 * Author: hl778 https://github.com/hl778
 */
export default class Scene_Paused extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    preload() {
    }

    init() {
    }

    create() {
        // resume button
        this.resumeBtn = this.add.sprite(this.game.scale.gameSize.width*0.5,
            this.game.scale.gameSize.height*0.3,
            'pack_texture', 'html8_8.png');
        this.resumeBtn.setOrigin(0.5, 0.5); // anchor
        this.resumeBtn.setScale(this.game._scaleRatio); // retina display scale down
        this.resumeBtn.displayWidth = this.game.scale.gameSize.width * 0.8; // max width
        this.resumeBtn.scaleY = this.resumeBtn.scaleX; // keep the ratio
        this.resumeBtn.setInteractive({ useHandCursor: true });//btn hover event
        this.resumeBtn.on('pointerdown', () => this.clickResume());// callback

        // restart
        this.restartCurBtn = this.add.sprite(this.game.scale.gameSize.width*0.5,
            this.resumeBtn.y+this.resumeBtn.displayHeight/2+80,
            'pack_texture', 'html8_10.png');
        this.restartCurBtn.setOrigin(0.5, 0.5); // anchor
        this.restartCurBtn.setScale(this.game._scaleRatio); // retina display scale down
        this.restartCurBtn.displayWidth = this.game.scale.gameSize.width * 0.8; // max width
        this.restartCurBtn.scaleY = this.restartCurBtn.scaleX; // keep the ratio
        this.restartCurBtn.setInteractive({ useHandCursor: true });//btn hover event
        this.restartCurBtn.on('pointerdown', () => this.clickRestart());// callback

        // back main menu button
        this.backMainMenuBtn = this.add.sprite(this.game.scale.gameSize.width*0.5,
            this.restartCurBtn.y+this.restartCurBtn.displayHeight/2+80,
            'pack_texture', 'html8_9.png');
        this.backMainMenuBtn.setOrigin(0.5, 0.5); // anchor
        this.backMainMenuBtn.setScale(this.game._scaleRatio); // retina display scale down
        this.backMainMenuBtn.displayWidth = this.game.scale.gameSize.width * 0.8; // max width
        this.backMainMenuBtn.scaleY = this.backMainMenuBtn.scaleX; // keep the ratio
        this.backMainMenuBtn.setInteractive({ useHandCursor: true });//btn hover event
        this.backMainMenuBtn.on('pointerdown', () => this.clickBackMenu());// callback
    }

    update() {
    }

    clickResume() {
        localStorage.removeItem('restart_bluePrint');
        localStorage.removeItem('restart_level');
        localStorage.removeItem('restart_startScore');
        this.scene.stop();
        this.scene.wake("gameScene");
    }

    clickBackMenu() {
        localStorage.removeItem('restart_bluePrint');
        localStorage.removeItem('restart_level');
        localStorage.removeItem('restart_startScore');
        this.scene.stop("gameScene");
        this.scene.stop();
        this.scene.start("titleScene");
    }

    clickRestart(){
        this.scene.stop("gameScene");
        this.scene.stop();
        let level = parseInt(localStorage.getItem("restart_level"), 10);
        let lastLvlScore = parseInt(localStorage.getItem("restart_startScore"), 10);
        this.scene.start('gameScene',{level:level,lastLvlScore:lastLvlScore});
    }


}