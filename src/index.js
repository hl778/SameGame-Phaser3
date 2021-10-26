/*
* Author: hl778 https://github.com/hl778
*/
import "../public/css/normalize.css";
import "../public/css/main.css";

import Phaser from 'phaser';

import _my_settings from './_globalSettings';
import SceneGame from './SceneGame';
import SceneTitle from './SceneTitle';
import MyLoader from './scene_loaderScene';
import SceneShare from './SceneShare';
import ScenePerfectEnding from './ScenePerfectEnding';
import Scene_Lab from './scene_labScene';
import Scene_EndingTile from './scene_endingTile';
import Scene_Debug from './scene_debug';
import ScenePaused from './ScenePaused';
import ScenePausedLab from './ScenePausedLab';
import Scene_Credits from './scene_credits';
import SceneTileMapView from './SceneTileMapView';


/**
 * Main container for game
 */
class MainGame extends Phaser.Game {
    constructor(config) {
        super(config);
        // Add scenes (do not start them yet)
        this.scene.add('loaderScene', MyLoader);
        this.scene.add('titleScene', SceneTitle);
        this.scene.add("gameScene", new SceneGame({
            key: 'gameScene',
            physics: {arcade: {
                    debug: false,
                    gravity: { y: 950,x:0 },
                    checkCollision: {
                       up: true,
                       down: true,
                       left: true,
                       right: true
                   },
                },
                matter: {
                    x:0,
                    y:0,
                    debug: true,
                    gravity: { y: 1 }
                }},
        }));
        this.scene.add('shareScene', SceneShare);
        this.scene.add('perfectEndingScene', ScenePerfectEnding);
        this.scene.add('endingTileScene', new Scene_EndingTile({
            key: 'endingTileScene',
            physics: {arcade: {
                    debug: false,
                    gravity: { y: 950,x:0 },
                    checkCollision: {
                        up: true,
                        down: true,
                        left: true,
                        right: true
                    },
                }},
        }));
        this.scene.add('labScene', new Scene_Lab({
            key: 'labScene',
            physics: {
                arcade: {
                    debug: true,
                    gravity: { y: 950,x:0 },
                    checkCollision: {
                        up: true,
                        down: true,
                        left: true,
                        right: true
                    },
                },
                matter: {
                    debug: false,
                    gravity: { y: 1,x:-0.05 },
                    plugins: {
                        attractors: true
                    }
                }},
        }));
        this.scene.add('debugScene', new Scene_Debug({key: 'debugScene'}));
        this.scene.add('tileMapViewScene', SceneTileMapView);
        this.scene.add('pausedScene', ScenePaused);
        this.scene.add('pausedLabScene', ScenePausedLab);
        this.scene.add('creditsScene', Scene_Credits);
        // Start the title scene
        this.scene.start('loaderScene');
    }
}

// initial config
let config = {
    type: Phaser.AUTO,
    parent: 'theGameContainer',
    width: window.innerWidth,
    height: window.innerHeight,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    dom: {
        createContainer: true
    },
    // pixelArt: true,
    antialias: true,
};

// responsive screen size
if(window.innerWidth/window.innerHeight>_my_settings.wh_ratioThreshold) {
    config = {
        type: Phaser.AUTO,
        parent: 'theGameContainer',
        width: _my_settings.initialWidth,
        height: _my_settings.initialHeight,
        scale: {
            mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        dom: {
            createContainer: true
        },
        // pixelArt: true,
        antialias: true,
    };
}

let GAME = new MainGame(config);

// ------------------btw, send some useful properties-------------------------
// some Retina displays
GAME._scaleRatio = window.devicePixelRatio / _my_settings.maxDevicePixelRatio;
// GAME._scaleRatio = 1;
// export global
export default GAME;