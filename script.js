import {basisBereidingen} from "./oogst.js";

localStorage.setItem('opgeslagenBereidingen', JSON.stringify(basisBereidingen));

let bereidingen = JSON.parse(localStorage.getItem('opgeslagenBereidingen')) || [];

console.log(bereidingen);

const bereidingenSectie = document.querySelector('section.bereidingen');
console.log(bereidingenSectie);

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

   // const alleBereidingen = lijstAlleBereidingen();
    

    let meesteML = {moestuinlabel: []};
 
    bereidingen.forEach((her)=> {
        if(her.bereiding.includes(zoekVeld) && geselecteerdeTechnieken.includes(her.techniek) && (geselecteerdeMoestuinlabels.length === 0 || her.moestuinlabel.some(label => geselecteerdeMoestuinlabels.includes(label)))) 
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
/*einde meeste moestuinlabels*/

function maakMoestuinlabelsLijst() {
    const alleMoestuinlabels = []
    labels.forEach((label) => {
        if (label.checked){
            alleMoestuinlabels.push(label.value);
        }
    });
    return alleMoestuinlabels;
}

bereidingenSectie.addEventListener('bereidingenUpdate', () => {
    toonBereidingen();
    toonMeesteLabels();
});

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
    <p>Ingredienten: ${ter.ingredienten}</p>
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
        if(her.bereiding.includes(zoekVeld) && geselecteerdeTechnieken.includes(her.techniek) && (geselecteerdeMoestuinlabels.length === 0 || her.moestuinlabel.some(label => geselecteerdeMoestuinlabels.includes(label)))) {
            voegBereidingToe(her);
        }
        });
    };
    document.querySelector('form.zoektekst>input').addEventListener('input', () => {
    bereidingenSectie.dispatchEvent(update);
    });

    

 /*Melding toegevoegd - foutmeliding - formvalidatie
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
    alleBereidingen.push(nieuweBereiding);
    bereidingenSectie.dispatchEvent(bereidingenUpdate);
    toonMelding('succes', 'Succesvol toegevoegd!');
    }

    document.querySelector('form.add').addEventListener('submit', (event) => {
    event.preventDefault();

    voegToe();*/



/*
    basisBereidingen.forEach((her) => {
        if(her.bereiding.includes(zoekVeld) && geselecteerdeTechnieken.includes(her.techniek) && geselecteerdeMoestuinlabels.includes(her.moestuinlabel)){
            voegBereidingToe(her);
        }
        })
        ||
    toegevoegdeBereidingen.forEach((her) => {
        if(her.bereiding.includes(zoekVeld) && geselecteerdeTechnieken.includes(her.techniek) && geselecteerdeMoestuinlabels.includes(her.moestuinlabel))
            {voegBereidingToe(her)};
        });
       
    
    };
    document.querySelector('form.zoektekst>input').addEventListener('input', toonBereidingen);
    */


/*const update = new CustomEvent ('lijstUpdate');*/

/* cons/let of function 'alleBereidingen' maken om basis + toegevoegde bereidingen samen te krijgen? > bvb met concat?zie jsinfo > array methods > transform > concat

function alleBereidingen(lijst) {
    bereidingenSectie.innerHTML = "";
    lijst.forEach(voegBeredingToe);
}
alleBereidingen(geefAlleBereidingen());*/


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

/*
function toonBereidingen() {
    const zoekVeld = document.querySelector('form.zoektekst>input').value;
    bereidingenSectie.innerHTML = '';
    basisBereidingen.forEach((her) => {
        if(her.bereiding.includes(zoekVeld)){}
         })
        ||
    toegevoegdeBereidingen.forEach((her) => {
        if(her.bereiding.includes(zoekVeld) )
            {voegBereidingToe(her)};
        });
       
    
    };
    document.querySelector('form.zoektekst>input').addEventListener('input', toonBereidingen);
    */


    /*
function lijstAlleBereidingen() {
    return [...basisBereidingen, ...toegevoegdeBereidingen];
};

const alleBereidingen = lijstAlleBereidingen();

*/