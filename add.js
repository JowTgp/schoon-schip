import { basisBereidingen } from "./oogst.js";

//localStorage.setItem('opgeslagenBereidingen', JSON.stringify(basisBereidingen));

let toegevoegdeBereidingen = JSON.parse(localStorage.getItem('opgeslagenBereidingen')) || [];


    //Melding toegevoegd - foutmeliding - formvalidatie
   
    /*const nieuweBereiding = {
        titel: document.querySelector('#titel').value,
        ingredienten: document.querySelector('#ingredienten').value,
        techniek: document.querySelector('input[name="techniek"]:checked')?.value,
        bereiding: document.querySelector('#bereiding').value,
        moestuinlabel: arrayMoestuinlabel
    };
    alleBereidingen.push(nieuweBereiding);*/
   
    

    /*const om meerdere classes-moestuinlabels toevoegen aan article -> zie ook mdn: HTML select element selectedOptions (niet werkte alleen bij select multiple bij checkboxes checked input gebruiken) en HTML collection + spread syntax voor array apart te zetten(value van option in htmlcollection*/ 
    const arrayMoestuinlabel=[...document.querySelectorAll(`.moestuinlabel input:checked`)].map(input => input.value);
    console.log(arrayMoestuinlabel);
    console.log(document.querySelectorAll('.moestuinlabel input:checked'));


    function toonMelding (soort, melding){
        document.querySelector('#feedback').innerHTML = `<p class=${soort}>${melding}</p>`;
    }
    function voegToe() {

    const nieuweBereiding = {
        titel: document.querySelector('#titel').value,
        ingredienten: document.querySelector('#ingredienten').value,
        techniek: document.querySelector('input[name="techniek"]:checked')?.value,
        bereiding: document.querySelector('#bereiding').value,
        moestuinlabel: arrayMoestuinlabel
    };
    console.log(nieuweBereiding);
    toegevoegdeBereidingen.push(nieuweBereiding);
    toonMelding('succes', 'Succesvol toegevoegd!');
    }

    document.querySelector('form.add').addEventListener('submit', (event) => {
    event.preventDefault();   //om default van browser bij submit uit te schakelen, zie js info > events > browser default actions -> zelf actie in js gedefineerd dus default mag weg.

    voegToe();
   
   localStorage.setItem('opgeslagenBereidingen', JSON.stringify(toegevoegdeBereidingen));
  
});

