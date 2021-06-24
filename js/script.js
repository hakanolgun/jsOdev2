const TASK_LIST = 'TASK_LIST'

function showList() {
    let list = document.getElementById("list")
    list.innerHTML = ""
    const tasks = getTasksFromStorage()

    for(let i = 0; i < tasks.length; i++) {
        const liItem = createLi();
        liItem.innerText = tasks[i].value;
        if(tasks[i].checked) {
            liItem.classList.add("checked")
        }
        const span = createSpan()
        liItem.appendChild(span);
        liItem.id = tasks[i].id;
        list.appendChild(liItem);
    }
}

function newElement() {
    const tasks = getTasksFromStorage()
    const inputVal = getInputVal()

    if(inputVal) {
        const id = genUniqueId()
        let list = document.getElementById("list")
        const liItem = createLi();
        liItem.innerText = inputVal;
        const span = createSpan()
        liItem.appendChild(span);
        liItem.id = id
        list.appendChild(liItem);
        tasks.push({
            id,
            value: inputVal,
            checked: false
        })
        window.localStorage.setItem(TASK_LIST, JSON.stringify(tasks))
        showList();
    }
}

function genUniqueId() {
    return 'id' + (new Date()).getTime();
}

function getInputVal() {
    const inputValue = document.getElementById("task").value;
    if (inputValue === "" || inputValue.replace(/^\s+|\s+$/g, "").length == 0) {
        $(".error").toast("show");
        return null;
    }
    $(".success").toast("show");
    return inputValue;
}

function getTasksFromStorage() {
    return JSON.parse(window.localStorage.getItem(TASK_LIST)) || []
}

function deleteTaskFromStorage(taskId) {
    const tasks = getTasksFromStorage(TASK_LIST);
    const filteredTasks = tasks.filter(i => i.id !== taskId)
    window.localStorage.setItem(TASK_LIST, JSON.stringify(filteredTasks))
}

function toggleTaskCheckedValue(taskId) {
    const tasks = getTasksFromStorage(TASK_LIST);
    let [founded] = tasks.filter(i => i.id === taskId)

    if(founded) {
        founded.checked = !founded.checked
    }

    const newTasks = tasks.map(task => {
        if(task.id === taskId) {
            return founded
        }
        return task
    })

    window.localStorage.setItem(TASK_LIST, JSON.stringify(newTasks))
}

function createSpan() {
    let span = document.createElement("span");
    span.addEventListener("click", () => {
        deleteTaskFromStorage(span.parentElement.id)
        showList();
        span.parentElement.removeEventListener("click", () => {})
        span.parentElement.remove()
    })
    let txt = document.createTextNode("x");
    span.className = "close";
    span.appendChild(txt);
    return span;
}

function createLi() {
    const liItem = document.createElement("li")
    liItem.addEventListener("click", () => {
        liItem.classList.toggle("checked")
        toggleTaskCheckedValue(liItem.id)
    })
    return liItem;
}

showList();
