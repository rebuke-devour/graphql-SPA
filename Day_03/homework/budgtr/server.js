const express = require('express');
const app = require("liquid-express-views")(express());
const budgets = require('./models/budget.js')


app.use(express.static('public'))

app.use(express.urlencoded({extended:true}))









/////////////////////////////
// CREATE           ///////
//////////////////////////

app.get('/budget', (req, res) => {
    res.render('index.liquid',{bud: budgets});
})

////////////////////////////
//   INDEX              ///
///////////////////////////

app.get('/budget',(req,res)=>{
    res.render('index.liquid',{bud2: budgets})
})



/////////////////////////
//       NEW          //
///////////////////////
app.get('/budget/new', (req,res)=> {
    res.render('new.liquid')
})


// ////////////////////////////
// // SHOW     
// ////////////////////////

// app.get('/budget', (req,res)=> {
//     res.render('s')
// })



/////////////////////
///   CREATE    ////
/////////////////

app.post('/budget',(req,res)=> {
    
})

app.get('/budget/new')

////////////////////////////
// SHOW     
////////////////////////

app.get('/budget/:id', (req, res)=> {
    const id =req.params.id
    res.render('show.liquid', {bud2: budgets[id]})
})


// Listener //
app.listen(3000, () => {
    console.log('Im listening');
});