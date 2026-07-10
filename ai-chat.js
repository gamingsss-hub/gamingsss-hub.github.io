// =========================
// TOOLORA AI CHAT V2
// Part 1
// =========================

// Worker URL
const WORKER_URL = "https://toolora-ai.yt3766701.workers.dev";

// Elements
const input = document.getElementById("prompt");
const sendBtn = document.getElementById("send");
const chatBox = document.getElementById("chatBox");
const typing = document.getElementById("typing");
const clearBtn = document.getElementById("clearChat");

// Chat History
let history = JSON.parse(localStorage.getItem("toolora_history")) || [];

// Load Old Messages
window.onload = () => {

if(history.length===0) return;

chatBox.innerHTML="";

history.forEach(msg=>{

addMessage(msg.text,msg.sender,false);

});

scrollBottom();

};

// Scroll
function scrollBottom(){

chatBox.scrollTop=chatBox.scrollHeight;

}

// Save
function saveHistory(){

localStorage.setItem(

"toolora_history",

JSON.stringify(history)

);

}

// Add Message
function addMessage(text,sender,save=true){

const div=document.createElement("div");

div.className=

sender==="user"

?

"user-message"

:

"ai-message";

if(sender==="user"){

div.innerHTML=`

<div class="message">

${text}

</div>

`;

}else{

div.innerHTML=`

<div class="avatar">

🤖

</div>

<div class="message">

${text}

</div>

`;

}

chatBox.appendChild(div);

scrollBottom();

if(save){

history.push({

text,

sender

});

saveHistory();

}

}

// =========================
// SEND MESSAGE
// =========================

async function sendMessage(){

const message=input.value.trim();

if(message==="") return;

addMessage(message,"user");

input.value="";

typing.style.display="block";

try{

const response=await fetch(WORKER_URL,{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

message:message

})

});

const data=await response.json();

typing.style.display="none";

let reply=data.reply;

if(!reply){

reply="Sorry, I couldn't generate a response.";

}

addMessage(reply,"ai");

}catch(e){

typing.style.display="none";

addMessage(

"❌ Unable to connect to Toolora AI.",

"ai"

);

console.error(e);

}

}

// Button

sendBtn.onclick=sendMessage;

// Enter Key

input.addEventListener("keydown",(e)=>{

if(e.key==="Enter"){

sendMessage();

}

});

// =========================
// CLEAR CHAT
// =========================

clearBtn.addEventListener("click",()=>{

if(!confirm("Clear all chat?")) return;

history=[];

localStorage.removeItem("toolora_history");

chatBox.innerHTML=`

<div class="ai-message">

<div class="avatar">
🤖
</div>

<div class="message">

Hello 👋<br><br>

I'm Toolora AI.<br>

How can I help you today?

</div>

</div>

`;

});

// =========================
// COPY AI MESSAGE
// =========================

chatBox.addEventListener("click",(e)=>{

const bubble=e.target.closest(".message");

if(!bubble) return;

const parent=bubble.parentElement;

if(parent.classList.contains("ai-message")){

navigator.clipboard.writeText(

bubble.innerText

);

bubble.style.outline="2px solid #5b6cff";

setTimeout(()=>{

bubble.style.outline="none";

},500);

}

});

// =========================
// INPUT AUTO FOCUS
// =========================

input.focus();

// =========================
// TYPING EFFECT
// =========================

let dots=0;

setInterval(()=>{

if(typing.style.display==="block"){

dots=(dots+1)%4;

typing.innerHTML="Toolora AI is typing"+".".repeat(dots);

}

},400);

// =========================
// CONNECTION STATUS
// =========================

window.addEventListener("online",()=>{

typing.style.display="none";

console.log("Online");

});

window.addEventListener("offline",()=>{

addMessage(

"⚠️ Internet connection lost.",

"ai"

);

});

// =========================
// LOADING BUTTON
// =========================

async function toggleButton(state){

if(state){

sendBtn.disabled=true;

sendBtn.innerHTML="⏳";

}else{

sendBtn.disabled=false;

sendBtn.innerHTML="➤";

}

}

// Wrap original function
const oldSend=sendMessage;

sendMessage=async()=>{

await toggleButton(true);

await oldSend();

await toggleButton(false);

};

// =========================
// WELCOME
// =========================

console.log("✅ Toolora AI Ready");

// Focus input
input.focus();
