var contentNumber = 4;
var luckContentArray = new Array();
var boolArray = new Array();
var luckDegreeHash = ["N" , "C" , "B" , "A" , "S"];
var luckDegreeColorHash = ["gray" , "blue" , "#bfa" , "orange" , "gold"];
function luckContentInit() {
    luckContentArray.push("睡大觉" , "摆大烂" , "恰饭" , "奖励自己！" , "膜拜巨佬" , "出门玩" , "刷题" , "当嘉心糖♥" , "打游戏" ,
                          "认真听课" , "见证" , "当OP" , "重构代码" , "敲代码" , "考试");
    for (var i = 0 ; i < luckContentArray.length ; i++) {
        boolArray[i] = 0;
    }
}
function showLuck() {
    var signInBox = document.getElementsByClassName("SignInBox")[0];
    var lucky = document.getElementsByClassName("Lucky")[0];
    lucky.style.visibility = "visible";
    var luckContentArray = drawLuck();
    var luckContentElementArray = document.getElementsByClassName("List");
    var goodLuckNum = 0;
    for (var i = 0 ; i < luckContentElementArray.length ; i++) {
        if (luckContentArray[i].good == 1) {
            goodLuckNum++;
            var luckContentStr = "GOOD : " + luckContentArray[i].content;
            luckContentElementArray[i].innerHTML = luckContentStr;
            luckContentElementArray[i].style.color = "gold";
        }
        else {
            var luckContentStr = "BAD : " + luckContentArray[i].content;
            luckContentElementArray[i].innerHTML = luckContentStr;
            luckContentElementArray[i].style.color = "gray";
        }
    }
    var luckyDegree = document.getElementsByClassName("LuckyDegree")[0];
    luckyDegree.innerHTML = luckDegreeHash[goodLuckNum];
    luckyDegree.style.color = luckDegreeColorHash[goodLuckNum];
    this.style.animation = "signInButtonClick 1s forwards";
}

function setFunctionForLuck() {
    luckContentInit();
    var signInButton = document.getElementsByClassName("SignInButton");
    for (var i = 0 ; i < signInButton.length ; i++) {
        signInButton[i].onclick = showLuck;
    }
}

function drawLuck() {
    var luckArray = new Array();
    for (var i = 0 ; i < contentNumber ; i++) {
        var k = -1;
        while (k == -1 || boolArray[k] == 1) {
            k = Math.floor(Math.random() * luckContentArray.length);
        }
        boolArray[k] = 1;
        var obj = new Object();
        if (Math.random() < 0.5) {
            // good luck
            obj.good = 1;
        }
        else {
            // bad luck
            obj.good = 0;
        }
        obj.content = luckContentArray[k];
        luckArray.push(obj);
    }
    return luckArray;
}
