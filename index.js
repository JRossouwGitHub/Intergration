const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const xero = require('./routes/api/xero')

app.use('/api/xero', xero)

app.get('/', (req, res) => {
    res.send('Intergration software running!')
})

//Redirect after connecting to XERO and getting data
app.get('/redirect', (req, res) => {
    if(req.query.code){
        try{
            const body = {
                grant_type: 'authorization_code',
                code: req.query.code,
                redirect_uri: 'https://infusionxero.herokuapp.com/redirect'
            }
            res.redirect(`/api/xero/token?grant_type=${body.grant_type}&code=${body.code}&redirect_uri=${body.redirect_uri}`)
        } catch(e){
            console.log(e)
            res.send('Error! There was an issue authenticating your login.');
        }
    } else {
        console.log(req)
        res.send('Success! You have been logged in for 30min.')
    }
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})