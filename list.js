var taskSep = "\r\n";
var sep = " ";
function AddTagRotate(obj , ord) {
    if (ord == 0) {
        obj.open = true;
        var deg = 0;
        var id = setInterval(move , 5);
        function move() {
            deg++;
            obj.style.transform = "rotateZ(" + deg + "deg)";
            if (deg == 90) {
                clearInterval(id);
            }
        }
    }
    else {
        obj.open = false;
        var deg = 90;
        var id = setInterval(move , 5);
        function move() {
            deg--;
            obj.style.transform = "rotateZ(" + deg + "deg)";
            if (deg == 0) {
                clearInterval(id);
            }
        }
    }
}

function taskShow(obj , ord , delay) {
    if (ord == 0) {
        var top = -40;
        var opacity = 0;
        var id = setInterval(move , 5);
        obj.style.top = -40;
        obj.style.opacity = 0;
        function move() {
            if (delay > 0) {
                delay -= 5;
            }
            else if (delay == 0) {
                top += 0.5;
                opacity += 0.0125;
                obj.style.top = top + "px";
                obj.style.opacity = opacity;
                if (top == 0) {
                    clearInterval(id);
                    opacity = 1;
                    obj.style.opacity = opacity;
                }
            }
        }
    }
}

function folderExpand(onclickEvent) {
    // find all taskList
    var taskList = document.getElementsByClassName("TaskList");
    var targetList;
    for (var i = 0 ; i < taskList.length ; i++) {
        // find the targetList which included the event target
        if (taskList[i].contains(onclickEvent.target)) {
            targetList = taskList[i];
            break;
        }
    }
    
    if (targetList == undefined) {
        return;
    }

    var targetListAddTag = targetList.getElementsByClassName("AddTask")[0];

    function arrTaskShow(targetListFolder , ord) {
        for (var i = 1 ; i < targetListFolder.children.length ; i++) {
            taskShow(targetListFolder.children[i] , ord , i * 100);
        }
    }

    var targetListFolder = targetList.parentElement;
    if (targetListFolder.style.height == "auto") {
        AddTagRotate(targetListAddTag , 1); 
        targetListFolder.style.height = "60px";  
    }
    else {
        AddTagRotate(targetListAddTag , 0);
        arrTaskShow(targetListFolder , 0);  
        targetListFolder.style.height = "auto"  
    }
}

function setFunctionForList() {
    init();
    var addFoler = document.getElementsByClassName("TimeTag")[0];
    addFoler.onclick = addNewFolder;
    var taskListFolder = document.getElementsByClassName("TaskListFolder");
    for (var i = 0 ; i < taskListFolder.length ; i++) {
        // set the onclick expand function for folder
        taskListFolder[i].onclick = folderExpand;
        taskListFolder[i].onmousedown = removeFolder;
        // set the onclick gotoWeb function for task
        var taskArray = taskListFolder[i].getElementsByClassName("Task");
        for (var j = 0 ; j < taskArray.length ; j++) {
            taskArray[j].onclick = gotoWeb;
            taskArray[j].inmousedown = removeTask;
        }
        // set the onclick addTask function for addtag
        var addTag = taskListFolder[i].getElementsByClassName("TaskList")[0].getElementsByClassName("AddTask")[0];
        addTag.onclick = addNewTask;
    }
}

// called by AddTag object
function addNewTask(onClickEvent) {
    if (this.open == true) {
        var address = alertInput("WEB ADDRESS");
        var name = alertInput("WEB NAME");

        if (address == null || name == null) {
            return;
        }
        var folder = this.parentElement.parentElement;
        addNewTaskEvent(folder , name , address);

        // storage
        var taskArray = localStorage.getItem(folder.name);
        if (taskArray == null) {
            taskArray = name + sep + address + taskSep;
        }
        else {
            taskArray = taskArray + name + sep + address + taskSep; 
        }
        localStorage.setItem(folder.name , taskArray);
        console.log(taskArray);
    }

    onClickEvent.cancelBubble = true;
}

function addNewTaskEvent(folder , name , address) {
    var foldername = folder.getElementsByClassName("TaskList")[0].getElementsByClassName("TaskText")[0].innerHTML;
    // create a new Task object
    var task = document.createElement("div");
    var listTag = document.createElement("div");
    var icon = document.createElement("div");
    var listText = document.createElement("div");
    var text = document.createTextNode(name);

    task.className = "Task";
    listTag.className = "ListTag";
    icon.className = "Icon";
    listText.className = "ListText";

    changeIconImage(icon , address + "favicon.ico");

    listText.appendChild(text);
    task.appendChild(listTag);
    task.appendChild(icon);
    task.appendChild(listText);
    task.onclick = gotoWeb;
    task.onmousedown = removeTask;
    task.address = address; 
    task.name = name;

    folder.appendChild(task);
}

function addNewFolder() {
    var name = alertInput("COLLECTION NAME");
    if (name == null) {
        return;
    }
    addNewFolderEvent(this , name);
    // storage
    localStorage.setItem(name , "");
}

function addNewFolderEvent(obj , name) {
    var taskBox = document.getElementsByClassName("TaskBox")[0];
    // create a new folder object
    var folder = document.createElement("div");
    var taskList = document.createElement("div");
    var listTagFolder = document.createElement("div");
    var taskText = document.createElement("div");
    var addTask = document.createElement("div");
    var space = document.createElement("div");
    var text = document.createTextNode(name);

    taskList.className = "TaskList";
    listTagFolder.className = "ListTagFolder";
    taskText.className = "TaskText";
    addTask.className = "AddTask";
    space.className = "Space";
    folder.className = "TaskListFolder";

    taskText.appendChild(text);
    taskList.appendChild(listTagFolder);
    taskList.appendChild(taskText);
    taskList.appendChild(addTask);
    taskList.appendChild(space);
    folder.appendChild(taskList);

    folder.onclick = folderExpand;
    folder.onmousedown = removeFolder;
    addTask.onclick = addNewTask;
    folder.name = name;

    taskBox.appendChild(folder);
    
    return folder;
}

// called by Task
function removeTask(onClickEvent) {
    if (onClickEvent.button == 2) {
        var sure = alertInput("SURE?");
        var folder = this.parentElement;
        if (sure == null) {
            return;
        }
        else if (sure == "SURE") {
            removeTaskEvent(this);
        }
    }
    // storage
    var taskStr = localStorage.getItem(folder.name);
    if (taskStr == null) {
        return;
    }
    var taskArray = taskStr.split(taskSep);
    var deleteIndex = 0;
    for (var j = 0 ; j < taskArray.length ; j++) {
        var task = taskArray[j].split(sep);
        if (task.length == 2) {
            var name = task[0];
            var address = task[1];
            if (task[0] == this.name && task[1] == this.address) {
                deleteIndex = j;
            }
        }
    }
    taskStr = null;
    for (var k = 0 ; k < taskArray.length ; k++) {
        if (k == deleteIndex) {
            continue;
        }
        var task = taskArray[k].split(sep);
        if (task.length == 2) {
            var name = task[0];
            var address = task[1];
            if (taskStr == null) {
                taskStr = name + sep + address + taskSep;
            }
            else {
                taskStr = taskStr + name + sep + address + taskSep;
                console.log(taskStr);
            }
        }
    }
    if (taskStr == null) {
        taskStr = "";
    }
    localStorage.setItem(folder.name , taskStr);
    onClickEvent.cancelBubble = true;
}

function removeTaskEvent(obj) {
    obj.parentElement.removeChild(obj);
}

// called by folder
function removeFolder(onClickEvent) {
    if (onClickEvent.button == 2) {
        var sure = alertInput("SURE?");
        if (sure == null) {
            return;
        }
        else if (sure == "SURE") {
            removeFolerEvent(this);
        }
    }
    onClickEvent.cancelBubble = true;
}

function removeFolerEvent(obj) {
    obj.parentElement.removeChild(obj);
    localStorage.removeItem(obj.name);
}

// called by task object
function gotoWeb(onClickEvent) {
    if (this.contains(onClickEvent.target)) {
        window.open(this.address);
    }
    onClickEvent.cancelBubble = true;
}

function alertInput(str) {
    while (true) {
        var res = prompt(str);
        if (res != "") {
            return res;
        }
    }
}

function changeIconImage(icon , iconAddress) {
    icon.style.backgroundImage = "url(" + iconAddress + ")";
}

function init() {
    for (var i = 0 ; i < localStorage.length ; i++) {
        var taskStr = localStorage.getItem(localStorage.key(i));
        var newFolder = addNewFolderEvent(null , localStorage.key(i));
        if (taskStr == "") {
            continue;
        }
        var taskArray = taskStr.split(taskSep);
        for (var j = 0 ; j < taskArray.length ; j++) {
            var task = taskArray[j].split(sep);
            if (task.length == 2) {
                var name = task[0];
                var address = task[1];
                addNewTaskEvent(newFolder , name , address);
            }
        }
    }
}