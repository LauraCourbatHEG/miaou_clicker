const myjson = {
  "personnes": [
    { "nom": "Patoune", "prix": 20, "revenu": 1, "image":"patoune.jpg" },
    { "nom": "Brosse", "prix": 50, "revenu": 5, "image":"brush.jpg" },
    { "nom": "Mamie", "prix": 200, "revenu": 10, "image":"grandma.jpg" },
    { "nom": "Machine a Calin", "prix": 2000, "revenu": 100, "image":"WIPLogo.webp" },
    { "nom": "Tally", "prix": 2000, "revenu": 100, "image":"WIPLogo.webp" }
  ]
};

let gold = 5000;  // Variable de l'or

const structurejson = myjson.personnes.map(personne => {
  return {
    nom: personne.nom,
    prix: personne.prix,
    revenu: personne.revenu,
    image : personne.image
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

const cartesContainer = document.getElementById('listejolie');

structurejson.forEach((objet, index) => {
  const nomId = objet.nom.toLowerCase().replace(" ","");
  const compteurSpan = document.createElement('span');
  compteurSpan.id = `${nomId}_count`;
  compteurSpan.textContent = `${objet.nom} : 0`;

  const card = document.createElement('a');
  card.className = 'list-group-item list-group-item-action py-3 lh-sm';
  card.href="#"

  card.innerHTML = `
    <div class="d-flex w-100 align-items-center justify-content-between">
          <img src="images/${objet.image}" class="w-100 rounded img-thumbnail" alt="${objet.nom}"></img>
          <strong class="mb-1">${objet.nom}</strong>
          <small class="text-body-secondary">Revenu : ${objet.revenu} or/sec<br>Prix : ${objet.prix} or</small>
        </div>
        <div class="col-10 mb-1 small">${inventaire[index]}</div>
  `;

  //const link = document.createElement('a');
  //link.href = '#';
  //link.className = 'stretched-link';
  //link.textContent = `Acheter ${objet.nom}`;

  //card.querySelector('.col-md-6.p-4').appendChild(compteurSpan);
  //card.querySelector('.col-md-6.p-4').appendChild(link);
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
