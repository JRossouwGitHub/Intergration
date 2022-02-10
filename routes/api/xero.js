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
    const base64data = Buffer.from(`${config.xeroClientID} : ${config.xeroClientSecret}`).toString('base64')
    const data = {
        authorization_code: req.query.grant_type,
        code: req.query.code,
        redirect_uri: req.query.redirect_uri
    }
    console.log(data)
    var options = {
        uri: 'https://identity.xero.com/connect/token',
        body: {
            grant_type: data.authorization_code,
            code: data.code,
            redirect_uri: data.redirect_uri
        },
        method: 'POST',
        headers: {
            'authorization': "Basic " + base64data.toString(),
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    request(options, function (error, response) {
        if(!error && response.statusCode == 200){
            res.send('Getting Token')
        } else {
            res.send({err: error})
        }
    });
})

module.exports = Router;