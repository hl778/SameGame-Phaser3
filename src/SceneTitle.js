import _my_settings from "./_globalSettings";
import AssetsAnimator from './assets_animator';
import AssetsBuilder from "./assets_builder";

/**
 * title scene
 * Author: hl778 https://github.com/hl778
 */
export default class SceneTitle extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    init() {
        // all btn
        this.titleBtn_group = [];
        // debug btn
        this.titleDebugBtn_group = [];
        // assets group
        this.titleScene_group = [];
        // debug settings
        if (localStorage.getItem("editedDebug") !== null) {
            for (let prop in _my_settings) {
                if (localStorage.getItem(prop) !== null) {
                    if (isNaN(localStorage.getItem(prop))) {
                        _my_settings[prop] = localStorage.getItem(prop);
                    } else {
                        _my_settings[prop] = Number(localStorage.getItem(prop));
                    }
                }
            }
        }
        // is ready to next scene
        this.isOver = false;
    }

    create() {
        // assets builder
        this.builder = new AssetsBuilder(this);
        // tween animator for assets
        this.assets_animator = new AssetsAnimator(this);
        this.cameras.main.setBackgroundColor('#000000');
        this.createAssets();
    }

    /**
     * create all assets
     * @returns {*[]}
     */
    createAssets() {
        // background
        const html1 = this.builder.buildHTML1();
        //anim enter
        this.assets_animator.dispatchEnterScene(html1)();
        this.titleScene_group.push(html1);

        // red gradient
        const html9 = this.builder.buildHTML9();
        //anim enter
        this.assets_animator.dispatchEnterScene(html9)();
        this.titleScene_group.push(html9);

        // frame
        const html9_1 = this.builder.buildHTML9_1();
        //anim enter
        this.assets_animator.dispatchEnterScene(html9_1)();
        this.titleScene_group.push(html9_1);

        // title
        this.html3 = this.builder.buildHTML3();
        //anim enter
        this.assets_animator.dispatchEnterScene(this.html3)();
        this.titleScene_group.push(this.html3);

        // side cloud
        const html2 = this.builder.buildHTML2();
        //anim enter
        this.assets_animator.dispatchEnterScene(html2)();
        this.titleScene_group.push(html2);

        // moon
        const html4 = this.builder.buildHTML4();
        //anim enter
        this.assets_animator.dispatchEnterScene(html4)();
        this.titleScene_group.push(html4);

        // character
        this.html5 = this.builder.buildHTML5();
        //anim enter
        this.assets_animator.dispatchEnterScene(this.html5)();
        this.titleScene_group.push(this.html5);

        // btn code
        this.html8 = this.builder.buildHTML8();
        this.titleBtn_group.push(this.html8);
        this.assets_animator.dispatchEnterScene(this.html8)(); //anim enter
        this.titleScene_group.push(this.html8);

        // btn credit
        this.html8credits = this.builder.buildHTML8Credits();
        this.titleBtn_group.push(this.html8credits);
        this.assets_animator.dispatchEnterScene(this.html8credits)(); //anim enter
        this.titleScene_group.push(this.html8credits);

        // btn debug
        this.html8Debug = this.builder.buildHTML8Debug();
        //anim enter
        this.assets_animator.dispatchEnterScene(this.html8Debug)();
        this.titleScene_group.push(this.html8Debug);

        // btn debug close
        this.html8Debug2 = this.builder.buildHTML8Debug2();
        this.assets_animator.dispatchEnterScene(this.html8Debug2)(); //anim enter
        this.titleScene_group.push(this.html8Debug2);

        // btn start
        this.html7 = this.builder.buildHTML7();
        this.titleBtn_group.push(this.html7);
        this.assets_animator.dispatchEnterScene(this.html7)();//anim enter
        this.titleScene_group.push(this.html7);

        // btn must pass
        this.html8_2 = this.builder.buildHTML8_2();
        this.titleBtn_group.push(this.html8_2);
        this.assets_animator.dispatchEnterScene(this.html8_2)(); //anim enter
        this.titleScene_group.push(this.html8_2);
        this.titleDebugBtn_group.push(this.html8_2);

        // btn scene to ending
        this.html8_6 = this.builder.buildHTML8_6();
        this.titleBtn_group.push(this.html8_6);
        this.titleScene_group.push(this.html8_6);
        this.titleDebugBtn_group.push(this.html8_6);

        // btn scene to share
        this.html8_5 = this.builder.buildHTML8_5();
        this.titleBtn_group.push(this.html8_5);
        this.titleScene_group.push(this.html8_5);
        this.titleDebugBtn_group.push(this.html8_5);

        // btn lab
        this.html8_3 = this.builder.buildHTML8_3();
        this.titleBtn_group.push(this.html8_3);
        this.titleScene_group.push(this.html8_3); //anim enter
        this.titleDebugBtn_group.push(this.html8_3);

        // btn scene to debug
        this.html8_7 = this.builder.buildHTML8_7();
        this.titleBtn_group.push(this.html8_7);
        this.titleScene_group.push(this.html8_7);
        this.titleDebugBtn_group.push(this.html8_7);

        // btn scene to map viewer
        this.html8_11 = this.builder.buildHTML8_11();
        this.titleBtn_group.push(this.html8_11);
        this.titleScene_group.push(this.html8_11);
        this.titleDebugBtn_group.push(this.html8_11);
    }


    clickOpenDebug() {
        this.html8Debug.visible = false;
        this.html8Debug2.visible = true;
        this.titleDebugBtn_group.forEach((ele) => {
            ele.visible = true;
        })
    }

    clickCloseDebug() {
        this.html8Debug2.visible = false;
        this.html8Debug.visible = true;
        this.titleDebugBtn_group.forEach((ele) => {
            ele.visible = false;
        })
    }

    /**
     * sourcecode button click event
     */
    clickContact() {
        window.open(_my_settings.contactAdd, _my_settings.contactNewTab);
    }

    /**
     * make all buttons non-clickable, prevent duplicated animations
     */
    disableAllBtns() {
        this.html5.off('pointerdown');
        this.html3.off('pointerdown');
        this.titleBtn_group.forEach((element) => {
            element.disableInteractive();
        });
    }

    /**
     * debug click event
     * @param entry
     */
    clickChar(entry) {
        // add fire balls
        let titleCharFire = this.add.sprite(entry.x - entry.displayWidth / 2 + Math.random() * (entry.x - entry.displayWidth / 2.5),
            entry.y - 100,
            'pack_texture', 'titleCharFire.png');
        titleCharFire.setOrigin(0.5, 0.5); // anchor
        titleCharFire.setScale(this.game._scaleRatio); // retina display scale down
        titleCharFire.displayWidth = this.game.scale.gameSize.width * 0.1; // max width
        titleCharFire.scaleY = titleCharFire.scaleX; // keep the ratio
        // char move
        this.tweens.add({
            targets: entry,
            y: {start: entry.y, to: entry.y - 5},
            duration: 90,
            ease: "Linear",
            yoyo: true,
            onStart: () => {
                entry.off('pointerdown');
            },
            onComplete: () => {
                entry.on('pointerdown', () => this.clickChar(entry));
            }
        });
        // fireballs move
        this.tweens.add({
            targets: titleCharFire,
            y: {start: titleCharFire.y, to: this.game.scale.gameSize.height + 100},
            duration: Math.random() * 1100 + 350,
            ease: "Linear",
            onComplete: () => {
                this.tweens.killTweensOf(titleCharFire);
                titleCharFire.destroy();
            }
        });
    }

    /**
     * debug passcode click event
     * @param entry
     */
    clickTitle(entry) {
        // add fire balls
        let titleHeaderFire = this.add.sprite(Math.random() * (this.game.scale.gameSize.width / 1.2),
            Math.random() * this.game.scale.gameSize.height * 0.1,
            'pack_texture', 'titleHeaderFire.png');
        titleHeaderFire.setOrigin(0.5, 0.5); // anchor
        titleHeaderFire.setScale(this.game._scaleRatio); // retina display scale down
        titleHeaderFire.displayWidth = this.game.scale.gameSize.width * (Math.random() * 0.6 + 0.1); // max width
        titleHeaderFire.scaleY = titleHeaderFire.scaleX; // keep the ratio

        this.tweens.add({
            targets: entry,
            scaleY: {start: entry.scaleY, to: entry.scaleY + 0.01},
            scaleX: {start: entry.scaleX, to: entry.scaleX + 0.01},
            duration: 50,
            ease: "Linear",
            yoyo: true,
            onStart: () => {
                entry.off('pointerdown');
            },
            onComplete: () => {
                entry.on('pointerdown', () => this.clickTitle(entry));
            }
        });

        // fireballs move
        this.tweens.add({
            targets: titleHeaderFire,
            y: {start: titleHeaderFire.y, to: titleHeaderFire.y + Math.random() * this.game.scale.gameSize.height + 10},
            x: {start: titleHeaderFire.x, to: titleHeaderFire.x + Math.random() * this.game.scale.gameSize.width + 10},
            scaleX: {start: titleHeaderFire.scaleX, to: 0},
            scaleY: {start: titleHeaderFire.scaleY, to: 0},
            rotation: {start: 0, to: Math.random() - 1},
            duration: Math.random() * 3000 + 200,
            ease: "Power1",
            onComplete: () => {
                this.tweens.killTweensOf(titleHeaderFire);
                titleHeaderFire.destroy();
            }
        });
    }

    /**
     * debug button click event
     */
    clickDebug() {
        this.disableAllBtns();
        this.cameras.main.fadeOut(200, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('debugScene');
        });
    }

    /**
     * map viewer button click event
     */
    clickTileMapViewer() {
        this.disableAllBtns();
        this.cameras.main.fadeOut(200, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('tileMapViewScene');
        });
    }

    /**
     * credits button click event
     */
    clickCredits() {
        this.disableAllBtns();
        this.cameras.main.fadeOut(300, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('creditsScene', {score: 9990});
        });

    }

    /**
     * share button click event
     * @param reaction_group
     */
    clickShare(reaction_group) {
        this.disableAllBtns();

        let myself = this;
        //exit scene animation for each child
        for (const sprite of reaction_group) {
            // dispatch actions
            this.assets_animator.dispatchExitScene(sprite)();
            //kill tween, not destroy
            this.tweens.killTweensOf(sprite);
        }
        let shiftScene = setInterval(() => {
            if (myself.isOver) { // after animation
                clearInterval(shiftScene);
                this.cameras.main.fadeOut(300, 0, 0, 0);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                    this.scene.start('shareScene', {score: 9990});
                });

            }
        }, 10);
    }

    /**
     * ending button click event
     * @param reaction_group
     */
    clickEnding(reaction_group) {
        this.disableAllBtns();

        let myself = this;
        //exit scene animation for each child
        for (const sprite of reaction_group) {
            // dispatch actions
            this.assets_animator.dispatchExitScene(sprite)();
            //kill tween, not destroy
            this.tweens.killTweensOf(sprite);
        }
        let shiftScene = setInterval(() => {
            if (myself.isOver) { // after animation
                clearInterval(shiftScene);
                this.cameras.main.fadeOut(300, 0, 0, 0);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                    myself.scene.start('perfectEndingScene', {score: 9990});
                });
            }
        }, 10);
    }

    /**
     * lab button click event
     * @param reaction_group
     */
    clickLab(reaction_group) {
        this.disableAllBtns();

        let myself = this;
        //exit scene animation for each child
        for (const sprite of reaction_group) {
            // dispatch actions
            this.assets_animator.dispatchExitScene(sprite)();
            //kill tween, not destroy
            this.tweens.killTweensOf(sprite);
        }
        let shiftScene = setInterval(() => {
            if (myself.isOver) { // after animation
                clearInterval(shiftScene);
                this.scene.start('labScene', {level: 0, lastLvlScore: 0});
            }
        }, 10);
    }

    /**
     * must pass button click event
     * @param reaction_group
     */
    clickMustPass(reaction_group) {
        this.disableAllBtns();
        let myself = this;
        //exit scene animation for each child
        for (const sprite of reaction_group) {
            // dispatch actions
            this.assets_animator.dispatchExitScene(sprite)();
            //kill tween, not destroy
            this.tweens.killTweensOf(sprite);
        }
        let shiftScene = setInterval(() => {
            if (myself.isOver) { // after animation
                clearInterval(shiftScene);
                this.scene.start('gameScene', {level: 0, lastLvlScore: 0, mustPass: true});
            }
        }, 10);
    }


    /**
     * start button click event
     * @param reaction_group
     */
    clickStart(reaction_group) {
        this.disableAllBtns();

        let myself = this;
        //exit scene animation for each child
        for (const sprite of reaction_group) {
            // dispatch actions
            this.assets_animator.dispatchExitScene(sprite)();
            //kill tween, not destroy
            this.tweens.killTweensOf(sprite);
        }
        let shiftScene = setInterval(() => {
            if (myself.isOver) { // after animation
                clearInterval(shiftScene);
                this.scene.start('gameScene', {level: 0, lastLvlScore: 0});
            }
        }, 30);

    }

}