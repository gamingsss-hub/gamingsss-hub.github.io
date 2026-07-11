// ==============================
// TOOLORA AI CODE GENERATOR
// ==============================

const WORKER_URL = "https://toolora-ai.yt3766701.workers.dev";

const language = document.getElementById("language");
const prompt = document.getElementById("prompt");

const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copy");
const downloadBtn = document.getElementById("download");
const regenerateBtn = document.getElementById("regenerate");

const output = document.getElementById("output");

let lastPrompt = "";

// ==============================
// GENERATE CODE
// ==============================

async function generateCode(){

const userPrompt = prompt.value.trim();

if(userPrompt===""){

alert("Please enter your prompt.");

return;

}

lastPrompt = `

You are an expert ${language.value} programmer.

Generate only clean production-ready code.

Do NOT explain anything.

Programming Language:

${language.value}

Task:

${userPrompt}

`;

output.innerHTML = "⏳ Generating Code...";

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

output.textContent = data.reply;

}else{

output.textContent = "❌ " + data.error;

}

}catch(err){

generateBtn.disabled = false;

output.textContent = "❌ " + err.message;

}

}

generateBtn.onclick = generateCode;

// ==============================
// COPY CODE
// ==============================

copyBtn.onclick = async () => {

const code = output.innerText.trim();

if (
code === "" ||
code === "⏳ Generating Code..."
) {

alert("Nothing to copy.");

return;

}

await navigator.clipboard.writeText(code);

copyBtn.innerText = "✅ Copied";

setTimeout(() => {

copyBtn.innerText = "📋 Copy";

}, 1500);

};

// ==============================
// DOWNLOAD CODE
// ==============================

downloadBtn.onclick = () => {

const code = output.innerText.trim();

if (code === "") {

alert("Nothing to download.");

return;

}

const extension = {

"HTML":"html",

"CSS":"css",

"JavaScript":"js",

"Python":"py",

"C":"c",

"C++":"cpp",

"Java":"java",

"PHP":"php"

}[language.value] || "txt";

const blob = new Blob([code], {

type:"text/plain"

});

const link = document.createElement("a");

link.href = URL.createObjectURL(blob);

link.download = `toolora-code.${extension}`;

link.click();

URL.revokeObjectURL(link.href);

};

// ==============================
// REGENERATE
// ==============================

regenerateBtn.onclick = () => {

if(lastPrompt===""){

alert("Generate code first.");

return;

}

generateCode();

};

// ==============================
// ENTER KEY (Ctrl + Enter)
// ==============================

prompt.addEventListener("keydown",(e)=>{

if(e.ctrlKey && e.key==="Enter"){

generateCode();

}

});

// ==============================
// READY
// ==============================

console.log("✅ Toolora AI Code Generator Ready");
