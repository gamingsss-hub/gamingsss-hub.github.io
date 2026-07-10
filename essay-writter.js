// ==========================
// TOOLORA AI ESSAY WRITER
// ==========================

const WORKER_URL = "https://toolora-ai.yt3766701.workers.dev";

const topic = document.getElementById("topic");
const type = document.getElementById("type");
const language = document.getElementById("language");
const words = document.getElementById("words");

const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copy");
const downloadBtn = document.getElementById("download");
const regenerateBtn = document.getElementById("regenerate");

const output = document.getElementById("output");

let lastPrompt = "";

// ==========================
// GENERATE ESSAY
// ==========================

async function generateEssay() {

const title = topic.value.trim();

if(title===""){

alert("Please enter essay topic.");

return;

}

lastPrompt = `
Write a professional essay.

Topic: ${title}

Essay Type: ${type.value}

Language: ${language.value}

Word Count: ${words.value}

Make it original, well structured and easy to understand.

`;

output.innerHTML =
"<div class='loading'>⏳ Generating Essay...</div>";

generateBtn.disabled = true;

try{

const response = await fetch(WORKER_URL,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

message:lastPrompt

})

});

const data = await response.json();

generateBtn.disabled = false;

if(data.success){

output.innerText = data.reply;

}else{

output.innerText =
"❌ " + data.error;

}

}catch(err){

generateBtn.disabled = false;

output.innerText =
"❌ " + err.message;

}

}

generateBtn.onclick = generateEssay;

// ==========================
// COPY ESSAY
// ==========================

copyBtn.onclick = async () => {

if(output.innerText.trim()==="" ||
output.innerText.includes("Generating")){

alert("Nothing to copy.");

return;

}

await navigator.clipboard.writeText(output.innerText);

copyBtn.innerText="✅ Copied";

setTimeout(()=>{

copyBtn.innerText="📋 Copy";

},1500);

};

// ==========================
// DOWNLOAD TXT
// ==========================

downloadBtn.onclick=()=>{

const text=output.innerText.trim();

if(text===""){

alert("Nothing to download.");

return;

}

const blob=new Blob([text],{

type:"text/plain"

});

const link=document.createElement("a");

link.href=URL.createObjectURL(blob);

link.download="Toolora-AI-Essay.txt";

link.click();

URL.revokeObjectURL(link.href);

};

// ==========================
// REGENERATE
// ==========================

regenerateBtn.onclick=()=>{

if(lastPrompt===""){

alert("Generate an essay first.");

return;

}

generateEssay();

};

// ==========================
// ENTER KEY
// ==========================

topic.addEventListener("keydown",(e)=>{

if(e.key==="Enter"){

generateEssay();

}

});

// ==========================
// READY
// ==========================

console.log("✅ Toolora AI Essay Writer Ready");
