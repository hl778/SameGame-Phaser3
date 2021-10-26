/*
* Author: hl778 https://github.com/hl778
*/

import _my_settings from "./_globalSettings";

/**
 * generates tile map in 2D array denotes how the tiles are arranged
 * @param {int} row - number of rows to generate, eg,10
 * @param {int} col - number of cols to generate, eg,10
 * @param {int} choice - number of different types of tiles, eg,5
 * @param debug
 * @returns {Promise<Array.<int[]>>} - promise contains a 2D array contains the arrangement of the tile map (blueprint of the tiles)
 */
export default function generate_tile(row, col, choice,debug=false) {
    // not necessary to use promise here,
    // this is a note for future implementation reference, to make it synchronous
    return new Promise((resolve, reject) => {
        let resulting_arr = [];
        let indicesArr = [];
        let previous_tile = -1;
        // initialise array
        for (let i = 1; i < row + 1; i++) {
            let temp_row = fillArrayValues(col, -1);
            resulting_arr.push(temp_row);
            // build indices pool
            for (let j = 0; j < col; j++) {
                indicesArr.push([i - 1, j]);
            }
        }
        // min and max successive tile of the same type
        let maxSteps = _my_settings.tileMapMaxSteps;
        let minSteps = _my_settings.tileMapMinSteps;
        // while pool still remains
        while (indicesArr.length > 0) {
            // how many tiles to eliminate
            let temp_maxSteps = Math.min(getRandomInt(minSteps, maxSteps), indicesArr.length);
            // which tile to eliminate
            // let cur_tile = getRandomInt(1, choice, previous_tile);
            let cur_tile = getRandomInt(1, choice);
            // select the next random starting point from pool
            let random_index = getRandomInt(0, indicesArr.length - 1);
            // indicesArr is the pool stores remaining indices
            // delete the eliminated tile from pool
            let cur_selected = indicesArr.splice(random_index, 1)[0];
            // set the starting tile as already eliminated
            resulting_arr[cur_selected[0]][cur_selected[1]] = cur_tile;
            temp_maxSteps -= 1; // step -1
            // reset directional deadend list
            let avoid_directions = [];
            // while still have steps
            while (temp_maxSteps > 0) {
                // find pseudo-neighbour
                let cur_neighbor = solveTiles(cur_selected, resulting_arr, avoid_directions);
                // if hit deadend
                if (cur_neighbor[0] === -1) {
                    avoid_directions.push(cur_neighbor[1]);
                    continue;
                }
                // reset deadend for new neighbor
                avoid_directions = [];
                // next tile position
                let true_direction = cur_neighbor[2];
                if(true_direction==="u") {
                    cur_selected = [cur_selected[0]-1,cur_selected[1]];
                }else if(true_direction==="d") {
                    cur_selected = [cur_selected[0]+1,cur_selected[1]];
                }else if(true_direction==="l") {
                    cur_selected = [cur_selected[0],cur_selected[1]-1];
                }else{
                    cur_selected = [cur_selected[0],cur_selected[1]+1];
                }
                resulting_arr[cur_neighbor[0]][cur_neighbor[1]] = cur_tile; // mark neighbour
                temp_maxSteps -= 1; // step -1
                // delete marked tiles indices
                for (let i = 0; i < indicesArr.length; i++) {
                    if (indicesArr[i][0] === cur_neighbor[0] && indicesArr[i][1] === cur_neighbor[1]) {
                        indicesArr.splice(i, 1); //delete from pool
                        break;
                    }
                }
            }
            previous_tile = cur_tile; // next tile type, test purpose, above not used
        }
        if(!debug) {
            // randomly replace tile types
            resulting_arr = replaceNumbers(resulting_arr,choice);
        }
        resolve(resulting_arr);
    });
}

/**
 * alternate array values in the range of 1 to maxTileChoice.
 * The purpose is to create some variations of tile types for each level
 * @param arr - original array to alternate
 * @param choice - number of variations of values in array
 * @returns {Array.<Array.<number>>}
 */
function replaceNumbers(arr,choice) {
    let max_candidate = _my_settings.maxTileChoice;
    // generate candidates
    let candidates = [];
    for(let i=1;i<=max_candidate;i++) {
        candidates.push(i);
    }
    // randomly select from candidates
    let replaced_candidates = [];
    for(let i=0;i<choice;i++) {
        let index = Math.floor(Math.random() * candidates.length);
        let selected = candidates.splice(index, 1);
        replaced_candidates.push(selected[0]);
    }
    // replace given array
    for(let i=0;i<arr.length;i++) {
        for(let j=0;j<arr[0].length;j++) {
            arr[i][j] = replaced_candidates[arr[i][j]-1];
        }
    }
    return arr;
}

/**
 * find the x,y position of a tile's neighbour
 * @param {Array.<int>} cur_selected - x and y position of the starting point of a sequence contains the same type of tiles
 * @param {int[int[]]} resulting_arr - the final blueprint of the tiles
 * @param {Array.<string>} avoid_directions - the directions to avoid searching, encoded in strings
 * @returns {(number|*)[]|(*)[]|*|(number|string)[]} - 2D array contains the x,y position of cur_selected's neighbour, or [-1,direction] if there is no neighbour in the direction
 */
function solveTiles(cur_selected, resulting_arr, avoid_directions) {
    let direction_choices = ["u", "d", "l", "r"];
    // avoid dead end
    direction_choices = direction_choices.filter(function (el) {
        return avoid_directions.indexOf(el) < 0;
    });
    // select a direction randomly
    let direction = direction_choices[Math.floor(Math.random() * direction_choices.length)];
    // different directions, up, down, left, right
    switch (direction) {
        case "u":
            let up = cur_selected[0] - 1;
            while (up >= 0) {
                if (resulting_arr[up][cur_selected[1]] === -1) {
                    return [up, cur_selected[1],"u"];
                } else {
                    up -= 1;
                }
            }
            return [-1, direction];
        case "d":
            let down = cur_selected[0] + 1;
            while (down < resulting_arr.length) {
                if (resulting_arr[down][cur_selected[1]] === -1) {
                    return [down, cur_selected[1],"d"];
                } else {
                    down += 1;
                }
            }
            return [-1, direction];
        case "l":
            let left = cur_selected[1] - 1;
            if (left < 0) {
                return [-1, direction];
            }
            let vertical_pos = cur_selected[0];
            let count = cur_selected[0] + 1;
            while (count < resulting_arr.length) {
                if (resulting_arr[count][cur_selected[1]] !== -1) {
                    vertical_pos += 1;
                }
                count += 1;
            }
            while (left >= 0) {
                let rebuiltLeft = [];
                for (let i = 0; i < resulting_arr.length; i++) {
                    if (resulting_arr[i][left] === -1) {
                        rebuiltLeft.push([i, left]);
                    }
                }
                // check if left col is lower than cur col
                if (rebuiltLeft.length <= 0) {
                    left -= 1; // shift to left
                } else if (resulting_arr.length - rebuiltLeft.length > vertical_pos) {
                    // when left col lower than cur col
                    return [-1, direction];
                } else { //when left col no lower than cur col
                    let true_index = vertical_pos - (resulting_arr.length - rebuiltLeft.length);
                    return rebuiltLeft[true_index].concat(["l"]);
                }
            }
            return [-1, direction];
        case "r":
            let right = cur_selected[1] + 1;
            if (right >= resulting_arr[0].length) {
                return [-1, direction];
            }
            // check vertical true position
            let anotherVertical_pos = cur_selected[0];
            let anotherCount = cur_selected[0] + 1;
            while (anotherCount < resulting_arr.length) {
                if (resulting_arr[anotherCount][cur_selected[1]] !== -1) {
                    anotherVertical_pos += 1;
                }
                anotherCount += 1;
            }
            // compare to right
            while (right < resulting_arr[0].length) {
                let rebuiltRight = [];
                for (let i = 0; i < resulting_arr.length; i++) {
                    if (resulting_arr[i][right] === -1) {
                        rebuiltRight.push([i, right]);
                    }
                }
                // check if right col is lower than cur col
                if (rebuiltRight.length <= 0) {
                    right += 1; // shift to right
                } else if (resulting_arr.length - rebuiltRight.length > anotherVertical_pos) {
                    // when r col lower than cur col
                    return [-1, direction];
                } else { //when r col higher than cur col
                    let true_index = anotherVertical_pos - (resulting_arr.length - rebuiltRight.length);
                    return rebuiltRight[true_index].concat(["r"]);
                }
            }
            return [-1, direction];
    }
}

/**
 * generate random int between 2 numbers, inclusive on both end
 * @param {int} min - minimum/maximum number
 * @param {int} max - minimum/maximum number
 * @param {int} avoid - avoided number
 * @returns {number} - an int between min and max, inclusive on both end
 */
function getRandomInt(min, max, avoid = -1) {
    if(typeof min!=="number" || typeof max!=="number") {
        return -1;
    }
    // random int between min max inclusive
    min = Math.floor(min);
    max = Math.floor(max);
    if(min===max && min===avoid) {
        return -1;
    }
    if(min>max) {
        let temp_min = min;
        min = max;
        max = temp_min;
    }
    max += 1;
    let res = Math.floor(Math.random() * (max - min) + min);
    return res === avoid ? getRandomInt(min, max - 1, avoid) : res;
}

/**
 * fill array with the same value
 * @param {int} count - length of array
 * @param {any} val - value to be filled with
 * @returns {unknown[]} - an array contains the same values val
 */
const fillArrayValues = (count, val = 0) => {
    if (Number.isInteger(Number(count)) && Number(count) > 0) {
        // return an array with same values
        return Array.from({length: count}).fill(val);
    }else {
        return [];
    }
}

// for testing purpose
export const exportForTesting = {
    fillArrayValues,getRandomInt,solveTiles,replaceNumbers
};