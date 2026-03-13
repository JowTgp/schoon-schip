import { basisBereidingen } from "./oogst.js";

//localStorage.setItem('opgeslagenBereidingen', JSON.stringify(basisBereidingen));

let toegevoegdeBereidingen = JSON.parse(localStorage.getItem('opgeslagenBereidingen')) || [];


document.querySelector('form.add').addEventListener('submit', (event) => {
    event.preventDefault();


    const nieuweBereiding = {
        titel: document.querySelector('#titel').value,
        ingredienten: document.querySelector('#ingredienten').value,
        techniek: document.querySelector('input[name="techniek"]:checked')?.value,
        bereiding: document.querySelector('#bereiding').value,
        moestuinlabel: document.querySelector('select[name="moestuinlabel"]').value
    };
    toegevoegdeBereidingen.push(nieuweBereiding);
   
   localStorage.setItem('opgeslagenBereidingen', JSON.stringify(toegevoegdeBereidingen));
  
});

