window.onload = function () {
  var modal = document.getElementById("myModal");
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

// btn.addEventListener('click', onclick)
const createMovie = (body) =>
  axios.post(baseURL, body).then(moviesCallback).catch(errCallback);

const doSearch = () => {
  console.log("Searching");
  const searchText = document.getElementById("gameSearch").value;
  console.log("searchText = ", searchText);
  fetch("http://localhost:4000/api/search?search=" + searchText)
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
          game.imgURL +
          "' />" +
          "<h3>" +
          game.title +
          "</h3>" +
          "<button onclick='addToLibrary()'>Add to Library</button>";
        ("</div>");
      }
      resultsDiv.innerHTML = htmlToAdd;
    });
};

const addToLibrary = () => {
  console.log("Working");
  //to do: make post call
  showCurrentLibrary();
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
        const addGameBox = `<div class="class boardgameCard">
      <div class="column">
        <div class="card">
          <img class="boxArt" src="${game.imgURL}" alt="the cover of the boardgame box">
          <div class="gameName">
          <h4>${game.title}</h4>
          </div>
      </div>
    </div>`;
        gameLibrary.innerHTML += addGameBox;
      }
    });

  // display each item as HTML

  // Be happy
};
