// ==============================
// TOOLORA AI RESUME BUILDER
// ==============================

const WORKER_URL = "https://toolora-ai.yt3766701.workers.dev";

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const addressInput = document.getElementById("address");
const educationInput = document.getElementById("education");
const experienceInput = document.getElementById("experience");
const skillsInput = document.getElementById("skills");
const languagesInput = document.getElementById("languages");

const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copy");
const downloadBtn = document.getElementById("download");
const regenerateBtn = document.getElementById("regenerate");

const output = document.getElementById("resumeOutput");

let lastPrompt = "";

// ==============================
// GENERATE RESUME
// ==============================

async function generateResume() {

if(nameInput.value.trim()===""){

alert("Please enter your name.");

return;

}

lastPrompt = `

Create a professional ATS friendly resume.

Name: ${nameInput.value}

Email: ${emailInput.value}

Phone: ${phoneInput.value}

Address: ${addressInput.value}

Education:
${educationInput.value}

Experience:
${experienceInput.value}

Skills:
${skillsInput.value}

Languages:
${languagesInput.value}

Requirements:

- Professional Summary
- Skills Section
- Education Section
- Experience Section
- Clean Formatting
- Professional Layout

Return only resume.

`;

output.innerHTML = "⏳ Generating Resume...";

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

output.innerHTML = data.reply.replace(/\n/g,"<br>");

}else{

output.innerHTML = "❌ " + data.error;

}

}catch(err){

generateBtn.disabled = false;

output.innerHTML = "❌ " + err.message;

}

}

generateBtn.onclick = generateResume;

// ==============================
// COPY RESUME
// ==============================

copyBtn.onclick = async () => {

const resume = output.innerText.trim();

if(
resume==="" ||
resume==="⏳ Generating Resume..."
){

alert("Nothing to copy.");

return;

}

await navigator.clipboard.writeText(resume);

copyBtn.innerText="✅ Copied";

setTimeout(()=>{

copyBtn.innerText="📋 Copy";

},1500);

};

// ==============================
// DOWNLOAD RESUME
// ==============================

downloadBtn.onclick = () => {

const resume = output.innerText.trim();

if(resume===""){

alert("Nothing to download.");

return;

}

const blob = new Blob([resume],{

type:"text/plain"

});

const link=document.createElement("a");

link.href=URL.createObjectURL(blob);

link.download="Toolora-AI-Resume.txt";

link.click();

URL.revokeObjectURL(link.href);

};

// ==============================
// REGENERATE
// ==============================

regenerateBtn.onclick=()=>{

if(lastPrompt===""){

alert("Generate Resume First.");

return;

}

generateResume();

};

// ==============================
// ENTER KEY
// ==============================

document.addEventListener("keydown",(e)=>{

if(e.ctrlKey && e.key==="Enter"){

generateResume();

}

});

// ==============================
// READY
// ==============================

console.log("✅ Toolora AI Resume Builder Ready");
