import _my_settings from "./_globalSettings";

/**
 * debugger settings
 * Author: hl778 https://github.com/hl778
 */
export default class Scene_Debug extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    preload() {
    }

    init() {
        // show these settings
        this.footnote = {
            "rowTiles": "tile row number",
            "colTiles": "tile column number",
            "totalChoices": "number of types of tiles, max is 10",
            "tileMapMaxSteps": "a larger value makes the game easier",
            "levelStartGoal": "goal of the first level",
            "rollingTxtDuration": "digit count up/down speed",
            "bonusPerLvl": "bonus score per level",
            "colShiftSpeed": "column shift speed",
            "singleTileScore":"first eliminated tile score",
            "tileScoreStepScore":"successive eliminated tile score",
            "tileScorePenaltyStep":"successive left over tile penalty",
            "tileScorePenaltyInit":"first left over tile penalty",
            "levelStepGoal":"successive level goal",
        };
        // hide these settings
        this.excludes = ["switchCharTrigger","endingMosaic","tileMapMinSteps","wh_ratioThreshold","scoreTextDefaultColor","contactAdd",
            "maxTileChoice","contactNewTab", "similarDigits","maxDevicePixelRatio",
            "scoreTextColorMap","tileMapMaxSteps_store","tileMapMinSteps_store","initialWidth",
            "initialHeight"];
        this.constrains = { // [min,max] inclusive
            "rowTiles": [1,80],
            "colTiles": [1,80],
            "totalChoices": [1,10],
            "tileMapMaxSteps": [2,9999],
            "levelStartGoal": [0,99999],
            "rollingTxtDuration": [1,5000],
            "bonusPerLvl": [0,99999],
            "colShiftSpeed": [0,5000],
        };
    }

    create() {
        // set camera background
        this.cameras.main.setBackgroundColor('#000000');
        // master div
        let el = document.createElement('div');
        el.style = 'font-size: 18px;background-color: rgba(255, 255, 255, 0.8); width: 100%; height:100%;overflow: scroll;';
        // title text
        let titleText = document.createElement("p");
        titleText.innerText = "Click the button at the top/bottom to apply changes or exit.";
        titleText.style.fontSize = "18px";
        titleText.style.color = "red";
        titleText.style.fontWeight = "bold";
        el.appendChild(titleText);
        //create btn copy at top for easy access
        let sub_top = this.createSaveBtn();
        let reset_top = this.createResetBtn();
        el.appendChild(sub_top);
        el.appendChild(reset_top);

        // create form
        let form = document.createElement("form");
        form.style = 'padding-top:10px;'
        // create form content
        for (let prop in _my_settings) {
            //skip excluded properties
            if (this.excludes.includes(prop)) {
                continue;
            }
            let cur_value = _my_settings[prop];
            let cur_type = "text";
            //label
            let label = document.createElement("label");
            label.setAttribute('for', prop);
            label.innerText = prop + " ";
            form.appendChild(label);
            //input box
            let inp = document.createElement("input"); //input element, text
            inp.setAttribute('type', cur_type);
            inp.setAttribute('name', prop);
            inp.setAttribute('size', "5");
            inp.setAttribute('value', cur_value);
            inp.style = 'margin-top:2px;'
            form.appendChild(inp);
            // footnote
            if (prop in this.footnote) {
                let footnote = document.createElement("p");
                footnote.innerText = this.footnote[prop];
                footnote.style.fontWeight = "bold";
                footnote.style.display = "inline";
                form.appendChild(footnote);
            }
            form.appendChild(document.createElement("br"));
            form.appendChild(document.createElement("br"));
        }
        // create save btn
        let sub_bottom = this.createSaveBtn();
        // create reset btn
        let reset_bottom = this.createResetBtn();
        // append save btn
        form.appendChild(sub_bottom);
        // append reset btn
        form.appendChild(reset_bottom);
        // append form
        el.appendChild(form);
        // append el to dom
        let deForm = this.add.dom(0, 0, el);
        deForm.setOrigin(0, 0);
        deForm.addListener('click');
    }

    /**
     * create a reset button
     * @returns {HTMLButtonElement}
     */
    createResetBtn() {
        let myself = this;
        // create reset btn
        let reset = document.createElement("button");
        reset.setAttribute('type', "button");
        reset.onclick = function () {
            myself.cameras.main.fadeOut(300, 10, 200, 10);
            myself.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                localStorage.clear();
                location.reload();
            });
        };
        reset.innerText = "Reset to default";
        reset.style.background="#7bf877";
        return reset;
    }

    /**
     * create a save/submit button
     * @returns {HTMLButtonElement}
     */
    createSaveBtn() {
        // create save btn
        let myself = this;
        let sub = document.createElement("button");
        sub.setAttribute('type', "button");
        sub.onclick = function () {
            localStorage.setItem("editedDebug", "true");
            for (let i = 0; i < document.getElementsByTagName("input").length; i++) {
                let edit_val = document.getElementsByTagName("input")[i].value;
                let edit_name = document.getElementsByTagName("input")[i].name;
                if (!isNaN(edit_val)) {
                    edit_val = parseFloat(edit_val)
                }
                if (_my_settings[edit_name] !== edit_val) {
                    if(edit_name in myself.constrains) { // constrain values within given range
                        edit_val = Math.max(edit_val,myself.constrains[edit_name][0]);
                        edit_val = Math.min(edit_val,myself.constrains[edit_name][1]);
                    }
                    localStorage.setItem(edit_name, edit_val);
                }
            }
            myself.cameras.main.fadeOut(300, 100, 20, 20);
            myself.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                myself.scene.stop('debugScene');
                myself.scene.start('titleScene');
            });
        };
        sub.innerText = "Save and exit";
        sub.style.background="#f89577";
        return sub;
    }

}
