
const Sequelize = require('sequelize')

exports.init = function* (config) {

	//init
	let sequelize = new Sequelize(...config.dbInitOptions)

	//connect
	yield sequelize.authenticate()

	exports.db = {
		tables: {}
	}

	exports.db.sequelize = sequelize

	let tables = Object.keys(config.models)

	for(let i = 0, len = tables.length;i < len;i ++) {

		let tableName = tables[i]
		let tableNameNorm = tableName.toLowerCase()
		exports.db.tables[tableName] = sequelize.define(tableNameNorm, ...config.models[tableName])

	}

	return Promise.resolve()

	//end
}