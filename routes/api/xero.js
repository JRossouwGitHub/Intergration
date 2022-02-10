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
    //const base64data = JSON.stringify(JSON.parse(Buffer.from(`${config.xeroClientID} : ${config.xeroClientSecret}`).toString('base64')))
    const base64data = Buffer.from(`${config.xeroClientID} : ${config.xeroClientSecret}`).toString('base64')
    const data = {
        authorization_code: req.query.grant_type,
        code: req.query.code,
        redirect_uri: req.query.redirect_uri
    }
    var options = {
        headers: {
            'authorization': "Basic " + base64data,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        body: {
            grant_type: data.authorization_code,
            code: data.code,
            redirect_uri: data.redirect_uri
        },
        uri: 'https://identity.xero.com/connect/token'
    }
    request(options, function (error, response) {
        if(!error){
            res.send('Getting Token')
        } else {
            console.log(error)
            res.send({err: error})
        }
    });
})

module.exports = Router;