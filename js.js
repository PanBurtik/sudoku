//Ručně dělané zadání
const jednoducha = [
    "6------7-9----5-2------1---362----81--96-----71--9-4-5-2---651---78----345----29-",
    "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
];
const stredni = [
    "--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3--",
    "619472583243985617587316924158247369926531478734698152891754236365829741472163895"
];
const obtizna = [
    "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
    "712583694639714258845269173521436987367928415498175326184697532253841769976352841"
];
var casovac;
var zbyvajiciCas;
var zivoty;
var vybraneCislo;
var vybranePole;
var odstranitVyber;

window.onload = function(){
    //Po zmáčknutí tlačítka se zapne hra
    id("tlacitko").addEventListener("click", startHry);
    //Vybere se číslo z nabídky na které kliknete
    for (let i = 0; i < id("ctverecky").children.length; i++){
        id("ctverecky").children[i].addEventListener("click", function(){
            if (!odstranitVyber){
                //Číslo je vybráno
                if (this.classList.contains("vybrano")){
                    //Odstranit výběr
                    this.classList.remove("vybrano");
                    vybraneCislo = null;
                }else{
                    //Zruší výběr všech ostatních čísel
                    for (let i = 0; i < 9; i++){
                        id("ctverecky").children[i].classList.remove("vybrano");
                    }
                    //Vybere a změní hodnotu "vybraneCislo"
                    this.classList.add("vybrano");
                    vybraneCislo = this;
                    pohyb();
                }
            }
        });
    }
}

function startHry(){
    let tabulka
    if (id("obtiznost-1").checked) tabulka = jednoducha[0];
    else if (id("obtiznost-2").checked) tabulka = stredni[0];
    else tabulka = obtizna[0];
    zivoty = 5
    odstranitVyber = false;
    id("zivoty").textContent ="Životů zbává: 5"
    //Vytvoří tabulku sudoku
    vytvoritTabulku(tabulka);
    //Odstartuje odpočet časovače
    startCasovace();
    id ("ctverecky").classList.remove("hidden");
}

function startCasovace(){
    if (id("cas-1").checked) zbyvajiciCas =300;
    else if (id("cas-2").checked) zbyvajiciCas =600;
    else zbyvajiciCas = 900;
    id("casovac").textContent = casomira(zbyvajiciCas);
    //Každou sekundu se odebere sekunda z časomíry
    casovac = setInterval (function(){
        zbyvajiciCas --;
        //Pokud dojde čas, hra končí
        if (zbyvajiciCas === 0) konecHry();
        id ("casovac").textContent = casomira(zbyvajiciCas);
    }, 1000)
}

//Fungování časovače, odečítání času
function casomira(cas){
    let minuty = Math.floor(cas / 60);
    if (minuty < 10) minuty = "0" + minuty;
    let sekundy = cas % 60;
    if (sekundy < 10) sekundy = "0" + sekundy;
    return minuty + ":" + sekundy;
}

function vytvoritTabulku(tabulka){
    //Po skončení času smaže tabulku
    smazatPredchozi();
    let idCount = 0;
    //Vytvoří to 9x9 polí, čili 81 polí
    for (let i = 0; i < 81; i++){
        let pole = document.createElement("p");
        if (tabulka.charAt(i) != "-"){
            pole.textContent = tabulka.charAt(i);
        }else{
            pole.addEventListener("click", function(){
                //Když vybrané pole není zobrazeno
                if (!odstranitVyber){
                    //Když je pole vybráno
                    if (pole.classList.contains("vybrano")){
                        //Odstraní výběr
                        pole.classList.remove("vybrano");
                        vybranePole = null;
                    }else{
                        for (let i = 0; i < 81; i++){
                            qsa(".pole")[i].classList.remove("vybrano");
                        }
                        pole.classList.add("vybrano");
                        vybranePole = pole;
                        pohyb();
                    }
                }
            });
        }
        pole.id = idCount;
        idCount ++;
        pole.classList.add("pole");
        if ((pole.id > 17 && pole.id < 27) || (pole.id > 44 & pole.id < 54)){
            pole.classList.add("bottomBorder");
        }
        if ((pole.id + 1) % 9 == 3 || (pole.id + 1) % 9 == 6){
            pole.classList.add("rightBorder");
        }
        id("tabulka").appendChild(pole);
    }
}

function pohyb(){
    if (vybranePole && vybraneCislo){
        vybranePole.textContent = vybraneCislo.textContent;
        if (overeni(vybranePole)){
            //Zruší výběr polí
            vybranePole.classList.remove("vybrano");
            vybraneCislo.classList.remove("vybrano");
            vybraneCislo = null;
            vybranePole = null;
            if (overeno()){
                konecHry();
            }
        }else{
            odstranitVyber = true;
            vybranePole.classList.add("spatne");
            setTimeout(function(){
                zivoty --;
                if (zivoty === 0) {
                        konecHry();
                }else{
                        id("zivoty").textContent = "Životů zbývá: " + zivoty;
                        odstranitVyber = false;
                }
                
                vybranePole.classList.remove("spatne");
                vybranePole.classList.remove("vybrano");
                vybraneCislo.classList.remove("vybrano");
                vybranePole.textContent = "";
                vybranePole = null;
                vybraneCislo = null;
            }, 1000);
        }
    }
}

function overeno(){
    let policko = qsa(".pole");
    for (let i = 0; i < policko.length; i++){
        if (policko[i ].textContent === "") return false;
    }
    return true;
}

function konecHry(){
    odstranitVyber = true;
    clearTimeout(casovac);
    if (zivoty === 0 || zbyvajiciCas === 0){
        id ("zivoty").textContent = "Prohra!";
    }else{
        id("zivoty").textContent = "Výhra!";
    }
}


function overeni(pole){
    //Nastavení řešení dle obtížnosti
    let reseni;
    if (id("obtiznost-1").checked) reseni = jednoducha[1];
    else if (id("obtiznost-2").checked) reseni = stredni[1];
    else reseni = obtizna[1];
    //Pokud se číslo v poli rovná správnému číslu v řešení
    if (reseni.charAt(pole.id) === pole.textContent) return true;
    else return false;
}

function smazatPredchozi(){
    //Vybere všechna pole
    let policko = qsa(".pole");
    //Odstraní každé pole
    for (let i = 0; i < policko.length; i++){
        policko[i].remove();
    }
    if (casovac) clearTimeout(casovac);
    //zruší výběr všech čísel
    for (let i = 0; i < id("ctverecky").children.length; i++){
        id("ctverecky").children[i].classList.remove("vybrano");
    }
    vybranePole = null;
    vybraneCislo = null;
}

function id(id){
    return document.getElementById(id);
}

function qs(kurzor){
    return document.querySelector(kurzor);
}

function qsa(kurzor){
    return document.querySelectorAll(kurzor);
}



function id(id){
    return document.getElementById(id);
}