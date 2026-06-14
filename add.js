import { basisBereidingen } from "./oogst.js";

if (!localStorage.getItem('opgeslagenBereidingen')) {
    localStorage.setItem( 'opgeslagenBereidingen', JSON.stringify(basisBereidingen)
    );
}

let bereidingen = JSON.parse(localStorage.getItem('opgeslagenBereidingen')) || [];

//ingredienten
const knop = document.querySelector('#voegingrtoe');
const lijst = document.querySelector('#lijstingredienten');

knop.addEventListener("click", () => {
    const nieuwingr = document.createElement("input");

    nieuwingr.type="text";
    nieuwingr.name="ingredient";
    nieuwingr.classList.add("ingredienten");

    lijst.appendChild(nieuwingr);

});
   
document.querySelector('form.add').addEventListener('submit', (event) => {
    event.preventDefault();   //om default van browser bij submit uit te schakelen, zie js info > events > browser default actions -> zelf actie in js gedefineerd dus default mag weg. Hier laten staan (voor const arrayMoestuinlabel), anders voegen moestuin labels zich niet toe als classes.


    const arrayMoestuinlabel=[...document.querySelectorAll(`.moestuinlabel input:checked`)].map(input => input.value);
    console.log(arrayMoestuinlabel);
    console.log(document.querySelectorAll('.moestuinlabel input:checked'));

    const alleIngredienten = document.querySelectorAll(
        'input[name="ingredient"]'
    );
    const arrayIngredienten = [];
        alleIngredienten.forEach(input => {
            if(input.value.trim() !== ""){
            arrayIngredienten.push(input.value);
            }
        });

    function toonMelding (soort, melding){
        document.querySelector('#feedback').innerHTML = `<p class=${soort}>${melding}</p>`;
    }
    function voegToe() {

    const nieuweBereiding = {
        titel: document.querySelector('#titel').value,
        ingredienten: arrayIngredienten,
        techniek: document.querySelector('input[name="techniek"]:checked')?.value,
        bereiding: document.querySelector('#bereiding').value,
        moestuinlabel: arrayMoestuinlabel
    };

    if (nieuweBereiding.titel && nieuweBereiding.ingredienten.length>0 && nieuweBereiding.techniek && nieuweBereiding.bereiding && nieuweBereiding.moestuinlabel.length>0) {
        const alleTitels = []                                     //bij arrays .length>0 want anders truthy en dan ook ok als het leeg is: zie ook toegevoegd object in console
        bereidingen.forEach((ber) => {alleTitels.push(ber.titel);});
        console.log(alleTitels);
        if (!alleTitels.includes(nieuweBereiding.titel)) {
            bereidingen.push(nieuweBereiding);
            //hier nog update alle bereidingen, nu 2x zelfde titel als direct na elkaar (geen refresh) wel mogelijk, automatische update nodig > nog bekijken met local storage of hulpfunctie? bvb zelfde als in script.js en dan naar hulpfunctie doen.
            toonMelding('succes', 'Succesvol toegevoegd!');
            
        } else {
            toonMelding('fout', 'Titel bestaat al.');
        }
    } else {
            toonMelding('fout', 'Niet toegevoegd: vul alle velden in.');
    }                   //evt nog een if else voorwaarde bvb min 1 ingredient? min lenght >
    }

    voegToe();
    localStorage.setItem('opgeslagenBereidingen', JSON.stringify(bereidingen));
   
  console.log(bereidingen);
  
});

