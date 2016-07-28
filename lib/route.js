
'use strict'

const Router = require('koa-router')
const db = require('./db').db
const tables = db.tables
const sql = db.sql

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

let route = new Router()

/*
 * @param method, String, in ['get', 'update', 'add', 'del']
 * @param table, String, table name
 */

route.post('/:method/:table', function* (next) {

	try {



		let body = this.request.body
		let params = this.params
		let method = params.method
		let table = capitalizeFirstLetter(params.table)
		let res

		console.log(this.href)
		console.log(body)
		console.log(tables)

		if(!method in ['get', 'update', 'add', 'del']) throw('method not right')
		else if(!tables[table]) throw('table not exist')

		table = tables[table]


		if(method === 'get') {
			res = yield table.findAll(body.query)
		} else if(method === 'update') {
			res = yield table.update(body.update, body.query)
		} else if(method === 'del') {
			res = yield table.destroy(body.query)
		} else if(method === 'add') {
			res = yield table.create(body)
			res = res.get({ plain: true })
		}
		
		this.body = res

	} catch (e) {

		console.log(
			'' + new Date()
			,e.stack || e
			,this.href
		)
		this.body = {
			err: e.stack
		}

	}

})

route.get('/', function* (next) {
	this.body = 'index'
})

module.exports = route