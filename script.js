const birds = [
  "bobrossparrot",
  "explodyparrot",
  "fiestaparrot",
  "metalparrot",
  "revertitparrot",
  "tripletsparrot",
  "unicornparrot",
];
let plays = 0;
let numCards = 0;
let timer = 0;

setInterval(() => {
  timer++;
  document.querySelector(".timer").innerHTML = `${timer} seg`;
}, 1000);

birds.sort(comparador);
welcomeQuestion();

function welcomeQuestion() {
  numCards = prompt("Com quantas cartas você quer jogar?");
  while (Number.isInteger(numCards / 2) === false) {
    if (4 <= numCards === true) {
      numCards = prompt("Digite um número par entre 4 e 14.");
      continue;
    }
    if (numCards <= 14 === true) {
      numCards = prompt("Digite um número par entre 4 e 14.");
      continue;
    }
    numCards = prompt("Digite um número par entre 4 e 14.");
  }
  createCards(numCards);
}

function renderCards(cards) {
  const container = document.querySelector(".container");
  container.innerHTML = "";

  for (let i = 0; i < cards.length; i++) {
    container.innerHTML += `
            <div class="card ${cards[i].back}" onclick="clickHandler(this)"> 
                <img src="files/front.png">
            </div>`;
  }
}

function clickHandler(card) {
  const cardBird = birds.find((x) => {
    if (card.classList.contains(x)) {
      return x;
    }
  });
  const allCardsRotated = document
    .querySelector(".container")
    .querySelectorAll(".rotate");

  plays++;
  //se o card já foi acertado, não acontecerá nada
  if (card.classList.contains("ok")) {
    return;
  }

  //Vira o card clicado
  rotate(card);

  //Loop que percorre todos os cards a procura dos elementos que contém a imagem do par de cartas
  for (let i = 0, loopLength = allCardsRotated.length; i < loopLength; i++) {
    const element = allCardsRotated[i];
    const elementClasses = element.classList;

    if (elementClasses.contains("ok") || element === card) {
      continue;
    }

    //Par correto
    if (elementClasses.contains(cardBird)) {
      elementClasses.add("ok");
      card.classList.add("ok");
      break;
    }

    if (elementClasses.contains(cardBird) === false) {
      setTimeout(rotate, 1000, card);
      setTimeout(rotate, 1000, element);
    }
  }
  setTimeout(isItWon, 300);
}

function rotate(element) {
  element.classList.toggle("rotate");

  if (element.classList.contains("rotate")) {
    for (let i = 0, loopLength = birds.length; i < loopLength; i++) {
      if (element.classList.contains(birds[i])) {
        element.querySelector("img").src = `files/${birds[i]}.gif`;
        break;
      }
    }
  } else {
    element.querySelector("img").src = `files/front.png`;
  }
}

function isItWon() {
  const allCardsOk = document
    .querySelector(".container")
    .querySelectorAll(".ok");

  if (allCardsOk.length === Number(numCards)) {
    alert(`Você ganhou o jogo em ${plays} jogadas e ${timer} segundos!`);
    const restartGame = prompt("Gostaria de jogar novamente?");
    if (restartGame === "sim") {
      document.querySelector(".container").innerHTML = "";
      plays = 0;
      timer = 0;
      welcomeQuestion();
    }
  }
}

/*
Essa função cria os objetos que descrevem cada carta do jogo.
*/
function createCards(numCards) {
  let i = 0;
  let j = 0;
  const cards = [];

  for (let i = 0, loopLength = numCards / 2; i < loopLength; i++) {
    const card = {};
    card.id = i;

    //reinicia a ordem do array birds
    if (j === birds.length) {
      j = 0;
    }

    card.back = `${birds[j]}`;
    j++;
    cards.push(card, card);
  }
  renderCards(cards.sort(comparador));
}

function comparador() {
  return Math.random() - 0.5;
}
