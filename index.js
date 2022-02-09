const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const xero = require('./routes/api/xero')
const config = require('./config/default')

app.use('/api/xero', xero)

app.get('/', (req, res) => {
    res.send('Intergration software running!')
})

app.get('/login', (req, res) => {
    res.redirect(`https://login.xero.com/identity/connect/authorize?response_type=code&client_id=${config.xeroClientID}&redirect_uri=https://infusionxero.herokuapp.com/redirect&scope=openid profile email accounting.transactions&state=1`)
})

//Redirect after connecting to XERO and getting data
app.get('/redirect', (req, res) => {
    console.log(req)
    res.send('Success! You have been logged in for 30min.');
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})