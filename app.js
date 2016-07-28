/*!
 * main entrance
**/

'use strict'

let init = require('./lib/index').init
,co = require('co')
,config = require('./config')

co(init(config))
.then(function(app) {

	app.listen(config.port, 'localhost', function() {
		console.log('' + new Date(), 'server runs on port', config.port)
	})

}, function(err) {
	console.error(err.stack || err)
})