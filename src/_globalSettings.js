/*Author: hl778 https://github.com/hl778*/

// settings for debug purpose

const _my_settings = {
    rowTiles:10, // number of rows of tiles
    colTiles:10,//number of col of tiles
    totalChoices:6,//number of types of tiles
    maxTileChoice:10,//max types of tiles
    initialWidth : 360, // game initial width
    initialHeight : 779, // game initial height
    wh_ratioThreshold: 0.6,// w / h ratio
    maxDevicePixelRatio: 3, // maximum possible screen pixel ratio
    tileMapMaxSteps: 2, // max generated successive tiles of same type, randomly, not guaranteed on max. because
    tileMapMinSteps: 2, // min generated successive tiles of same type, randomly, not guaranteed on min
    tileMapMaxSteps_store: 2, // max generated successive tiles of same type, randomly, not guaranteed on max. because
    tileMapMinSteps_store: 2, // min generated successive tiles of same type, randomly, not guaranteed on min
    similarDigits:10000, // control comparison of floats, 100 means 2 decimal points

    contactAdd: "https://github.com/hl778/SameGame-Phaser3", // source code address
    contactNewTab: "_self", // new tab or same tab

    // in-game
    singleTileScore: 3,// single tile score
    tileScoreStepScore:2, // step score, progressive increasing multiple
    tileScorePenaltyStep: 1.3, // penalty leftout tiles
    tileScorePenaltyInit: 2, // penalty leftout tiles initial
    levelStartGoal:1000, // initial goal,
    levelStepGoal:2000, // step goal,
    rollingTxtDuration:250, // rolling current score animation duration in ms
    switchCharTrigger: 5, // eliminate more than 5 tiles at once triggers switching character
    bonusPerLvl: 400, // bonus before lvl
    colShiftSpeed:40,//how quick the cols get shifted, in ms
    endingMosaic:10, // mosaic at the end
    scoreTextDefaultColor:"#edf575",
    scoreTextColorMap:{
        "tile1":"#F44242",
        "tile2":"#156DE2",
        "tile3":"#F8E0C9",
        "tile4":"#2AD422",
        "tile5":"#F8E71C",
        "tile6":"#E8E8E8",
        "tile7":"#8C5CC9",
        "tile8":"#2AD422",
        "tile9":"#465a45",
        "tile10":"#d00e52",
    },

};

export default _my_settings