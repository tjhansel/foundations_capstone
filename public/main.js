window.onload = function () {
  var modal = document.getElementById("searchModal");
  var btn = document.getElementById("add-game-button");
  console.log(btn);
  var span = document.getElementsByClassName("close")[0];
  console.log("Window Loaded");
  btn.onclick = function () {
    modal.style.display = "block";
    console.log("button click");
  };

  span.onclick = function (evt) {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
  showCurrentLibrary();
};

const deleteGame = name =>
  axios.delete(`/api/library, ${name}`);

const doSearch = () => {
  console.log("Searching");
  const searchText = document.getElementById("gameSearch").value;
  console.log("searchText = ", searchText);
  fetch("/api/search?search=" + searchText)
    .then((d) => d.json())
    .then((json) => {
      console.log(json);
      const resultsDiv = document.getElementById("resultsDiv");
      let htmlToAdd = "<h2>Results</h2>";
      for (const game of json) {
        console.log(game);
        htmlToAdd +=
          "<div class='gameItem'>" +
          "<img src='" +
          game.thumbnail +
          "' />" +
          "<h3>" +
          game.name +
          "</h3>" +
          `<button id="to-library-button" onclick='addToLibrary(` +
          JSON.stringify(game) +
          `)'>Add</button>`;
        ("</div>");
      }
      resultsDiv.innerHTML = htmlToAdd;
    });
};
const getHTMLForGameBox = (game) => {
  return (
    `<div class="boardgameCard" onclick='showGameStats(` +
    JSON.stringify(game) +
    `)'>
<div class="column">  
  <div class="card"> 
    <img class="boxArt" src="${game.thumbnail}" alt="the cover of the boardgame box">
    <div class="gameName">
    <h4>${game.name}</h4>
    </div>
    <button id="delete" onclick="if(confirm('Are you sure you want to delete the game?')) deleteGame(${game.name});"><i class="ri-delete-bin-line"></i></button>
</div>
</div>`
  );
};
const addToLibrary = (game) => {
  console.log("Btn Working");
  console.log(game);
  axios.post("/api/games", game).then(({ data }) => {
    gameLibrary.innerHTML = "";
    for (game of data) {
      const addGameBox = getHTMLForGameBox(game);
      gameLibrary.innerHTML += addGameBox;
    }
  });
};
const showCurrentLibrary = () => {
  // find game library div
  const gameLibrary = document.getElementById("gameLibrary");
  // get data from server
  fetch("/api/library")
    .then((d) => d.json())
    .then((games) => {
      console.log(games);
      for (game of games) {
        const addGameBox = getHTMLForGameBox(game);
        gameLibrary.innerHTML += addGameBox;
      }
    });
};
const showGameStats = (myLibrary) => {
  console.log("clicky", myLibrary);

  const divToAdd = document.createElement("div");
  const modalDiv = document.getElementById("gameStatsModal");
  divToAdd.innerHTML = `<div id="searchModal" class="modal">
    <div class="modal-content">
      <span class="close" onclick="hideGameStatsModal()">&times;</span>

      <h4>${myLibrary.name} Game Stats</h4><br>
      <p>Min Players: ${myLibrary.minPlayers}</p>
      <p>Max Players: ${myLibrary.maxPlayers}</p>
      <p>Playing Time: ${myLibrary.playingTime} mins</p>
      </div>
    </div>`;
  divToAdd.className = "visible-modal";
  modalDiv.appendChild(divToAdd);
};
const hideGameStatsModal = () => {
  const modalDiv = document.getElementById("gameStatsModal");
  modalDiv.innerHTML = "";
};
