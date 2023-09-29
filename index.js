import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://we-are-champions007-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementsInDB = ref(database, "endorsements");

const textAreaEl = document.getElementById("msg-text");
const msgFromEl = document.getElementById("msg-from");
const msgToEl = document.getElementById("msg-to");
const btnPublish = document.getElementById("btn-publish");
const msgListEL = document.getElementById("msg-list")

btnPublish.addEventListener('click', function() {
    let msg = textAreaEl.value;
    let from = msgFromEl.value;
    let msgTo = msgToEl.value;

    console.log(`To ${msgTo}, ${msg}, From ${from}`);
    const endorsement = {
        msgFrom: from,
        to: msgTo,
        message: msg
    }
    push(endorsementsInDB, endorsement);

    clearInputFields();
})

function clearInputFields() {
    textAreaEl.value = "";
    msgFromEl.value = "";
    msgToEl.value= "";
}


function appendMsgToList(msg, msgFrom, msgTo) {
    let newEl = document.createElement("li");
    let newMsgEL = document.createElement("p");
    let newFrmEl = document.createElement("p");
    let newToEl = document.createElement("p");
    let newLikeEl = document.createElement("i");

    newToEl.textContent = `To ${msgTo}`;
    newToEl.className ='to';

    newMsgEL.textContent = msg;

    newFrmEl.textContent = `From ${msgFrom}`;
    newFrmEl.className = 'from'

    newLikeEl.textContent = ` 0`
    newLikeEl.className = 'fa fa-heart';
    newFrmEl.append(newLikeEl);

    newEl.append(newToEl, newMsgEL, newFrmEl);
    msgListEL.append(newEl);

}