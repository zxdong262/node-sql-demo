

/**
 * Module dependencies.
 */

//use bluebird as global promise for better performace
global.Promise = require('bluebird')

//imports
const
koa = require('koa')
,compress = require('koa-compress')
,serve = require('koa-static')
,bodyParser = require('koa-bodyparser')

exports.start = function() {


	let
	route = require('./route')
	,app = koa()

	app.use(bodyParser())
	app.use(function* (next) {
		this.status =  404
		this.render(setting.path404, this.local)
	})
	
	return app
}

exports.init = function* (config) {

	const
	config = require('../config')

	,dbRef = require('./db')


	//load db
	yield dbRef.init(config)

	const db = dbRef.db
	const app = exports.start()

	return Promise.resolve(app)

}

