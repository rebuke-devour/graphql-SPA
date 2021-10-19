const express require('express');
const app = express();

app.get('/:bottlesNum',('req,res')=> {
    console.log('99 bottles of beer on the wall <a href = '/98)
    if()
})

app.get("/", (req, res) => {
    res.send(`99 bottles of beer on the wall <a href="/98">take one down, pass it around</a>`)
})

app.listen(3000, ()=> {
    console.log('Your server is now listening on port 3000')
})