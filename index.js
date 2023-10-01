import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
        message: msg,
        likes: 0
    }
    push(endorsementsInDB, endorsement);

    clearInputFields();
})

onValue(endorsementsInDB, function(snapshot) {
    if(snapshot.exists()) {
        let msgsArray = Object.entries(snapshot.val())
        
        clearMsgList();
        msgsArray.reverse()

        for(let i = 0; i < msgsArray.length; i++){
            let currentMsg = msgsArray[i]
            appendMsgToList(currentMsg)
        }
    } else {
        msgListEL.innerHTML = "No Endorsements here yet..."
    }
})

function clearInputFields() {
    textAreaEl.value = "";
    msgFromEl.value = "";
    msgToEl.value= "";
}

function clearMsgList() {
    msgListEL.innerHTML = ""
}


function appendMsgToList(currentMsg) {

    let currentMsgId = currentMsg[0];
    let currentMsgValue = currentMsg[1];

    let newEl = document.createElement("li");
    let newMsgEL = document.createElement("p");
    let newFrmEl = document.createElement("p");
    let newToEl = document.createElement("p");
    let newLikeEl = document.createElement("i");

    newToEl.textContent = `To ${currentMsgValue.to}`;
    newToEl.className ='to';

    newMsgEL.textContent = currentMsgValue.message;

    newFrmEl.textContent = `From ${currentMsgValue.msgFrom}`;
    newFrmEl.className = 'from'

    newLikeEl.textContent = ' ' + currentMsgValue.likes

    newLikeEl.className = 'fa fa-heart';
    newFrmEl.append(newLikeEl);

    newLikeEl.addEventListener('click', function() {
        let exactLocationOfMsgInDB = ref(database, `endorsements/${currentMsgId}`)
        let likeUpdate = {
            likes: Number(newLikeEl.textContent) + 1
        }
        update(exactLocationOfMsgInDB, likeUpdate)
    })

    newEl.append(newToEl, newMsgEL, newFrmEl);
    msgListEL.append(newEl);

}