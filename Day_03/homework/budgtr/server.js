const express = require('express');
const app = require("liquid-express-views")(express());

app.get('/', (req, res) => {
    res.send('Im awake');
})





app.listen(3000, () => {
    console.log('listening');
});