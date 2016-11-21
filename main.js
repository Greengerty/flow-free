"use strict";

var matrix = document.getElementById("canv");
var currentLevel = 1;

var levels = [
    "A---AB---CD-D--B---CE---E",
    "B---CA-AB-D--D-C----E---E",
    "ABA----C----BC--D-D------",
    "D---B-BA---ACC----------D",
    "AB-CA-DB----D-----C-EE---"
];

var colors = {
    A: "rgb(255, 0, 0)",
    B: "rgb(0, 0, 255)",
    C: "rgb(0, 255, 0)",
    D: "rgb(255, 255, 0)",
    E: "rgb(244, 247, 247)",
    "-": "#000000"
};

var Game = function () {};

Game.prototype.matrix = function () {

    for(var i = 1; i <= 25; i++) {
        var cell = document.createElement("div");
        cell.id = "id-" + i;
        cell.className = "cell";
        matrix.appendChild(cell);
    }

};

Game.prototype.bullets = function() {
    var level = levels[currentLevel-1];
    for (var i = 0; i < level.length; i++) {

        var cell = matrix.childNodes[i];
        if(level[i] !== "-")
            cell.dataset.bull = level[i];

        cell.style.background = colors[ level[i] ];

    }
};

var selectEl = null;

Game.prototype.eventMouseDown = function(e) {
    var elem = e.target;
    if(elem.className == "cell") {
        selectEl = elem;
    }
    matrix.addEventListener("mousemove", function(f) {
        var mElem = f.target;

        if(mElem.className == "cell" && selectEl != null) {
            console.log(mElem.dataset["bull"]);

            if(selectEl.dataset["bull"] == mElem.dataset["bull"]
                && selectEl.id != mElem.id) {
                selectEl = null;
            } else if(selectEl.dataset["bull"] !== mElem.dataset["bull"] &&
                mElem.dataset["bull"] != undefined ) {
                console.log("test")
            } else {
                mElem.style.background = selectEl.style.background;
            }
        }
    }, false);
};

Game.prototype.eventMouseUp = function() {
    var cells = matrix.querySelectorAll(".cell");
    var countCells = 0;
    // @todo refactor
    for(var i = 0; i < cells.length; i++) {
        if(cells[i].style.background == selectEl.style.background
            && cells[i].dataset["bull"] == undefined) {
            cells[i].style.background = colors["-"];
        }

        if(cells[i].style.background != "rgb(0, 0, 255)") {
            console.log("test")
            countCells++;
        }
    }

    if(countCells == 24) {
        alert("You win");
    }

    selectEl = null;
};

;(function() {
    var game = new Game();
    game.matrix();
    game.bullets();
    // @todo refactor
    matrix.addEventListener("mousedown", game.eventMouseDown, false);
    matrix.addEventListener("mouseup", game.eventMouseUp, false);
})();