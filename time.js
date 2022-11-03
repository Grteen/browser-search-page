function addZero(timeStr) {
    return timeStr < 10 ? ("0" + timeStr) : timeStr;
}

function setTimer() {
    var timeText = document.getElementsByClassName("TimeText")[0];
    var date = new Date();
    timeText.innerHTML = addZero(date.getHours()) + ":" + addZero(date.getMinutes()) + ":" + addZero(date.getSeconds());
}

function setDater() {
    var DateText = document.getElementsByClassName("Date");
    var date = new Date();
    for (var i = 0 ; i < DateText.length ; i++) {
        DateText[i].innerHTML = (date.getFullYear()) + " : " + addZero(date.getMonth() + 1) + " : " + addZero(date.getDate());
    }
}