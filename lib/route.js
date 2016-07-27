
'use strict'

const Router = require('koa-router')
const db = require('./db').db
let route = new Router()

route.post('/:method/:table/', function* (next) {

})

module.exports = route