





function createGameBox(game) {
    const gameBox = document.createElement('div')
    gameBox.classList.add('game-card')

    gameCard.innerHTML = `<img alt='Box Cover' src=${game.imageURL} class="game-box"/>
    <p class="game-title">${game.title}</p>
    <div class="btns-container">
        <button onclick="updateGame(${game.id}, 'minus')">-</button>
        <p class="game-rating">${game.rating} stars</p> 
        <button onclick="updateGame(${game.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteGame(${game.id})">delete</button>
    `
    gameContainer.appendChild(gameBox)
}