//Import Express
const express = require('express')

// create our application object (and configure liquid templating)
const app = require('liquid-express-views')(express())

app.get('/',  (req, res)=> {
    res.send('Welcome to the GitPub App')
  })

  const drinks = require('./models/drinks.js')

  app.get('/drinks',(req,res) => {
      res.send(drinks)
  })







//Create Server Listener//
const PORT = 3000
app.listen(PORT, ()=> console.log(`Your are listening on port ${PORT}`))