// ============================
// TOOLORA AI V3
// ============================

const WORKER_URL = "https://toolora-ai.yt3766701.workers.dev";

const input = document.getElementById("prompt");
const sendBtn = document.getElementById("send");
const chatBox = document.getElementById("chatBox");
const typing = document.getElementById("typing");
const clearBtn = document.getElementById("clearChat");

let history =
JSON.parse(localStorage.getItem("toolora_history")) || [];

window.onload = () => {

if(history.length===0) return;

chatBox.innerHTML="";

history.forEach(msg=>{

createMessage(msg.text,msg.sender,false);

});

scrollBottom();

};

function scrollBottom(){

chatBox.scrollTop=chatBox.scrollHeight;

}

function save(){

localStorage.setItem(

"toolora_history",

JSON.stringify(history)

);

}

function createMessage(text,sender,saveChat=true){

const box=document.createElement("div");

box.className=

sender==="user"

?

"user-message"

:

"ai-message";

if(sender==="user"){

box.innerHTML=`
<div class="message">
${text}
</div>
`;

}else{

box.innerHTML=`
<div class="avatar">🤖</div>

<div class="message">

${text}

</div>
`;

}

chatBox.appendChild(box);

scrollBottom();

if(saveChat){

history.push({

text,

sender

});

save();

}

}

// ============================
// SEND MESSAGE
// ============================

async function sendMessage() {

const message = input.value.trim();

if (!message) return;

createMessage(message, "user");

input.value = "";

typing.style.display = "block";

sendBtn.disabled = true;
sendBtn.innerHTML = "⏳";

try {

const response = await fetch(WORKER_URL, {

method: "POST",

headers: {

"Content-Type": "application/json"

},

body: JSON.stringify({

message: message

})

});

const data = await response.json();

typing.style.display = "none";

sendBtn.disabled = false;

sendBtn.innerHTML = "➤";

if (data.success) {

createMessage(data.reply, "ai");

} else {

createMessage(

"❌ " + (data.error?.message || JSON.stringify(data.error)),

"ai"

);

}

} catch (err) {

typing.style.display = "none";

sendBtn.disabled = false;

sendBtn.innerHTML = "➤";

createMessage(

"❌ Network Error\n" + err.message,

"ai"

);

}

}

// Button

sendBtn.addEventListener("click", sendMessage);

// Enter Key

input.addEventListener("keydown", (e) => {

if (e.key === "Enter") {

sendMessage();

}

});

// ============================
// CLEAR CHAT
// ============================

clearBtn.addEventListener("click", () => {

if (!confirm("Clear all chats?")) return;

history = [];

localStorage.removeItem("toolora_history");

chatBox.innerHTML = `
<div class="ai-message">

<div class="avatar">🤖</div>

<div class="message">

Hello 👋<br><br>

I'm Toolora AI.<br>

How can I help you today?

</div>

</div>
`;

});

// ============================
// COPY AI MESSAGE
// ============================

chatBox.addEventListener("click", (e) => {

const bubble = e.target.closest(".message");

if (!bubble) return;

const parent = bubble.parentElement;

if (parent.classList.contains("ai-message")) {

navigator.clipboard.writeText(bubble.innerText);

bubble.style.outline = "2px solid #5b6cff";

setTimeout(() => {

bubble.style.outline = "none";

}, 500);

}

});

// ============================
// TYPING ANIMATION
// ============================

let dots = 0;

setInterval(() => {

if (typing.style.display === "block") {

dots = (dots + 1) % 4;

typing.innerHTML = "Toolora AI is typing" + ".".repeat(dots);

}

}, 400);

// ============================
// CONNECTION STATUS
// ============================

window.addEventListener("offline", () => {

createMessage("⚠️ No Internet Connection", "ai");

});

window.addEventListener("online", () => {

console.log("Internet Connected");

});

// ============================
// READY
// ============================

console.log("✅ Toolora AI Ready");

input.focus();
