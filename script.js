import {basisBereidingen} from "./oogst.js";

if (!localStorage.getItem('opgeslagenBereidingen')) {
    localStorage.setItem( 'opgeslagenBereidingen', JSON.stringify(basisBereidingen)
    );
}

let bereidingen = JSON.parse(localStorage.getItem('opgeslagenBereidingen')) || [];

const bereidingenSectie = document.querySelector('section.bereidingen');

const update = new CustomEvent('bereidingenUpdate');



const checkboxes=document.querySelectorAll('input[name=techniek]');
checkboxes.forEach((checkbox)=>{
    checkbox.addEventListener('change', () => {
        bereidingenSectie.dispatchEvent(update);
    });
});

function maakTechniekenLijst() {
    const alleTechnieken = []
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked){
            alleTechnieken.push(checkbox.value);
        }
    });
    return alleTechnieken;
}

const labels=document.querySelectorAll('input[name=labels]');
console.log(labels);
labels.forEach((label)=>{
    label.addEventListener('change', () =>{
        bereidingenSectie.dispatchEvent(update);
    });
});

/*Zoek meeste moestuinlabels (gedeelte alle bereidingen+zoekfunctie nog refactoren in een hulpfunctie? dry > hieronder idem stuk code)*/
/*ook nog  aanpassen naar aangevinkte labels ipv totaal labels)*/
function vindMeesteMoestuinlabels() {
    const geselecteerdeTechnieken = maakTechniekenLijst();
    const geselecteerdeMoestuinlabels = maakMoestuinlabelsLijst();
    const zoekVeld = document.querySelector('form.zoektekst>input').value.toLowerCase();

    let meesteML = {moestuinlabel: []};
 
    bereidingen.forEach((her)=> {
        if((her.bereiding.toLowerCase().includes(zoekVeld) || her.titel.toLowerCase().includes(zoekVeld)) && geselecteerdeTechnieken.includes(her.techniek) && (geselecteerdeMoestuinlabels.length === 0 || her.moestuinlabel.some(label => geselecteerdeMoestuinlabels.includes(label)))) 
            {
                if (her.moestuinlabel.length > meesteML.moestuinlabel.length) {
                    meesteML=her;
                }
            }
        });
        return meesteML;
};
function toonMeesteLabels() {
    const besteMatch =vindMeesteMoestuinlabels();
    document.querySelector('#moestuinmatch').innerText = `Bereiding met het meeste moestuingroenten: ${besteMatch.titel} (${besteMatch.moestuinlabel.length} moestuinlabels)`;
};


function maakMoestuinlabelsLijst() {
    const alleMoestuinlabels = []
    labels.forEach((label) => {
        if (label.checked){
            alleMoestuinlabels.push(label.value);
        }
    });
    return alleMoestuinlabels;
}
/*einde meeste moestuinlabels*/


function voegBereidingToe(ter) {
const oogstVerwerking = document.createElement('article');


let checkLink;
if (ter.bereiding.startsWith("http")||ter.bereiding.includes(".be")||ter.bereiding.includes(".nl")||ter.bereiding.includes(".com")) {
    checkLink = `<a href="${ter.bereiding}">${ter.bereiding}</a>`;
    }else{
        checkLink = ter.bereiding;
    }

oogstVerwerking.innerHTML =`
    <h2>${ter.titel}</h2>
    <p>Ingredienten: </p> 
    <ul class= "ingredientenlijst">
    ${ter.ingredienten.map(ingr => `<li>${ingr}</li>`).join("")}
    </ul>
    <p>Bereiding: ${checkLink}</p>`;
    oogstVerwerking.classList.add(ter.techniek);
    ter.moestuinlabel.forEach(ml => {
    oogstVerwerking.classList.add(ml)
    })
    ;

bereidingenSectie.insertAdjacentElement("afterbegin", oogstVerwerking);
};

bereidingen.forEach(voegBereidingToe);

/*basisBereidingen.forEach(voegBereidingToe);
toegevoegdeBereidingen.forEach(voegBereidingToe);*/

function toonBereidingen() {
    const geselecteerdeTechnieken = maakTechniekenLijst();
    const geselecteerdeMoestuinlabels = maakMoestuinlabelsLijst();
    const zoekVeld = document.querySelector('form.zoektekst>input').value.toLowerCase();
    bereidingenSectie.innerHTML = '';

  // const alleBereidingen = lijstAlleBereidingen();
   

    bereidingen.forEach((her)=> {
        if((her.bereiding.toLowerCase().includes(zoekVeld) || her.titel.toLowerCase().includes(zoekVeld)) && geselecteerdeTechnieken.includes(her.techniek) && (geselecteerdeMoestuinlabels.length === 0 || her.moestuinlabel.some(label => geselecteerdeMoestuinlabels.includes(label)))) {
            voegBereidingToe(her);
        }
        });
    };
    document.querySelector('form.zoektekst>input').addEventListener('input', () => {
    bereidingenSectie.dispatchEvent(update);

    });

    //bereidingenSectie.addEventListener('bereidingenUpdate', JSON.parse(localStorage.getItem('opgeslagenBereidingen')));

    
    bereidingenSectie.addEventListener('bereidingenUpdate', () => {
    toonBereidingen();
    toonMeesteLabels();
    
});


 