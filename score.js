<script>

const search=
document.querySelector("input");

const cards=
document.querySelectorAll(".card");

search.addEventListener(
"keyup",

()=>{

let value=
search.value
.toLowerCase();

cards.forEach(card=>{

if(
card.innerText
.toLowerCase()
.includes(value)
){

card.style.display=
"block";

}

else{

card.style.display=
"none";

}

});

});

</script>
