const express = require('express')
const app = express()
const port = 3000 || process.env.PORT
const xero = require('./routes/api/xero')

app.use('/api/xero', xero)

app.get('/', (req, res) => {
    res.send('Intergration software running!')
})

//Redirect after connecting to XERO and getting data
app.get('/redirect', (req, res) => {
    res.send('Worked!');
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})