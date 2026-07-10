export default {

async fetch(request, env) {

if (request.method === "OPTIONS") {
return new Response(null, {
headers: {
"Access-Control-Allow-Origin": "*",
"Access-Control-Allow-Headers": "Content-Type",
"Access-Control-Allow-Methods": "POST, OPTIONS"
}
});
}

if (request.method !== "POST") {
return new Response("Only POST allowed", { status: 405 });
}

try {

const { message } = await request.json();

const response = await fetch(

`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${env.GEMINI_API_KEY}`,

{
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
contents: [
{
parts: [
{
text: message
}
]
}
]
})
}

);

const data = await response.json();

const reply =
data?.candidates?.[0]?.content?.parts?.[0]?.text ||
"Sorry, I couldn't generate a response.";

return new Response(

JSON.stringify({

reply

}),

{

headers:{

"Content-Type":"application/json",

"Access-Control-Allow-Origin":"*"

}

}

);

}catch(err){

return new Response(

JSON.stringify({

reply:"Server Error"

}),

{

status:500,

headers:{

"Content-Type":"application/json",

"Access-Control-Allow-Origin":"*"

}

}

);

}

}

};
