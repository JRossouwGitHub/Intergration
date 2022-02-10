const express = require('express')
const Router = express.Router()
Router.use(express.json())
const request = require('request');
const config = require('../../config/default')
let access_token
let id_token
let expires_in
let token_type
let refresh_token

Router.get('/', (req, res) => {
    return res.status(400).send({msg: 'Root api'});
})

Router.get('/login', (req, res) => {
    res.redirect(`https://login.xero.com/identity/connect/authorize?response_type=code&client_id=${config.xeroClientID}&redirect_uri=https://infusionxero.herokuapp.com/redirect&scope=openid profile email accounting.transactions accounting.settings offline_access&state=1`)
})

Router.get('/token', (req, res) => {
    const base64data = Buffer.from(`${config.xeroClientID}:${config.xeroClientSecret}`).toString('base64')
    let _body = JSON.stringify({
        'grant_type': req.query.grant_type,
        'code': req.query.code,
        'redirect_uri': req.query.redirect_uri
    })
    var options = {
        headers: {
            'authorization': "Basic " + base64data,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        body: _body,
        uri: 'https://identity.xero.com/connect/token'
    }
    request(options, function (error, response) {
        if(!error && response.statusCode == 200){
            console.log(response)
            res.json({status: 1, msg: 'Success', login: true})
        } else {
            console.log(error)
            res.json({status: 0, msg: 'Fail', login: false, err: error})
        }
    });
})

module.exports = Router;