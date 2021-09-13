import rgbHex from 'rgb-hex';

import generate_tile from "./helper_generateTilesMap";

/**
 * tile map view. unfinished
 * Author: hl778 https://github.com/hl778
 */
export default class Scene_TileMapView extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    preload() {
        if (localStorage.getItem("debugTileMapView") === null) {
            localStorage.setItem("debugTileMapViewCol", "10");
            localStorage.setItem("debugTileMapViewRow", "10");
            localStorage.setItem("debugTileMapViewType", "6");
            this.blueprint = generate_tile(10, 10, 6,true);
        } else {
            let row = parseInt(localStorage.getItem("debugTileMapViewRow"));
            let col = parseInt(localStorage.getItem("debugTileMapViewCol"));
            let type = parseInt(localStorage.getItem("debugTileMapViewType"));
            this.blueprint = generate_tile(row, col, type, true);
        }
    }

    init() {
    }

    create() {
        let myself = this;
        this.allBtns = [];
        this.blueprint.then((result) => {
            this.blueprint = result;
            let to_set = new Set(this.blueprint.join(',').split(','));
            // tile width
            let tileWidthOnCol = (this.game.scale.gameSize.width * 0.99 - this.game.scale.gameSize.width * 0.02) / this.blueprint[0].length;
            let tileWidthOnRow = (this.game.scale.gameSize.height * 0.99 - this.game.scale.gameSize.height * 0.3) / this.blueprint.length;
            this.tileWidth = Math.min(tileWidthOnCol, tileWidthOnRow); // prevent out of frame bound
            this.tileWidth = Math.max(this.tileWidth, 1); // prevent negative number

            for (let i = myself.blueprint.length - 1; i >= 0; i--) {
                setTimeout(() => {
                    // each row
                    for (let j = 0; j < myself.blueprint[0].length; j++) {
                        let cur_cell = myself.blueprint[i][j];
                        cur_cell*=11;
                        let rgb = myself.getUniqueColor(cur_cell);
                        let color = rgbHex(rgb[0], rgb[1], rgb[2]);
                        color = "0x" + color;
                        let tile = myself.add.rectangle(this.game.scale.gameSize.width * 0.02 + myself.tileWidth / 2 + (j * myself.tileWidth),
                            this.game.scale.gameSize.height * 0.98 - myself.tileWidth / 2 - i * myself.tileWidth, myself.tileWidth, myself.tileWidth,
                            color).setInteractive();
                    }
                }, i * 5);
            }
            let sizeFont = this.game.scale.gameSize.width*0.08;
            const btn_increase_col = this.add.text(this.game.scale.gameSize.width * 0.02, this.game.scale.gameSize.height * 0.01, '🔼Increase cols', { fill: '#ff8000',fontSize:sizeFont });
            btn_increase_col.setInteractive();
            this.allBtns.push(btn_increase_col);

            const btn_decrease_col = this.add.text(btn_increase_col.x, btn_increase_col.y+sizeFont, '🔽Decrease cols', { fill: '#ff8000',fontSize:sizeFont });
            btn_decrease_col.setInteractive();
            this.allBtns.push(btn_decrease_col);

            const btn_increase_row = this.add.text(btn_decrease_col.x, btn_decrease_col.y+sizeFont, '🔼Increase rows', { fill: '#8cff00',fontSize:sizeFont });
            btn_increase_row.setInteractive();
            this.allBtns.push(btn_increase_row);

            const btn_decrease_row = this.add.text(btn_increase_row.x, btn_increase_row.y+sizeFont, '🔽Decrease rows', { fill: '#8cff00',fontSize:sizeFont });
            btn_decrease_row.setInteractive();
            this.allBtns.push(btn_decrease_row);

            const btn_increase_types = this.add.text(btn_decrease_row.x, btn_decrease_row.y+sizeFont, '🔼Increase types', { fill: '#00c4ff',fontSize:sizeFont });
            btn_increase_types.setInteractive();
            this.allBtns.push(btn_increase_types);

            const btn_decrease_types = this.add.text(btn_increase_types.x, btn_increase_types.y+sizeFont, '🔽Decrease types', { fill: '#00c4ff',fontSize:sizeFont });
            btn_decrease_types.setInteractive();
            this.allBtns.push(btn_decrease_types);

            const close = this.add.sprite(this.game.scale.gameSize.width-2,2,
                'pack_texture', 'creditsClose.png');
            close.setOrigin(1, 0); // anchor
            close.setScale(this.game._scaleRatio); // retina display scale down
            close.displayWidth = this.game.scale.gameSize.width * 0.1; // max width
            close.scaleY = close.scaleX; // keep the ratio
            close.setInteractive({ useHandCursor: true });//btn hover event

            let stepChange = 5;

            close.on('pointerdown', () => {
                myself.disableBtns();
                localStorage.removeItem("debugTileMapView");
                localStorage.removeItem("debugTileMapViewRow");
                localStorage.removeItem("debugTileMapViewCol");
                localStorage.removeItem("debugTileMapViewType");
                myself.scene.stop("tileMapViewScene");
                myself.scene.start("titleScene");
            });

            btn_increase_col.on('pointerdown', () => {
                myself.disableBtns();
                localStorage.setItem("debugTileMapView", "true");
                let col = parseInt(localStorage.getItem("debugTileMapViewCol"));
                col = Math.min(col+stepChange,100);
                localStorage.setItem("debugTileMapViewCol", col);
                myself.restartScene();
            });
            btn_decrease_col.on('pointerdown', () => {
                myself.disableBtns();
                localStorage.setItem("debugTileMapView", "true");
                let col = parseInt(localStorage.getItem("debugTileMapViewCol"));
                col = Math.max(col-stepChange,1);
                localStorage.setItem("debugTileMapViewCol", col);
                myself.restartScene();
            });

            btn_increase_row.on('pointerdown', () => {
                myself.disableBtns();
                localStorage.setItem("debugTileMapView", "true");
                let row = parseInt(localStorage.getItem("debugTileMapViewRow"));
                row = Math.min(row+stepChange,100);
                localStorage.setItem("debugTileMapViewRow", row);
                myself.restartScene();
            });
            btn_decrease_row.on('pointerdown', () => {
                myself.disableBtns();
                localStorage.setItem("debugTileMapView", "true");
                let row = parseInt(localStorage.getItem("debugTileMapViewRow"));
                row = Math.max(1,row-stepChange);
                localStorage.setItem("debugTileMapViewRow", row);
                myself.restartScene();
            });

            btn_increase_types.on('pointerdown', () => {
                myself.disableBtns();
                localStorage.setItem("debugTileMapView", "true");
                let t = parseInt(localStorage.getItem("debugTileMapViewType"));
                t = Math.min(t+1,99999);
                localStorage.setItem("debugTileMapViewType", t);
                myself.restartScene();
            });
            btn_decrease_types.on('pointerdown', () => {
                myself.disableBtns();
                localStorage.setItem("debugTileMapView", "true");
                let t = parseInt(localStorage.getItem("debugTileMapViewType"));
                t = Math.max(1,t-1);
                localStorage.setItem("debugTileMapViewType", t);
                myself.restartScene();
            });
        });

    }

    update() {
        if(!Array.isArray(this.blueprint)) {

        }
    }

    /**
     * get unique rgb color given a key n
     * @param n
     * @returns {number[]}
     */
    getUniqueColor(n) {
        const rgb = [0, 0, 0];

        for (let i = 0; i < 24; i++) {
            rgb[i%3] <<= 1;
            rgb[i%3] |= n & 0x01;
            n >>= 1;
        }
        return rgb;
    }

    restartScene() {
        this.scene.start('tileMapViewScene');
    }

    disableBtns() {
        for(let i=0;i<this.allBtns.length;i++) {
            this.allBtns[i].disableInteractive();
        }
    }

}