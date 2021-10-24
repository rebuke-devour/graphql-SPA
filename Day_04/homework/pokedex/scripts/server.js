const express    = require('express');
const app = require("liquid-express-views")(express());
const Pokemon = require('../models/pokemon.js');

/////////////////////////////////////
//      M I D D L E W A R E      ///
///////////////////////////////////



//////////////////////////////////////
//////////////////////////////////////


//============= INDEX
app.get('/pokemon', (req, res) => {
res.render('/index.liquid', { data: Pokemon });
});


//==============SHOW
app.get('/pokemon/:id', (req, res) => {
res.render('/show.liquid', { data: Pokemon[req.params.id] });
});


// New

// app.get('/pokemon/new', (req,res)=>{

// })




// //=======================EDIT

// app.get ('/pokemon/:id/edit', (req,res)=>{

// })

// //=======================CREATE

// app.post('/pokemon',(req,res)=>{

// )}

// //======================UPDATE

// app.put('/pokemon/:id', (req,res)=>{

// })

// //====================DESTROY

// app.delete('/pokemon/:id', (req,res)=>{

// )}











//================LISTENER
const PORT = 3000
app.listen(PORT, ()=> console.log(`Im listening ${PORT}`))