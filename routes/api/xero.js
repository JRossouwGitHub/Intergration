const express = require('express')
const Router = express.Router()
Router.use(express.json())

Router.get('/', (req, res) => {
    return res.status(400).send({msg: 'Root api'});
})

module.exports = Router;