//Import Express
const express = require('express')

// create our application object (and configure liquid templating)
const app = require('liquid-express-views')(express())

app.get('/',  (req, res)=> {
    res.send('Welcome to the GitPub App')
  })

  const drinks = require('./models/drinks.js')

  app.get('/drinks',(req,res) => {
    
      res.render('index.liquid',{drinks: drinks})
  })
  
  app.get('/drinks/:index',(req,res) => {
    const id = parseInt(req.params.index)
      res.render('show.liquid',{drinks: drinks[id]})
  })







//Create Server Listener//
const PORT = 3000
app.listen(PORT, ()=> console.log(`Your are listening on port ${PORT}`))