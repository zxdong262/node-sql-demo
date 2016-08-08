
'use strict'

const Router = require('koa-router')
const db = require('./db').db
const tables = db.tables
const sequelize = db.sequelize
const _ = require('lodash')

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

function rebuild(_obj) {

	let obj = _obj

	_.each(obj, function(value, key) {
		console.log(value, key)
		if(value.indexOf('literal:') > -1) {
			obj[key] = sequelize.literal( value.replace('literal:', '') )
		}
	})
	return obj
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

/*
 * @param body.transaction, Array, eg: [
 *    {
 *      table: 'user'
 *      ,query: { name: 'user1' }
 *      ,update: {
 						money: -1
 *      }
 *    }
 *    ,{
 *      table: 'user'
 *      ,query: { name: 'user2' }
 *      ,update: {
 						money: 1
 *      }
 *    }
 * ]
 * @param table, String, table name
 */

route.post('/transaction', function* (next) {

	try {

		let body = this.request.body

		if(!Array.isArray(body.transaction) || body.transaction.length < 2) throw('transaction data format not right')

		let transes = []
		let arr = body.transaction

		let tx = function(t1) {
			for(let i = 0, len = arr.length;i < len;i ++) {
				let trans = arr[i]
				let table = tables[capitalizeFirstLetter(trans.table)]
				trans.query.transaction = t1
				transes.push(table.update(rebuild(trans.update), trans.query))
			}
			return Promise.all(transes)
		}

		let res = yield sequelize.transaction(tx)
		
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