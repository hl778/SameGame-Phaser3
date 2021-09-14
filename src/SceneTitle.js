import _globalSettings from "./_globalSettings";
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
            for (let prop in _globalSettings) {
                if (localStorage.getItem(prop) !== null) {
                    if (isNaN(localStorage.getItem(prop))) {
                        _globalSettings[prop] = localStorage.getItem(prop);
                    } else {
                        _globalSettings[prop] = Number(localStorage.getItem(prop));
                    }
                }
            }
        }
    }

    create() {
        // assets builder
        this.builder = new AssetsBuilder(this);
        // tween animator for assets
        this.assets_animator = new AssetsAnimator(this);
        this.cameras.main.setBackgroundColor('#000000');
        this.createAssets();
        this.dispatchEnterAnimation();
    }

    /**
     * create all assets
     * @returns {*[]}
     */
    createAssets() {
        // background
        const html1 = this.builder.buildPackTextureAssets({
            x:0,y:0,
            filename:"html1.png", anchor:[0,0],widthPercentage:1,
            heightPercentage:1,name:"html1",
            canClick:false,isVisible:true
        });
        this.titleScene_group.push(html1);

        // red gradient
        const html9 = this.builder.buildPackTextureAssets({
            x:0,y:0,
            filename:"html9.png", anchor:[0,0],widthPercentage:(this.game.scale.gameSize.width - 20)/this.game.scale.gameSize.width,
            heightPercentage:(this.game.scale.gameSize.height - 20)/this.game.scale.gameSize.height,name:"html9",
            canClick:false,isVisible:true
        });
        // create an identical animation same as another sprite
        this.assets_animator.addEnterSameAs("html9","html1");
        this.titleScene_group.push(html9);

        // frame
        const html9_1 = this.builder.buildPackTextureAssets({
            x:this.game.scale.gameSize.width * 0.01,y:0,
            filename:"html9_1.png", anchor:[0,0],widthPercentage:0.99,heightPercentage:1,name:"html9_1",
            canClick:false,isVisible:true
        });
        this.titleScene_group.push(html9_1);

        // title
        this.html3 = this.builder.buildPackTextureAssets({
            x:this.game.scale.gameSize.width * 0.5,y:20,
            filename:"html3.png", anchor:[0.5,0],widthPercentage:0.9,name:"html3",canClick:true,isVisible:true
        });
        this.html3.on('pointerdown', () => this.clickTitle(this.html3));
        this.titleScene_group.push(this.html3);

        // side cloud
        const html2 = this.builder.buildPackTextureAssets({
            x:0,y:-25,
            filename:"html2.png", anchor:[0,0],widthPercentage:1,name:"html2",canClick:false,isVisible:true
        });
        this.titleScene_group.push(html2);

        // moon
        this.html4 = this.builder.buildPackTextureAssets({
            x:this.game.scale.gameSize.width,y:this.game.scale.gameSize.height - this.game.scale.gameSize.width * 0.075,
            filename:"html4.png", anchor:[1,1],widthPercentage:1,name:"html4",canClick:false,isVisible:true
        });
        this.titleScene_group.push(this.html4);

        // character
        this.html5 = this.builder.buildPackTextureAssets({
            x:this.game.scale.gameSize.width,y:this.game.scale.gameSize.height + this.game.scale.gameSize.width * 0.105,
            filename:"html5.png", anchor:[1,1],widthPercentage:0.97,name:"html5",canClick:true,isVisible:true
        });
        this.html5.on('pointerdown', () => this.clickChar(this.html5));
        this.titleScene_group.push(this.html5);

        // btn code
        this.html8 = this.builder.buildPackTextureAssets({
            x:0.9,y:this.game.scale.gameSize.height - this.game.scale.gameSize.width * 0.2,filename:"html8.png",
            anchor:[0,1],widthPercentage:0.35,name:"html8",canClick:true,isVisible:true
        });
        this.html8.on('pointerdown', () => this.clickContact());
        this.titleBtn_group.push(this.html8);
        this.titleScene_group.push(this.html8);

        // btn credit
        this.html8credits = this.builder.buildPackTextureAssets({
            x:0.9,y:this.html8.y + this.html8.displayHeight + 20,filename:"html8credits.png",
            anchor:[0,1],widthPercentage:0.35,name:"html8credits",canClick:true,isVisible:true
        });
        this.html8credits.on('pointerdown', () => this.clickCredits());
        // create an identical animation same as another sprite
        this.assets_animator.addEnterSameAs("html8credits","html8");
        this.titleBtn_group.push(this.html8credits);
        this.titleScene_group.push(this.html8credits);

        // btn debug
        this.html8Debug = this.builder.buildPackTextureAssets({
            x:this.game.scale.gameSize.width,y:this.html8credits.y,filename:"html8Debug.png",
            anchor:[1,1],widthPercentage:0.4,name:"html8Debug",canClick:true,isVisible:true
        });
        this.html8Debug.on('pointerdown', () => this.clickOpenDebug());
        this.titleScene_group.push(this.html8Debug);

        // btn debug close
        this.html8Debug2 = this.builder.buildPackTextureAssets({
            x:this.game.scale.gameSize.width,y:this.html8credits.y,filename:"html8Debug2.png",
            anchor:[1,1],widthPercentage:0.4,name:"html8Debug2",canClick:true,isVisible:false
        });
        this.html8Debug2.on('pointerdown', () => this.clickCloseDebug());
        this.titleScene_group.push(this.html8Debug2);

        // btn start
        this.html7 = this.builder.buildPackTextureAssets({
            x:0.9,y:this.html8.y - this.html8.displayHeight - 20,filename:"html7.png",
            anchor:[0,1],widthPercentage:0.55,name:"html7",canClick:true,isVisible:true
        });
        this.html7.on('pointerdown', () => this.clickStart());
        this.titleBtn_group.push(this.html7);
        this.titleScene_group.push(this.html7);

        // btn must pass
        this.html8_2 = this.builder.buildPackTextureAssets({
            x:0.9,y:this.html7.y - this.html7.displayHeight - 5,filename:"html8_2.png",
            anchor:[0,1],widthPercentage:0.55,name:"html8_2",canClick:true,isVisible:false
        });
        this.html8_2.on('pointerdown', () => this.clickMustPass());
        this.titleBtn_group.push(this.html8_2);
        this.titleScene_group.push(this.html8_2);
        this.titleDebugBtn_group.push(this.html8_2);

        // btn scene to ending
        this.html8_6 = this.builder.buildPackTextureAssets({
            x:0.9,y:this.html8_2.y - this.html8_2.displayHeight - 5,filename:"html8_6.png",
            anchor:[0,1],widthPercentage:0.55,name:"html8_6",canClick:true,isVisible:false
        });
        this.html8_6.on('pointerdown', () => this.clickEnding());// callback
        this.titleBtn_group.push(this.html8_6);
        this.titleScene_group.push(this.html8_6);
        this.titleDebugBtn_group.push(this.html8_6);
        // create an identical exit animation same as another sprite
        this.assets_animator.addExitSameAs("html8_6","html8_2");

        // btn scene to share
        this.html8_5 = this.builder.buildPackTextureAssets({
            x:0.9,y:this.html8_6.y - this.html8_6.displayHeight - 5,filename:"html8_5.png",
            anchor:[0,1],widthPercentage:0.55,name:"html8_5",canClick:true,isVisible:false
        });
        this.html8_5.on('pointerdown', () => this.clickShare());
        this.titleBtn_group.push(this.html8_5);
        this.titleScene_group.push(this.html8_5);
        this.titleDebugBtn_group.push(this.html8_5);
        // create an identical exit animation same as another sprite
        this.assets_animator.addExitSameAs("html8_5","html8_2");

        // btn lab
        this.html8_3 = this.builder.buildPackTextureAssets({
            x:0.9,y:this.html8_5.y - this.html8_5.displayHeight - 5,filename:"html8_3.png",
            anchor:[0,1],widthPercentage:0.55,name:"html8_3",canClick:true,isVisible:false
        });
        this.html8_3.on('pointerdown', () => this.clickLab());
        this.titleBtn_group.push(this.html8_3);
        this.titleScene_group.push(this.html8_3);
        this.titleDebugBtn_group.push(this.html8_3);
        // create an identical exit animation same as another sprite
        this.assets_animator.addExitSameAs("html8_3","html8_2");

        // btn scene to debug
        this.html8_7 = this.builder.buildPackTextureAssets({
            x:0.9,y:this.html8_3.y - this.html8_3.displayHeight - 5,filename:"html8_7.png",
            anchor:[0,1],widthPercentage:0.55,name:"html8_7",canClick:true,isVisible:false
        });
        this.html8_7.on('pointerdown', () => this.clickDebug());
        this.titleBtn_group.push(this.html8_7);
        this.titleScene_group.push(this.html8_7);
        this.titleDebugBtn_group.push(this.html8_7);
        // create an identical exit animation same as another sprite
        this.assets_animator.addExitSameAs("html8_7","html8_2");

        // btn scene to map viewer
        this.html8_11 = this.builder.buildPackTextureAssets({
            x:0.9,y:this.html8_7.y - this.html8_7.displayHeight - 5,filename:"html8_11.png",
            anchor:[0,1],widthPercentage:0.55,name:"html8_11",canClick:true,isVisible:false
        });
        this.html8_11.on('pointerdown', () => this.clickTileMapViewer());
        this.titleBtn_group.push(this.html8_11);
        this.titleScene_group.push(this.html8_11);
        this.titleDebugBtn_group.push(this.html8_11);
        // create an identical exit animation same as another sprite
        this.assets_animator.addExitSameAs("html8_11","html8_2");
    }

    /**
     * dispatch scene enter animations
     */
    dispatchEnterAnimation() {
        for(const sprite of this.titleScene_group) {
            this.assets_animator.dispatchEnterScene(sprite); //anim enter
        }
    }

    /**
     * dispatch scene exit animations
     */
    dispatchExitAnimation() {
        //exit scene animation for each child
        for (const sprite of this.titleScene_group) {
            // dispatch actions
            this.assets_animator.dispatchExitScene(sprite);
        }
    }

    /**
     * open debug menu
     */
    clickOpenDebug() {
        this.html8Debug.visible = false;
        this.html8Debug2.visible = true;
        this.titleDebugBtn_group.forEach((ele) => {
            ele.visible = true;
        })
    }

    /**
     * close debug menu
     */
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
        window.open(_globalSettings.contactAdd, _globalSettings.contactNewTab);
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
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            this.scene.start('debugScene');
        });
    }

    /**
     * map viewer button click event
     */
    clickTileMapViewer() {
        this.disableAllBtns();
        this.cameras.main.fadeOut(200, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            this.scene.start('tileMapViewScene');
        });
    }

    /**
     * credits button click event
     */
    clickCredits() {
        this.disableAllBtns();
        this.cameras.main.fadeOut(300, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            this.scene.start('creditsScene', {score: 9990});
        });
    }

    /**
     * share button click event
     */
    clickShare() {
        this.disableAllBtns();
        //exit scene animation
        this.dispatchExitAnimation();
        let promise_lastPerson = this.assets_animator.dispatchLastPersonExit(this.html4);
        promise_lastPerson.then(()=>{
            this.cameras.main.fadeOut(300, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.scene.start('shareScene', {score: 9990});
            });
        });
    }

    /**
     * ending button click event
     */
    clickEnding() {
        this.disableAllBtns();
        //exit scene animation
        this.dispatchExitAnimation();
        let promise_lastPerson = this.assets_animator.dispatchLastPersonExit(this.html4);
        promise_lastPerson.then(()=>{
            this.cameras.main.fadeOut(300, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.scene.start('perfectEndingScene', {score: 9990});
            });
        });
    }

    /**
     * lab button click event
     */
    clickLab() {
        this.disableAllBtns();
        //exit scene animation
        this.dispatchExitAnimation();
        let promise_lastPerson = this.assets_animator.dispatchLastPersonExit(this.html4);
        promise_lastPerson.then(()=>{
            this.scene.start('labScene', {level: 0, lastLvlScore: 0});
        });
    }

    /**
     * must pass button click event
     */
    clickMustPass() {
        this.disableAllBtns();
        //exit scene animation
        this.dispatchExitAnimation();
        let promise_lastPerson = this.assets_animator.dispatchLastPersonExit(this.html4);
        promise_lastPerson.then(()=>{
            this.scene.start('gameScene', {level: 0, lastLvlScore: 0, mustPass: true});
        });
    }

    /**
     * start button click event
     */
    clickStart() {
        this.disableAllBtns();
        //exit scene animation
        this.dispatchExitAnimation();
        let promise_lastPerson = this.assets_animator.dispatchLastPersonExit(this.html4);
        promise_lastPerson.then(()=>{
            this.scene.start('gameScene', {level: 0, lastLvlScore: 0});
        });
    }

    /**
     * make all buttons non-clickable, prevent duplicated animations
     */
    disableAllBtns() {
        this.html5.off('pointerdown');
        this.html3.off('pointerdown');
        for(let sprite of this.titleBtn_group) {
            sprite.disableInteractive();
        }
    }

}