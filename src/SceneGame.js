import _my_settings from "./_globalSettings";
import generate_tile from "./helper_generateTilesMap";
import AssetsBuilder from './assets_builder';
import AssetsAnimator from "./assets_animator";

/**
 * Main game scene
 * Author: hl778 https://github.com/hl778
 */
export default class SceneGame extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    preload() {
        // retrieve json
        this.tileAndStarPhysics = this.cache.json.get('tileAndStarPhysics');
        // tile map arrangement
        if (localStorage.getItem("restart_bluePrint") === null) {
            this.blueprint = generate_tile(_my_settings.rowTiles, _my_settings.colTiles, _my_settings.totalChoices);
        } else {
            this.blueprint = JSON.parse(localStorage.getItem("restart_bluePrint"));
            this.blueprint = Promise.resolve(this.blueprint);
            localStorage.removeItem('restart_bluePrint');
            localStorage.removeItem('restart_level');
            localStorage.removeItem('restart_startScore');
        }
    }

    init(data) {
        this.tilesXPosCount = new Map(); // store x pos of tiles, content will be deleted as game progress
        this.initial_x_pos = new Set(); // store x pos of tiles, useful when shift columns, will not change
        this.eliminatedTileCount = 0;
        this.passedThirdPoint = false;
        this.isTweening = false; // if there are tiles moving animations currently
        this.level = data.level; // set level
        // current score
        this.currentScore = Math.max(data.lastLvlScore, 0);
        this.fixedStartingScore = this.currentScore;
        this.previousStepScore = this.currentScore;
        this.scoreTween = null;
        this.tween_scoreImpactEnlarge = null;
        // goal
        if (isNaN(_my_settings.levelStartGoal + data.level * _my_settings.levelStepGoal)) {
            this.currentGoal = 1000;
        } else {
            this.currentGoal = _my_settings.levelStartGoal + data.level * _my_settings.levelStepGoal;
        }
        // same type of tiles
        if (data.mustPass) {
            _my_settings.tileMapMaxSteps_store = _my_settings.tileMapMaxSteps;
            _my_settings.tileMapMinSteps_store = _my_settings.tileMapMinSteps;
            _my_settings.tileMapMaxSteps = _my_settings.rowTiles * _my_settings.colTiles;
            _my_settings.tileMapMinSteps = _my_settings.rowTiles * _my_settings.colTiles;
        }
    }

    create() {
        // assets builder
        this.builder = new AssetsBuilder(this);
        // tween animator for assets
        this.assets_animator = new AssetsAnimator(this);
        this.cameras.main.setBackgroundColor('#000000');
        this.blueprint.then((result)=>{
            this.blueprint = result;
            //initialise other assets
            this.initialiseOthers();
            //initialise walls
            this.initialiseWalls();
            //initialise physics arcade and tile parameters
            this.initialiseArcadePhysics();
            //generate and drop tiles
            setTimeout(() => {
                let promise_dropped = this.initialiseDropTiles();
                promise_dropped.then(()=>{
                    // tile click events
                    this.addTileClickEvent();
                });
            }, 1700);
        });
    }

    update() {
        // current score rolling text
        if(Array.isArray(this.blueprint)) {
            this.current_txt.setText(this.scoreTween.getValue() | 0);
        }
    }

    //----------------------------------helpers------------------------------------

    /**
     * create side assets have no physics effects
     */
    initialiseOthers() {
        // background
        this.builder.buildHTML1();

        // side
        const html2 = this.builder.buildHTML2();
        //anim enter
        this.assets_animator.dispatchEnterScene(html2)();

        // blackboard frame
        this.inner2 = this.builder.buildInner2();
        //anim enter
        if (this.level === 0) {
            this.assets_animator.dispatchEnterScene(this.inner2)();
        }

        // all dialogs and dialogbox group
        this.ingame_dialog_group = this.add.group();

        // text dialog initial
        let current_dialog = "inner5";
        let current_dialog_x = 0.04;
        let current_dialog_y = 0.33;
        let current_dialog_w = 0.4;
        if (this.level > 0) {
            current_dialog = "inner5_4";
            current_dialog_x = 0.01
            current_dialog_y = 0.3;
            current_dialog_w = 0.47;
        }
        this.inner5 = this.builder.buildInner5(current_dialog, current_dialog_x, current_dialog_y, current_dialog_w);
        this.ingame_dialog_group.add(this.inner5);
        this.assets_animator.dispatchEnterScene(this.inner5)();
        // initial text tween
        this.ingame_dialig_tween = this.tweens.add({targets: this.inner5});

        // text dialog happy
        this.inner5_2 = this.builder.buildInner5_2();
        this.ingame_dialog_group.add(this.inner5_2);

        // text dialog hurry
        this.inner5_3 = this.builder.buildInner5_3();
        this.ingame_dialog_group.add(this.inner5_3);

        // text dialog gameover
        this.inner5_5 = this.builder.buildInner5_5();
        this.ingame_dialog_group.add(this.inner5_5);

        // all faces group
        this.ingame_face_group = this.add.group();

        // character initial face
        this.inner4 = this.builder.buildInner4();
        this.ingame_face_group.add(this.inner4);
        this.assets_animator.dispatchEnterScene(this.inner4)(); //anim enter

        // character happy face
        this.inner5_2_face = this.builder.buildInner5_2Face();
        this.ingame_face_tween = this.tweens.add({targets: this.inner5_2_face});
        this.ingame_face_group.add(this.inner5_2_face);

        // character hurry face
        this.inner5_3_face = this.builder.buildInner5_3Face();
        this.ingame_face_group.add(this.inner5_3_face);

        // character sad face
        this.inner5_5_face = this.builder.buildInner5_5Face();
        this.ingame_face_group.add(this.inner5_5_face);

        // goal texts
        let target_txt = this.builder.buildTargetTxt();
        //anim enter
        this.assets_animator.dispatchEnterScene(target_txt)(); //anim enter

        // score texts
        this.current_txt = this.builder.buildCurrentTxt(target_txt.y + target_txt.width * 0.25);
        //anim enter
        this.assets_animator.dispatchEnterScene(this.current_txt)(); //anim enter
        // initial score rolling text
        this.scoreTween = this.tweens.addCounter({
            from: this.previousStepScore,
            to: this.currentScore,
            duration: _my_settings.rollingTxtDuration,
        });
        this.tween_scoreImpactEnlarge = this.tweens.add({targets: this.current_txt});

        // pause button
        this.pauseBtn = this.builder.buildPauseBtn();
    }

    /**
     * create boundary walls of tiles
     */
    initialiseWalls() {
        //bottom invisible platform
        this.platform = this.builder.buildPlatform();

        // left wall
        this.wallLeft = this.builder.buildLeftWall();

        // right wall
        this.wallRight = this.builder.buildRightWall();
    }

    /**
     * initialise physics
     */
    initialiseArcadePhysics() {
        //arcade bound
        this.physics.world.setBounds(0, 0, this.game.scale.gameSize.width, this.game.scale.gameSize.height * 0.969 - this.platform.displayHeight / 2);

        // tile width
        let tileWidthOnCol = (this.wallRight.getTopLeft().x - this.wallLeft.getTopRight().x) / _my_settings.colTiles;
        let tileWidthOnRow = (this.platform.getTopRight().y - this.inner2.getTopRight().y - this.game.scale.gameSize.height * 0.01) / _my_settings.rowTiles;
        this.tileWidth = Math.min(tileWidthOnCol, tileWidthOnRow); // prevent out of frame bound
        this.tileWidth = Math.max(this.tileWidth, 1); // prevent negative number
        //arcade set not clash
        this.physics.world.checkCollision.up = false;
        // wall and tiles in different groups
        this.colli_wallsGroup = this.add.group();
        this.colli_tileGroup = this.add.group({
            maxSize: this.blueprint.length * this.blueprint[0].length
        });
        this.tileGroup_decreasing = this.add.group();
        this.colli_wallsGroup.add(this.platform);
        this.colli_wallsGroup.add(this.wallLeft);
        this.colli_wallsGroup.add(this.wallRight);

        // custom collider on y-axis among tiles
        this.physics.add.collider(this.colli_tileGroup, this.colli_tileGroup, this.comparatorArcadeCollider);

        // custom collider on y among walls and tiles, useful for the bottom platform
        this.physics.add.collider(this.colli_wallsGroup, this.colli_tileGroup, this.comparatorArcadeCollider);
    }

     initialiseDropTiles() {
        let myself = this;
        return new Promise((resolve, reject) => {
            // from bottom row of blueprint upwards, generate tiles and drop animations
            for (let i = myself.blueprint.length - 1; i >= 0; i--) {
                setTimeout(() => {
                    // each row
                    for (let j = 0; j < myself.blueprint[0].length; j++) {
                        let cur_cell = myself.blueprint[i][j];
                        let temp_name = "tile" + cur_cell + ".png";
                        // generate each cell col-wise
                        let tile = myself.physics.add.sprite((myself.wallLeft.displayWidth / 2) + myself.tileWidth / 2 + (j * myself.tileWidth),
                            myself.game.scale.gameSize._height * 0.32, 'pack_texture', temp_name).setInteractive();
                        tile.setCollideWorldBounds(true);
                        tile.displayWidth = myself.tileWidth - 0.000001;
                        tile.scaleY = tile.scaleX; // keep the ratio
                        tile.setBounce(0);
                        tile.setFriction(1);
                        tile.setVelocity(0, 400);
                        tile.setMass(10.1);
                        // tile.body.gravity.x = 110;
                        // prevent go through Y
                        tile.body.customSeparateY = true;
                        myself.colli_tileGroup.add(tile);
                        myself.tileGroup_decreasing.add(tile);
                        // store count of tiles at different x pos
                        if (myself.tilesXPosCount.has(tile.x)) {
                            myself.tilesXPosCount.set(tile.x, myself.tilesXPosCount.get(tile.x) + 1);
                        } else {
                            myself.tilesXPosCount.set(tile.x, 1);
                        }
                        //record initial x positions
                        myself.initial_x_pos.add(tile.x);
                        // for debugging, in case generated more tiles than expected, but shouldn't happen
                        if (myself.colli_tileGroup.isFull()) {
                            // sort x positions, useful when shifting columns if space
                            myself.initial_x_pos = Array.from(myself.initial_x_pos);
                            myself.initial_x_pos.sort(myself.comparatorNumberSort);
                            resolve("initial tiles generated");
                        }
                    }
                }, (myself.blueprint.length - 1-i) * 400);
            }
        });
    }

    /**
     * initialise click event on tiles
     */
    addTileClickEvent() {
        let myself = this;
        let allDroppedCheck = setInterval(() => {
            if (myself.isAllStopped(myself.tileGroup_decreasing)) {
                clearInterval(allDroppedCheck);
                // pause btn invisible until all tiles dropped and not tweening
                myself.pauseBtn.visible = true;
                let allChildren = myself.colli_tileGroup.getChildren();
                let left_wall_rightX = myself.wallLeft.getTopRight().x;
                let bottom_platform_topY = myself.platform.getTopRight().y;
                // event listener click on each tile
                // loop all children
                for (const child of allChildren) {
                    // click event
                    child.on('pointerdown', function () {
                        let stopped = myself.isAllStopped(myself.tileGroup_decreasing);
                        if (stopped && !myself.isTweening) {
                            // current clicked tile index
                            // let thisIndex = myself.colli_tileGroup.children.entries.findIndex(x => x.frame.name === this.frame.name && x.x === this.x && x.y === this.y);
                            let thisIndex = myself.getIndexPosition(this, left_wall_rightX, bottom_platform_topY, myself.tileWidth, myself.blueprint[0].length);
                            // get neighbors indices of same type
                            let candidates = myself.getAllNeighbors(this, thisIndex, myself.initial_x_pos, myself.blueprint[0].length, allChildren);
                            // valid neighbor count
                            let totalNeighb = candidates.size;
                            // if has neighbor of same type, trigger to eliminate tiles
                            if (totalNeighb > 0) {
                                // reacting animation control
                                myself.changeCharacterFilter(totalNeighb);
                                // sort neighbours
                                candidates = Array.from(candidates).sort();
                                let findIndex = myself.getInsertIndex(candidates, thisIndex);
                                let to_delete_ind = myself.getDeleteOrder(thisIndex, findIndex, candidates);
                                // let to_delete = []; // tiles to delete
                                // for (let index of to_delete_ind) {
                                //     to_delete.push(allChildren[index]);
                                // }
                                // let to_delete_copy = Array.from(to_delete);
                                // delete tiles and get empty columns x position if any
                                myself.deleteTiles(to_delete_ind,allChildren);
                            }
                        }
                    });
                }
            }
        }, 100);
    }

    deleteTiles(to_delete_ind,allChildren) {
        let to_delete_tiles = []; // tiles to delete
        let emptyColsXPos = []; // store empty columns x positions
        for (let delete_index of to_delete_ind) {
            let delete_tile = allChildren[delete_index];
            to_delete_tiles.push(allChildren[delete_index]);
            // current x position with no small error
            const trueX = this.getXposKey(delete_tile.x, this.tilesXPosCount.keys())[1];
            // count at current x position decrease by 1
            // myself.tilesXPosCount[trueX] -= 1;
            this.tilesXPosCount.set(trueX, this.tilesXPosCount.get(trueX) - 1);
            // delete tile
            delete_tile.setActive(false).setVisible(false);
            delete_tile.disableBody(true, true);
            this.tileGroup_decreasing.remove(delete_tile);
            this.eliminatedTileCount += 1;
            // check if empty col
            if (this.tilesXPosCount.get(trueX) === 0) {
                // store empty column x pos
                emptyColsXPos.push(parseFloat(trueX));
            }
        }
        // deletion animation
        this.beforeDeletion(to_delete_tiles);

        // rearrange tile array to reflect changes made
        this.shiftRowOnMultipleTile(to_delete_ind, this.blueprint[0].length, allChildren)
        // update x position map count
        if(emptyColsXPos.length>0) {
            this.shiftMapLeft(this.tilesXPosCount);
            // check if need to shift cols
            this.shiftAllEmptyCol(allChildren, emptyColsXPos);
        }else {
            let afterGravity = setInterval(() => {
                // make sure all animation is finished
                if (this.isAllStopped(this.tileGroup_decreasing) && !this.isTweening) {
                    clearInterval(afterGravity);
                    // when no tile can be eliminated
                    if (this.isDeadGame(allChildren)) {
                        this.afterDeadend(this.tileGroup_decreasing);
                    }
                }
            }, 100);
        }
    }

    /**
     * check if no tile is currently moving
     * @returns {boolean}
     * @param remainingEntries {Phaser.GameObjects.Group} - non-eliminated tiles group
     */
    isAllStopped(remainingEntries) {
        let children = remainingEntries.getChildren();
        for (let child of children) {
            let velo = child.body.velocity;
            if (velo.x !== 0 || velo.y !== 0) {
                return false;
            }
        }
        return true;
    }

    /**
     * check if the round reaches deadend
     * @param allEntries
     * @returns {boolean}
     */
    isDeadGame(allEntries) {
        for (let i = 0; i < allEntries.length; i++) {
            let tile = allEntries[i];
            if (!tile.active) { // if inactive tile, continue
                continue;
            }
            let hasNeighbour = this.getMinimumNeighbor(tile, i, this.tilesXPosCount, this.blueprint[0].length, allEntries);
            if (hasNeighbour) {
                return false;
            }
        }
        return true;
    }

    /**
     * ending scene for happy ending
     */
    end_perfectPass() {
        this.pauseBtn.disableInteractive();
        this.pauseBtn.visible = false;
        let myself = this;
        // fadeout camera
        myself.cameras.main.fadeOut(2500, 0, 0, 0);
        myself.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            myself.colli_tileGroup.clear(true, true);
            myself.scene.stop("gameScene");
            myself.scene.start("perfectEndingScene", {score: myself.currentScore});
        });
    }

    /**
     * ending behaviour for failed game
     */
    end_notPass(tileGroup_decreasing) {
        let myself = this;
        this.pauseBtn.disableInteractive();
        this.pauseBtn.visible = false;
        this.changeSadFace();
        let allStoppedCheck = setInterval(() => {
            let stopped = myself.isAllStopped(tileGroup_decreasing);
            if (stopped && !myself.isTweening) {
                clearInterval(allStoppedCheck);
                let promise_finished = myself.beforeNotPass(tileGroup_decreasing);
                promise_finished.then(function () {
                    setTimeout(() => { // smooth transition to next scene
                        myself.input.on('pointerdown', () => {
                            myself.colli_tileGroup.clear(true, true);
                            myself.scene.stop("gameScene");
                            myself.scene.start("shareScene", {score: myself.currentScore});
                        });
                    }, 500);
                });
            }
        }, 30);
    }

    /**
     * to next level when pass the current round
     */
    end_toNextLvl(tileGroup_decreasing) {
        this.pauseBtn.disableInteractive();
        this.pauseBtn.visible = false;
        let myself = this;
        let allStoppedCheck = setInterval(() => {
            let stopped = myself.isAllStopped(tileGroup_decreasing);
            if (stopped && !myself.isTweening) {
                clearInterval(allStoppedCheck);
                let promise_finished = myself.beforeNextLvl(tileGroup_decreasing);
                promise_finished.then(function () {
                    setTimeout(() => {
                        myself.colli_tileGroup.clear(true, true);
                        myself.scene.stop("gameScene");
                        myself.scene.start("gameScene",
                            {
                                level: myself.level + 1,
                                lastLvlScore: myself.currentScore + _my_settings.bonusPerLvl + myself.level * 10
                            });
                    }, 1000);
                });
            }
        }, 80);
    }

    /**
     * when reach deadend in each round
     */
    afterDeadend(tileGroup_decreasing) {
        let children = tileGroup_decreasing.getChildren();
        for (let child of children) {
            child.disableInteractive();
        }
        // happy ending
        if (this.eliminatedTileCount === this.colli_tileGroup.maxSize &&
            this.currentScore >= this.currentGoal) {
            this.end_perfectPass();
        } else {
            if (this.currentScore < this.currentGoal) {// game over
                this.end_notPass(tileGroup_decreasing);
            } else { // next level
                this.end_toNextLvl(tileGroup_decreasing);
            }
        }
    }

    /**
     * when the current round fails, behavious before the next stage
     * @param tileGroup_decreasing
     * @returns {Promise<unknown>}
     */
    beforeNotPass(tileGroup_decreasing) {
        let myself = this;
        let children = tileGroup_decreasing.getChildren();
        // delete rest tiles
        return new Promise((resolve, reject) => {
            if (children.length === 0) {
                resolve("last animation completed");
            }
            for (let i = 0; i < children.length; i++) {
                //blink rest tiles
                this.tweens.add({
                    targets: children[i],
                    ease: 'Sine.easeIn',
                    duration: 80,
                    alpha: {start: 1, to: 0},
                    yoyo: true,
                    repeat: 5,
                    onComplete: (tween, targets) => {
                        // tint tiles
                        myself.tweens.addCounter({
                            from: 255,
                            to: 50,
                            duration: 2000,
                            onUpdate: function (nestTween) {
                                const value1 = Math.floor(nestTween.getValue());
                                targets[0].setTint(Phaser.Display.Color.GetColor(value1, value1 * 1.2, value1 * 1.5));
                            },
                            onComplete: () => {
                                if (i === children.length - 1) {
                                    resolve("last animation completed");
                                }
                            }
                        });
                    }
                });
            }
        });

    }

    /**
     * cleanup before go to the next level
     */
    beforeNextLvl(tileGroup_decreasing) {
        /**
         * animation and process before next level
         */
        let myself = this;
        let children = tileGroup_decreasing.getChildren();
        return new Promise((resolve, reject) => {
            if (children.length === 0) {
                resolve("last animation completed");
            }
            for (let i = 0; i < children.length; i++) {
                //blink rest tiles
                this.tweens.add({
                    targets: children[i],
                    ease: 'Sine.easeIn',
                    duration: 80,
                    alpha: {start: 1, to: 0},
                    yoyo: true,
                    repeat: 5,
                    onComplete: (tween, targets) => {
                        children[i].setActive(false).setVisible(false);
                        children[i].disableBody(true, true);
                        // tile anim, bloom
                        for(let count=0;count<20;count++) {
                            let temp = myself.physics.add.staticImage(targets[0].x, targets[0].y,
                                'pack_texture', "star_" + targets[0].frame.name);
                            temp.displayWidth = targets[0].displayWidth/5;
                            temp.displayHeight = targets[0].displayHeight/5;
                            this.assets_animator.dispatchExitScene(temp, {loop_index:i,event:"beforeLev"})(); // anim
                        }
                        //score text
                        let scoretxt = myself.add.text(targets[0].x, targets[0].y, '');
                        scoretxt.setOrigin(0.5, 0.5); // anchor
                        scoretxt.style.setFontSize(targets[0].displayWidth / 2);
                        scoretxt.style.fontFamily = "advanced_pixel";
                        scoretxt.style.setFill("#f35a8f");
                        // score text over the position of each tile
                        scoretxt.text = ''+myself.getStepScore(i,"penalty");
                        scoretxt.name = "before_level_score";

                        // txt score anim
                        let promise_finishAnimation = this.assets_animator.dispatchExitScene(scoretxt, {
                            loop_index:i,values:["penalty",children.length]})();
                        // promise until animation finished
                        promise_finishAnimation.then(function() {
                            resolve("last animation completed");
                        }).catch(()=>{
                            // no need to act, only waiting for animation to finish
                        });
                    }
                });
            }
        });
    }

    /**
     * animation and cleanup after the eliminated tiles get deleted. This creates the score text and tile deletion animation
     * @param arr_copy
     */
    beforeDeletion(arr_copy) {
        for (let i = 0; i < arr_copy.length; i++) {
            // update score
            this.previousStepScore = this.currentScore;
            this.currentScore += this.getStepScore(i,"award");
            let cur_name = arr_copy[i].frame.name;
            // delete file extension from str
            cur_name = cur_name.slice(0, -4);
            let cur_color; // score text color
            if (cur_name in _my_settings.scoreTextColorMap) {
                cur_color = _my_settings.scoreTextColorMap[cur_name];
            } else {
                cur_color = _my_settings.scoreTextDefaultColor;
            }
            // create star tiles
            let temp = this.physics.add.staticImage(arr_copy[i].x, arr_copy[i].y,
                'pack_texture', "star_" + arr_copy[i].frame.name);
            temp.displayWidth = arr_copy[i].displayWidth;
            temp.displayHeight = arr_copy[i].displayHeight;
            this.assets_animator.dispatchExitScene(temp, {loop_index:i})(); // anim

            //score text
            let scoretxt = this.add.text(arr_copy[i].x, arr_copy[i].y, '');
            scoretxt.setOrigin(0.5, 0.5); // anchor
            scoretxt.style.setFontSize(Math.min(arr_copy[i].displayWidth / 2 + i * 1.5, 30));
            scoretxt.style.fontFamily = "advanced_pixel";
            scoretxt.style.setFill(cur_color);
            scoretxt.name = "after_delete_score";
            scoretxt.text = ''+this.getStepScore(i,"award");
            // txt score anim
            this.assets_animator.dispatchExitScene(scoretxt, {
                loop_index:i, asset:temp,values:["award"]})();
        }
    }

    /**
     * shift rows downwards on a single column, starting from a index upwards
     * @param tile_index{int} - starting index to shift
     * @param col_count - how many columns in the array
     * @param arr - a 1D array represent a 2D array structure (a flattened 2D array).
     * This array must be built from bottom to top, left to right, row-wise.
     * The element [0] is at the bottom-left corner visually,
     * and [-1] is at the top-right corner
     * @returns {[*]} - a shifted 1D array
     */
    shiftRowOnSingleTile(tile_index, col_count, arr) {
        // start shifting from tile_index
        let firstTile = arr[tile_index];
        for (let i = tile_index; i < arr.length; i += col_count) {
            if (i + col_count >= arr.length) { // if exceed array length
                arr[i] = firstTile;
                break;
            }
            arr[i] = arr[i + col_count];
        }
        return arr;
    }

    /**
     * shift multiple rows downwards on tile drop.
     * @param tile_indices
     * @param col_count
     * @param arr
     * @returns {*}
     */
    shiftRowOnMultipleTile(tile_indices, col_count, arr) {
        let col_summary = {}; // put indices into their column group
        for (let tile_index of tile_indices) {
            let index = tile_index;
            let tru_col = index % col_count; // column index
            // summarize tile indices need to be shifted
            if (tru_col in col_summary) {
                col_summary[tru_col].push(index);
            } else {
                col_summary[tru_col] = [index];
            }
        }
        // shift each col at a time
        for (const array of Object.values(col_summary)) {
            array.sort(this.comparatorNumberSort);
            let previous_index = array[0] - col_count;
            let minIndex = array[0];
            let drop_count = 0
            for (let cur_index of array) {
                // if its the immediate neighbor
                if (cur_index === previous_index + col_count) {
                    this.shiftRowOnSingleTile(minIndex, col_count, arr);
                    previous_index = cur_index;
                    drop_count += 1;
                } else {// if not immediate above neighbor
                    minIndex = cur_index - drop_count * col_count;
                    this.shiftRowOnSingleTile(minIndex, col_count, arr);
                    previous_index = cur_index;
                    drop_count = +1;
                }
            }
        }
        return arr;
    }

    /**
     * shift columns to left when there are spaces between columns
     * @param allEntries
     * @param emptyColsXPos
     */
    shiftAllEmptyCol(allEntries, emptyColsXPos) {
        let myself = this;
        // check if no empty x pos
        if (emptyColsXPos.length === 0) {
            let afterGravity = setInterval(() => {
                // make sure all animation is finished
                if (myself.isAllStopped(myself.tileGroup_decreasing)) {
                    myself.isTweening = false;
                    clearInterval(afterGravity);
                    let deadOrNot = myself.isDeadGame(allEntries);
                    if (deadOrNot) { // when no tile can be eliminated
                        myself.afterDeadend(myself.tileGroup_decreasing);
                    }
                }
            }, 50);
            return;
        }
        // sort empty xpos, because we want to start shifting from the right-most empty column
        emptyColsXPos.sort(myself.comparatorNumberSort);
        // get the first right-most col needs to be shifted
        let right_ind = this.initial_x_pos.indexOf(emptyColsXPos[emptyColsXPos.length - 1]) + 1;
        // if it is beyond the last col
        if (right_ind >= this.initial_x_pos.length) {
            this.initial_x_pos.splice(this.initial_x_pos.length - 1, 1);
            emptyColsXPos.splice(-1);
            this.shiftAllEmptyCol(allEntries, emptyColsXPos);
            return;
        }
        // get right-most xpos needs to be shifted
        let right_xpos = this.initial_x_pos[right_ind];
        // extract all cells at xpos
        let right_col = this.getOneCol(allEntries, right_xpos);
        // shift cols one at a time
        this.tweens.add({
            targets: right_col,
            ease: 'Sine.easeIn',
            // rotation:{start:0,to:6.28319},//in radians
            x: {start: right_xpos, to: emptyColsXPos[emptyColsXPos.length - 1]},
            duration: _my_settings.colShiftSpeed,//how quick the cols get shifted
            delay: 0,
            onStart: function () {
                myself.isTweening = true;// stop interactive click
            },
            onComplete: () => {
                // current moved col xpos
                let removed = emptyColsXPos.splice(-1)[0];
                // next col x pos index
                let nextInd = myself.initial_x_pos.indexOf(removed) + 1;
                // next col x pos
                let nextX = myself.initial_x_pos[nextInd];
                // add next x pos as candidates
                emptyColsXPos.push(nextX);
                // update original entry array arrangement
                myself.shiftTwoColumns(nextInd - 1, nextInd, myself.blueprint.length,
                    myself.blueprint[0].length, allEntries);
                myself.shiftAllEmptyCol(allEntries, emptyColsXPos);
            }
        });
    }

    /**
     * given a 1D array represents a 2D structure, switch 2 columns
     * @param colIndexOne - column index to switch from
     * @param colIndexTwo - column index to switch to
     * @param rowCount - number of rows in the 1D array
     * @param colCount - number of columns in the 1D array
     * @param entries - the 1D array
     * @returns {[*]} - switched 1D array
     */
    shiftTwoColumns(colIndexOne, colIndexTwo, rowCount, colCount, entries) {
        for (let i = 0; i < rowCount; i++) {
            let temp = entries[i * colCount + colIndexOne];
            entries[i * colCount + colIndexOne] = entries[i * colCount + colIndexTwo];
            entries[i * colCount + colIndexTwo] = temp;
        }
        return entries;
    }

    /**
     * shift key-value pair of a map to the left by one position, from a given index
     * @param xMap - original map
     * @returns {Map} - resulting shifted map
     */
    shiftMapLeft(xMap) {
        for (let startKey of this.tilesXPosCount.keys()) {
            if (this.tilesXPosCount.get(startKey) === 0) {
                let foundXPos = false;
                let previous_key = null;
                let keys = Array.from(xMap.keys());
                keys.sort(this.comparatorNumberSort);
                // find key position in map, and shift left from there
                for (let eachKey of keys) {
                    let cur_differences = Math.abs(eachKey - startKey);
                    if (cur_differences <= 1 / _my_settings.similarDigits) {
                        foundXPos = true;
                        previous_key = eachKey;
                        continue;
                    }
                    if (foundXPos) {
                        xMap.set(previous_key, xMap.get(eachKey));
                    }
                    previous_key = eachKey;
                }
                xMap.delete(previous_key);
                return this.shiftMapLeft(xMap)
            }
        }

        return xMap;
    }

    /**
     * get the index of a tile in a 1D array, according to tile's coordinates.
     * The 1D array represents a 2D structure, arranged from bottom to top, left to right
     * @param tile{obj} - tile sprite object
     * @param left_wall_rightX{number} - x coordinate of the world left boundary right edge
     * @param bottom_platform_topY{number} - y coordinate of the world bottom boundary top edge
     * @param tile_width{number} - width of each tile
     * @param col_count{int} - total number of columns of tile map
     * @returns {int} - index of tile in tile group array
     */
    getIndexPosition(tile, left_wall_rightX, bottom_platform_topY, tile_width, col_count) {
        // find which row the tile is at, bottom row is row 0
        let tile_topY = tile.getTopCenter().y;
        tile_topY = tile_topY - tile_width / 2; // offset to avoid calculation error
        let distance_row = bottom_platform_topY - tile_topY;
        let rowIndex = Math.floor(distance_row / tile_width) - 1;
        // find which col the tile is at, left col is col 0
        let tile_rightX = tile.getTopRight().x;
        tile_rightX = tile_rightX + tile_width / 2; // offset to avoid calculation error
        let distance_col = tile_rightX - left_wall_rightX;
        let colIndex = Math.floor(distance_col / tile_width) - 1;
        return rowIndex * col_count + colIndex;
    }

    /**
     *
     * find the single similar key, given a number of digits after the decimal point
     * @param trueXpos - key to be compared with
     * @param initial_x_pos - object contains all x positions
     * @returns {(number|string)[]} - index and key in object
     */
    getXposKey(trueXpos, initial_x_pos) {
        let xPos_arr = Array.from(initial_x_pos);
        xPos_arr.sort(this.comparatorNumberSort);
        let index = -1;
        for (let xPos of xPos_arr) {
            index += 1;
            let difference = Math.abs(parseFloat(trueXpos) - parseFloat(xPos));
            if (difference <= 1 / _my_settings.similarDigits) {
                return [index, xPos];
            }
        }
        console.assert(false, {errorMsg: "getXposKey error, did not find x pos."});
    }

    /**
     * find index of val in a sorted array arr
     * @param arr
     * @param val
     * @returns {number}
     */
    getInsertIndex(arr, val) {
        let low = 0, high = arr.length;
        while (low < high) {
            let mid = (low + high) >>> 1;
            if (arr[mid] < val) {
                low = mid + 1;
            } else {
                high = mid
            }
        }
        return low;
    }

    getAllNeighbors(tile, myIndex, initial_x_pos, colCount, allEntries) {
        let error = 0.00001; // tolerance small error offset
        let result = new Set();
        let queue_tile = [tile]; // queue tile of successive neighbors
        let queue_index = [myIndex]; // queue index of corresponding tile
        initial_x_pos.sort(this.comparatorNumberSort);

        while (queue_tile.length !== 0) {
            let current_tile = queue_tile.shift();
            let current_index = queue_index.shift();
            // check left neighbor
            let distance_to_leftCol = Math.abs(current_tile.x - parseFloat(initial_x_pos[0]));
            if (distance_to_leftCol > error && // not left-most col
                current_index - 1 !== myIndex && // not self index
                !result.has(current_index - 1) && // not in result
                allEntries[current_index - 1].active && // not eliminated tile
                allEntries[current_index - 1].frame.name === current_tile.frame.name) {
                result.add(current_index - 1);
                queue_tile.push(allEntries[current_index - 1]);
                queue_index.push(current_index - 1);
            }
            // check right neighbor
            let distance_to_rightCol = Math.abs(current_tile.x - parseFloat(initial_x_pos[initial_x_pos.length - 1]));
            if (distance_to_rightCol > error && // not right-most col
                current_index + 1 !== myIndex && // not self index
                !result.has(current_index + 1) && // not in result
                allEntries[current_index + 1].active && // not eliminated tile
                allEntries[current_index + 1].frame.name === current_tile.frame.name) {
                result.add(current_index + 1);
                queue_tile.push(allEntries[current_index + 1]);
                queue_index.push(current_index + 1);
            }
            // check above neighbor
            if (current_index + colCount < allEntries.length && // not top-most row
                current_index + colCount !== myIndex && // not self index
                !result.has(current_index + colCount) && // not in result
                allEntries[current_index + colCount].active && // not eliminated tile
                allEntries[current_index + colCount].frame.name === current_tile.frame.name) {
                result.add(current_index + colCount);
                queue_tile.push(allEntries[current_index + colCount]);
                queue_index.push(current_index + colCount);
            }
            // check down neighbor
            if (current_index - colCount >= 0 && // not bottom-most row
                current_index - colCount !== myIndex && // not self index
                !result.has(current_index - colCount) && // not in result
                allEntries[current_index - colCount].active && // not eliminated tile
                allEntries[current_index - colCount].frame.name === current_tile.frame.name) {
                result.add(current_index - colCount);
                queue_tile.push(allEntries[current_index - colCount]);
                queue_index.push(current_index - colCount);
            }
        }
        return result;
    }

    /**
     * check if there are at least one neighbour of the same type of a given tile
     * @param tile
     * @param myIndex
     * @param tilesXPosCount
     * @param colCount
     * @param entries
     * @returns {boolean}
     */
    getMinimumNeighbor(tile, myIndex, tilesXPosCount, colCount, entries) {
        let error = 0.00001; // tolerance small error offset
        let xPositions = Array.from(tilesXPosCount.keys());
        xPositions.sort(this.comparatorNumberSort);
        // check left neighbor
        let distance_to_leftCol = Math.abs(tile.x - parseFloat(xPositions[0]));
        if (distance_to_leftCol > error && // not left-most col
            entries[myIndex - 1].active && // not eliminated tile
            entries[myIndex - 1].frame.name === tile.frame.name) {
            return true;
        }
        // check right neighbor
        let distance_to_rightCol = Math.abs(tile.x - parseFloat(xPositions[xPositions.length - 1]));
        if (distance_to_rightCol > error && // not right-most col
            entries[myIndex + 1].active && // not eliminated tile
            entries[myIndex + 1].frame.name === tile.frame.name) {
            return true;
        }
        // check above neighbor
        if (myIndex + colCount < entries.length && // not top-most row
            entries[myIndex + colCount].active && // not eliminated tile
            entries[myIndex + colCount].frame.name === tile.frame.name) {
            return true;
        }
        // check down neighbor
        return myIndex - colCount >= 0 && // not bottom-most row
            entries[myIndex - colCount].active && // not eliminated tile
            entries[myIndex - colCount].frame.name === tile.frame.name;
    }

    /**
     * get a whole column of tiles based on a x coordinate
     * @param allTiles
     * @param xpos
     * @returns {*[]}
     */
    getOneCol(allTiles, xpos) {
        let res = [];
        // find col index
        let i = this.getXposKey(xpos, this.initial_x_pos)[0];
        // extract a single col
        for (let k = 0; k < this.blueprint.length; k++) {
            let cur_tile = allTiles[i + k * this.blueprint[0].length];
            res.push(cur_tile);
        }
        return res;
    }

    /**
     * re-arrange array, so it deletes the clicked tile first, then its neighbours, towards outward
     * @param toInsert
     * @param position
     * @param arr
     * @returns {*[]}
     */
    getDeleteOrder(toInsert, position, arr) {
        let res = [toInsert];
        let left = position - 1;
        let right = position;
        while (left >= 0 || right < arr.length) {
            if (left >= 0) {
                res.push(arr[left]);
                left -= 1;
            } else if (right < arr.length) {
                res.push(arr[right]);
                right += 1;
            }
        }
        return res;
    }

    /**
     * calculate score based on eliminated or remaining tiles
     * @returns {number}
     * @param step
     * @param use{string} - denote whether the score is for award or penalty
     */
    getStepScore(step,use="award") {
        /**
         * calculate score based on tiles eliminated per step
         * @type {number}
         */
        let singleScore;
        let stepScore;
        if(use==="award") {
            singleScore = _my_settings.singleTileScore;
            stepScore = _my_settings.tileScoreStepScore;
        }else{
            singleScore = _my_settings.tileScorePenaltyInit;
            stepScore = _my_settings.tileScorePenaltyStep;
        }
        let first = singleScore;
        let last = singleScore + stepScore * step;
        let res = parseInt((first + last) * (step + 1) / 2, 10);
        if(use==="award") {
            return res;
        }else {
            return -res;
        }
    }

    /**
     * determine whether to change characters
     * @param totalNeighb - current neighbors with the same type of tiles
     */
    changeCharacterFilter(totalNeighb) {
        if (totalNeighb > _my_settings.switchCharTrigger - 1) {
            if (this.passedThirdPoint || this.colli_tileGroup.maxSize - this.eliminatedTileCount > this.colli_tileGroup.maxSize / 3) {
                this.changeHappyFace();
            }
        }
        if (!this.passedThirdPoint && this.colli_tileGroup.maxSize - this.eliminatedTileCount <= this.colli_tileGroup.maxSize / 3) {
            this.changeHurryFace();
        }
    }

    /**
     * change character face
     */
    changeSadFace() {
        // hide all faces and dialogues
        for (let val of this.ingame_face_group.children.entries) {
            val.visible = false;
        }
        for (let val of this.ingame_dialog_group.children.entries) {
            val.visible = false;
        }

        //sad character
        this.inner5_5_face.visible = true;
        this.ingame_face_tween.stop();
        this.assets_animator.dispatchEnterScene(this.inner5_5_face)();

        //dialog txt
        this.inner5_5.visible = true;
        this.ingame_dialig_tween.stop();
        this.assets_animator.dispatchEnterScene(this.inner5_5)();
    }

    /**
     * change character face
     */
    changeHurryFace() {
        this.passedThirdPoint = true;
        // hide all faces
        for (let val of this.ingame_face_group.children.entries) {
            val.visible = false;
        }
        for (let val of this.ingame_dialog_group.children.entries) {
            val.visible = false;
        }

        this.inner5_3_face.visible = true;
        this.ingame_face_tween.stop();
        this.assets_animator.dispatchEnterScene(this.inner5_3_face)();


        this.inner5_3.visible = true;
        this.ingame_dialig_tween.stop();
        this.assets_animator.dispatchEnterScene(this.inner5_3)();
    }

    /**
     * change character face
     */
    changeHappyFace() {
        // hide all faces

        for (let val of this.ingame_face_group.children.entries) {
            val.visible = false;
        }
        for (let val of this.ingame_dialog_group.children.entries) {
            val.visible = false;
        }

        //character
        this.inner5_2_face.visible = true;
        this.ingame_face_tween.stop();
        this.assets_animator.dispatchEnterScene(this.inner5_2_face)();

        //text
        this.inner5_2.visible = true;
        this.ingame_dialig_tween.stop();
        this.assets_animator.dispatchEnterScene(this.inner5_2)();
    }

    /**
     * click on pause
     */
    clickPause() {
        if (this.isAllStopped(this.tileGroup_decreasing) && !this.isTweening) {
            localStorage.setItem("restart_bluePrint", JSON.stringify(this.blueprint));
            localStorage.setItem("restart_level", this.level);
            localStorage.setItem("restart_startScore", this.fixedStartingScore);
            this.scene.switch("pausedScene");
        }
    }

    /**
     * comparator to sort number ascendingly
     * @param a
     * @param b
     * @returns {number}
     */
    comparatorNumberSort (a, b) {
        return a - b;
    }

    /**
     * Arcade custom comparator, avoid vertical collapse among sprites
     * @param s1
     * @param s2
     */
    comparatorArcadeCollider(s1, s2) {
        let b1 = s1.body;
        let b2 = s2.body;
        if (b1.y > b2.y) {
            b2.y += (b1.top - b2.bottom);
            b2.stop();
        } else {
            b1.y += (b2.top - b1.bottom);
            b1.stop();
        }
    }

}