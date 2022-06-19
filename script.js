const birds = [
  "bobrossparrot",
  "explodyparrot",
  "fiestaparrot",
  "metalparrot",
  "revertitparrot",
  "tripletsparrot",
  "unicornparrot",
];

birds.sort(comparador);

welcomeQuestion();

function welcomeQuestion() {
  let numCards = prompt("Com quantas cartas você quer jogar?");
  while (Number.isInteger(numCards / 2) === false) {
    numCards = prompt("Com quantas cartas você quer jogar?");
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
  const allCards = document.querySelector(".container").children;
  const cardBird = birds.find((x) => {
    if (card.classList.contains(x)) {
      return x;
    }
  });
  const allCardsRotated = document
    .querySelector(".container")
    .querySelectorAll(".rotate");

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
}

function rotate(element) {
  element.classList.toggle("rotate");
  console.log(element);
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
