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
    context('getXposKey', function() {
        it('should return the most similar key', function() {
            let res = scene.getXposKey(1.50000001999,
                [1.50000002,20.50000002]);
            expect(res).to.eql([0,1.50000002]);
        })
    })

    context('getOneCol', function() {
        it('should get one column', function() {
            let allTiles = [{x:1.50000002},{x:20.50000002},{x:1.50000002},{x:20.50000002}];
            let xpos = 1.50000002;
            scene.initial_x_pos = [1.50000002,20.50000002];
            let res = scene.getOneCol(allTiles, xpos);
            expect(res).to.eql([{x:1.50000002},{x:1.50000002}]);
        })
    })

    context('getOneCol', function() {
        it('should get another column', function() {
            let allTiles = [{x:1.50000002},{x:20.50000002},{x:1.50000002},{x:20.50000002}];
            let xpos = 20.50000002;
            scene.initial_x_pos = [1.50000002,20.50000002];
            let res = scene.getOneCol(allTiles, xpos);
            expect(res).to.eql([{x:20.50000002},{x:20.50000002}]);
        })
    })

    context('isAllStopped', function() {
        it('should return true', function() {
            let res = scene.isAllStopped(scene.tileGroup_decreasing);
            expect(res).to.equal(true);
        })
    })

    context('isAllStopped', function() {
        it('should return false', function() {
            let group = {
                getChildren:()=>{
                    return [{body:{velocity:{x:15}}}];
                }};
            let res = scene.isAllStopped(group);
            expect(res).to.equal(false);
        })
    })

    context('getDeleteOrder', function() {
        it('should return array with position sorted', function() {
            let toInsert = 7;
            let position = 2;
            let arr = [3,5,8,40];
            let res = scene.getDeleteOrder(toInsert, position, arr);
            expect(res).to.eql([7,5,3,8,40]);
        })
    })

    context('getInsertIndex', function() {
        it('should return insertion index', function() {
            let arr = [3,5,8,40];
            let val = 6
            let res = scene.getInsertIndex(arr, val);
            expect(res).to.equal(2);
        })
    })

    context('shiftMapLeft - small map', function() {
        it('should shift sorted map keys by one position', function() {
            let xMap = new Map();
            xMap.set(1,1);
            xMap.set(2,2);
            xMap = scene.shiftMapLeft(xMap, 1);
            expect(xMap.get(1)).to.equal(2);
        })
    })

    context('shiftMapLeft - large map size check', function() {
        it('should decrease map size by 1', function() {
            for(let r=0;r<1000;r++) {
                let xMap = new Map();
                for(let i=0;i<1000;i++) {
                    let rand1 =  Math.random() * 1000;
                    let rand2 = Math.random() * 1000;
                    xMap.set(rand1,rand2);
                }
                let oldKeys = Array.from(xMap.keys());
                oldKeys.sort(function (a, b) {
                    return a - b;
                });
                let startIndex = Math.floor(Math.random() * oldKeys.length);
                let startKey = oldKeys[startIndex];
                scene.shiftMapLeft(xMap, startKey);
                // size decreases by 1
                expect(xMap.size).to.equal(oldKeys.length-1);
            }

        })
    })

    context('shiftMapLeft - large map tail check', function() {
        it('should have no original tail', function() {
            for(let r=0;r<1000;r++) {
                let xMap = new Map();
                for(let i=0;i<1000;i++) {
                    let rand1 =  Math.random() * 1000;
                    let rand2 = Math.random() * 1000;
                    xMap.set(rand1,rand2);
                }
                let oldKeys = Array.from(xMap.keys());
                oldKeys.sort(function (a, b) {
                    return a - b;
                });
                let startIndex = Math.floor(Math.random() * oldKeys.length);
                let startKey = oldKeys[startIndex];
                scene.shiftMapLeft(xMap, startKey);
                // no tail
                expect(xMap.has(oldKeys[oldKeys.length-1])).to.equal(false);
            }

        })
    })

    context('shiftMapLeft - large map last index check', function() {
        it('should shift sorted map keys by one position', function() {
            for(let r=0;r<300;r++) {
                let xMap = new Map();
                for(let i=0;i<300;i++) {
                    let rand1 =  Math.random() * 1000;
                    let rand2 = Math.random() * 1000;
                    xMap.set(rand1,rand2);
                }
                let oldKeys = Array.from(xMap.keys());
                oldKeys.sort(function (a, b) {
                    return a - b;
                });
                let oldValues = [];
                for (let k=0;k<oldKeys.length;k++) {
                    oldValues.push(xMap.get(oldKeys[k]));
                }
                let startIndex = oldKeys.length-1;
                let startKey = oldKeys[startIndex];
                scene.shiftMapLeft(xMap, startKey);
                for (let k=startIndex;k<oldKeys.length-1;k++) {
                    expect(xMap.get(oldKeys[k])).to.equal(oldValues[k+1]);
                }
            }
        })
    })

    context('shiftMapLeft - large map edge index 0 check', function() {
        it('should shift sorted map keys by one position', function() {
            for(let r=0;r<300;r++) {
                let xMap = new Map();
                for(let i=0;i<300;i++) {
                    let rand1 =  Math.random() * 1000;
                    let rand2 = Math.random() * 1000;
                    xMap.set(rand1,rand2);
                }
                let oldKeys = Array.from(xMap.keys());
                oldKeys.sort(function (a, b) {
                    return a - b;
                });
                let oldValues = [];
                for (let k=0;k<oldKeys.length;k++) {
                    oldValues.push(xMap.get(oldKeys[k]));
                }
                let startIndex = 0;
                let startKey = oldKeys[startIndex];
                scene.shiftMapLeft(xMap, startKey);
                for (let k=startIndex;k<oldKeys.length-1;k++) {
                    expect(xMap.get(oldKeys[k])).to.equal(oldValues[k+1]);
                }
            }
        })
    })

    context('shiftMapLeft - large map content check', function() {
        it('should shift sorted map keys by one position', function() {
            for(let r=0;r<500;r++) {
                let xMap = new Map();
                for(let i=0;i<500;i++) {
                    let rand1 =  Math.floor(Math.random() * 1000);
                    let rand2 = Math.floor(Math.random() * 1000);
                    xMap.set(rand1,rand2);
                }
                let oldKeys = Array.from(xMap.keys());
                oldKeys.sort(function (a, b) {
                    return a - b;
                });
                let oldValues = [];
                for (let k=0;k<oldKeys.length;k++) {
                    oldValues.push(xMap.get(oldKeys[k]));
                }
                let startIndex = Math.floor(Math.random() * oldKeys.length);
                let startKey = oldKeys[startIndex];
                scene.shiftMapLeft(xMap, startKey);
                for (let k=startIndex;k<oldKeys.length-1;k++) {
                    expect(xMap.get(oldKeys[k])).to.equal(oldValues[k+1]);
                }
                for (let k=0;k<startIndex;k++) {
                    expect(xMap.get(oldKeys[k])).to.equal(oldValues[k]);
                }
            }
        })
    })
})
