const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.static(`/public`))
app.use(express.static(`./public`));

const gameDatabase = require("./db.json");
const myLibrary = [
  {
    name: "Wingspan",
    image:
      "https://cf.geekdo-images.com/yLZJCVLlIx4c7eJEWUNJ7w__imagepagezoom/img/yS4vL6iTCvHSvGySxyOjV_-R3dI=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic4458123.jpg",
    thumbnail:
      "https://cf.geekdo-images.com/yLZJCVLlIx4c7eJEWUNJ7w__thumb/img/VNToqgS2-pOGU6MuvIkMPKn_y-s=/fit-in/200x150/filters:strip_icc()/pic4458123.jpg",
    minPlayers: 1,
    maxPlayers: 5,
    playingTime: 70,
  },
];

app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../public/index.html"));
});
app.get("/api/search", (req, res) => {
  const keyWord = req.query.search;
  console.log(keyWord);

  const filteredResults = gameDatabase.filter((item) => item.name === keyWord);
  res.json(filteredResults);
});
app.post("/api/games", (req, res) => {
  const gameToAdd = req.body;
  myLibrary.push(gameToAdd);
  res.json(myLibrary);
});

app.get("/api/library", (req, res) => {
  res.json(myLibrary);
});

// app.delete("/api/library", (req, res) => {
//   let deleteGame = myLibrary.name((item) => item.name === +req.params.name);
//   myLibrary.splice(toDelete, 1);
//   res.json(myLibrary);
// });

// <button id="delete" onclick="if(confirm('Are you sure?')) deleteGame(${myLibrary.name});"><i class="ri-delete-bin-line"></i></button>

app.listen(4000, console.log("Server Running on 4000"));
