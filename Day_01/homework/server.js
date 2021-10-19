const express = require("express")

const app = require('liquid-express-views')(express())

app.get("/greeting/:name",(req, res)=>{
    console.log("hello")
     res.send("hello " + req.params.name)

})


app.get("/tip/:total/:tipPercentage", (req, res) => {
    const total = req.params.total
    const tipPercentage = req.params.tipPercentage
    res.send(`${total % tipPercentage}`)
})

app.get('/magic/:question', (req,res)=> {

    const question= (req.params.question)

   const  eightBall= ["It is certain",
     "It is decidedly so",
    "Without a doubt",
    "Yes definitely",
    "You may rely on it",
    "As I see it yes",
    "Most likely",
    "Outlook good",
    "Yes",
    "Signs point to yes", 
    "Reply hazy try again", 
    "Ask again later",
    "Better not tell you now", 
     "Cannot predict now", 
    "Concentrate and ask again",
    "Don't count on it", 
    "My reply is no", 
    "My sources say no",
    "Outlook not so good", 
    "Very doubtful"];

    const random = Math.floor(Math.random() * eightBall.length)
    res.send(`<h1>${question}, ${eightBall[random]}</h1>`)
})






//Setup Server Listener//
app.listen(3000, ()=> {
    console.log('Your server is now listening on port 3000')
})