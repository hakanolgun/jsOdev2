let myNodelist = document.getElementsByTagName("li");

// LİST ITEM OLUŞTURMA
for (let i = 0; i < myNodelist.length; i++) {
    let span = document.createElement("span");
    let txt = document.createTextNode("x");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}

let close = document.getElementsByClassName("close");

// ÇARPIYA TIKLAYINCA ITEM KAYBOLSUN
for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        let div = this.parentElement;
        div.style.display = "none";

    };
}

let list = document.querySelector("ul");

// TIKLANINCA ÜSTÜ ÇİZİLSİN
list.addEventListener(
    "click",
    function (ev) {
        if (ev.target.tagName === "LI") {
            ev.target.classList.toggle("checked");
        }
    },
    false
);


let localItems = JSON.parse(localStorage.getItem("localItem"))
let outPut = "";
let taskListShow = list; //emin değilim

//YENİ ELEMENT EKLEME
function newElement(e) {

    let li = document.createElement("li");
    let inputValue = document.getElementById("task").value;
    let t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === "" || inputValue.replace(/^\s+|\s+$/g, "").length == 0) {
        $(".error").toast("show");
    } else {
        $(".success").toast("show");
        document.getElementById("list").appendChild(li);
    }
    document.getElementById("task").value = "";

    let span = document.createElement("span");
    let txt = document.createTextNode("x");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (let i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            let div = this.parentElement;
            div.style.display = "none";

            localStorage.removeItem("localItem", );

        };
    }

    localItems = JSON.parse(localStorage.getItem("localItem"))
    if (localItems === null) {
        taskList = []
    } else {
        taskList = localItems;
    }
    taskList.push(inputValue)
    localStorage.setItem("localItem", JSON.stringify(taskList))
}

function showList() {

    let localItems = JSON.parse(localStorage.getItem("localItem"))
    if (localItems === null) {
        taskList = []
    } else {
        taskList = localItems;
    }
    //   taskList.forEach((itemvalue, index) => {
    //       outPut += 
    //       <li>${itemvalue}</li>
    //   });
    //   taskListShow.innerHTML = outPut;
}

showList();

// function deleteItem(index){
//     let localItems = JSON.parse(localStorage.getItem("localItem"))
//     taskList.splice(index, 1)
//     localStorage.setItem("localItem", JSON.stringify(taskList))
//     showList()
// }
// deleteItem();

