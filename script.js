let wh = 50;
let timerId;
let timerSpeed = 500;

function step () {
    let divArr = [];
    let activeDiv = [];
    $(".active").each(function() {
        let id = Number($(this).attr("data-id"));
        divArr.push(id);
        if (id % wh != 0 && id > wh - 1) divArr.push(id - wh - 1);
        if (id % wh != 0) divArr.push(id - 1);
        if (id % wh != wh - 1 && id > wh - 1) divArr.push(id - wh + 1);
        if (id > wh - 1) divArr.push(id - wh);
        if (id % wh != 0 && id < wh * wh - 20) divArr.push(id + wh - 1);
        if (id % wh != wh - 1) divArr.push(id + 1);
        if (id % wh != wh - 1 && id < wh * wh - 20) divArr.push(id + wh + 1);
        if (id < wh * wh - 20) divArr.push(id + wh);
    });
    if (divArr.length == 0 && timerId != null) {
        clearInterval(timerId);
        timerId = null;
        return ;
    }
    divArr = divArr.filter((item, index) => divArr.indexOf(item) === index);
    divArr.forEach(elem => {
        let count = 0;
        let id = elem;
        if (id % wh != 0 && id > wh - 1) {
            count += ($("div[data-id=" + (id - wh - 1) + "]").attr("class")) ? 1 : 0;
        }
        if (id % wh != 0) {
            count += ($("div[data-id=" + (id - 1) + "]").attr("class")) ? 1 : 0;
        }
        if (id % wh != wh - 1 && id > wh - 1) {
            count += ($("div[data-id=" + (id - wh + 1) + "]").attr("class")) ? 1 : 0;
        }
        if (id > wh - 1) {
            count += ($("div[data-id=" + (id - wh) + "]").attr("class")) ? 1 : 0;
        }
        if (id % wh != 0 && id < wh * wh - 20) {
            count += ($("div[data-id=" + (id + wh - 1) + "]").attr("class")) ? 1 : 0;
        }
        if (id % wh != wh - 1) {
            count += ($("div[data-id=" + (id + 1) + "]").attr("class")) ? 1 : 0;
        }
        if (id % wh != wh - 1 && id < wh * wh - 20) {
            count += ($("div[data-id=" + (id + wh + 1) + "]").attr("class")) ? 1 : 0;
        }
        if (id < wh * wh - 20) {
            count += ($("div[data-id=" + (id + wh) + "]").attr("class")) ? 1 : 0;
        }
        activeDiv.push([id, count]);
    });
    activeDiv.forEach(elem => {
        if(elem[1] == 3) $("div[data-id=" + elem[0] + "]").attr("class", "active");
        if (elem[1] <= 1 || elem[1] >= 4) $("div[data-id=" + elem[0] + "]").removeAttr("class");
    });
}

$(document).ready(function() {
    for (let i = 0; i < wh * wh; i++) {
        let block = "<div data-id='" + i + "'></div>";
        $(".container").append(block);
    }

    $(".container div").on("click", function() {
        let id = $(this).attr("data-id");
        $(this).attr("class") ? $(this).removeAttr("class") : $(this).attr("class", "active");
    });

    $("#start").on("click", function () {
        if (timerId == null) {
            timerSpeed = 500;
            timerId = setInterval(step, timerSpeed);
        }
    });

    $("#stop").on("click", function() {
        if (timerId != null) {
            clearInterval(timerId);
            timerId = null;
        }
    });

    $("#slow").on("click", function() {
        if (timerId != null) {
            clearInterval(timerId);
            timerSpeed *= 2;
            timerId = setInterval(step, timerSpeed);
        }
    });

    $("#fast").on("click", function() {
        if (timerId != null) {
            clearInterval(timerId);
            timerSpeed /= 2;
            timerId = setInterval(step, timerSpeed);
        }
    });

    $("#clear").on("click", function() {
        $(".container div").each(function() {
            $(this).removeAttr("class");
        });
    });
});