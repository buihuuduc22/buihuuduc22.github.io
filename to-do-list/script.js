
var section;
var countCard = 0;
//display input box
function dispInputBox(card) {
    if(card.id == "to-do-icon") section = "to do";
    if(card.id == "doing-icon") section = "doing";
    if(card.id == "done-icon") section = "done";
    document.querySelector("#input-box").style.display = "block";
    document.querySelector("#input").value = "";
    document.querySelector(".btn-submit").removeEventListener("click", repText);
    document.querySelector(".btn-submit").addEventListener("click", addCard);
}

function addCard() {
    var input = document.querySelector("#input").value;
    var origCard = document.querySelector("#to-do p");
    var text = document.querySelector("#to-do p>span");
    if (input != "") {
    text.innerHTML = input;
    //duplicate card
    var copyCard = origCard.cloneNode(true);
    var newCard;
    if(section === "to do") newCard = document.getElementById("to-do").appendChild(copyCard);
    if(section === "doing") newCard = document.getElementById("doing").appendChild(copyCard);
    if(section === "done") newCard = document.getElementById("done").appendChild(copyCard);
    }
    countCard++;
    var cardId = "card-" + countCard;
    newCard.setAttribute("id", cardId);
    document.querySelector("#input-box").style.display = "none";
    document.querySelector("#input").value = "";
    //storage data
    localStorage.setItem("newCard", newCard);

}
if (localStorage.getItem("newCard")) {
    document.getElementById("to-do").innerHTML = localStorage.getItem("newCard");
}

function delCard(trash) {
    trash.parentElement.style.display = 'none';
}

//edit text in a card
function editCard(editor) {
    document.querySelector(".btn-submit").removeEventListener("click", addCard);
    var text = editor.nextElementSibling.innerHTML;
    document.querySelector("#input-box").style.display = "block";
    document.querySelector("#input").value = text;
    editor.nextElementSibling.setAttribute("id", "change");
    document.querySelector(".btn-submit").addEventListener("click", repText);
}

//replace text in card
function repText() {
    var input = document.querySelector("#input").value;
    if (input != "") {
        document.getElementById("change").innerHTML = input;
    }
    document.getElementById("change").removeAttribute("id");
    document.querySelector("#input-box").style.display = "none";
}

//drop and drag card
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
function drop(ev) {
    var _target = ev.target.className;
    if (_target == "card") {
        ev.preventDefault();
    }else {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
    }
}
function allowDrop(ev) {
    ev.preventDefault();
}

function hideBox() {
    document.querySelector("#input-box").style.display = "none";
}
