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
    context('findXposKey', function() {
        it('should return the most similar key', function() {
            let res = SceneGame.getXposKey(1.50000001999,
                [1.50000002,20.50000002]);
            expect(res).to.eql([0,1.50000002]);
        })
    })

    context('extractOneCol', function() {
        it('should get one column', function() {
            let allTiles = [{x:1.50000002},{x:20.50000002},{x:1.50000002},{x:20.50000002}];
            let xpos = 1.50000002;
            scene.initial_x_pos = [1.50000002,20.50000002];
            let res = scene.getOneCol(allTiles, xpos);
            expect(res).to.eql([{x:1.50000002},{x:1.50000002}]);
        })
    })

    context('extractOneCol', function() {
        it('should get another column', function() {
            let allTiles = [{x:1.50000002},{x:20.50000002},{x:1.50000002},{x:20.50000002}];
            let xpos = 20.50000002;
            scene.initial_x_pos = [1.50000002,20.50000002];
            let res = scene.getOneCol(allTiles, xpos);
            expect(res).to.eql([{x:20.50000002},{x:20.50000002}]);
        })
    })

    context('checkAllStopped', function() {
        it('should return true', function() {
            let res = SceneGame.isAllStopped(scene.tileGroup_decreasing);
            expect(res).to.equal(true);
        })
    })

    context('checkAllStopped', function() {
        it('should return false', function() {
            let group = {
                getChildren:()=>{
                    return [{body:{velocity:{x:15}}}];
                }};
            let res = SceneGame.isAllStopped(group);
            expect(res).to.equal(false);
        })
    })

    context('arrangeDeleteOrder', function() {
        it('should return array with position sorted', function() {
            let toInsert = 7;
            let position = 2;
            let arr = [3,5,8,40];
            let res = SceneGame.getDeleteOrder(toInsert, position, arr);
            expect(res).to.eql([7,5,3,8,40]);
        })
    })

    context('findInsertIndex', function() {
        it('should return insertion index', function() {
            let arr = [3,5,8,40];
            let val = 6
            let res = SceneGame.getInsertIndex(arr, val);
            expect(res).to.equal(2);
        })
    })

})
