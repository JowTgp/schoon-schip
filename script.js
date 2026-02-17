import {basisBereidingen} from "./oogst.js";
let alleBereidingen = JSON.parse(localStorage.getItem('opgeslagenBereidingen')) || [];

console.log('test');

const bereidingenSectie = document.querySelector('section.bereidingen');
console.log(bereidingenSectie);
/*const update = new CustomEvent ('lijstUpdate');*/

function voegBereidingToe(ter) {
const oogstVerwerking = document.createElement('article');
oogstVerwerking.innerHTML =`
    <h2>${ter.titel}</h2>
    <p>${ter.ingredienten}</p>
    <p>${ter.bereiding}</p>`;
    oogstVerwerking.classList.add(`${ter.techniek}`);

bereidingenSectie.insertAdjacentElement("afterbegin", oogstVerwerking);
}

alleBereidingen.forEach(voegBereidingToe);



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