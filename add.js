import { basisBereidingen } from "./oogst.js";

//localStorage.setItem('opgeslagenBereidingen', JSON.stringify(basisBereidingen));

let alleBereidingen = JSON.parse(localStorage.getItem('opgeslagenBereidingen')) || [];


document.querySelector('form.add').addEventListener('submit', (event) => {
    event.preventDefault();


    const nieuweBereiding = {
        titel: document.querySelector('#titel').value,
        ingredienten: document.querySelector('#ingredienten').value,
        techniek: document.querySelector('input[name="techniek"]:checked')?.value,
        bereiding: document.querySelector('#bereiding').value,
    };
    alleBereidingen.push(nieuweBereiding);
   
   localStorage.setItem('opgeslagenBereidingen', JSON.stringify(alleBereidingen));
  
});

