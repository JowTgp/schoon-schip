import {basisBereidingen} from "./oogst.js";

console.log('test');

/*
const titel = ('tomatensaus');
const ingredienten = ('tomaat');
const techniek = ('bewaartechniek');
const bereiding = ('snij de tomaat');


const artikel = document.createElement('article');
artikel.innerHTML =`<h2>${titel}</h2><p>${ingredienten}</p><p>${bereiding}</p>`;
artikel.classList.add(`${techniek}`);
console.log(artikel);


document.querySelector('section.bereidingen').insertAdjacentElement("afterbegin", artikel);
*/
function voegBereidingToe(ter) {
const oogstVerwerking = document.createElement('article');
oogstVerwerking.innerHTML =`<h2>${ter.titel}</h2><p>${ter.ingredienten}</p><p>${ter.bereiding}</p>`;
oogstVerwerking.classList.add(`${ter.techniek}`);
console.log(oogstVerwerking);

document.querySelector('section.bereidingen').insertAdjacentElement("afterbegin", oogstVerwerking);
};

voegBereidingToe('Pompoensoep', 'pompoen', 'recept', 'Mix de pompoen.');
basisBereidingen.forEach(voegBereidingToe);

