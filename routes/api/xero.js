const express = require('express')
const Router = express.Router()
Router.use(express.json())
const request = require('request');
const config = require('../../config/default')

Router.get('/', (req, res) => {
    return res.status(400).send({msg: 'Root api'});
})

Router.get('/login', (req, res) => {
    res.redirect(`https://login.xero.com/identity/connect/authorize?response_type=code&client_id=${config.xeroClientID}&redirect_uri=https://infusionxero.herokuapp.com/redirect&scope=openid profile email accounting.transactions&state=1`)
})

Router.get('/token', (req, res) => {
    const data = req.params.body
    var options = {
        uri: 'https://identity.xero.com/connect/token',
        body: {
            'grant_type': data.grant_type,
            'code': data.code,
            'redirect_uri': data.redirect_uri
        },
        method: 'POST',
        headers: {
            'authorization': "Basic " + base64encode(config.xeroClientID + ":" + config.xeroClientSecret),
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    request(options, function (error, response) {
        if(!error && response.statusCode == 200){
            console.log(response.body)
            res.send('Getting Token')
        } else {
            console.log(error, response.body)
            res.send('Error Getting Token')
        }
    });
})

module.exports = Router;