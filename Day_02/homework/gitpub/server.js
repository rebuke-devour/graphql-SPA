//Import Express
const express = require('express')

// create our application object (and configure liquid templating)
const app = require('liquid-express-views')(express())






//Create Server Listener//
const PORT = 3000
app.listen(PORT, ()=> console.log(`Your are listening on port ${PORT}`))