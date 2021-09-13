import _my_settings from "./_globalSettings";

/**
 * tween animations of assets
 * Author: hl778 https://github.com/hl778
 */
export default class AssetsAnimator {
    /**
     * constructor
     * @param scene - which scene to apply
     */
    constructor(scene) {
        this.scene = scene;
    }

    /**
     * enter scene animations
     * @param sprite
     * @param loop_index - if the asset is with in a loop, pass index if necessary
     * @returns {(function(): void)|*}
     */
    dispatchEnterScene(sprite,loop_index=0) {
        let temp_name;
        if (sprite.type === "Text") {
            temp_name = sprite.name;
            temp_name = "txt_" + temp_name;
        } else {
            temp_name = sprite.frame.name; // get name of sprite
            temp_name = temp_name.slice(0, -4); // delete file extension from str
        }

        // map animation functions
        let map = {
            'txt_share_score_txt': () => {
                this.scene.tweens.add({
                    targets: sprite,
                    ease: 'Quint.easeInOut',
                    alpha: {start: 0, to: 1},
                    y: {start: sprite.y + 200, to: sprite.y},
                    duration: 100,
                    delay: 0
                });
            },
            'txt_current_score': () => {
                this.scene.tweens.add({
                    targets: sprite,
                    ease: 'Quint.easeInOut',
                    alpha: {start: 0, to: 1},
                    y: {start: sprite.y + 200, to: sprite.y},
                    duration: 800,
                    delay: 2000
                });
            },
            'txt_goal': () => {
                this.scene.tweens.add({
                    targets: sprite,
                    ease: 'Quint.easeInOut',
                    alpha: {start: 0, to: 1},
                    y: {start: sprite.y + 200, to: sprite.y},
                    duration: 800,
                    delay: 2000
                });
            },
            'html1': () => { //background
                this.scene.tweens.add({
                    targets: sprite,
                    ease: 'Sine.easeOut',
                    alpha: {start: 0, to: 1},
                    duration: 100,
                });
            },
            'inner2': () => { //frame
                this.scene.tweens.add({
                    targets: sprite,
                    ease: 'Bounce.easeOut',
                    alpha: {start: 0, to: 1},
                    scaleY: {start: 0, to: sprite.scaleY},
                    duration: 700,
                });
            },
            'inner4': () => {
                this.scene.ingame_face_tween = this.scene.tweens.add({
                    targets: sprite,
                    ease: 'Expo.easeInOut',
                    alpha: {start: 0, to: 1},
                    x: {start: sprite.x + 50, to: sprite.x},
                    duration: 1000,
                    delay: 400,
                });
            },
            'inner5': () => { //frame
                this.scene.ingame_dialig_tween = this.scene.tweens.add({
                    targets: sprite,
                    ease: 'Quint.easeInOut',
                    alpha: {start: 0, to: 1},
                    scaleY: {start: 0, to: sprite.scaleY},
                    duration: 800,
                    delay: 900,
                    completeDelay: 4500,
                    onComplete: () => {
                        sprite.visible = false;
                    }
                });
            },
            'inner5_4': () => { //frame
                this.scene.ingame_dialig_tween = this.scene.tweens.add({
                    targets: sprite,
                    ease: 'Quint.easeInOut',
                    alpha: {start: 0, to: 1},
                    scaleY: {start: 0, to: sprite.scaleY},
                    duration: 800,
                    delay: 1800,
                    completeDelay: 4200,
                    onComplete: () => {
                        sprite.visible = false;
                    }
                });
            },
            'txt_gameover': ()=>{ //inner5_5
                this.scene.ingame_dialig_tween = this.scene.tweens.add({
                    targets: sprite,
                    ease: 'Power1',
                    alpha: {start: 0.5, to: 1},
                    scaleY: {start: 0, to: sprite.scaleY},
                    duration: 200,
                });
            },
            'inner5_5_face': ()=>{
                this.scene.ingame_face_tween = this.scene.tweens.add({
                    targets: sprite,
                    ease: 'Power1',
                    alpha: {start: 0.5, to: 1},
                    x: {start: sprite.x + 10, to: sprite.x},
                    duration: 200,
                });
            },
            'inner5_3_face': ()=>{
                this.scene.ingame_face_tween = this.scene.tweens.add({
                    targets: sprite,
                    ease: 'Power1',
                    alpha: {start: 0.5, to: 1},
                    x: {start: sprite.x + 10, to: sprite.x},
                    duration: 200,
                    completeDelay: 4800,
                    onComplete: (tween, targets) => {
                        targets[0].visible = false;
                        this.scene.inner4.visible = true;
                    }
                });
            },
            'txt_passed_third_point': ()=>{ //inner5_3
                this.scene.ingame_dialig_tween = this.scene.tweens.add({
                    targets: sprite,
                    ease: 'Power1',
                    alpha: {start: 0.5, to: 1},
                    scaleY: {start: 0, to: sprite.scaleY},
                    duration: 200,
                    completeDelay: 4800,
                    onComplete: (tween, targets) => {
                        targets[0].visible = false;
                    }
                });
            },
            'inner5_2_face': ()=>{
                this.scene.ingame_face_tween = this.scene.tweens.add({
                    targets: sprite,
                    ease: 'Power1',
                    alpha: {start: 0.5, to: 1},
                    x: {start: sprite.x + 10, to: sprite.x},
                    duration: 200,
                    completeDelay: 4800,
                    onComplete: (tween, targets) => {
                        targets[0].visible = false;
                        this.scene.inner4.visible = true;
                    }
                });
            },
            'txt_cleared_five': ()=>{ //inner5_2
                this.scene.ingame_dialig_tween = this.scene.tweens.add({
                    targets: sprite,
                    ease: 'Power1',
                    alpha: {start: 0.5, to: 1},
                    scaleY: {start: 0, to: sprite.scaleY},
                    duration: 200,
                    completeDelay: 4800,
                    onComplete: (tween, targets) => {
                        targets[0].visible = false;
                    }
                });
            },
            'html8credits': () => {
                this.scene.tweens.add({
                    targets: sprite,
                    ease: 'Back.easeOut',
                    alpha: {start: 0.5, to: 1},
                    rotation: {start: -0.1, to: 0},
                    scaleX: {start: 0, to: sprite.scaleX},
                    duration: 500,
                });
            },
            'html8Debug': () => { //background
                this.scene.tweens.add({
                    targets: sprite,
                    ease: 'Back.easeOut',
                    alpha: {start: 0.5, to: 1},
                    scaleX: {start: 0, to: sprite.scaleX},
                    duration: 500,
                });
            },
            'html9': () => { //frame
                this.scene.tweens.add({
                    targets: sprite,
                    ease: 'Sine.easeOut',
                    alpha: {start: 0, to: 1},
                    duration: 100,
                });
            },
            'html3': () => { //title
                this.scene.tweens.add({
                    targets: sprite,
                    ease: 'Bounce.Out',
                    alpha: {start: 0, to: 1},
                    y: {start: sprite.y - 100, to: sprite.y},
                    duration: 800,
                });
            },
            'html2': () => { //side cloud
                this.scene.tweens.add({
                    targets: sprite,
                    ease: 'Sine.easeIn',
                    alpha: {start: 0, to: 1},
                    y: {start: -25 - 10, to: -25},
                    duration: 1000,
                    onComplete: () => {
                        this.scene.tweens.add({
                            targets: sprite,
                            y: "+=3",
                            alpha: {start: 1, to: 0.9},
                            duration: 2000,
                            ease: "Linear",
                            repeat: -1,
                            yoyo: true,
                            repeatDelay: 800,
                        });
                    }
                });
            },
            'html4': () => { //moon
                this.scene.tweens.add({
                    targets: sprite,
                    ease: 'Power1',
                    alpha: {start: 0, to: 1},
                    y: {start: this.scene.game.scale.gameSize.height + 200, to: sprite.y},
                    duration: 800,
                    onComplete: () => {
                        this.scene.tweens.add({
                            targets: sprite,
                            ease: 'Power1',
                            alpha: {start: 1, to: 0.95},
                            scaleY: {start: sprite.scaleY, to: sprite.scaleY * 1.01},
                            scaleX: {start: sprite.scaleY, to: sprite.scaleY * 1.01},
                            yoyo: true,
                            repeat: -1,
                            duration: 2800,
                        });
                    }
                });
            },
            'html5': () => {
                this.scene.tweens.add({
                    targets: sprite,
                    ease: 'Quart.easeIn',
                    alpha: {start: 0, to: 1},
                    rotation: {start: -0.1, to: 0},
                    y: {
                        start: this.scene.game.scale.gameSize.height + this.scene.game.scale.gameSize.width * 0.105 + 50,
                        to: this.scene.game.scale.gameSize.height + this.scene.game.scale.gameSize.width * 0.105
                    },
                    duration: 500,
                });
            },
            'html8': () => {
                this.scene.tweens.add({
                    targets: sprite,
                    ease: 'Back.easeOut',
                    alpha: {start: 0.5, to: 1},
                    rotation: {start: -0.1, to: 0},
                    scaleX: {start: 0, to: sprite.scaleX},
                    duration: 500,
                });
            },
            'html7': () => {
                this.scene.tweens.add({
                    targets: sprite,
                    ease: 'Linear',
                    alpha: {start: 0.85, to: 1, yoyo: true, repeat: -1},
                    rotation: {start: 0.1, to: 0},
                    scaleX: {start: 0, to: sprite.scaleX},
                    duration: 600,
                });
            },
        };
        let dispatching = map[temp_name];//get key
        if (dispatching) {
            return dispatching;// run if key exist
        } else {
            return function () {
                return null;
            } // empty function
        }
    }


    /**
     * exit scene animations
     * @param sprite
     * @param helper_data - any helper data to reference
     */
    dispatchExitScene(sprite,helper_data={loop_index:0,asset:null,values:[]}) {
        let temp_name;
        if (sprite.type === "Text") {
            temp_name = sprite.name;
            temp_name = "txt_" + temp_name;
        } else {
            temp_name = sprite.frame.name; // get name of sprite
            temp_name = temp_name.slice(0, -4); // delete file extension from str
            // check if star
            if(temp_name.indexOf("star_tile") !== -1) {
                temp_name = "star_tile_norm";
            }
        }
        // map reaction functions
        let map = {
            'txt_before_level_score': () => {
                return new Promise((resolve, reject) => {
                    this.scene.tweens.add({
                        targets: sprite,
                        ease: 'Power1',
                        alpha: {start: 1, to: 0.8},
                        y: {start: sprite.y, to: this.scene.current_txt.y},
                        x: {start: sprite.x, to: this.scene.game.scale.gameSize.width / 2},
                        duration: 500,
                        delay: helper_data.loop_index * 20,
                        onComplete: (tween, targets) => {
                            // update current text
                            this.scene.previousStepScore = this.scene.currentScore;
                            this.scene.currentScore = Math.max(this.scene.currentScore + this.scene.getStepScore(helper_data.loop_index,helper_data.values[0]),0);
                            this.scene.scoreTween.stop(); // kill previous same tween
                            this.scene.scoreTween = this.scene.tweens.addCounter({
                                from: this.scene.previousStepScore,
                                to: this.scene.currentScore,
                                duration: _my_settings.rollingTxtDuration,
                            });
                            // impact enlarge score txt
                            this.scene.tween_scoreImpactEnlarge.stop();
                            this.scene.tween_scoreImpactEnlarge = this.scene.tweens.add({
                                targets: this.scene.current_txt,
                                ease: 'Bounce',
                                scaleY: {start: 1, to: 0.8},
                                scaleX: {start: 1, to: 0.8},
                                duration: 50,
                                yoyo: true,
                            });
                            targets[0].destroy();
                            if(helper_data.loop_index === helper_data.values[1]-1) {
                                resolve();
                            }else{
                                reject();
                            }
                        }
                    });
                });

            },
            'txt_after_delete_score': () => {
                this.scene.tweens.add({
                    targets: sprite,
                    ease: 'Power1',
                    alpha: {start: 1, to: 0.8},
                    y: {start: helper_data.asset.y, to: this.scene.current_txt.y},
                    x: {start: helper_data.asset.x, to: this.scene.game.scale.gameSize.width / 2},
                    duration: 500,
                    delay: helper_data.loop_index * 20,
                    onComplete: (tween, targets) => {
                        // update current score text
                        this.scene.scoreTween.stop(); // kill previous same tween
                        this.scene.scoreTween = this.scene.tweens.addCounter({
                            from: this.scene.previousStepScore,
                            to: this.scene.currentScore,
                            duration: _my_settings.rollingTxtDuration,
                        });
                        // impact enlarge score txt
                        this.scene.tween_scoreImpactEnlarge.stop();
                        this.scene.tween_scoreImpactEnlarge = this.scene.tweens.add({
                            targets: this.scene.current_txt,
                            ease: 'Bounce',
                            scaleY: {start: 1, to: this.scene.current_txt.scaleY + 0.5},
                            scaleX: {start: 1, to: this.scene.current_txt.scaleY + 0.5},
                            duration: 150,
                            yoyo: true,
                        });
                        targets[0].destroy();
                    }
                });
            },
            'star_tile_norm': () => {// tile anim
                if(helper_data.event === "beforeLev") {
                    this.scene.tweens.add({
                        targets: sprite,
                        ease: 'Power2',
                        alpha: {start: 1, to: 0},
                        rotation: {start: 0, to: 13},
                        scaleX: {start: sprite.scaleX, to: 0.2},
                        scaleY: {start: sprite.scaleY, to: 0.2},
                        y: {start: sprite.y, to: Math.random() * (sprite.y+500 - sprite.y + 1) + sprite.y},
                        x: {start: sprite.x, to: Math.random() * (sprite.x+500 - (-100) + 1) -100},
                        duration: 1000,
                        delay: helper_data.loop_index * 5,
                        onComplete: (tween, targets) => {
                            targets[0].destroy();
                        }
                    });
                }else{
                    this.scene.tweens.add({
                        targets: sprite,
                        ease: 'Power1',
                        alpha: {start: 1, to: 0.6},
                        rotation: {start: 0, to: 13},
                        y: {start: sprite.y, to: this.scene.game.scale.gameSize.height + 50},
                        x: {start: sprite.x, to: this.scene.game.scale.gameSize.width / 2},
                        duration: 800,
                        delay: helper_data.loop_index * 20,
                        onComplete: (tween, targets) => {
                            targets[0].destroy();
                        }
                    });
                }

            },
            'html9_1': () => {
                this.scene.tweens.add({
                    targets: sprite,
                    duration: 1000,
                    alpha: 0,
                });
            },
            'html3': () => {
                this.scene.tweens.add({
                    targets: sprite,
                    y: -500,
                    duration: 2000,
                    ease: "Power2",
                    yoyo: false,
                    delay: 0,
                    onComplete: () => {
                        sprite.visible = false;
                    }
                });
            },
            'html4': () => { //moon
                this.scene.tweens.add({
                    targets: sprite,
                    duration: 500,
                    ease: "Elastic",
                    rotation: -0.01,
                    yoyo: false,
                    repeat: 0,
                    delay: 0,
                    onComplete: (tween, targets,) => {
                        this.scene.tweens.add({
                            targets: targets,
                            y: this.scene.game.scale.gameSize._height / 2,
                            scaleX: 0,
                            scaleY: 0,
                            duration: 1000,
                            ease: "Power2",
                            rotation: -1,
                            yoyo: false,
                            delay: 10,
                            onComplete: () => {
                                this.scene.isOver = true
                            }
                        });
                    },
                });
            },
            'html5': () => { //character
                this.scene.tweens.add({
                    targets: sprite,
                    x: sprite.x + 100,
                    y: sprite.y + 700,
                    rotation: 0.5,
                    duration: 5000,
                    ease: "Power2",
                    repeat: 0,
                    yoyo: false,
                    delay: 100,
                    onComplete: () => {
                        sprite.visible = false;
                    }
                });
            },
            'html7': () => { //start btn
                this.scene.tweens.add({
                    targets: sprite,
                    opacity: 0,
                    duration: 1000,
                    ease: "Power1",
                    scaleX: 0,
                    x: -200,
                    delay: 200,
                });
            },
            'html8_2': () => {
                this.scene.tweens.add({
                    targets: sprite,
                    opacity: 0,
                    duration: 1000,
                    ease: "Power1",
                    scaleX: 0,
                    x: -200,
                    delay: 100,
                });
            },
            'html8_11': () => {
                this.scene.tweens.add({
                    targets: sprite,
                    opacity: 0,
                    duration: 1000,
                    ease: "Power1",
                    scaleX: 0,
                    x: -200,
                    delay: 100,
                });
            },
            'html8_3': () => {
                this.scene.tweens.add({
                    targets: sprite,
                    opacity: 0,
                    duration: 1000,
                    ease: "Power1",
                    scaleX: 0,
                    x: -200,
                    delay: 100,
                });
            },
            'html8_5': () => { //start btn
                this.scene.tweens.add({
                    targets: sprite,
                    opacity: 0,
                    duration: 1000,
                    ease: "Power1",
                    scaleX: 0,
                    x: -200,
                    delay: 100,
                });
            },
            'html8_6': () => { //start btn
                this.scene.tweens.add({
                    targets: sprite,
                    opacity: 0,
                    duration: 1000,
                    ease: "Power1",
                    scaleX: 0,
                    x: -200,
                    delay: 100,
                });
            },
            'html8_7': () => {
                this.scene.tweens.add({
                    targets: sprite,
                    opacity: 0,
                    duration: 1000,
                    ease: "Power1",
                    scaleX: 0,
                    x: -200,
                    delay: 100,
                });
            },
            'html8Debug2': () => {
                this.scene.tweens.add({
                    targets: sprite,
                    opacity: 0,
                    duration: 1000,
                    ease: "Power1",
                    scaleX: 0,
                    x: sprite.x + 200,
                    delay: 170,
                });
            },
            'html8credits': () => {
                this.scene.tweens.add({
                    targets: sprite,
                    opacity: 0,
                    duration: 1000,
                    ease: "Power1",
                    scaleX: 0,
                    x: -200,
                    delay: 120,
                });
            },
            'html8': () => { //contact btn
                this.scene.tweens.add({
                    targets: sprite,
                    opacity: 0,
                    duration: 1000,
                    ease: "Power1",
                    scaleX: 0,
                    x: -200,
                    delay: 300,
                });
            },
            'html8Debug': () => { //contact btnhtml9
                this.scene.tweens.add({
                    targets: sprite,
                    opacity: 0,
                    scaleX: 0,
                    x: sprite.x + 200,
                    duration: 1000,
                    ease: "Power1",
                    delay: 50,
                });
            },
            'html9': () => {
                this.scene.tweens.add({
                    targets: sprite,
                    opacity: 1,
                    scaleX: 0.95,
                    scaleY: 0.95,
                    duration: 1000,
                    ease: "Power1",
                    delay: 510,
                });
            },
        };
        let dispatching = map[temp_name];//get key
        if (dispatching) {
            return dispatching;// run if key exist
        } else {
            return function () {
                return null;
            } // empty function
        }
    }


}