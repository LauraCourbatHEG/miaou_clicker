const myjson = {
  "personnes": [
    { "nom": "Patoune", "prix": 20, "revenu": 1 },
    { "nom": "Brosse", "prix": 50, "revenu": 5 },
    { "nom": "Mamie", "prix": 200, "revenu": 10 },
    { "nom": "Machine a Calin", "prix": 2000, "revenu": 100 },
    { "nom": "Tally", "prix": 2000, "revenu": 100 }
  ]
};

let gold = 5000;  // Variable de l'or

const structurejson = myjson.personnes.map(personne => {
  return {
    nom: personne.nom,
    prix: personne.prix,
    revenu: personne.revenu
  };
});

const inventaire = new Array(structurejson.length).fill(0); //Tableau d'objets qu'on peut acheter


// Construction de la page html
const btnContainer = document.getElementById('achats');
structurejson.forEach((objet, i) => {
  const nomId = objet.nom.toLowerCase().replace(" ","");
  const btn = document.createElement('button');

  btn.id = `auto_${nomId}`;
  btn.className = 'btn btn-outline-primary m-1';
  btn.textContent = `Acheter ${objet.nom}`;

  btnContainer.appendChild(btn);
});

const cartesContainer = document.getElementById('cartes');

structurejson.forEach((objet, index) => {
  const nomId = objet.nom.toLowerCase().replace(" ","");
  const compteurSpan = document.createElement('span');
  compteurSpan.id = `${nomId}_count`;
  compteurSpan.textContent = `${objet.nom} : 0`;

  const card = document.createElement('div');
  card.className = 'row g-0 bg-primary position-relative mb-4';

  card.innerHTML = `
    <div class="col-md-2 mb-md-0 p-md-4">
      <img src="https://via.placeholder.com/200x150?text=${objet.nom}" class="w-100 rounded" alt="${objet.nom}">
    </div>
    <div class="col-md-6 p-4 ps-md-0">
      <h5 class="mt-0">${objet.nom}</h5>
      <p>Revenu : ${objet.revenu} or/sec<br>Prix : ${objet.prix} or</p>
    </div>
  `;

  const link = document.createElement('a');
  link.href = '#';
  link.className = 'stretched-link';
  link.textContent = `Acheter ${objet.nom}`;

  card.querySelector('.col-md-6.p-4').appendChild(compteurSpan);
  card.querySelector('.col-md-6.p-4').appendChild(link);
  cartesContainer.appendChild(card);
});



// Récupération des éléments HTML
const mineImg = document.getElementById('chaton_base');
const scoreDisplay = document.getElementById('score');

const AutoElements = structurejson.map(objet =>
  document.getElementById(`auto_${objet.nom.toLowerCase().replace(" ","")}`)
);

const compteurElements = structurejson.map(objet =>
  document.getElementById(`${objet.nom.toLowerCase().replace(" ","")}_count`)
);


updateScore();


function acheterObjet(index) {
  if (gold >= structurejson[index].prix) {  // Vérifie si on a assez d'or
    gold -= structurejson[index].prix;  // Déduit le prix de l'or
   inventaire[index]++;  // Incrémente le compteur d'objets
    compteurElements[index].textContent = `${structurejson[index].nom} : ${inventaire[index]}`;  // Met à jour le compteur affiché
    updateScore();  // Met à jour l'affichage de l'or
  } else {
    alert(`Pas assez d'or pour acheter un(e) ${structurejson[index].nom.toLowerCase().replace(" ","")} !`);
  }
}


// Fonction pour mettre à jour l'affichage de l'or
function updateScore() {
  scoreDisplay.textContent = `💰 : ${gold}`;  // Affiche la quantité actuelle d'or
}

// Clique sur le chat pour gagner de l'or
mineImg.addEventListener('click', () => {
  gold++;  // Ajoute 1 or
  updateScore();  // Met à jour l'affichage de l'or
});


AutoElements.forEach((valeur, index) => {
  valeur.addEventListener('click', () => {
    acheterObjet(index);
  });
});

// Ajoute de l'or automatiquement selon les upgrades (1 or par seconde pour chaque patoune et 3 or par seconde pour chaque brosse)
setInterval(() => {
  inventaire.forEach((valeur, index) => {
    gold+=valeur*structurejson[index].revenu
  });
    updateScore();       // Met à jour l'affichage de l'or
  
}, 1000);  // Met à jour toutes les secondes
