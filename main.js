// ==========================================
// TOOLORA AI V3
// MAIN.JS PART 3.1
// ==========================================

// Sticky Navbar

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

if (window.scrollY > 80) {

header.classList.add("sticky");

} else {

header.classList.remove("sticky");

}

});

// ==========================================
// Back To Top Button
// ==========================================

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

if (window.scrollY > 500) {

backToTop.classList.add("show");

} else {

backToTop.classList.remove("show");

}

});

backToTop.addEventListener("click", () => {

window.scrollTo({

top:0,

behavior:"smooth"

});

});

// ==========================================
// Smooth Scroll
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});

// ==========================================
// Current Year
// ==========================================

const year=document.getElementById("year");

if(year){

year.textContent=new Date().getFullYear();

}

// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================

const observer = new IntersectionObserver((entries) => {

entries.forEach((entry) => {

if (entry.isIntersecting) {

entry.target.classList.add("show");

}

});

}, {

threshold:0.15

});

document.querySelectorAll(

".stat-card,.bento-card,.category-card,.tool-card,.quiz-card,.utility-card,.testimonial-card"

).forEach((el)=>{

el.classList.add("hidden");

observer.observe(el);

});

// ==========================================
// COUNTER ANIMATION
// ==========================================

const counters = document.querySelectorAll(".stat-card h2");

counters.forEach(counter=>{

const target = parseInt(counter.innerText.replace(/\D/g,""));

let count = 0;

const speed = target / 80;

const update = ()=>{

count += speed;

if(count < target){

counter.innerText = Math.floor(count) + "+";

requestAnimationFrame(update);

}else{

counter.innerText = target + "+";

}

};

update();

});

// ==========================================
// PARALLAX AURORA
// ==========================================

window.addEventListener("mousemove",(e)=>{

const x=(e.clientX/window.innerWidth)*20;

const y=(e.clientY/window.innerHeight)*20;

document.querySelectorAll(".aurora").forEach((a)=>{

a.style.transform=`translate(${x}px,${y}px)`;

});

});

// ==========================================
// PREMIUM CARD TILT EFFECT
// ==========================================

const cards = document.querySelectorAll(
".bento-card,.category-card,.tool-card,.quiz-card,.utility-card,.testimonial-card"
);

cards.forEach((card)=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

const rotateY=((x/rect.width)-0.5)*12;

const rotateX=((rect.height/2-y)/rect.height)*12;

card.style.transform=
`perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-10px)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform=
"perspective(1000px) rotateX(0) rotateY(0)";

});

});

// ==========================================
// BUTTON RIPPLE EFFECT
// ==========================================

document.querySelectorAll(
".primary-btn,.secondary-btn,.start-btn,.card-btn"
).forEach(btn=>{

btn.addEventListener("click",(e)=>{

const ripple=document.createElement("span");

const rect=btn.getBoundingClientRect();

const size=Math.max(rect.width,rect.height);

ripple.style.width=size+"px";
ripple.style.height=size+"px";

ripple.style.left=
e.clientX-rect.left-size/2+"px";

ripple.style.top=
e.clientY-rect.top-size/2+"px";

ripple.className="ripple";

btn.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},600);

});

});

// ==========================================
// PAGE LOADER
// ==========================================

window.addEventListener("load",()=>{

document.body.classList.add("loaded");

});

// ==========================================
// AI TOOLS SEARCH
// ==========================================

const toolSearch = document.getElementById("toolSearch");

if(toolSearch){

toolSearch.addEventListener("keyup",()=>{

const value = toolSearch.value.toLowerCase();

const cards = document.querySelectorAll(".tools-grid .tool-card");

cards.forEach(card=>{

const text = card.innerText.toLowerCase();

if(text.includes(value)){

card.style.display="block";

}else{

card.style.display="none";

}

});

});

}

// ==========================================
// CATEGORY FILTER
// ==========================================

const filterBtns=document.querySelectorAll(".filter-buttons button");

filterBtns.forEach(btn=>{

btn.addEventListener("click",()=>{

filterBtns.forEach(b=>b.classList.remove("active"));

btn.classList.add("active");

const category=btn.innerText.toLowerCase();

document.querySelectorAll(".tools-grid .tool-card").forEach(card=>{

if(category==="all"){

card.style.display="block";

}else{

if(card.innerText.toLowerCase().includes(category)){

card.style.display="block";

}else{

card.style.display="none";

}

}

});

});

});

// ==========================================
// TOOL MODAL
// ==========================================

const modal=document.getElementById("toolModal");

const modalTitle=document.getElementById("modalTitle");

const modalDescription=document.getElementById("modalDescription");

document.querySelectorAll(".tool-card").forEach(card=>{

card.addEventListener("click",()=>{

modal.classList.add("show");

modalTitle.innerText=card.querySelector("h3").innerText;

modalDescription.innerText=card.querySelector("p").innerText;

});

});

document.querySelector(".close-modal")?.addEventListener("click",()=>{

modal.classList.remove("show");

});

document.querySelector(".closeBtn")?.addEventListener("click",()=>{

modal.classList.remove("show");

});

window.addEventListener("click",(e)=>{

if(e.target===modal){

modal.classList.remove("show");

}

});

// ==========================================
// QUIZ SEARCH
// ==========================================

const quizSearch=document.getElementById("quizSearch");

if(quizSearch){

quizSearch.addEventListener("keyup",()=>{

const value=quizSearch.value.toLowerCase();

document.querySelectorAll(".quiz-card").forEach(card=>{

const text=card.innerText.toLowerCase();

card.style.display=text.includes(value)?"block":"none";

});

});

}

// ==========================================
// MOCK TEST ENGINE (PART 5.6)
// ==========================================

let currentQuestion = 1;
const totalQuestions = 125;

// Progress Bar
const progressBar = document.getElementById("progressBar");
const questionNo = document.getElementById("questionNo");

function updateProgress(){

const percent = (currentQuestion / totalQuestions) * 100;

if(progressBar){

progressBar.style.width = percent + "%";

}

if(questionNo){

questionNo.textContent = currentQuestion;

}

}

updateProgress();

// Next Button
const nextBtn = document.querySelector(".primary-btn");

if(nextBtn){

nextBtn.addEventListener("click",()=>{

if(currentQuestion < totalQuestions){

currentQuestion++;

updateProgress();

highlightPalette();

}

});

}

// Previous Button
const prevBtn = document.querySelector(".secondary-btn");

if(prevBtn){

prevBtn.addEventListener("click",()=>{

if(currentQuestion > 1){

currentQuestion--;

updateProgress();

highlightPalette();

}

});

}

// ==========================================
// QUESTION PALETTE
// ==========================================

const paletteButtons = document.querySelectorAll(".pal-btn");

function highlightPalette(){

paletteButtons.forEach(btn=>btn.classList.remove("current"));

if(paletteButtons[currentQuestion-1]){

paletteButtons[currentQuestion-1].classList.add("current");

}

}

paletteButtons.forEach((btn,index)=>{

btn.addEventListener("click",()=>{

currentQuestion=index+1;

updateProgress();

highlightPalette();

});

});

// ==========================================
// 60 MINUTE TIMER
// ==========================================

let totalSeconds=60*60;

const timer=document.getElementById("timer");

const countdown=setInterval(()=>{

let min=Math.floor(totalSeconds/60);

let sec=totalSeconds%60;

if(timer){

timer.innerText=

`${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;

}

if(totalSeconds<=0){

clearInterval(countdown);

alert("Time Over! Test Submitted.");

}

totalSeconds--;

},1000);

// ==========================================
// AUTO SAVE ANSWERS
// ==========================================

document.querySelectorAll("input[type=radio]").forEach(radio=>{

radio.addEventListener("change",()=>{

localStorage.setItem(

"question_"+currentQuestion,

radio.nextElementSibling.innerText

);

paletteButtons[currentQuestion-1].classList.remove("current");

paletteButtons[currentQuestion-1].classList.add("answered");

});

});

// ==========================================
// PART 5.7 - REVIEW + CLEAR + SUBMIT
// ==========================================

// Mark For Review Button
const reviewBtn = document.querySelector(".mark-review");

if(reviewBtn){

reviewBtn.addEventListener("click",()=>{

paletteButtons[currentQuestion-1].classList.remove(
"answered",
"current"
);

paletteButtons[currentQuestion-1].classList.add("review");

});

}

// Clear Response
const clearBtn = document.querySelector(".clear-response");

if(clearBtn){

clearBtn.addEventListener("click",()=>{

document.querySelectorAll("input[name=q]").forEach(r=>{

r.checked=false;

});

localStorage.removeItem("question_"+currentQuestion);

paletteButtons[currentQuestion-1].classList.remove("answered");

paletteButtons[currentQuestion-1].classList.add("notanswered");

});

}

// Restore Saved Answer
function restoreAnswer(){

const saved=

localStorage.getItem("question_"+currentQuestion);

if(!saved)return;

document.querySelectorAll("input[name=q]").forEach(r=>{

if(r.nextElementSibling.innerText===saved){

r.checked=true;

}

});

}

restoreAnswer();

// Restore after navigation
const oldUpdate=updateProgress;

updateProgress=function(){

oldUpdate();

restoreAnswer();

}

// Submit Test
const submitBtn=document.getElementById("submitTest");

if(submitBtn){

submitBtn.addEventListener("click",()=>{

if(confirm("Are you sure you want to submit the test?")){

window.location.href="result.html";

}

});

}

// ==========================================
// RESULT PAGE
// ==========================================

if(document.getElementById("score")){

const correct =
Number(localStorage.getItem("correct")) || 0;

const wrong =
Number(localStorage.getItem("wrong")) || 0;

const score = correct * 4;

const accuracy =
correct + wrong > 0
? Math.round((correct/(correct+wrong))*100)
: 0;

document.getElementById("correct").textContent = correct;

document.getElementById("wrong").textContent = wrong;

document.getElementById("score").textContent = score;

document.getElementById("accuracy").textContent =
accuracy + "%";

let rank = "C";

if(accuracy>=90){

rank="A+";

}else if(accuracy>=75){

rank="A";

}else if(accuracy>=60){

rank="B";

}

document.getElementById("rank").textContent = rank;

const savedTime =
localStorage.getItem("timeTaken") || "60:00";

document.getElementById("timeTaken").textContent =
savedTime;

}

// =============================
// QUESTION ENGINE
// =============================

let current = 0;

const qText = document.getElementById("questionText");

const optionInputs =
document.querySelectorAll(".option span");

function loadQuestion(){

if(!qText || typeof questions==="undefined") return;

const q = questions[current];

qText.innerText = q.question;

optionInputs.forEach((op,index)=>{

op.innerText = q.options[index];

});

}

loadQuestion();

const nextButton =
document.querySelector(".next-btn");

if(nextButton){

nextButton.addEventListener("click",()=>{

if(current < questions.length-1){

current++;

loadQuestion();

}

});

}

const prevButton =
document.querySelector(".prev-btn");

if(prevButton){

prevButton.addEventListener("click",()=>{

if(current>0){

current--;

loadQuestion();

}

});

}

// ===============================
// Toolora AI Writing Workspace
// ===============================

const cards = document.querySelectorAll(".tool-card");
const title = document.getElementById("toolTitle");
const desc = document.getElementById("toolDesc");

const tools = {

blog:{
title:"AI Blog Writer",
desc:"Generate SEO-friendly blog articles in seconds."
},

article:{
title:"AI Article Writer",
desc:"Create professional articles instantly."
},

essay:{
title:"AI Essay Writer",
desc:"Write high-quality essays with AI."
},

email:{
title:"AI Email Writer",
desc:"Write professional emails quickly."
},

resume:{
title:"AI Resume Builder",
desc:"Create ATS-friendly resumes."
},

grammar:{
title:"AI Grammar Checker",
desc:"Fix grammar and spelling mistakes."
},

paraphrase:{
title:"AI Paraphraser",
desc:"Rewrite your text naturally."
},

summary:{
title:"AI Summarizer",
desc:"Summarize long content instantly."
},

translator:{
title:"AI Translator",
desc:"Translate content into multiple languages."
},

seo:{
title:"AI SEO Writer",
desc:"Generate SEO optimized content."
}

};

cards.forEach(card=>{

card.addEventListener("click",()=>{

cards.forEach(c=>c.classList.remove("active-tool"));

card.classList.add("active-tool");

const tool=card.dataset.tool;

title.textContent=tools[tool].title;

desc.textContent=tools[tool].desc;

document.getElementById("workspace").scrollIntoView({
behavior:"smooth"
});

});

});

// ===============================
// Generate Demo
// ===============================

const btn=document.getElementById("generateBtn");

btn.onclick=()=>{

const prompt=document.getElementById("prompt").value.trim();

const output=document.getElementById("outputBox");

if(prompt===""){

alert("Please enter a topic.");

return;

}

output.innerHTML=`
<h3>✨ Demo Output</h3>

<p><b>Topic:</b> ${prompt}</p>

<p>This is a demo response for <b>${title.textContent}</b>.
Later you can connect Gemini API, OpenAI API or any AI model here.</p>
`;

};

// ===============================
// Copy
// ===============================

document.getElementById("copyBtn").onclick=()=>{

navigator.clipboard.writeText(
document.getElementById("outputBox").innerText
);

alert("Copied!");

};

// ===============================
// Clear
// ===============================

document.getElementById("clearBtn").onclick=()=>{

document.getElementById("prompt").value="";

document.getElementById("outputBox").innerHTML=
"Your generated content will appear here...";

};

// ===============================
// Download
// ===============================

document.getElementById("downloadBtn").onclick=()=>{

const text=document.getElementById("outputBox").innerText;

const blob=new Blob([text],{type:"text/plain"});

const a=document.createElement("a");

a.href=URL.createObjectURL(blob);

a.download="toolora-ai-writing.txt";

a.click();

};
