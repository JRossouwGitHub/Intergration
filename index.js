const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const xero = require('./routes/api/xero')
const config = require('./config')

app.use('/api/xero', xero)

app.get('/', (req, res) => {
    res.send('Intergration software running!')
})

app.get('/login', (req, res) => {
    res.send({data: config})
    //res.redirect('https://login.xero.com/identity/connect/authorize?response_type=code&client_id=YOURCLIENTID&redirect_uri=YOURREDIRECTURI&scope=openid profile email accounting.transactions&state=123')
})

//Redirect after connecting to XERO and getting data
app.get('/redirect', (req, res) => {
    res.send('Worked!');
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})