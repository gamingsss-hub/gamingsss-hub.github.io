// ======================================
// Toolora AI Writing JS
// ======================================

// Selected Tool
let currentTool = "blog";

// Tool Data
const toolData = {

blog:{
title:"AI Blog Writer",
desc:"Create SEO friendly blogs in seconds."
},

article:{
title:"AI Article Writer",
desc:"Generate professional articles instantly."
},

essay:{
title:"AI Essay Writer",
desc:"Write high-quality essays with AI."
},

email:{
title:"AI Email Writer",
desc:"Create formal and business emails."
},

resume:{
title:"AI Resume Builder",
desc:"Create ATS-friendly resumes."
},

grammar:{
title:"AI Grammar Checker",
desc:"Correct grammar instantly."
},

paraphrase:{
title:"AI Paraphraser",
desc:"Rewrite your content naturally."
},

summary:{
title:"AI Summarizer",
desc:"Summarize long content."
},

translator:{
title:"AI Translator",
desc:"Translate into multiple languages."
},

seo:{
title:"AI SEO Writer",
desc:"Generate SEO optimized articles."
}

};

// Elements
const cards=document.querySelectorAll(".tool-card");

const title=document.getElementById("toolTitle");

const desc=document.getElementById("toolDesc");

// Tool Selection

cards.forEach(card=>{

card.addEventListener("click",()=>{

cards.forEach(c=>c.classList.remove("active-tool"));

card.classList.add("active-tool");

currentTool=card.dataset.tool;

if(toolData[currentTool]){

title.innerHTML=toolData[currentTool].title;

desc.innerHTML=toolData[currentTool].desc;

}

document.getElementById("workspace").scrollIntoView({

behavior:"smooth"

});

});

});

// ======================================
// Search AI Tools
// ======================================

const searchBox = document.querySelector(".tool-search");

if(searchBox){

searchBox.addEventListener("input",function(){

const value=this.value.toLowerCase();

document.querySelectorAll(".tool-card").forEach(card=>{

const text=card.innerText.toLowerCase();

card.style.display=text.includes(value)
?"block"
:"none";

});

});

}

// ======================================
// Prompt Counter
// ======================================

const prompt=document.getElementById("prompt");

const wordCount=document.getElementById("wordCount");

const charCount=document.getElementById("charCount");

function updateCounter(){

if(!prompt) return;

const text=prompt.value.trim();

const words=text===""
?0
:text.split(/\s+/).length;

wordCount.innerHTML="Words : "+words;

charCount.innerHTML="Characters : "+text.length;

}

if(prompt){

prompt.addEventListener("input",updateCounter);

}

// ======================================
// Prompt Templates
// ======================================

document.querySelectorAll(".template-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

prompt.value=btn.dataset.template;

updateCounter();

prompt.focus();

});

});

// ======================================
// Auto Resize Textarea
// ======================================

if(prompt){

prompt.addEventListener("input",()=>{

prompt.style.height="auto";

prompt.style.height=prompt.scrollHeight+"px";

});

}

// ======================================
// Clear Prompt
// ======================================

function clearPrompt(){

prompt.value="";

updateCounter();

}

// ======================================
// Keyboard Shortcut
// Ctrl + Enter = Generate
// ======================================

document.addEventListener("keydown",(e)=>{

if(e.ctrlKey && e.key==="Enter"){

const btn=document.getElementById("generateBtn");

if(btn){

btn.click();

}

}

});

// ======================================
// Generate AI Content
// ======================================

const generateBtn = document.getElementById("generateBtn");
const outputBox = document.getElementById("outputBox");
const historyList = document.getElementById("historyList");

let history = JSON.parse(localStorage.getItem("tooloraHistory")) || [];

loadHistory();

if(generateBtn){

generateBtn.addEventListener("click",generateContent);

}

function generateContent(){

const text = prompt.value.trim();

if(text===""){

showToast("Please enter a prompt");

return;

}

generateBtn.disabled=true;

generateBtn.innerHTML=
'<i class="fa-solid fa-spinner fa-spin"></i> Generating...';

setTimeout(()=>{

const tone=document.getElementById("tone").value;

const length=document.getElementById("length").value;

outputBox.innerHTML=

`<h3>${toolData[currentTool].title}</h3>

<p><b>Topic:</b> ${text}</p>

<p><b>Tone:</b> ${tone}</p>

<p><b>Length:</b> ${length}</p>

<hr>

<p>

This is a demo AI response for
<b>${toolData[currentTool].title}</b>.

When you connect Gemini API,
OpenAI API or another AI model,
the real generated content will appear here.

</p>`;

generateBtn.disabled=false;

generateBtn.innerHTML=
'✨ Generate Content';

saveHistory(text);

showToast("Content Generated");

},1500);

}

// ======================================
// Copy
// ======================================

const copyBtn=document.getElementById("copyBtn");

if(copyBtn){

copyBtn.onclick=()=>{

navigator.clipboard.writeText(outputBox.innerText);

showToast("Copied Successfully");

};

}

// ======================================
// Download
// ======================================

const downloadBtn=document.getElementById("downloadBtn");

if(downloadBtn){

downloadBtn.onclick=()=>{

const blob=new Blob([outputBox.innerText],{

type:"text/plain"

});

const a=document.createElement("a");

a.href=URL.createObjectURL(blob);

a.download="toolora-ai-content.txt";

a.click();

showToast("Download Started");

};

}

// ======================================
// Clear
// ======================================

const clearBtn=document.getElementById("clearBtn");

if(clearBtn){

clearBtn.onclick=()=>{

prompt.value="";

outputBox.innerHTML=
"Your AI generated content will appear here...";

updateCounter();

showToast("Workspace Cleared");

};

}

// ======================================
// History
// ======================================

function saveHistory(item){

history.unshift(item);

history=history.slice(0,8);

localStorage.setItem(

"tooloraHistory",

JSON.stringify(history)

);

loadHistory();

}

function loadHistory(){

if(!historyList) return;

historyList.innerHTML="";

if(history.length===0){

historyList.innerHTML="<p>No history yet.</p>";

return;

}

history.forEach(h=>{

const div=document.createElement("div");

div.className="history-item";

div.innerHTML=h;

div.onclick=()=>{

prompt.value=h;

updateCounter();

};

historyList.appendChild(div);

});

}

// ======================================
// Toast Notification
// ======================================

function showToast(message){

const toast=document.getElementById("toast");

const text=document.getElementById("toastText");

if(!toast || !text) return;

text.innerHTML=message;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},2500);

}

// ======================================
// Loader
// ======================================

window.addEventListener("load",()=>{

const loader=document.getElementById("loader");

if(loader){

loader.style.opacity="0";

setTimeout(()=>{

loader.style.display="none";

},600);

}

});

// ======================================
// Back To Top
// ======================================

const backBtn=document.getElementById("backToTop");

if(backBtn){

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

backBtn.style.display="flex";

}else{

backBtn.style.display="none";

}

});

backBtn.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

}

// ======================================
// Smooth Scroll
// ======================================

document.querySelectorAll('a[href^="#"]').forEach(link=>{

link.addEventListener("click",function(e){

const target=document.querySelector(this.getAttribute("href"));

if(target){

e.preventDefault();

target.scrollIntoView({

behavior:"smooth"

});

}

});

});

// ======================================
// Active Tool on Page Load
// ======================================

const firstTool=document.querySelector(".tool-card");

if(firstTool){

firstTool.classList.add("active-tool");

}

// ======================================
// Welcome Toast
// ======================================

setTimeout(()=>{

showToast("🚀 Welcome to Toolora AI Writing");

},800);

// ======================================
// End
// ======================================

console.log("Toolora AI Writing Loaded Successfully");
