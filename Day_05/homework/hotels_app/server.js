// DEPENDENCIES ==================================
const mongoose = require('mongoose');
const express    = require('express');
const app = require("liquid-express-views")(express());
require('dotenv').config()

// CONFIGURATION ==================================
const mongoURI = process.env.DATABASE_URL;
const db = mongoose.connection;

// MODELS =======================================
const Hotel = require('./models/hotel.js');
const hotelSeed = require('./models/seed.js');

// Connect to Mongo
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => {
    console.log("The connection with mongod is established");
  }
);

mongoose.Promise = global.Promise;
mongoose.connect ( mongoURI ,
  () => console.log( 'Mongo running at' , mongoURI )
);

//====================== On Error or Success ==========
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));


// SEED =========================================
//db.on('open',
// Hotel.create(hotelSeed, ( err , data ) => {
//   if ( err ) console.log ( err.message )
  
//   })
//)


// Hotel.create(hotelSeed, ( err , data ) => {
//     if ( err ) console.log ( err.message )
//       console.log( data )
//     }
// );

// if seeded too many times
// Hotel.collection.drop();

// check hotel count
// Hotel.count({} , (err , data)=> {
//    if ( err ) console.log( err.message );
//     console.log ( `There are ${data} hotels in this database` );
// });

// ========== END OF PROVIDED CODE ========= //

// ==========   MY CODE BELOW  =============//

// middleware to parsebody
app.use(express.urlencoded({extended: true}))


app.get('/', (req, res)=>{
  res.send('Im Awake')
})

// //=======================CREATE

// app.post('/ ',(req,res)=>{

// )}

// //==========================New

// app.get('/ /new', (req,res)=>{

// })

// //=======================EDIT

// app.get ('/ /:id/edit', (req,res)=>{

// })



// //======================UPDATE

// app.put('/ /:id', (req,res)=>{

// })

// //====================DESTROY

// app.delete('/ /:id', (req,res)=>{

// )}


//================LISTENER
const PORT = 3000
app.listen(PORT, ()=> console.log(`Im listening ${PORT}`))