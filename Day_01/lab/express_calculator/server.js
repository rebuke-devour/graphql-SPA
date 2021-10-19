const express = require('express');
const app = require('liquid-express-views')(express())

const port = 3000;

app.get("/calc/:num1/:num2", (req, res) => {
    const op = req.query.operation
    const num1 = parseInt(req.params.num1)
    const num2 = parseInt(req.params.num2)
 
    console.log(op,num1,num2)

    if (op === 'add')
        res.send(`${num1 +num2}`)
    if (op ==='subtract')
        res.send(`${num1 - num2}`)
    if (op=== 'multiply')
        res.send(`${num1 * num2}`)
    if (op === 'divide')
        res.send(`${num1 % num2}`)

})




app.listen(port, ()=> {
    console.log('App is running on port: 3000', port)
});


// Make Route to URL calc

// app.get("/calc/:num1/:num2", (req, res) => {
//      const num1 = req.params.num1
//      const num2 = req.params.num2
//      let sum = number(num1)
//      let sum2 =  number(num2)
//      res.send('The sum is:',' ${num1+num2}')
// })


