// used by MainBox.onMouseMove
function helicopter(onMouseMoveEvent) {
    var hec = document.getElementsByClassName("helicopter")[0];
    hec.style.top = onMouseMoveEvent.pageY + 5 + "px";
    hec.style.left = onMouseMoveEvent.pageX + 5 + "px";
}