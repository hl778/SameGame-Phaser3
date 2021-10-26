/**
 * test ../src/helper_generateTilesMap
 */
const expect = require('chai').expect;

import generate_tile, { exportForTesting } from '../src/helper_generateTilesMap';

const { fillArrayValues,getRandomInt,solveTiles,replaceNumbers } = exportForTesting;


describe('#helper_generateTilesMap() - fillArrayValues', function() {
    context('array with no value argument', function() {
        it('should create an array with 0s', function() {
            expect(fillArrayValues(2)).to.eql([0,0]);
        })
    })

    context('array with positive values', function() {
        it('should create an array with same values', function() {
            expect(fillArrayValues(1,1)).to.eql([1]);
            expect(fillArrayValues(5,9)).to.eql([9,9,9,9,9]);
            expect(fillArrayValues(5,9.9)).to.eql([9.9,9.9,9.9,9.9,9.9]);
        })
    })

    context('array with 0', function() {
        it('should create an array with same values', function() {
            expect(fillArrayValues(1,0)).to.eql([0]);
            expect(fillArrayValues(5,0)).to.eql([0,0,0,0,0]);
        })
    })

    context('array with negative values', function() {
        it('should create an array with same values', function() {
            expect(fillArrayValues(5,-9)).to.eql([-9,-9,-9,-9,-9]);
            expect(fillArrayValues(1,-9)).to.eql([-9]);
            expect(fillArrayValues(3,-9.1)).to.eql([-9.1,-9.1,-9.1]);
        })
    })

    context('array with negative count', function() {
        it('should create an array with same values', function() {
            expect(fillArrayValues(-1,-9)).to.eql([]);
            expect(fillArrayValues(-1,-9)).to.eql([]);
            expect(fillArrayValues(-99,-9.1)).to.eql([]);
        })
    })

    context('array with 0 count', function() {
        it('should create an array with same values', function() {
            expect(fillArrayValues(0,-9)).to.eql([]);
            expect(fillArrayValues(0,-9)).to.eql([]);
            expect(fillArrayValues(0,-9.1)).to.eql([]);
        })
    })

    context('array with non-number value', function() {
        it('should create an array with same values', function() {
            expect(fillArrayValues(1,"abc")).to.eql(["abc"]);
        })
    })

    context('array with non-number count', function() {
        it('should create an empty array', function() {
            expect(fillArrayValues("abc","abc")).to.eql([]);
        })
    })

    context('array with non-number but Int count', function() {
        it('should create an array with same values', function() {
            expect(fillArrayValues(3,"1")).to.eql(["1","1","1"]);
            expect(fillArrayValues(0,"1")).to.eql([]);
            expect(fillArrayValues(3,1)).to.eql([1,1,1]);
        })
    })

    // context('with non-number arguments', function() {
    //     it('should throw error', function() {
    //         expect(function() {
    //             sum(1, 2, '3', [4], 5)
    //         }).to.throw(TypeError, 'sum() expects only numbers.')
    //     })
    // })
})

describe('#helper_generateTilesMap() - getRandomInt', function() {
    context('return type', function() {
        it('should be int', function() {
            for(let i=0;i<10;i++) {
                let temp = getRandomInt(-100,200);
                expect(Number.isInteger(temp)).to.eql(true);
            }
        })
    })

    context('non-number parameter', function() {
        it('should return -1', function() {
            expect(getRandomInt("abc",200)).to.equal(-1);
            expect(getRandomInt("abc","abc")).to.equal(-1);
            expect(getRandomInt(11,"abc")).to.equal(-1);
            expect(getRandomInt("11","55")).to.equal(-1);
        })
    })

    context('no third argument', function() {
        it('should return normal random values', function() {
            let [min,max] = [-5000,5000];
            let temp = getRandomInt(min,max);
            let isInRange = (temp >=min && temp<=max);
            expect(isInRange).to.eql(true);
        })
        it('should return normal random values', function() {
            let [min,max] = [-1,1];
            let temp = getRandomInt(min,max);
            let isInRange = (temp >=min && temp<=max);
            expect(isInRange).to.eql(true);
        })
        it('should return normal random values', function() {
            let [min,max] = [1,1];
            let temp = getRandomInt(min,max);
            let isInRange = (temp >=min && temp<=max);
            expect(isInRange).to.eql(true);
        })
    })

    context('number argument with a avoid value', function() {
        it('should return random int', function() {
            for(let i=0;i<100;i++) {
                expect(getRandomInt(-1,0,-1)).to.equal(0);
            }
        })
    })

    context('same number arguments', function() {
        it('should return same number every time', function() {
            for(let i=0;i<100;i++) {
                expect(getRandomInt(1,1,-1)).to.equal(1);
            }
        })
        it('should return -1', function() {
            for(let i=0;i<100;i++) {
                expect(getRandomInt(1,1,1)).to.equal(-1);
            }
        })
    })
})

describe('#helper_generateTilesMap() - solveTiles', function() {
    context('hit deadend', function() {
        it('should be -1', function() {
            for(let i=0;i<50;i++) {
                let resulting_arr = [[-1,1]];
                let avoid_directions = [''];
                let cur_selected = [0,0];
                let temp = solveTiles(cur_selected, resulting_arr, avoid_directions);
                expect(temp[0]).to.equal(-1);
            }
        })
        it('should be -1', function() {
            for(let i=0;i<50;i++) {
                let resulting_arr = [[1,1],[1,1],[1,1],[1,1],[1,1],[1,1]];
                let avoid_directions = [''];
                let cur_selected = [3,0];
                let temp = solveTiles(cur_selected, resulting_arr, avoid_directions);
                expect(temp[0]).to.equal(-1);
            }
        })
        it('should be -1', function() {
            for(let i=0;i<50;i++) {
                let resulting_arr = [[1,1],[2,1],[3,1],[4,1],[5,1],[6,1]];
                let avoid_directions = [''];
                let cur_selected = [2,1];
                let temp = solveTiles(cur_selected, resulting_arr, avoid_directions);
                expect(temp[0]).to.equal(-1);
            }
        })
    })

    context('free move at all directions', function() {
        it('should have space on right', function() {
            for(let i=0;i<50;i++) {
                let resulting_arr = [[-1,-1]];
                let avoid_directions = ['u','d','l'];
                let cur_selected = [0,0];
                let temp = solveTiles(cur_selected, resulting_arr, avoid_directions);
                expect(temp).to.eql([0,1,"r"]);
            }
        })
        it('should have space on down', function() {
            for(let i=0;i<50;i++) {
                let resulting_arr = [[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1]];
                let avoid_directions = ['u','r','l'];
                let cur_selected = [0,1];
                let temp = solveTiles(cur_selected, resulting_arr, avoid_directions);
                expect(temp).to.eql([1,1,"d"]);
            }
        })
        it('should have space on up', function() {
            for(let i=0;i<50;i++) {
                let resulting_arr = [[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1]];
                let avoid_directions = ['r','d','l'];
                let cur_selected = [3,0];
                let temp = solveTiles(cur_selected, resulting_arr, avoid_directions);
                expect(temp).to.eql([2,0,"u"]);
            }
        })
        it('should have space on left', function() {
            for(let i=0;i<50;i++) {
                let resulting_arr = [[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1]];
                let avoid_directions = ['r','d','u'];
                let cur_selected = [3,1];
                let temp = solveTiles(cur_selected, resulting_arr, avoid_directions);
                expect(temp).to.eql([3,0,"l"]);
            }
        })
    })

    context('free move with shift spaces', function() {
        it('should have dropped space on left', function() {
            for(let i=0;i<50;i++) {
                let resulting_arr = [[-1,-1],[2,-1],[2,-1],[2,-1]];
                let avoid_directions = ['u','d','r'];
                let cur_selected = [3,1];
                let temp = solveTiles(cur_selected, resulting_arr, avoid_directions);
                expect(temp).to.eql([0,0,"l"]);
            }
        })
        it('should have dropped space on right', function() {
            for(let i=0;i<50;i++) {
                let resulting_arr = [[-1,-1],[-1,2],[-1,2],[-1,2]];
                let avoid_directions = ['u','d','l'];
                let cur_selected = [3,0];
                let temp = solveTiles(cur_selected, resulting_arr, avoid_directions);
                expect(temp).to.eql([0,1,"r"]);
            }
        })
        it('should have dropped space on top', function() {
            for(let i=0;i<50;i++) {
                let resulting_arr = [[-1,-1],[2,2],[2,2],[2,2]];
                let avoid_directions = ['r','d','l'];
                let cur_selected = [3,0];
                let temp = solveTiles(cur_selected, resulting_arr, avoid_directions);
                expect(temp).to.eql([0,0,"u"]);
            }
        })
        it('should have dropped space on down', function() {
            for(let i=0;i<50;i++) {
                let resulting_arr = [[-1,-1],[2,2],[2,2],[-1,2]];
                let avoid_directions = ['u','r','l'];
                let cur_selected = [0,0];
                let temp = solveTiles(cur_selected, resulting_arr, avoid_directions);
                expect(temp).to.eql([3,0,"d"]);
            }
        })
    })
})

//---------------------------------------
describe('#helper_generateTilesMap() - replaceNumbers', function() {
    context('max candidates', function() {
        it('should return an array contains the same values as originally passed', function() {
            let arr = [1,2,3,4,5,6,7,8,9,10];
            let arr_to_set = new Set(arr);
            let choice = 10;
            let res = replaceNumbers(arr,choice);
            res = new Set(res);
            expect(res).to.eql(arr_to_set);
        })
    })

    context('non-max candidates', function() {
        it('should return an array with the same length', function() {
            let arr = [1,2,3,4,5];
            let arr_to_set = new Set(arr);
            let choice = 5;
            let res = replaceNumbers(arr,choice);
            res = new Set(res);
            expect(res.size).to.eql(arr_to_set.size);
        })
        it('should return an array with the same number of unique values', function() {
            let arr = [1,1,1,4,5];
            let arr_to_set = new Set(arr);
            let choice = 3;
            let res = replaceNumbers(arr,choice);
            res = new Set(res);
            expect(res.size).to.eql(arr_to_set.size);
        })
    })
})

//-------------------------------------------
describe('#helper_generateTilesMap() - generate_tile', function() {
    this.timeout(10000);
    context('dimensionality check', function() {
        it('should be a 2D array', function() {
            let row = 2;
            let col = 3;
            let choice = 10;
            let res = generate_tile(row, col, choice);
            res.then((r)=>{
                res = r;
                let dimension = 0;
                let temp = res[0];
                while(true) {
                    if(typeof temp==='undefined') {
                        break;
                    }
                    dimension+=1;
                    temp = temp[0];
                }
                expect(dimension).to.eql(2);
            });
        })
    })

    context('size check', function() {
        it('should has a size of col x row', function() {
            for(let i=1;i<20;i++) {
                for(let j=1;j<20;j++) {
                    let row = i;
                    let col = j;
                    let choice = 10;
                    let res = generate_tile(row, col, choice);
                    res.then((r)=>{
                        res = r;
                        let size = res.join(',').split(',').length;
                        expect(size).to.eql(row*col);
                    });
                }
            }
        })
    })

    context('unique candidates check', function() {
        it('should have a given number of candidates', function() {
            let row = 50;
            let col = 50;
            for(let i=0;i<100;i++) {
                let choice = getRandomInt(1,10);
                let res = generate_tile(row, col, choice);
                res.then((r)=>{
                    res = r;
                    let flatten = res.join(',').split(',');
                    let to_set = new Set(flatten);
                    expect(to_set.size).to.equal(choice);
                });
            }
        })
    })

    context('guaranteed blueprint check', function() {
        it('should generate a blueprint', function() {
            for(let i=1;i<100;i++) {
                let row = i;
                let col = i;
                let choice = getRandomInt(1,50);
                let res = generate_tile(row, col, choice);
                res.then((r)=>{
                    res = r;
                    let size = res.join(',').split(',').length;
                    expect(size).to.equal(row*col);
                });
            }
        })
    })
})