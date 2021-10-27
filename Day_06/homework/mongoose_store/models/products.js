///////////////////////////////////
// import dependencies
///////////////////////////////////
// import the existing connected mongoose object from connection.js
const mongoose = require("./connection")
const Products = require('../models/products');


/////////////////////////////


///////////////////////////////
// Create our Product Model //
/////////////////////////////
// destructuring Schema and model from mongoose
const {Schema, model} = mongoose 

// ================= Schema
 const productSchema = new Schema({
    name: String,
    description: String,
    img: String,
    price: Number,
    qty: Number,
    inStock: true
 })

 // Make the Model
// const Products = model("Products", productSchema)