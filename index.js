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
    appendMsgToList(msg, from, msgTo);
})


function appendMsgToList(msg, msgFrom, msgTo) {
    let newEl = document.createElement("li");
    let newMsgEL = document.createElement("p");
    let newFrmEl = document.createElement("p");
    let newToEl = document.createElement("p");

    newToEl.textContent = `To ${msgTo}`;
    newToEl.className ='to';

    newMsgEL.textContent = msg;

    newFrmEl.textContent = `From ${msgFrom}`;
    newFrmEl.className = 'from'

    newEl.append(newToEl, newMsgEL, newFrmEl);
    msgListEL.append(newEl);

}