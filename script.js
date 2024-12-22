let fieldWidth = 40;
let fieldHeight = 40;
let timerId;
let timerSpeed = 500;
let currentGen = [];
let currentGenSiblings = [];
let nextGen = [];
let generation = 0;
let object;

let speedOutput;
let widthOutput;
let heightOutput;
let generationOutput;

function divGrid() {
    $(".container").css("grid-template-columns", "repeat(" + fieldWidth + ", 20px)");
    currentGenSiblings = [];
    nextGen = [];
    for (let i = 0; i < fieldWidth * fieldHeight; i++) {
        let block = "<div data-id='" + i + "'></div>";
        $(".container").append(block);
    }
}

function step () {

    if (currentGen.length == 0 && timerId != null) {
        clearInterval(timerId);
        timerId = null;
        object.html("Старт");
        generation = 0;
        generationOutput.html("Поколение: " + generation);
        return ;
    }

    generation++;
    generationOutput.html("Поколение: " + generation);

    currentGen.forEach(id => {
        if (id % fieldWidth != 0 && id > fieldWidth - 1 && !currentGenSiblings.includes(id - fieldWidth - 1)) {
            currentGenSiblings.push(id - fieldWidth - 1);
        }
        if (id > fieldWidth - 1 && !currentGenSiblings.includes(id - fieldWidth)) {
            currentGenSiblings.push(id - fieldWidth);
        }
        if (id % fieldWidth != fieldWidth - 1 && id > fieldWidth - 1 && !currentGenSiblings.includes(id - fieldWidth + 1)) {
            currentGenSiblings.push(id - fieldWidth + 1);
        }
        if (id % fieldWidth != 0 && !currentGenSiblings.includes(id - 1)) {
            currentGenSiblings.push(id - 1);
        }
        if (!currentGenSiblings.includes(id)) {
            currentGenSiblings.push(id);
        }
        if (id % fieldWidth != fieldWidth - 1 && !currentGenSiblings.includes(id + 1)) {
            currentGenSiblings.push(id + 1);
        }
        if (id % fieldWidth != 0 && id < fieldWidth * fieldHeight - fieldWidth && !currentGenSiblings.includes(id + fieldWidth - 1)) {
            currentGenSiblings.push(id + fieldWidth - 1);
        }
        if (id < fieldWidth * fieldHeight - fieldWidth && !currentGenSiblings.includes(id + fieldWidth)) {
            currentGenSiblings.push(id + fieldWidth);
        }
        if (id % fieldWidth != fieldWidth - 1 && id < fieldWidth * fieldHeight - fieldWidth && !currentGenSiblings.includes(id + fieldWidth + 1)) {
            currentGenSiblings.push(id + fieldWidth + 1);
        }
    });

    currentGenSiblings.forEach(id => {
        let count = 0;
        if (id % fieldWidth != 0 && id > fieldWidth - 1) {
            count += (currentGen.includes(id - fieldWidth - 1)) ? 1 : 0;
        }
        if (id > fieldWidth - 1) {
            count += (currentGen.includes(id - fieldWidth)) ? 1 : 0;
        }
        if (id % fieldWidth != fieldWidth - 1 && id > fieldWidth - 1) {
            count += (currentGen.includes(id - fieldWidth + 1)) ? 1 : 0;
        }
        if (id % fieldWidth != 0) {
            count += (currentGen.includes(id - 1)) ? 1 : 0;
        }
        if (id % fieldWidth != fieldWidth - 1) {
            count += (currentGen.includes(id + 1)) ? 1 : 0;
        }
        if (id % fieldWidth != 0 && id < fieldWidth * fieldHeight - fieldWidth) {
            count += (currentGen.includes(id + fieldWidth - 1)) ? 1 : 0;
        }
        if (id < fieldWidth * fieldHeight - fieldWidth) {
            count += (currentGen.includes(id + fieldWidth)) ? 1 : 0;
        }
        if (id % fieldWidth != fieldWidth - 1 && id < fieldWidth * fieldHeight - fieldWidth) {
            count += (currentGen.includes(id + fieldWidth + 1)) ? 1 : 0;
        }
        nextGen.push([id, count]);
    });
    currentGenSiblings = [];
    nextGen.forEach(elem => {
        if(elem[1] == 3) {
            $("div[data-id=" + elem[0] + "]").attr("class", "active");
            currentGenSiblings.push(elem[0]);
        } else if (elem[1] == 2 && currentGen.includes(elem[0])) {
            currentGenSiblings.push(elem[0]);
        }else {
            $("div[data-id=" + elem[0] + "]").removeAttr("class");
        } 
    });
    currentGen = currentGenSiblings;
    currentGenSiblings = [];
    nextGen = [];
}

$(document).ready(function() {

    speedOutput =  $("#speed");
    widthOutput = $("#width");
    heightOutput = $("#height");
    generationOutput = $("#generation");

    speedOutput.html("Скорость: " + timerSpeed / 1000 + "x");
    widthOutput.attr("value", fieldWidth);
    heightOutput.attr("value", fieldHeight);
    generationOutput.html("Поколение: " + 0);

    object = $("#change");

    divGrid();

    object.on("click", function () {
        if (object.html() == "Старт") {
            object.html("Пауза");
            if (timerId == null) {
                timerId = setInterval(step, timerSpeed);
            }
        } else {
            object.html("Старт");
            if (timerId != null) {
                clearInterval(timerId);
                timerId = null;
            }
        }
        
    });

    $("#slow").on("click", function() {
        timerSpeed *= 2;
        speedOutput.html("Скорость: " + timerSpeed / 1000 + "x");
        if (timerId != null) {
            clearInterval(timerId);
            timerId = setInterval(step, timerSpeed);
        }
    });

    $("#fast").on("click", function() {
        timerSpeed /= 2;
        speedOutput.html("Скорость: " + timerSpeed / 1000 + "x");
        if (timerId != null) {
            clearInterval(timerId);
            timerId = setInterval(step, timerSpeed);
        }
    });

    $("#clear").on("click", function() {
        if (object.attr("data-start") == 0) {
            object.html("Старт");
            object.attr("data-start", "1");
        }
        $(".container div").each(function() {
            $(this).removeAttr("class");
        });
        currentGen = [];
        generation = 0;
        generationOutput.html("Поколение: " + generation);
    });

    $("#width").on("input", function() {
        fieldWidth = Number($("#width").val());
        $(".container").html("");
        divGrid();
        currentGen = [];
        widthOutput.attr("value", fieldWidth);
    });

    $("#height").on("input", function() {
        fieldHeight = Number($("#height").val());
        $(".container").html("");
        divGrid();
        currentGen = [];
        heightOutput.attr("value", fieldHeight);
    });

    $(".container").on("click", "div", function() {
        let id = Number($(this).attr("data-id"));
        if ($(this).attr("class")) {
            $(this).removeAttr("class")
            currentGen.splice(currentGen.indexOf(id), 1);
        } else {
            $(this).attr("class", "active");
            currentGen.push(id);
        }
    });

    
});