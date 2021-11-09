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

Hotel.create(hotelSeed, ( err , data ) => {
  if ( err ) console.log ( err.message )
  
  })



Hotel.create(hotelSeed, ( err , data ) => {
    if ( err ) console.log ( err.message )
      console.log( data )
    }
);

// if seeded too many times
// Hotel.collection.drop();

// check hotel count
Hotel.count({} , (err , data)=> {
   if ( err ) console.log( err.message );
    console.log ( `There are ${data} hotels in this database` );
});

// ========== END OF PROVIDED CODE ========= //

// ==========   MY CODE BELOW  =============//

// middleware to parsebody
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res)=>{
  res.send('Im Awake')
})


// //=======================CREATE
[
  {
    "name": "Hotel Virginia",
    "location": "Massachusetts",
    "rating": 4.3,
    "vacancies": true,
    "rooms": [
      {
        "roomNumber": 111,
        "size": "Queen Double",
        "price": 75,
        "booked": true
      },
      {
        "roomNumber": 210,
        "size": "King Suite",
        "price": 68,
        "booked": false
      },
      {
        "roomNumber": 375,
        "size": "Queen Double",
        "booked": true
      },
      {
        "roomNumber": 700,
        "size": "King Suite",
        "price": 68,
        "booked": true
      },
      {
        "roomNumber": 777,
        "size": "Penthouse",
        "price": 777,
        "booked": true
      }
    ],
    "tags": [
      "Whiskey",
      "wine",
      "lovely",
      "Had the greatest time"
    ]
  }]

// //==========================New

Hotel.create(hotelSeed)
.then((tweet) => {console.log(tweet)})
.catch((error)=> {db.close()})
.finally(()=>{db.close()})

// //=======================EDIT
Hotel.find({}, 'name')
.then((tweet)=>{console.log(tweet)})
.catch((tweets)=>{consloe.log(tweet)})
.finally(()=> {db.close()})

// find all vacancies and exclude rating
// Hotel.find({vacancies: "true"  }) //this one finds hotels with vacancies just fine

// Hotel.find({"rating"}).select("-rating")
Hotel.find({}).select('-rating')

// the command is successful
.then((tweets) => {console.log(tweets)})
// if database transaction fails
.catch((error) => {console.log(error)})
// either way, run the following
.finally(() => {db.close()})


//Delete 

Hotel.findOneAndRemove({_id: "6175ede2fa8b74792c1cf7e8"})  //you remove things by their id
// the command is successful
.then((tweet) => {console.log(tweet)})
// if database transaction fails
.catch((error) => {console.log(error)})
// either way, run the following
.finally(() => {db.close()})



Hotel.findOneAndRemove({_id: "6175ede2fa8b74792c1cf7df"})  //you remove things by their id
// the command is successful
.then((tweet) => {console.log(tweet)})
// if database transaction fails
.catch((error) => {console.log(error)})


Hotel.findOneAndRemove({_id: "6175ede2fa8b74792c1cf7f4"})  //you remove things by their id
// the command is successful
.then((tweet) => {console.log(tweet)})
// if database transaction fails
.catch((error) => {console.log(error)})
// either way, run the following
.finally(() => {db.close()})




   

//================LISTENER
const PORT = 3000
app.listen(PORT, ()=> console.log(`Im listening ${PORT}`))