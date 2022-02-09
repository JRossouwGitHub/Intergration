const express = require('express')
const app = express()
const port = 3000
const xero = require('./routes/api/xero')

app.use('/api/xero', xero)

app.get('/', (req, res) => {
    res.send('Intergration software running!')
})

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})