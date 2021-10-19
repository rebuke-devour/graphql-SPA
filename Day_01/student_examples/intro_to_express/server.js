const express = require("express")

const app = require('liquid-express-views')(express())


// Write a GET route for '/' => localhost:3000/
app.get("/",(request, response)=>{
    response.send('Hello World')
})

//Write a GET route for '/cheese' 
app.get('/myfirsttemplate', (req, res)=> {
    res.render('first.liquid', {
        cheese:'gouda',
        bread: 'rye',
        name: req.params.name,
        question: Boolean(req.query.question === 'true' ? 
        true : false,
        arr: [1,2,3,4,5,6,7,8,9],
    })
})

//Write a POST for '/cheese'
// // app.post('/cheese',(response ,request)=>{
//     response.send('<h1>Cheese</h1>')
// })

//route that uses a url PARAM '/:param' 
// app.get("/:param1/:param2", (req, res) => {
//     const param1 = req.params.param1
//     const param2 = req.params.param2
//     res.send(`my first param is ${param1} and my second is ${param2}`)
// })

// app.get("/:param1/:param2", (req, res) => {
//     const param1 = req.params.param1
//     const param2 = req.params.param2
//     res.json({
//         method: req.method,
//         params: req.params,
//         queries: req.query,
//         headers: req.headers,
//         url: req.url,
//         host: req.host
//     })
// })




//Setup Server Listener//
app.listen(3000, ()=> {
    console.log('Your server is now listening on port 3000')
})