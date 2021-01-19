var casovac;
var zbyvajiciCas;
var vybraneCislo;
var vybranePole;
var odstranitVyber;

window.onload = function(){
    //Start hry po stisknutí tlačítka
    id("start-btn").addEventListener("click", startHry);
}

function startHry(){
    console.log("Hra běží");
}

function id(id){
    return document.getElementById(id);
}