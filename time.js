function addZero(timeStr) {
    return timeStr < 10 ? ("0" + timeStr) : timeStr;
}

function setTimer() {
    var timeText = document.getElementsByClassName("TimeText")[0];
    var date = new Date();
    timeText.innerHTML = addZero(date.getHours()) + ":" + addZero(date.getMinutes()) + ":" + addZero(date.getSeconds());
}