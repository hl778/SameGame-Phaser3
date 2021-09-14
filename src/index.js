/*
* Author: hl778 https://github.com/hl778
*/
import "../public/css/normalize.css";
import "../public/css/main.css";

import Phaser from 'phaser';

import _globalSettings from './_globalSettings';
import SceneGame from './SceneGame';
import SceneTitle from './SceneTitle';
import SceneLoader from './SceneLoader';
import SceneShare from './SceneShare';
import ScenePerfectEnding from './ScenePerfectEnding';
import SceneLab from './SceneLab';
import SceneEndingTile from './SceneEndingTile';
import SceneDebug from './SceneDebug';
import ScenePaused from './ScenePaused';
import ScenePausedLab from './ScenePausedLab';
import SceneCredits from './SceneCredits';
import SceneTileMapView from './SceneTileMapView';


/**
 * Main container for game
 */
class MainGame extends Phaser.Game {
    constructor(config) {
        super(config);
        // Add scenes (do not start them yet)
        this.scene.add('loaderScene', SceneLoader);
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
        this.scene.add('endingTileScene', new SceneEndingTile({
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
        this.scene.add('labScene', new SceneLab({
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
        this.scene.add('debugScene', new SceneDebug({key: 'debugScene'}));
        this.scene.add('tileMapViewScene', SceneTileMapView);
        this.scene.add('pausedScene', ScenePaused);
        this.scene.add('pausedLabScene', ScenePausedLab);
        this.scene.add('creditsScene', SceneCredits);
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
if(window.innerWidth/window.innerHeight>_globalSettings.wh_ratioThreshold) {
    config = {
        type: Phaser.AUTO,
        parent: 'theGameContainer',
        width: _globalSettings.initialWidth,
        height: _globalSettings.initialHeight,
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
GAME._scaleRatio = window.devicePixelRatio / _globalSettings.maxDevicePixelRatio;
// GAME._scaleRatio = 1;
// export global
export default GAME;