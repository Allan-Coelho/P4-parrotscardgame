main();

function main() {
    const cards = prompt("Com quantas cartas você quer jogar?");
    createCards(cards);
}

function createCards(cards) {
    const container = document.querySelector(".container");
    container.innerHTML = "";
    for (let i = 0; i < cards; i++) {

        container.innerHTML += `
            <div class="card">
                <img src="files/front.png" onclick="clickHandler(this)" alt="Piriquito">
            </div>`;
    }
}
function clickHandler(card) {
    
}