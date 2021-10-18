const express = require("express")

const app = require('liquid-express-views')(express())

app.get("/greeting/:name",(req, res)=>{
    console.log("hello")
    res.send('Hello, Stranger')
})






//Setup Server Listener//
app.listen(3000, ()=> {
    console.log('Your server is now listening on port 3000')
})