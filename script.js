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
labels.forEach((label)=>{
    label.addEventListener('change', () =>{
        bereidingenSectie.dispatchEvent(update);
    });
});

function maakMoestuinlabelsLijst() {
    const alleMoestuinlabels = []
    labels.forEach((label) => {
        if (label.checked){
            alleMoestuinlabels.push(label.value);
        }
    });
    return alleMoestuinlabels;
}

/*hulpfunctie filter*/
function alleFilters (her) {
    const geselecteerdeTechnieken = maakTechniekenLijst();
    const geselecteerdeMoestuinlabels = maakMoestuinlabelsLijst();
    const zoekVeld = document.querySelector('form.zoektekst>input').value.toLowerCase();

    return (
        (her.bereiding.toLowerCase().includes(zoekVeld) || her.titel.toLowerCase().includes(zoekVeld)) 
        && geselecteerdeTechnieken.includes(her.techniek) 
        && (geselecteerdeMoestuinlabels.length === 0 || her.moestuinlabel.some(label => geselecteerdeMoestuinlabels.includes(label)))
    );
}


function vindMinsteIngredienten() {
    let minsteIngredienten = bereidingen[0];

    bereidingen.forEach((ber)=>{
        if (ber.ingredienten.length < minsteIngredienten.ingredienten.length) {
        minsteIngredienten = ber;
        }
         });
    return minsteIngredienten;
};

function toonMinsteIngredienten() {
    const minsteIngr = vindMinsteIngredienten();

    document.querySelector('#aantalingredienten').innerText = `Bereiding met het minste aantal ingrediënten: ${minsteIngr.titel}, ${minsteIngr.ingredienten.length} ingrediënt(en)`
};

/*Zoek meeste moestuinlabels (gedeelte alle bereidingen+zoekfunctie nog refactoren in een hulpfunctie? dry > hieronder idem stuk code)*/
/*ook nog  aanpassen naar aangevinkte labels ipv totaal labels)*/
function vindMeesteMoestuinlabels() {

    let meesteML = {moestuinlabel: []};
    console.log(meesteML);
    let vergelijkPunt = 0;
    const geselecteerdeMoestuinlabels = maakMoestuinlabelsLijst();
 
    bereidingen.forEach((her)=> {
        if(alleFilters) 
            {
            const overeenkomst = her.moestuinlabel.filter(label => geselecteerdeMoestuinlabels.includes(label));
    

            if (overeenkomst.length > vergelijkPunt) 
                {   vergelijkPunt = overeenkomst.length;
                    meesteML=her;
                }
            }
        });
        return meesteML;
};
function toonMeesteLabels() {
    const geselecteerdeMoestuinlabels = maakMoestuinlabelsLijst();
    const besteMatch =vindMeesteMoestuinlabels();
    console.log(besteMatch);
    document.querySelector('#moestuinmatch').innerText = `Beste moestuinmatch: ${besteMatch.titel} heeft ${besteMatch.moestuinlabel.filter(label => geselecteerdeMoestuinlabels.includes(label)).length} moestuinlabel(s) nl: ${besteMatch.moestuinlabel.filter(label => geselecteerdeMoestuinlabels.includes(label)).join(", ")}.`;
};


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



function toonBereidingen() {
    bereidingenSectie.innerHTML = '';
 
    bereidingen.forEach((her)=> {
        if(alleFilters(her)) {
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
    toonMinsteIngredienten();
    
});


 