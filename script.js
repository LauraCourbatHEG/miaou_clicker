let gold = 0;  // Variable de l'or
let patoune = 0;  // Nombre de patounes achetées
let brosse = 0;   // Nombre de brosses achetées
let mamie = 0;   // Nombre de mamies achetées

fetch('structure.json')
  .then(response => response.json())
  .then(data => {
    const structurejson = data.personnes; // ou simplement `data` si ton JSON est déjà un tableau
    console.log(structurejson); // Tu peux utiliser ta variable ici
  });


// Récupération des éléments HTML
const mineImg = document.getElementById('chaton_base');
const scoreDisplay = document.getElementById('score');
const autoPatoune = document.getElementById('auto_patoune');
const autoBrosse = document.getElementById('auto_brosse');
const autoMamie = document.getElementById('auto_mamie');
const patouneCount = document.getElementById('patoune_count');
const brosseCount = document.getElementById('brosse_count');
const mamieCount = document.getElementById('mamie_count');

// Clique sur le chat pour gagner de l'or
mineImg.addEventListener('click', () => {
  gold++;  // Ajoute 1 or
  updateScore();  // Met à jour l'affichage de l'or
});

// Achat de la patoune
autoPatoune.addEventListener('click', () => {
  if (gold >= 20) {  // Vérifie or
    gold -= structurejson[0].prix;  // Déduit 50 or
    patoune++;   // Incrémente le nombre de patounes
    patouneCount.textContent = `Patounes : ${patoune}`;  // Met à jour le compteur de patounes
    updateScore();  // Met à jour l'affichage de l'or
  } else {
    alert("Pas assez d'or pour acheter une patoune !");
  }
});

// Achat de la brosse
autoBrosse.addEventListener('click', () => {
  if (gold >= 50) {  // Vérifie or
    gold -= 50;  // Déduit 50 or
    brosse++;   // Incrémente le nombre de brosses
    brosseCount.textContent = `Brosses : ${brosse}`;  // Met à jour le compteur de brosses
    updateScore();  // Met à jour l'affichage de l'or
  } else {
    alert("Pas assez d'or pour acheter une brosse !");
  }
});

// Achat de la mamie
autoMamie.addEventListener('click', () => {
    if (gold >= 200) {  // Vérifie or
      gold -= 200;  // Déduit 50 or
      mamie++;   // Incrémente le nombre de mamies
      mamieCount.textContent = `Mamies : ${mamie}`;  // Met à jour le compteur de mamies
      updateScore();  // Met à jour l'affichage de l'or
    } else {
      alert("Pas assez d'or pour acheter une mamie !");
    }
  });

// Fonction pour mettre à jour l'affichage de l'or
function updateScore() {
  scoreDisplay.textContent = `💰 : ${gold}`;  // Affiche la quantité actuelle d'or
}

// Ajoute de l'or automatiquement selon les upgrades (1 or par seconde pour chaque patoune et 3 or par seconde pour chaque brosse)
setInterval(() => {
  if (patoune > 0) {
    gold += patoune;  // +1 or par patoune (chaque patoune génère 1 or par seconde)
    updateScore();    // Met à jour l'affichage de l'or
  }
  if (brosse > 0) {
    gold += 3 * brosse;  // +3 or par brosse (chaque brosse génère 3 or par seconde)
    updateScore();       // Met à jour l'affichage de l'or
  }
  if (mamie > 0) {
    gold += 10 * mamie;  // +10 or par mamie (chaque mamie génère 10 or par seconde)
    updateScore();       // Met à jour l'affichage de l'or
  }
}, 1000);  // Met à jour toutes les secondes
