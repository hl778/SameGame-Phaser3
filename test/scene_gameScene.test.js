/**
 * test ../src/SceneGame
 */
const expect = require('chai').expect;

import Phaser from 'phaser';
import SceneGame from '../src/SceneGame';

// initialise with dumb data
let scene = new SceneGame('gameScene');
scene.init({});
scene.colli_tileGroup = [];
scene.colli_tileGroup.children = [];
scene.colli_tileGroup.children.entries = [];

scene.tileGroup_decreasing = {
    getChildren:()=>{
        return [];
    }};
scene.platform = {y:0};
scene.displayHeight = 0;
scene.initial_x_pos = [1.50000002,20.50000002];
scene.blueprint = [[1,1],[1,1]];

scene.scene = {};
scene.scene.switch = (s)=>{};

describe('#SceneGame - scores', function() {
    context('getStepScore', function() {
        it('should be int', function() {
            let res = Number.isInteger(scene.getStepScore(5));
            expect(res).to.equal(true);
        })
    })
    context('calculatePenalty', function() {
        it('should be int', function() {
            let res = Number.isInteger(scene.getStepScore(5));
            expect(res).to.equal(true);
        })
    })
})

describe('#SceneGame - logic', function() {
    this.timeout(10000);
    context('clickPause', function() {
        it('should store level info', function() {
            scene.clickPause();
            expect("restart_bluePrint" in localStorage).to.equal(true);
            expect("restart_level" in localStorage).to.equal(true);
            expect("restart_startScore" in localStorage).to.equal(true);
        })
    })
    context('clickPause', function() {
        it('should store level info', function() {
            scene.clickPause();
            expect("restart_bluePrint" in localStorage).to.equal(true);
            expect("restart_level" in localStorage).to.equal(true);
            expect("restart_startScore" in localStorage).to.equal(true);
        })
    })
})
