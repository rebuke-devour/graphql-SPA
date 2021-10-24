//===================SCHEMA==========================//

const mongoose =require('mongoose')


// === PULL Schema and Model === //
const Schema = mongoose.Schema
const model = mongoose.model

// ====== Create Hotel Schema ====== //

const hotelSchema = new Schema({
    name: String,
    location: String,
    rating: {type: Number, max: 5},
    vacancies: Boolean,
    rooms: [{roomNumber: Number, size: String, price: Number, booked: Boolean}],
    tags: [String],
},{timestamps: true})
 
const Hotel = model('hotel',hotelSchema)

// Export Model //
module.exports = Hotel