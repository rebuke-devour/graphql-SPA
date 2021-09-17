// DEPENDENCIES ==================================
const mongoose = require('mongoose');

// CONFIGURATION ==================================
const mongoURI = 'mongodb://localhost:27017/hotel';
const db = mongoose.connection;

mongoose.Promise = global.Promise;
mongoose.connect ( mongoURI ,
  () => console.log( 'Mongo running at' , mongoURI )
);

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));

// MODELS =======================================
const Hotel = require('./models/hotel.js');
const hotelSeed = require('./models/seed.js');

// SEED =========================================
// Hotel.create( hotelSeed, ( err , data ) => {
//     if ( err ) console.log ( err.message )
//       console.log( "added provided hotel data" )
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
