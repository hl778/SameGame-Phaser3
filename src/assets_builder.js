/**
 * common assets across scenes builder
 * Author: hl778 https://github.com/hl778
 */
export default class AssetsBuilder {
    constructor(scene) {
        this.scene = scene;
    }

    /**
     * build background
     * @returns {obj} - a Phaser sprite
     */
    buildHTML1() {
        // background
        const html1 = this.scene.add.sprite(0, 0, 'pack_texture', 'html1.png');
        html1.setOrigin(0); // anchor
        html1.setScale(this.scene.game._scaleRatio); // retina display scale down
        html1.displayWidth = this.scene.game.scale.gameSize.width; // width
        html1.displayHeight = this.scene.game.scale.gameSize.height; // height
        return html1;
    }

    /**
     * build red gradient
     * @returns {obj} - a Phaser sprite
     */
    buildHTML9() {
        // red gradient
        const html9 = this.scene.add.sprite(0, 0, 'pack_texture', 'html9.png');
        html9.setOrigin(0); // anchor
        html9.setScale(this.scene.game._scaleRatio); // retina display scale down
        html9.displayWidth = this.scene.game.scale.gameSize.width - 20; // width
        html9.displayHeight = this.scene.game.scale.gameSize.height - 20; // height
        return html9;
    }

    /**
     * build title page red frame
     * @returns {obj} - a Phaser sprite
     */
    buildHTML9_1() {
        // frame
        const html9_1 = this.scene.add.sprite(this.scene.game.scale.gameSize.width * 0.01, 0,
            'pack_texture', 'html9_1.png');
        html9_1.setOrigin(0); // anchor
        html9_1.setScale(this.scene.game._scaleRatio); // retina display scale down
        html9_1.displayWidth = this.scene.game.scale.gameSize.width * 0.99; // width
        html9_1.displayHeight = this.scene.game.scale.gameSize.height; // height
        return html9_1;
    }

    /**
     * build title
     * @returns {obj} - a Phaser sprite
     */
    buildHTML3() {
        // title
        const html3 = this.scene.add.sprite(this.scene.game.scale.gameSize.width * 0.5, 20,
            'pack_texture', 'html3.png');
        html3.setOrigin(0.5, 0); // anchor
        html3.setScale(this.scene.game._scaleRatio); // retina display scale down
        html3.displayWidth = this.scene.game.scale.gameSize.width * 0.9; // max width
        html3.scaleY = html3.scaleX; // keep the ratio
        html3.setInteractive({useHandCursor: true});//btn hover event
        html3.on('pointerdown', () => this.scene.clickTitle(html3));
        return html3;
    }

    /**
     * build side frame
     * @returns {obj} - a Phaser sprite
     */
    buildHTML2() {
        //side
        const html2 = this.scene.add.sprite(0, -25, 'pack_texture', 'html2.png');
        html2.setOrigin(0); // anchor
        html2.setScale(this.scene.game._scaleRatio); // retina display scale down
        html2.displayWidth = this.scene.game.scale.gameSize.width; // width
        html2.scaleY = html2.scaleX; // keep the ratio
        return html2;
    }

    /**
     * build title moon
     * @returns {obj} - a Phaser sprite
     */
    buildHTML4() {
        // moon
        const html4 = this.scene.add.sprite(this.scene.game.scale.gameSize.width,
            this.scene.game.scale.gameSize.height - this.scene.game.scale.gameSize.width * 0.075,
            'pack_texture', 'html4.png');
        html4.setOrigin(1, 1); // anchor
        html4.setScale(this.scene.game._scaleRatio); // retina display scale down
        html4.displayWidth = this.scene.game.scale.gameSize.width; // max width
        html4.scaleY = html4.scaleX; // keep the ratio
        return html4;
    }

    /**
     * build title character
     * @returns {obj} - a Phaser sprite
     */
    buildHTML5() {
        // character
        const html5 = this.scene.add.sprite(this.scene.game.scale.gameSize.width,
            this.scene.game.scale.gameSize.height + this.scene.game.scale.gameSize.width * 0.105,
            'pack_texture', 'html5.png');
        html5.setOrigin(1, 1); // anchor
        html5.setScale(this.scene.game._scaleRatio); // retina display scale down
        html5.displayWidth = this.scene.game.scale.gameSize.width * 0.97; // max width
        html5.scaleY = html5.scaleX; // keep the ratio
        html5.setInteractive({useHandCursor: true});//btn hover event
        html5.on('pointerdown', () => this.scene.clickChar(html5));
        return html5;
    }

    /**
     * build title btn code
     * @returns {obj} - a Phaser sprite
     */
    buildHTML8() {
        // btn code
        const html8 = this.scene.add.sprite(0.9,
            this.scene.game.scale.gameSize.height - this.scene.game.scale.gameSize.width * 0.2,
            'pack_texture', 'html8.png');
        html8.setOrigin(0, 1); // anchor
        html8.setScale(this.scene.game._scaleRatio); // retina display scale down
        html8.displayWidth = this.scene.game.scale.gameSize.width * 0.35; // width
        html8.scaleY = html8.scaleX; // keep the ratio
        html8.setInteractive({useHandCursor: true});//btn hover event
        html8.on('pointerdown', () => this.scene.clickContact());
        return html8;
    }

    /**
     * build title btn credits
     * @returns {obj} - a Phaser sprite
     */
    buildHTML8Credits() {
        // btn credit
        const html8credits = this.scene.add.sprite(0.9,
            this.scene.html8.y + this.scene.html8.displayHeight + 20,
            'pack_texture', 'html8credits.png');
        html8credits.setOrigin(0, 1); // anchor
        html8credits.setScale(this.scene.game._scaleRatio); // retina display scale down
        html8credits.displayWidth = this.scene.html8.displayWidth; // max width
        html8credits.scaleY = html8credits.scaleX; // keep the ratio
        html8credits.setInteractive({useHandCursor: true});//btn hover event
        html8credits.on('pointerdown', () => this.scene.clickCredits());
        return html8credits;
    }

    /**
     * build title btn debug
     * @returns {obj} - a Phaser sprite
     */
    buildHTML8Debug() {
        // btn debug
        const html8Debug = this.scene.add.sprite(this.scene.game.scale.gameSize.width,
            this.scene.html8credits.y, 'pack_texture', 'html8Debug.png');
        html8Debug.setOrigin(1, 1); // anchor
        html8Debug.setScale(this.scene.game._scaleRatio); // retina display scale down
        html8Debug.displayWidth = this.scene.game.scale.gameSize.width * 0.4; // max width
        html8Debug.scaleY = html8Debug.scaleX; // keep the ratio
        html8Debug.setInteractive({useHandCursor: true});//btn hover event
        html8Debug.on('pointerdown', () => this.scene.clickOpenDebug(this.scene.titleScene_group));
        return html8Debug;
    }

    /**
     * build title btn debug close
     * @returns {obj} - a Phaser sprite
     */
    buildHTML8Debug2() {
        // btn debug close
        const html8Debug2 = this.scene.add.sprite(this.scene.game.scale.gameSize.width,
            this.scene.html8credits.y, 'pack_texture', 'html8Debug2.png');
        html8Debug2.setOrigin(1, 1); // anchor
        html8Debug2.setScale(this.scene.game._scaleRatio); // retina display scale down
        html8Debug2.displayWidth = this.scene.game.scale.gameSize.width * 0.4; // max width
        html8Debug2.scaleY = html8Debug2.scaleX; // keep the ratio
        html8Debug2.setInteractive({useHandCursor: true});//btn hover event
        html8Debug2.on('pointerdown', () => this.scene.clickCloseDebug(this.scene.titleScene_group));
        html8Debug2.visible = false;
        return html8Debug2;
    }

    /**
     * build title btn start
     * @returns {obj} - a Phaser sprite
     */
    buildHTML7() {
        // btn start
        const html7 = this.scene.add.sprite(0.9,
            this.scene.html8.y - this.scene.html8.displayHeight - 20, 'pack_texture', 'html7.png');
        html7.setOrigin(0, 1); // anchor
        html7.setScale(this.scene.game._scaleRatio); // retina display scale down
        html7.displayWidth = this.scene.game.scale.gameSize.width * 0.55; // max width
        html7.scaleY = html7.scaleX; // keep the ratio
        html7.setInteractive({useHandCursor: true});//btn hover event
        html7.on('pointerdown', () => this.scene.clickStart(this.scene.titleScene_group));
        return html7;
    }

    /**
     * build title btn guarantee pass
     * @returns {obj} - a Phaser sprite
     */
    buildHTML8_2() {
        // btn must pass
        const html8_2 = this.scene.add.sprite(0.9,
            this.scene.html7.y - this.scene.html7.displayHeight - 5,
            'pack_texture', 'html8_2.png');
        html8_2.setOrigin(0, 1); // anchor
        html8_2.setScale(this.scene.game._scaleRatio); // retina display scale down
        html8_2.displayWidth = this.scene.game.scale.gameSize.width * 0.55; // max width
        html8_2.scaleY = html8_2.scaleX; // keep the ratio
        html8_2.setInteractive({useHandCursor: true});//btn hover event
        html8_2.on('pointerdown', () => this.scene.clickMustPass(this.scene.titleScene_group));
        html8_2.visible = false;
        return html8_2;
    }

    /**
     * build title btn to ending
     * @returns {obj} - a Phaser sprite
     */
    buildHTML8_6() {
        // btn scene to ending
        const html8_6 = this.scene.add.sprite(0.9,
            this.scene.html8_2.y - this.scene.html8_2.displayHeight - 5,
            'pack_texture', 'html8_6.png');
        html8_6.setOrigin(0, 1); // anchor
        html8_6.setScale(this.scene.game._scaleRatio); // retina display scale down
        html8_6.displayWidth = this.scene.game.scale.gameSize.width * 0.55; // max width
        html8_6.scaleY = html8_6.scaleX; // keep the ratio
        html8_6.setInteractive({useHandCursor: true});//btn hover event
        html8_6.on('pointerdown', () => this.scene.clickEnding(this.scene.titleScene_group));// callback
        html8_6.visible = false;
        return html8_6;
    }

    /**
     * build title btn to share page
     * @returns {obj} - a Phaser sprite
     */
    buildHTML8_5() {
        // btn scene to share
        const html8_5 = this.scene.add.sprite(0.9,
            this.scene.html8_6.y - this.scene.html8_6.displayHeight - 5,
            'pack_texture', 'html8_5.png');
        html8_5.setOrigin(0, 1); // anchor
        html8_5.setScale(this.scene.game._scaleRatio); // retina display scale down
        html8_5.displayWidth = this.scene.game.scale.gameSize.width * 0.55; // max width
        html8_5.scaleY = html8_5.scaleX; // keep the ratio
        html8_5.setInteractive({useHandCursor: true});//btn hover event
        html8_5.on('pointerdown', () => this.scene.clickShare(this.scene.titleScene_group));// callback
        html8_5.visible = false;
        return html8_5;
    }

    /**
     * build title btn to lab
     * @returns {obj} - a Phaser sprite
     */
    buildHTML8_3() {
        // btn lab
        const html8_3 = this.scene.add.sprite(0.9,
            this.scene.html8_5.y - this.scene.html8_5.displayHeight - 5,
            'pack_texture', 'html8_3.png');
        html8_3.setOrigin(0, 1); // anchor
        html8_3.setScale(this.scene.game._scaleRatio); // retina display scale down
        html8_3.displayWidth = this.scene.game.scale.gameSize.width * 0.55; // max width
        html8_3.scaleY = html8_3.scaleX; // keep the ratio
        html8_3.setInteractive({useHandCursor: true});//btn hover event
        html8_3.on('pointerdown', () => this.scene.clickLab(this.scene.titleScene_group));
        html8_3.visible = false;
        return html8_3;
    }

    /**
     * build title btn to debugger setting
     * @returns {obj} - a Phaser sprite
     */
    buildHTML8_7() {
        // btn scene to debug
        const html8_7 = this.scene.add.sprite(0.9,
            this.scene.html8_3.y - this.scene.html8_3.displayHeight - 5,
            'pack_texture', 'html8_7.png');
        html8_7.setOrigin(0, 1); // anchor
        html8_7.setScale(this.scene.game._scaleRatio); // retina display scale down
        html8_7.displayWidth = this.scene.game.scale.gameSize.width * 0.55; // max width
        html8_7.scaleY = html8_7.scaleX; // keep the ratio
        html8_7.setInteractive({useHandCursor: true});//btn hover event
        html8_7.on('pointerdown', () => this.scene.clickDebug());// callback
        html8_7.visible = false;
        return html8_7;
    }

    /**
     * build title btn to tile map viewer
     * @returns {obj} - a Phaser sprite
     */
    buildHTML8_11() {
        // btn
        const html8_11 = this.scene.add.sprite(0.9,
            this.scene.html8_7.y - this.scene.html8_7.displayHeight - 5,
            'pack_texture', 'html8_11.png');
        html8_11.setOrigin(0, 1); // anchor
        html8_11.setScale(this.scene.game._scaleRatio); // retina display scale down
        html8_11.displayWidth = this.scene.game.scale.gameSize.width * 0.55; // max width
        html8_11.scaleY = html8_11.scaleX; // keep the ratio
        html8_11.setInteractive({useHandCursor: true});//btn hover event
        html8_11.on('pointerdown', () => this.scene.clickTileMapViewer());// callback
        html8_11.visible = false;
        return html8_11;
    }

    /**
     * build blackboard frame surrounds tiles
     * @returns {obj} - a Phaser sprite
     */
    buildInner2() {
        // blackboard frame
        const inner2 = this.scene.add.sprite(0, this.scene.game.scale.gameSize.height,
            'pack_texture', 'inner2.png');
        inner2.setOrigin(0, 1); // anchor
        inner2.setScale(this.scene.game._scaleRatio); // retina display scale down
        inner2.displayWidth = this.scene.game.scale.gameSize.width; // max width
        inner2.displayHeight = this.scene.game.scale.gameSize.height * 0.7; // max height
        return inner2;
    }

    /**
     * build initial text dialog
     * @param current_name
     * @param current_x
     * @param current_y
     * @param current_w
     * @returns {obj} - a Phaser sprite
     */
    buildInner5(current_name,current_x,current_y,current_w) {
        // text dialog initial
        const inner5 = this.scene.add.sprite(this.scene.game.scale.gameSize.width * current_x,
            this.scene.game.scale.gameSize.height * current_y,
            'pack_texture', current_name + '.png');
        inner5.setOrigin(0, 1); // anchor
        inner5.setScale(this.scene.game._scaleRatio); // retina display scale down
        inner5.displayWidth = this.scene.game.scale.gameSize.width * current_w; // max width
        inner5.scaleY = inner5.scaleX; // keep the ratio
        return inner5;
    }

    /**
     * build text dialog
     * @returns {obj} - a Phaser text obj
     */
    buildInner5_2() {
        // text dialog happy
        const inner5_2 = this.scene.add.text(this.scene.game.scale.gameSize.width * 0.06, this.scene.game.scale.gameSize.height * 0.28,
            '',{ fontFamily: 'advanced_pixel' }).setWordWrapWidth(this.scene.game.scale.gameSize.width*0.4);
        inner5_2.setFontSize(this.scene.game.scale.gameSize.width*0.09);
        inner5_2.style.setFill("#ffffff");
        inner5_2.setOrigin (0,1); // anchor
        inner5_2.text = "JUFFO-WUF FILLS IN MY FIBERS AND I GROW TURGID.";
        inner5_2.visible = false;
        inner5_2.name = "cleared_five";
        return inner5_2;
    }

    /**
     * build text dialog
     * @returns {obj} - a Phaser text obj
     */
    buildInner5_3() {
        // text dialog hurry
        const inner5_3 = this.scene.add.text(this.scene.game.scale.gameSize.width * 0.06, this.scene.game.scale.gameSize.height * 0.25,
            '',{ fontFamily: 'advanced_pixel' }).setWordWrapWidth(this.scene.game.scale.gameSize.width*0.4);
        inner5_3.setFontSize(this.scene.game.scale.gameSize.width*0.09);
        inner5_3.style.setFill("#ffffff");
        inner5_3.setOrigin (0,1); // anchor
        inner5_3.text = "THE EARTH IS DYING, PLANETEERS.";
        inner5_3.visible = false;
        inner5_3.name = "passed_third_point";
        return inner5_3;
    }

    /**
     * build text dialog
     * @returns {obj} - a Phaser text obj
     */
    buildInner5_5() {
        // text dialog gameover
        const inner5_5 = this.scene.add.text(this.scene.game.scale.gameSize.width * 0.06, this.scene.game.scale.gameSize.height * 0.29,
            '',{ fontFamily: 'advanced_pixel' }).setWordWrapWidth(this.scene.game.scale.gameSize.width*0.4);
        inner5_5.setFontSize(this.scene.game.scale.gameSize.width*0.09);
        inner5_5.style.setFill("#ffffff");
        inner5_5.setOrigin (0,1); // anchor
        inner5_5.text = "YOU'VE OVERE-\nSTIMATED YOUR STRENGTH.";
        inner5_5.visible = false;
        inner5_5.name = "gameover";
        return inner5_5;
    }

    /**
     * build initial character
     * @returns {obj} - a Phaser sprite
     */
    buildInner4() {
        // character initial face
        const inner4 = this.scene.add.sprite(this.scene.game.scale.gameSize.width,
            this.scene.game.scale.gameSize.height * 0.31,
            'pack_texture', 'inner4.png');
        inner4.setOrigin(1, 1); // anchor
        inner4.setScale(this.scene.game._scaleRatio); // retina display scale down
        inner4.displayWidth = this.scene.game.scale.gameSize.width * 0.55; // max width
        inner4.scaleY = inner4.scaleX; // keep the ratio
        return inner4;
    }

    /**
     * build happy character
     * @returns {obj} - a Phaser sprite
     */
    buildInner5_2Face() {
        // character happy face
        const inner5_2_face = this.scene.add.sprite(this.scene.game.scale.gameSize.width,
            this.scene.game.scale.gameSize.height * 0.31,
            'pack_texture', 'inner5_2_face.png');
        inner5_2_face.setOrigin(1, 1); // anchor
        inner5_2_face.setScale(this.scene.game._scaleRatio); // retina display scale down
        inner5_2_face.displayWidth = this.scene.game.scale.gameSize.width * 0.55; // max width
        inner5_2_face.scaleY = inner5_2_face.scaleX; // keep the ratio
        inner5_2_face.visible = false;
        return inner5_2_face;
    }

    /**
     * build hurry character
     * @returns {obj} - a Phaser sprite
     */
    buildInner5_3Face() {
        // character hurry face
        const inner5_3_face = this.scene.add.sprite(this.scene.game.scale.gameSize.width,
            this.scene.game.scale.gameSize.height * 0.3,
            'pack_texture', 'inner5_3_face.png');
        inner5_3_face.setOrigin(1, 1); // anchor
        inner5_3_face.setScale(this.scene.game._scaleRatio); // retina display scale down
        inner5_3_face.displayWidth = this.scene.game.scale.gameSize.width * 0.55; // max width
        inner5_3_face.scaleY = inner5_3_face.scaleX; // keep the ratio
        inner5_3_face.visible = false;
        return inner5_3_face;
    }

    /**
     * build sad character
     * @returns {obj} - a Phaser sprite
     */
    buildInner5_5Face() {
        // character sad face
        const inner5_5_face = this.scene.add.sprite(this.scene.game.scale.gameSize.width,
            this.scene.game.scale.gameSize.height * 0.31,
            'pack_texture', 'inner5_5_face.png');
        inner5_5_face.setOrigin(1, 1); // anchor
        inner5_5_face.setScale(this.scene.game._scaleRatio); // retina display scale down
        inner5_5_face.displayWidth = this.scene.game.scale.gameSize.width * 0.55; // max width
        inner5_5_face.scaleY = inner5_5_face.scaleX; // keep the ratio
        inner5_5_face.visible = false;
        return inner5_5_face;
    }

    /**
     * build goal text
     * @returns {obj} - a Phaser text obj
     */
    buildTargetTxt() {
        // goal texts
        const target_txt = this.scene.add.text(this.scene.game.scale.gameSize.width * 0.5, 8);
        target_txt.setOrigin(0.5, 0); // anchor
        target_txt.style.setFontSize(Math.min(this.scene.game.scale.gameSize.width * 0.05, 30));
        target_txt.style.fontFamily = "advanced_pixel";
        target_txt.style.setFill("#ebecf3");
        target_txt.text = "GOAL: " + this.scene.currentGoal;
        target_txt.name = "goal";
        return target_txt;
    }

    /**
     * build current goal text
     * @param yPos
     * @param color
     * @returns {obj} - a Phaser text obj
     */
    buildCurrentTxt(yPos,color="#fd6c3e") {
        // score texts
        const current_txt = this.scene.add.text(this.scene.game.scale.gameSize.width * 0.5, yPos);
        current_txt.setOrigin(0.5, 0); // anchor
        current_txt.style.setFontSize(Math.min(this.scene.game.scale.gameSize.width * 0.05, 30));
        current_txt.style.fontFamily = "advanced_pixel";
        current_txt.style.setFill(color);
        current_txt.text = this.scene.currentScore;
        current_txt.name = "current_score";
        return current_txt;
    }

    /**
     * build pause button
     * @returns {obj} - a Phaser sprite
     */
    buildPauseBtn() {
        // pause button
        const pauseBtn = this.scene.add.sprite(this.scene.game.scale.gameSize.width-2,2,
            'pack_texture', 'pause.png');
        pauseBtn.setOrigin(1, 0); // anchor
        pauseBtn.setScale(this.scene.game._scaleRatio); // retina display scale down
        pauseBtn.displayWidth = this.scene.game.scale.gameSize.width * 0.08; // max width
        pauseBtn.scaleY = pauseBtn.scaleX; // keep the ratio
        pauseBtn.setInteractive({ useHandCursor: true });//btn hover event
        pauseBtn.on('pointerdown', () => this.scene.clickPause());
        pauseBtn.visible = false;
        return pauseBtn;
    }

    /**
     * build platform in Arcade
     * @returns {obj} - a Phaser sprite
     */
    buildPlatform() {
        // bottom invisible platform
        const platform = this.scene.physics.add.sprite(this.scene.game.scale.gameSize.width * 0.5,
            this.scene.game.scale.gameSize.height * 0.969, 'pack_texture',
            'platform.png');
        platform.setScale(this.scene.game._scaleRatio); // retina display scale down
        // width height platform
        platform.displayWidth = this.scene.game.scale.gameSize.width;
        platform.body.setAllowGravity(false);
        platform.displayHeight = 10;
        platform.alpha = 0;
        return platform;
    }

    /**
     * build left wall in Arcade
     * @returns {obj} - a Phaser sprite
     */
    buildLeftWall() {
        // left wall
        const wallLeft = this.scene.physics.add.sprite(0, this.scene.game.scale.gameSize.height * 0.65,
            'pack_texture', 'wallLeft.png');
        wallLeft.setScale(this.scene.game._scaleRatio); // retina display scale down
        wallLeft.displayWidth = this.scene.game.scale.gameSize.width * 0.066; // max width
        wallLeft.displayHeight = this.scene.game.scale.gameSize.height * 0.7; // max height
        wallLeft.body.setAllowGravity(false);
        wallLeft.setImmovable(true);
        wallLeft.alpha = 0;
        return wallLeft;
    }

    /**
     * build right wall in Arcade
     * @returns {obj} - a Phaser sprite
     */
    buildRightWall() {
        // right wall
        const wallRight = this.scene.physics.add.sprite(this.scene.game.scale.gameSize.width,
            this.scene.game.scale.gameSize.height * 0.65,
            'pack_texture', 'wallRight.png');
        // wallRight.setStatic(true);// no move
        wallRight.setScale(this.scene.game._scaleRatio); // retina display scale down
        wallRight.displayWidth = this.scene.game.scale.gameSize.width * 0.066; // max width
        wallRight.displayHeight = this.scene.game.scale.gameSize.height * 0.7; // max height
        wallRight.body.setAllowGravity(false);
        wallRight.setImmovable(true);
        wallRight.alpha = 0;
        return wallRight;
    }

    /**
     * build share page image
     * @returns {obj} - a Phaser sprite
     */
    buildInnerShareImg() {
        // share page image
        const inner_share_img = this.scene.add.sprite(this.scene.game.scale.gameSize.width*0.5,
            this.scene.game.scale.gameSize.height*0.05,
            'pack_texture', 'inner_share_img.png');
        inner_share_img.setOrigin(0.5,0); // anchor
        inner_share_img.setScale(this.scene.game._scaleRatio); // retina display scale down
        inner_share_img.displayWidth = this.scene.game.scale.gameSize.width*0.8; // width
        inner_share_img.scaleY = inner_share_img.scaleX; // keep the ratio
        return inner_share_img;
    }

    /**
     * build share page bottom image
     * @returns {obj} - a Phaser sprite
     */
    buildHTML6() {
        // bottom img
        const html6 = this.scene.add.sprite(this.scene.game.scale.gameSize.width+10,
            this.scene.game.scale.gameSize.height-30,
            'pack_texture', 'html6.png');
        html6.setOrigin(1,1); // anchor
        html6.setScale(this.scene.game._scaleRatio); // retina display scale down
        html6.displayWidth = this.scene.game.scale.gameSize.width*0.5; // width
        html6.scaleY = html6.scaleX; // keep the ratio
        return html6;
    }

    /**
     * build share page score text
     * @returns {obj} - a Phaser sprite
     */
    buildShareScoreTxt() {
        // score texts
        const score_txt = this.scene.add.text(this.scene.game.scale.gameSize.width * 0.5,
            this.scene.inner_share_img.y+this.scene.inner_share_img.displayHeight+this.scene.game.scale.gameSize.width*0.1,'',
            { fontFamily: 'advanced_pixel' }).setWordWrapWidth(this.scene.inner_share_img.displayWidth);
        score_txt.setOrigin(0.5, 0); // anchor
        score_txt.style.setFontSize(Math.min(this.scene.game.scale.gameSize.width * 0.09, 100));
        score_txt.style.setFill("#ffffff");
        score_txt.style.fontStyle = 'strong';
        score_txt.name = "share_score_txt";
        return score_txt;
    }

    /**
     * build share page button
     * @returns {obj} - a Phaser sprite
     */
    buildHTML11() {
        // btn again
        const html11 = this.scene.add.sprite(this.scene.game.scale.gameSize.width*0.5,
            this.scene.game.scale.gameSize.height*0.8,
            'pack_texture', 'html11.png');
        html11.setOrigin (0.5,0); // anchor
        html11.setScale(this.scene.game._scaleRatio); // retina display scale down
        html11.displayWidth = this.scene.game.scale.gameSize.width*0.5; // max width
        html11.scaleY = html11.scaleX; // keep the ratio
        html11.setInteractive({ useHandCursor: true });//btn hover event
        html11.on('pointerdown', () => this.scene.clickAgain(html11));
        return html11;
    }

    /**
     * build ending scene last frame Tapir text
     * @returns {obj} - a Phaser text
     */
    buildEndTxt() {
        // ending scene last frame Tapir text
        const end_txt = this.scene.add.text(this.scene.game.scale.gameSize.width*0.1,
            this.scene.game.scale.gameSize.height*0.15, '',{ fontFamily: 'advanced_pixel' })
            .setWordWrapWidth(this.scene.game.scale.gameSize.width*0.8);
        end_txt.setFontSize(this.scene.game.scale.gameSize.width*0.1);
        end_txt.style.setFill("#ffffff");
        end_txt.setOrigin (0,0); // anchor
        return end_txt;
    }

}