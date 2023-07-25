const boardTile = document.querySelectorAll(".board-tile");










// Gameboard Module










// Player Factory
const player = name => {
    const sayHello = () => console.log(`Hello, ${name}!!!`);
    return { name, sayHello };
}

const jeff = player('Jeff');










// Game Logic Module












// Event Listeners and such

boardTile.forEach((tile) => {
    // console.log(tile.dataset.tile);


})





