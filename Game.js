"use strict";


/**
 * 1. Если мы проходим через готовый блок, то мы должны сбросить готовый блок
 * 3. Запретить рисование, если разрыв между элементами >= 1
 *
 * @constructor
 */
function Game(field) {
    this.currentLevel = 1;
    this.field = field;

    this.init(field);

    return this;
};


Game.prototype.init = function() {
    this.setField();
    this.setBullets();
    this.field.addEventListener("mousedown", this.eventMouseDown.bind(this), false);
    this.field.addEventListener("mouseup", this.eventMouseUp.bind(this), false);
    this.field.addEventListener("dblclick", this.eventMouseDblClick.bind(this), false);
    this.field.addEventListener("mousemove", this.eventMouseMove.bind(this), false);
};

Game.prototype.levels = [
    "A---AB---CD-D--B---CE---E",
    "B---CA-AB-D--D-C----E---E",
    "ABA----C----BC--D-D------",
    "D---B-BA---ACC----------D",
    "AB-CA-DB----D-----C-EE---"
];

Game.prototype.setField = function () {

    for (var i = 1; i <= this.levels[this.currentLevel - 1].length; i++) {
        var cell = document.createElement("div");
        cell.id = "id-" + i;
        cell.className = "cell";
        this.field.appendChild(cell);
    }

    return this;

};

Game.prototype.setBullets = function () {
    var level = this.levels[this.currentLevel - 1];

    for (var i = 0; i < level.length; i++) {

        var cell = this.field.childNodes[i];
        if (level[i] !== "-") {
            cell.dataset.color = level[i];
            cell.dataset.bull = level[i];
        }

    }

    return this;
};

var selectEl = null;

Game.prototype.eventMouseDown = function (e) {
    var elem = e.target;

    if (inArray(elem.classList, "cell")) {
        selectEl = elem;
    }

    return this;
};

Game.prototype.eventMouseDblClick = function(e) {
    var elem = e.target;
    var elements = this.field.querySelectorAll(".cell[data-color='" + elem.dataset["color"] + "']");

    for (var i = 0; i < elements.length; i++) {
        elements[i].className = "cell";
        if(elements[i].dataset["bull"] == undefined)
            delete elements[i].dataset["color"];
    }

    return this;
}

Game.prototype.eventMouseMove = function (f) {
    var mElem = f.target;
    if (mElem.className == "cell" && selectEl != null) {

        if (selectEl.dataset["bull"] == mElem.dataset["bull"]
            && selectEl.id != mElem.id) {
            var selectElements = this.field.querySelectorAll(".cell[data-color='" + selectEl.dataset["color"] + "']");

            for (var i = 0; i < selectElements.length; i++) {
                selectElements[i].className = "cell fin";
            }

            this.eventMouseUp;
        } else if (mElem.dataset["bull"] == undefined) {
            mElem.dataset["color"] = selectEl.dataset["color"];
        }

    }

    return this;
};


Game.prototype.eventMouseUp = function() {
    var cells = this.field.querySelectorAll(".cell");
    var countCells = 0;

    for (var i = 0; i < cells.length; i++) {
        if(cells[i].attributes.class.nodeValue == "cell fin") {
            countCells++;
        }
    }

    if (countCells ==  this.levels[this.currentLevel - 1].length) {
        alert("You win");
    }

    selectEl = null;

    return this;
};

function inArray(array, value) {

    for (var i = 0; i < array.length; i++) {
        if (array[i] == value) return 1;
    }

    return -1;

}