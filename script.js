const myjson = {
  "personnes": [
    { "nom": "Patoune", "prix": 20, "revenu": 1 },
    { "nom": "Brosse", "prix": 50, "revenu": 5 },
    { "nom": "Mamie", "prix": 200, "revenu": 10 }
  ]
};

let gold = 1000;  // Variable de l'or
let patoune = 0;  // Nombre de patounes achetées
let brosse = 0;   // Nombre de brosses achetées
let mamie = 0;   // Nombre de mamies achetées

const structurejson = myjson.personnes.map(personne => {
  return {
    nom: personne.nom,
    prix: personne.prix,
    revenu: personne.revenu
  };
});

const inventaire = new Array(structurejson.length).fill(0); //Tableau d'objets qu'on peut acheter

// Récupération des éléments HTML
const mineImg = document.getElementById('chaton_base');
const scoreDisplay = document.getElementById('score');

const AutoElements = structurejson.map(objet =>
  document.getElementById(`auto_${objet.nom.toLowerCase()}`)
);

const compteurElements = structurejson.map(objet =>
  document.getElementById(`${objet.nom.toLowerCase()}_count`)
);



function acheterObjet(index) {
  if (gold >= structurejson[index].prix) {  // Vérifie si on a assez d'or
    gold -= structurejson[index].prix;  // Déduit le prix de l'or
   inventaire[index]++;  // Incrémente le compteur d'objets
    compteurElements[index].textContent = `${structurejson[index].nom} : ${inventaire[index]}`;  // Met à jour le compteur affiché
    updateScore();  // Met à jour l'affichage de l'or
  } else {
    alert(`Pas assez d'or pour acheter un(e) ${structurejson[index].nom.toLowerCase()} !`);
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
