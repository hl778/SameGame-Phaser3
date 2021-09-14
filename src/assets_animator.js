import _globalSettings from "./_globalSettings";

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
        // current scene who is calling AssetsAnimator
        this.scene = scene;
        // enter animations of each scene
        this.enterAnimations = {
            'txt_share_score_txt': (sprite) => {
            this.scene.tweens.add({
                targets: sprite,
                ease: 'Quint.easeInOut',
                alpha: {start: 0, to: 1},
                y: {start: sprite.y + 200, to: sprite.y},
                duration: 100,
                delay: 0
            });
        },
            'txt_current_score': (sprite) => {
            this.scene.tweens.add({
                targets: sprite,
                ease: 'Quint.easeInOut',
                alpha: {start: 0, to: 1},
                y: {start: sprite.y + 200, to: sprite.y},
                duration: 800,
                delay: 2000
            });
        },
            'html1': (sprite) => { //background
            this.scene.tweens.add({
                targets: sprite,
                ease: 'Sine.easeOut',
                alpha: {start: 0, to: 1},
                duration: 100,
            });
        },
            'inner2': (sprite) => { //frame
            this.scene.tweens.add({
                targets: sprite,
                ease: 'Bounce.easeOut',
                alpha: {start: 0, to: 1},
                scaleY: {start: 0, to: sprite.scaleY},
                duration: 700,
            });
        },
            'inner4': (sprite) => {
            this.scene.ingame_face_tween = this.scene.tweens.add({
                targets: sprite,
                ease: 'Expo.easeInOut',
                alpha: {start: 0, to: 1},
                x: {start: sprite.x + 50, to: sprite.x},
                duration: 1000,
                delay: 400,
            });
        },
            'inner5': (sprite) => { //frame
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
            'inner5_4': (sprite) => { //frame
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
            'txt_gameover': (sprite)=>{ //inner5_5
            this.scene.ingame_dialig_tween = this.scene.tweens.add({
                targets: sprite,
                ease: 'Power1',
                alpha: {start: 0.5, to: 1},
                scaleY: {start: 0, to: sprite.scaleY},
                duration: 200,
            });
        },
            'inner5_5_face': (sprite)=>{
            this.scene.ingame_face_tween = this.scene.tweens.add({
                targets: sprite,
                ease: 'Power1',
                alpha: {start: 0.5, to: 1},
                x: {start: sprite.x + 10, to: sprite.x},
                duration: 200,
            });
        },
            'inner5_3_face': (sprite)=>{
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
            'txt_passed_third_point': (sprite)=>{ //inner5_3
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
            'html8Debug': (sprite) => { //background
            this.scene.tweens.add({
                targets: sprite,
                ease: 'Back.easeOut',
                alpha: {start: 0.5, to: 1},
                scaleX: {start: 0, to: sprite.scaleX},
                duration: 300,
            });
        },
            'html3': (sprite) => { //title
            this.scene.tweens.add({
                targets: sprite,
                ease: 'Bounce.Out',
                alpha: {start: 0, to: 1},
                y: {start: sprite.y - 100, to: sprite.y},
                duration: 500,
            });
        },
            'html2': (sprite) => { //side cloud
            this.scene.tweens.add({
                targets: sprite,
                ease: 'Sine.easeIn',
                alpha: {start: 0, to: 1},
                y: {start: -25 - 10, to: -25},
                duration: 800,
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
            'html4': (sprite) => { //moon
            this.scene.tweens.add({
                targets: sprite,
                ease: 'Power1',
                alpha: {start: 0, to: 1},
                y: {start: this.scene.game.scale.gameSize.height + 200, to: sprite.y},
                duration: 500,
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
            'html5': (sprite) => {
            this.scene.tweens.add({
                targets: sprite,
                ease: 'Quart.easeIn',
                alpha: {start: 0, to: 1},
                rotation: {start: -0.1, to: 0},
                y: {
                    start: this.scene.game.scale.gameSize.height + this.scene.game.scale.gameSize.width * 0.105 + 50,
                    to: this.scene.game.scale.gameSize.height + this.scene.game.scale.gameSize.width * 0.105
                },
                duration: 300,
            });
        },
            'html8': (sprite) => {
            this.scene.tweens.add({
                targets: sprite,
                ease: 'Back.easeOut',
                alpha: {start: 0.5, to: 1},
                rotation: {start: -0.1, to: 0},
                scaleX: {start: 0, to: sprite.scaleX},
                duration: 300,
            });
        },
            'html7': (sprite) => {
            this.scene.tweens.add({
                targets: sprite,
                ease: 'Linear',
                alpha: {start: 0.85, to: 1, yoyo: true, repeat: -1},
                rotation: {start: 0.1, to: 0},
                scaleX: {start: 0, to: sprite.scaleX},
                duration: 300,
            });
        },
    };
        // exit animations of each scene
        this.exitAnimations = {
            'txt_after_delete_score': (sprite,helper_data) => {
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
                            duration: _globalSettings.rollingTxtDuration,
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
            'star_tile_norm': (sprite,helper_data) => {// tile anim
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
            'html9_1': (sprite) => {
                this.scene.tweens.add({
                    targets: sprite,
                    duration: 1000,
                    alpha: 0,
                });
            },
            'html3': (sprite) => {
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
            'html5': (sprite) => { //character
                this.scene.tweens.add({
                    targets: sprite,
                    x: sprite.x + 100,
                    y: sprite.y + 700,
                    rotation: 0.5,
                    duration: 3000,
                    ease: "Power2",
                    repeat: 0,
                    yoyo: false,
                    delay: 100,
                    onComplete: () => {
                        sprite.visible = false;
                    }
                });
            },
            'html7': (sprite) => { //start btn
                this.scene.tweens.add({
                    targets: sprite,
                    opacity: 0,
                    duration: 500,
                    ease: "Power1",
                    scaleX: 0,
                    x: -200,
                    delay: 200,
                });
            },
            'html8_2': (sprite) => {
                this.scene.tweens.add({
                    targets: sprite,
                    opacity: 0,
                    duration: 500,
                    ease: "Power1",
                    scaleX: 0,
                    x: -200,
                    delay: 100,
                });
            },
            'html8Debug2': (sprite) => {
                this.scene.tweens.add({
                    targets: sprite,
                    opacity: 0,
                    duration: 500,
                    ease: "Power1",
                    scaleX: 0,
                    x: sprite.x + 200,
                    delay: 170,
                });
            },
            'html8credits': (sprite) => {
                this.scene.tweens.add({
                    targets: sprite,
                    opacity: 0,
                    duration: 500,
                    ease: "Power1",
                    scaleX: 0,
                    x: -200,
                    delay: 120,
                });
            },
            'html8': (sprite) => { //contact btn
                this.scene.tweens.add({
                    targets: sprite,
                    opacity: 0,
                    duration: 500,
                    ease: "Power1",
                    scaleX: 0,
                    x: -200,
                    delay: 300,
                });
            },
            'html8Debug': (sprite) => { //contact btnhtml9
                this.scene.tweens.add({
                    targets: sprite,
                    opacity: 0,
                    scaleX: 0,
                    x: sprite.x + 200,
                    duration: 500,
                    ease: "Power1",
                    delay: 50,
                });
            },
            'html9': (sprite) => {
                this.scene.tweens.add({
                    targets: sprite,
                    opacity: 1,
                    scaleX: 0.95,
                    scaleY: 0.95,
                    duration: 500,
                    ease: "Power1",
                    delay: 510,
                });
            },
        };
        // stores animation for the last exited sprite of each scene
        this.exitLastPersonAnimation = {
            'txt_before_level_score': (sprite,helper_data) => {
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
                                duration: _globalSettings.rollingTxtDuration,
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
                                resolve("this is last person exiting the scene");
                            }else{
                                reject("not the last person yet");
                            }
                        }
                    });
                });
            },
            'html4': (sprite) => { //moon
                return new Promise((res,rej)=>{
                    this.scene.tweens.add({
                        targets: sprite,
                        duration: 300,
                        ease: "Elastic",
                        rotation: -0.01,
                        yoyo: false,
                        repeat: 0,
                        delay: 0,
                        onComplete: () => {
                            this.scene.tweens.add({
                                targets: sprite,
                                y: this.scene.game.scale.gameSize._height / 2,
                                scaleX: 0,
                                scaleY: 0,
                                duration: 1000,
                                ease: "Power2",
                                rotation: -1,
                                onComplete: () => {
                                    sprite.destroy();
                                    res("last person exited");
                                }
                            });
                        },
                    });
                });
            },
        };
    }

    /**
     * add an already-exist enter animation to an object
     * @param newProp
     * @param existProp
     */
    addEnterSameAs(newProp,existProp){
        Object.defineProperty(this.enterAnimations, newProp, {
            get: function() { return this[existProp] }
        });
    }

    /**
     * add an already-exist exist animation to an object
     * @param newProp
     * @param existProp
     */
    addExitSameAs(newProp,existProp){
        Object.defineProperty(this.exitAnimations, newProp, {
            get: function() { return this[existProp] }
        });
    }

    /**
     * enter scene animations
     * @param sprite
     * @param loop_index - if the asset is with in a loop, pass index if necessary
     * @returns {(function(): void)|*}
     */
    dispatchEnterScene(sprite,loop_index=0) {
        let temp_name = sprite.name;
        if (sprite.type === "Text") {
            temp_name = "txt_" + temp_name;
        }
        let dispatching = this.enterAnimations[temp_name];//get key
        if (dispatching) {
            dispatching(sprite);// run if key exist
        }
    }

    /**
     * exit scene animations
     * @param sprite
     * @param helper_data - any helper data to reference
     */
    dispatchExitScene(sprite,helper_data={loop_index:0,asset:null,values:[]}) {
        let temp_name = sprite.name;
        if (sprite.type === "Text") {
            temp_name = "txt_" + temp_name;
        }
        let dispatching = this.exitAnimations[temp_name];//get key
        if (dispatching) {
            dispatching(sprite,helper_data);// run if key exist
        }
    }

    /**
     * dispatch the last finishing-off animation
     * @param lastPerson{object} - sprite
     * @param helper_data
     * @returns {*}
     */
    dispatchLastPersonExit(lastPerson,helper_data={}) {
        let temp_name = lastPerson.name;
        if (lastPerson.type === "Text") {
            temp_name = "txt_" + temp_name;
        }
        let dispatching = this.exitLastPersonAnimation[temp_name];//get key
        if (dispatching) {
            return dispatching(lastPerson,helper_data);// run if key exist
        }
    }

}