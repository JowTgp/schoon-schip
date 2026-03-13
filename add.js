import { basisBereidingen } from "./oogst.js";

//localStorage.setItem('opgeslagenBereidingen', JSON.stringify(basisBereidingen));

let toegevoegdeBereidingen = JSON.parse(localStorage.getItem('opgeslagenBereidingen')) || [];


document.querySelector('form.add').addEventListener('submit', (event) => {
    event.preventDefault();

    /*const om meerdere classes-moestuinlabels toevoegen aan article -> zie ook mdn: HTML select element selectedOptions en HTML collection + spread syntax voor array apart te zetten(value van option in htmlcollection*/ 
    const arrayMoestuinlabel=[...document.querySelector('#moestuinlabel').selectedOptions].map(option => option.value);
    console.log(arrayMoestuinlabel);

    const nieuweBereiding = {
        titel: document.querySelector('#titel').value,
        ingredienten: document.querySelector('#ingredienten').value,
        techniek: document.querySelector('input[name="techniek"]:checked')?.value,
        bereiding: document.querySelector('#bereiding').value,
        moestuinlabel: arrayMoestuinlabel
    };
    console.log(nieuweBereiding);
    toegevoegdeBereidingen.push(nieuweBereiding);
   
   localStorage.setItem('opgeslagenBereidingen', JSON.stringify(toegevoegdeBereidingen));
  
});

