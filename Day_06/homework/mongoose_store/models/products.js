///////////////////////////////////
// import dependencies
///////////////////////////////////
// import the existing connected mongoose object from connection.js
const mongoose = require("./connection")
const Product = require('./models/products');


////////////


///////////////////////////////
// Create our Fruits Model
///////////////////////////////////////////
// destructuring Schema and model from mongoose
const {Schema, model} = mongoose 

// ================= Schema
 const productSchema = new Schema({
    name: String,
    description: String,
    img: String,
    price: Number,
    qty: Number,
 })

 // Make the Fruit Model
const Products = model("Products", productSchema)