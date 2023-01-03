const express = require('express')
const cors= require('cors')
const path = require('path')

const app = express()

app.use(cors())
app.use(express.json())
// app.use(express.static(`/public`))
app.use(express.static(`./public`))

const gameDatabase = [
    {
        title:"Game1",
        imgURL:"https://cf.geekdo-images.com/fjE7V5LNq31yVEW_yuqI-Q__imagepage/img/ijYTk6KGtxLRdIvLsGar13ZHs4c=/fit-in/900x600/filters:no_upscale():strip_icc()/pic3918905.png"
    
    },
    {
        title:"Game2",
        imgURL:"https://cf.geekdo-images.com/yLZJCVLlIx4c7eJEWUNJ7w__imagepagezoom/img/yS4vL6iTCvHSvGySxyOjV_-R3dI=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic4458123.jpg"
    }
]
const myLibrary =[{
    title:"Wingspan",
    imgURL:"https://cf.geekdo-images.com/yLZJCVLlIx4c7eJEWUNJ7w__imagepagezoom/img/yS4vL6iTCvHSvGySxyOjV_-R3dI=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic4458123.jpg"
}]

app.get('/', (req,res) => {
    res.status(200).sendFile(path.join(__dirname, '../public/index.html'))
    
})
app.get("/api/search", (req,res)=>{
    const keyWord = req.query.search
    console.log(keyWord)   
    
    const filteredResults = gameDatabase
    .filter(item => item.title === keyWord)
    
    res.json(filteredResults)
})
app.post("/api/games", (req,res)=>{
    const gameToAdd = req.body
    myLibrary.push(gameToAdd)
    res.json(myLibrary)
})

app.get("/api/library", (req,res)=>{
    res.json(myLibrary)
})
// const {
//     getGame,
//     deleteGame, 
//     createGame, 
//     updateGame
// } = require('./controller')

// app.get(`/server/controller`, getGameBox)
// app.delete(`/server/controller`, deleteGame)
// app.post(`/server/controller`, createGame)
// app.put(`/server/controller`, updateGame)

app.listen(4000, console.log("Server Running on 4000"))