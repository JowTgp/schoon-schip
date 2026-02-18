import {basisBereidingen} from "./oogst.js";
let toegevoegdeBereidingen = JSON.parse(localStorage.getItem('opgeslagenBereidingen')) || [];



const bereidingenSectie = document.querySelector('section.bereidingen');
console.log(bereidingenSectie);
/*const update = new CustomEvent ('lijstUpdate');*/

/* constante of function 'alleBereidingen' maken om basis + toegevoegde bereidingen samen te krijgen? > bvb met concat?zie jsinfo > array methods > transform > concat

function alleBereidingen(lijst) {
    bereidingenSectie.innerHTML = "";
    lijst.forEach(voegBeredingToe);
}
alleBereidingen(geefAlleBereidingen());*/


function voegBereidingToe(ter) {
const oogstVerwerking = document.createElement('article');
oogstVerwerking.innerHTML =`
    <h2>${ter.titel}</h2>
    <p>${ter.ingredienten}</p>
    <p>${ter.bereiding}</p>`;
    oogstVerwerking.classList.add(`${ter.techniek}`);

bereidingenSectie.insertAdjacentElement("afterbegin", oogstVerwerking);
};

basisBereidingen.forEach(voegBereidingToe);
toegevoegdeBereidingen.forEach(voegBereidingToe);

function toonBereidingen() {
    const zoekVeld = document.querySelector('form.zoektekst>input').value;
    bereidingenSectie.innerHTML = '';
    basisBereidingen.forEach((her) => {
        if(her.bereiding.includes(zoekVeld)){
            voegBereidingToe(her);
        }})
        ||
    toegevoegdeBereidingen.forEach((her) => {
        if(her.bereiding.includes(zoekVeld)){
            voegBereidingToe(her);
        }})
    };
    document.querySelector('form.zoektekst>input').addEventListener('input', toonBereidingen);
    




/*basisBereidingen.push(nieuweBereiding);                           nieuwe recept toevoegen */
/*document.querySelector('section.bereidingen').innerHTML = '';     maakt section.bereidingen leeg*/
/*voegBereidingToe('Pompoensoep', 'pompoen', 'recept', 'Mix de pompoen.');*/


/*function voegToe() {
    const nieuweBereiding = {
        titel: document.querySelector('#titel').value,
        ingredienten: document.querySelector('#ingredienten').value,
        techniek: document.querySelector('#techniek').value,
        bereiding: document.querySelector('#bereiding').value,
    };
    basisBereidingen.push(nieuweBereiding);
   /* bereidingenSectie.dispatchEvent(update);
};

document.querySelector('form.add').addEventListener('submit', (event) => {
    event.preventDefault();
    voegToe();
});*/