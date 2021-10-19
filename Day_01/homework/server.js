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


//Setup Server Listener//
app.listen(3000, ()=> {
    console.log('Your server is now listening on port 3000')
})