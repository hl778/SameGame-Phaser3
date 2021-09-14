/*
* Author: hl778 https://github.com/hl778
*/

import _globalSettings from "./_globalSettings";

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
        let [resulting_arr,indicesArr] = initialiseResultAndIndexArr(row,col);
        // min and max successive tile of the same type
        let maxSteps = _globalSettings.tileMapMaxSteps;
        let minSteps = _globalSettings.tileMapMinSteps;
        // while pool still remains
        while (indicesArr.length > 0) {
            // how many tiles to eliminate
            let temp_maxSteps = Math.min(getRandomInt(minSteps, maxSteps), indicesArr.length);
            // which tile to eliminate
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
                let true_direction = cur_neighbor[2];
                // next tile position
                cur_selected = getNextTilePos(true_direction,cur_selected);
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
    let max_candidate = _globalSettings.maxTileChoice;
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
    for(let row of arr) {
        for(let j=0;j<row.length;j++) {
            row[j] = replaced_candidates[row[j]-1];
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
            return getOneVerticalNeighbor(up,cur_selected,resulting_arr,direction);
        case "d":
            let down = cur_selected[0] + 1;
            return getOneVerticalNeighbor(down,cur_selected,resulting_arr,direction);
        case "l":
            let left = cur_selected[1] - 1;
            return getOneHorizonNeighbor(left,cur_selected,resulting_arr,direction);
        case "r":
            let right = cur_selected[1] + 1;
            return getOneHorizonNeighbor(right,cur_selected,resulting_arr,direction);
    }
}

/**
 * get Y index position of a tile after tiles below may dropped
 * @param cur_selected
 * @param resulting_arr
 * @returns {int} - y position of the tile
 */
function getTrueYAfterDropped(cur_selected,resulting_arr) {
    let vertical_pos = cur_selected[0];
    let count = vertical_pos + 1;
    // how many eliminated tiles below
    while (count < resulting_arr.length) {
        if (resulting_arr[count][cur_selected[1]] !== -1) {
            vertical_pos += 1;
        }
        count += 1;
    }
    return vertical_pos;
}

/**
 * get a horizontal neighbor of the current tile
 * @param start
 * @param cur_selected
 * @param resulting_arr
 * @param direction
 * @returns {(number|*)[]|*}
 */
function getOneHorizonNeighbor(start,cur_selected,resulting_arr,direction) {
    if (start < 0 || start>= resulting_arr[0].length) {
        return [-1, direction];
    }
    let sign;
    if(direction==='l') {
        sign = -1;
    }else{ // implies 'r'
        sign = 1;
    }
    // check vertical true position
    let vertical_pos = getTrueYAfterDropped(cur_selected,resulting_arr);
    // compare to left/right
    while (start >= 0 && start < resulting_arr[0].length) {
        let rebuiltLeftOrRight = [];
        for (let i = 0; i < resulting_arr.length; i++) {
            if (resulting_arr[i][start] === -1) {
                rebuiltLeftOrRight.push([i, start]);
            }
        }
        // check if left/right col is lower than cur col
        if (rebuiltLeftOrRight.length <= 0) {
            start += sign; // shift to left/right
        } else if (resulting_arr.length - rebuiltLeftOrRight.length > vertical_pos) {
            // when left/right col lower than cur col
            return [-1, direction];
        } else { //when left/right col no lower than cur col
            let true_index = vertical_pos - (resulting_arr.length - rebuiltLeftOrRight.length);
            return rebuiltLeftOrRight[true_index].concat([direction]);
        }
    }
    return [-1, direction];
}

/**
 * get a vertical neighbor of the current tile
 * @param start
 * @param cur_selected
 * @param resulting_arr
 * @param direction
 * @returns {(number|*)[]|*[]}
 */
function getOneVerticalNeighbor(start,cur_selected,resulting_arr,direction) {
    let sign;
    if(direction==='u') {
        sign = -1;
    }else { // implies 'd'
        sign = 1;
    }
    while (start >= 0 && start < resulting_arr.length) {
        if (resulting_arr[start][cur_selected[1]] === -1) {
            return [start, cur_selected[1],direction];
        } else {
            start += sign;
        }
    }
    return [-1, direction];
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
 * get the next tile index position based on a direction
 * @param true_direction
 * @param cur_selected
 * @returns {*[]}
 */
function getNextTilePos(true_direction,cur_selected) {
    // next tile position
    if(true_direction==="u") {
        cur_selected = [cur_selected[0]-1,cur_selected[1]];
    }else if(true_direction==="d") {
        cur_selected = [cur_selected[0]+1,cur_selected[1]];
    }else if(true_direction==="l") {
        cur_selected = [cur_selected[0],cur_selected[1]-1];
    }else{
        cur_selected = [cur_selected[0],cur_selected[1]+1];
    }
    return cur_selected;
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

/**
 * initialise a 2D result array and a 1D indices array
 * @param row
 * @param col
 * @returns {*[][]}
 */
function initialiseResultAndIndexArr(row,col) {
    let resulting_arr = [];
    let indicesArr = [];
    // initialise array
    for (let i = 1; i < row + 1; i++) {
        let temp_row = fillArrayValues(col, -1);
        resulting_arr.push(temp_row);
        // build indices pool
        for (let j = 0; j < col; j++) {
            indicesArr.push([i - 1, j]);
        }
    }
    return [resulting_arr,indicesArr];
}

// for testing purpose
export const exportForTesting = {
    fillArrayValues,getRandomInt,solveTiles,replaceNumbers
};