const express = require('express');
// create our application object (and configure liquid templating)
const path = require('path')
// passing the app object to the l-e-v function first and then saving to the app variable
const app = require("liquid-express-views")(express(), {root: [path.resolve(__dirname, 'views/')]})
const pokemon = require('./models/pokemon.js');





/////////////////////////////////////
//      M I D D L E W A R E      ///
// ///////////////////////////////////
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))


//////////////////////////////////////
//////////////////////////////////////

//============= INDEX
app.get("/", (req, res) => {
    res.render("index.liquid", {pokemon: pokemon})
})

app.get('/pokemon/', (req, res) => {
    const id = parseInt(req.params.id)
    res.render('../views/index.liquid', { poke: pokemon[id] });
});

//==============SHOW
app.get('/pokemon/:id', (req, res) => {
    const id = parseInt(req.params.id)
    res.render('show.liquid', { poke: pokemon[id] });
});

// New

app.get('/pokemon/new', (req,res)=>{
    const id = parseInt(req.params.id)
    res.render('pokemon/new.liquid',{ poke: pokemon[id] })
})

// //=======================EDIT

// app.get ('/pokemon/:id/edit', (req,res)=>{
//     const id = parseInt(req.params.id)
    
//     res.render('pokemon/edit',{ poke: pokemon id]}
// })

// //=======================CREATE

// app.post('/pokemon',(req,res)=>{

// )}

  // Push New Pokemon into the Array
// pokemon.push(req.body)


// //======================UPDATE

// app.put('/pokemon/:id', (req,res)=>{

// })

// //====================DESTROY

// app.delete('/pokemon/:id', (req,res)=>{
    // const id = parseInt(req.params.id)
    // pokemon.splice(id, 1)
// )}


//================LISTENER
const PORT = 3000
app.listen(PORT, ()=> console.log(`Im listening ${PORT}`))