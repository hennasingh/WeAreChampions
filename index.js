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
})